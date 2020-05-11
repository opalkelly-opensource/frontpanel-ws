/**
 * Implement promise-based WebSocket API, in order to keep dependencies
 * of this module minimal.
 */

import { decode, encode } from '@msgpack/msgpack';
import * as WebSocket from 'isomorphic-ws';
import { ErrorCode, FrontPanelError } from './error';
import { AsyncOperation } from './operation';

function isBrowser(): boolean {
    return typeof window !== `undefined`;
}

// see: https://developer.mozilla.org/en-US/docs/Web/API/WebSocket#Ready_state_constants
enum ReadyState {
    CONNECTING = 0,
    OPEN,
    CLOSING,
    CLOSED
}

const NoError = 0;

// As a special case, server may send unsolicited replies with the session ID
// and sequence number of 0. They indicate notifications about server events
// not corresponding to any client requests, e.g. a device [dis]connection,
// and for them the result code is replaced with the notification opcode and
// the return value is used to transport the notification payload.
export enum Notification {
    DeviceConnected = 1,
    DeviceDisconnected
}

export interface IReply {
    readonly session: number;
    readonly replyId: number;
    readonly data: any;
    readonly notification?: Notification;
}

interface IReplyOrError {
    readonly reply?: IReply;
    readonly error?: FrontPanelError;
}

/**
 * The WebSockedAsPromised class.
 */
export class AsyncWebSocket {
    private readonly url: string;
    private readonly requests: Map<number, AsyncOperation<IReply>>;
    private readonly replies: IReplyOrError[];
    private openOperation: AsyncOperation<void> | null;
    private closeOperation: AsyncOperation<void> | null;
    private replyOperation: AsyncOperation<IReply> | null;
    private ws: WebSocket | null;
    private disconnecting: boolean;
    private allowSelfSigned: boolean;
    private lastError?: Error;

    private readonly session: number;
    private sequenceNumber: number;

    /**
     * Constructor. Unlike original WebSocket it does not immediately open connection.
     * Please call [[open]] method to connect.
     *
     * @param {String} url WebSocket URL.
     * @param {boolean} allowSelfSigned Whether the server certificate is not
     *                  verified against the list of supplied CAs. Allow connection
     *                  to servers with self signed certificates.
     */
    constructor(url: string, allowSelfSigned: boolean) {
        this.url = url;
        this.requests = new Map<number, AsyncOperation<IReply>>();
        this.replies = [];
        this.openOperation = null;
        this.closeOperation = null;
        this.replyOperation = null;
        this.ws = null;
        this.disconnecting = false;
        this.allowSelfSigned = allowSelfSigned;
        this.lastError = undefined;
        this.session = 1;
        this.sequenceNumber = 0;
    }

    /**
     * Is WebSocket connection in opening state.
     *
     * @returns {boolean}
     */
    public get isOpening(): boolean {
        return this.ws !== null && this.ws.readyState === ReadyState.CONNECTING;
    }

    /**
     * Is WebSocket connection opened.
     *
     * @returns {boolean}
     */
    public get isOpened(): boolean {
        return this.ws !== null && this.ws.readyState === ReadyState.OPEN;
    }

    /**
     * Is WebSocket connection in closing state.
     *
     * @returns {Boolean}
     */
    public get isClosing(): boolean {
        return this.ws !== null && this.ws.readyState === ReadyState.CLOSING;
    }

    /**
     * Is WebSocket connection closed.
     *
     * @returns {boolean}
     */
    public get isClosed(): boolean {
        return this.ws === null || this.ws.readyState === ReadyState.CLOSED;
    }

    /**
     * Opens WebSocket connection.
     *
     * @returns {Promise<void>}
     */
    public open(): Promise<void> {
        if (this.ws !== null) {
            // TODO: Replace with switch/case. Currently for TS 3.6.4 returning from
            //       a case statement will rise the error: TS7029 Fallthrough case in switch.
            if (this.ws.readyState === ReadyState.OPEN) {
                return Promise.resolve();
            } else if (this.ws.readyState === ReadyState.CONNECTING) {
                this._rejectWithError(
                    new FrontPanelError(
                        ErrorCode.Failed,
                        'WebSocket opening already in progress'
                    )
                );
            } else if (this.ws.readyState === ReadyState.CLOSING) {
                this._rejectWithError(
                    new FrontPanelError(
                        ErrorCode.Failed,
                        'WebSocket is closing right now'
                    )
                );
            }
        }
        if (this.lastError) {
            return Promise.reject(this.lastError);
        }
        this.openOperation = new AsyncOperation<void>(() => {
            this.disconnecting = false;

            // Allow connection to servers with self-signed certificates for the
            // Node.js implementation. We can't do the same for the browser.
            // User should open https://server/ in a browser by himself and
            // accept the certificate manually (when connecting to wss://server/).
            this.ws =
                isBrowser() || !this.allowSelfSigned
                    ? new WebSocket(this.url)
                    : new WebSocket(this.url, undefined, {
                          rejectUnauthorized: false
                      });
            // msgpack-lite doesn't seem to work directly with blobs, so
            // we'd have to convert them to arrays on reception otherwise
            // using FileReader and avoiding this makes things simpler
            // (but maybe also slower? to be checked...)
            this.ws.binaryType = 'arraybuffer';

            this.ws.onopen = () => this._handleOpen();
            this.ws.onerror = () => this._handleError();
            this.ws.onclose = (event: WebSocket.CloseEvent) =>
                this._handleClose(event);
            this.ws.onmessage = (event: WebSocket.MessageEvent) =>
                this._handleMessage(event);
        });
        return this.openOperation.promise;
    }

    /**
     * Closes WebSocket connection.
     *
     * @returns {Promise<>}
     */
    public close(code?: number): Promise<void> {
        if (this.isClosed) {
            Promise.resolve();
        }
        if (!this.isOpened) {
            this._rejectWithError(
                new FrontPanelError(
                    ErrorCode.Failed,
                    'Failed to close not opened WebSocket'
                )
            );
        }
        // In case of an error WebSocket.close already was called in
        // _RejectWithError so we can simply reject the promise.
        if (this.lastError) {
            return Promise.reject(this.lastError);
        }
        this.closeOperation = new AsyncOperation<void>(() => {
            // The client is started disconnection.
            this.disconnecting = true;
            this._getWS().close(code);
        });
        return this.closeOperation.promise;
    }

    /**
     * Returns promised which will be satisfied when the reply is received.
     *
     * @param {*} data The data to send.
     * @returns {Promise}
     */
    public send(...data: any[]): Promise<IReply> {
        if (!this.isOpened) {
            this._rejectWithError(
                new FrontPanelError(
                    ErrorCode.Failed,
                    'Failed to send: WebSocket is not opened'
                )
            );
        }
        if (this.lastError) {
            return Promise.reject(this.lastError);
        }
        this.sequenceNumber++;
        const requestId = this.sequenceNumber;
        const request = new AsyncOperation<IReply>(() => {
            const dataToSend = [this.session, requestId].concat(data);
            const buf = encode(dataToSend);
            this._getWS().send(buf);
        });
        this.requests.set(requestId, request);

        return request.promise;
    }

    /**
     * Waits for reply which is not requested by Send.
     * The replies are filtered by the replyId.
     *
     * @returns {Promise}
     */
    public waitForServer(): Promise<IReply> {
        if (!this.isOpened) {
            this._rejectWithError(
                new FrontPanelError(
                    ErrorCode.Failed,
                    'Failed to wait for reply: WebSocket is not opened'
                )
            );
        }
        if (this.lastError) {
            return Promise.reject(this.lastError);
        }
        this.replyOperation = new AsyncOperation<IReply>(() => {
            if (this.replyOperation !== null) {
                // Check for replies.
                const replyOrError = this.replies.shift();
                if (replyOrError) {
                    if (replyOrError.reply) {
                        this.replyOperation.resolve(replyOrError.reply);
                    } else {
                        this.replyOperation.reject(replyOrError.error);
                    }
                    this.replyOperation = null;
                }
            }
        });

        return this.replyOperation.promise;
    }

    private _handleOpen(): void {
        if (this.openOperation) {
            this.openOperation.resolve();
            this.openOperation = null;
        }
    }

    private _handleError(): void {
        this._rejectWithError(
            new FrontPanelError(
                ErrorCode.CommunicationError,
                'Communication error'
            )
        );
    }

    private _handleClose(event: WebSocket.CloseEvent): void {
        // Reject all pending operations if any.
        if (
            this.openOperation !== null ||
            this.replyOperation !== null ||
            this.requests.size !== 0
        ) {
            this._rejectWithError(
                new FrontPanelError(
                    this.disconnecting
                        ? ErrorCode.DisconnectByClient
                        : ErrorCode.DisconnectByServer,
                    `WebSocket closed with reason: ${event.reason} (${event.code})`
                ),
                true /* Do not reject close */
            );
        }
        if (this.closeOperation) {
            this.closeOperation.resolve();
            this.closeOperation = null;
            this.ws = null;
        }
    }

    private _handleMessage(event: WebSocket.MessageEvent): void {
        // Do nothing if we already are in error state.
        if (this.lastError) {
            return;
        }

        try {
            const elements = decode(new Uint8Array(event.data as ArrayBuffer));

            if (!Array.isArray(elements)) {
                throw new FrontPanelError(
                    ErrorCode.CommunicationError,
                    'The reply is unexpectedly not an array'
                );
            }

            if (elements.length < 3) {
                throw new FrontPanelError(
                    ErrorCode.CommunicationError,
                    `Unexpectedly few elements in the reply ${elements}`
                );
            }

            const session: number = elements[0];
            elements.shift();
            if (session !== this.session && session !== 0) {
                throw new FrontPanelError(
                    ErrorCode.CommunicationError,
                    `Unexpected session ID ${session}`
                );
            }

            const replyId: number = elements[0];
            elements.shift();

            // The error for the current reply. We correctly parse
            // the reply data with the session number and the reply number.
            // So we can reject the single reply instead of failing the whole state.
            let replyError: FrontPanelError | null = null;

            // Whether the reply is solicited.
            let notification: Notification | undefined;
            if (session === 0 && replyId === 0) {
                notification = elements[0];
            } else {
                const errorCode: ErrorCode = elements[0];
                if (errorCode !== NoError) {
                    let errorMessage = `Reply #${replyId} failed`;

                    // Append the error description, if it isn't an empty string.
                    const errorDescription: string = elements[1];
                    if (errorDescription) {
                        errorMessage += `: '${errorDescription}'`;
                    }

                    replyError = new FrontPanelError(errorCode, errorMessage);
                }
            }
            elements.shift();

            if (replyError === null && elements.length > 1) {
                replyError = new FrontPanelError(
                    ErrorCode.Failed,
                    'Unexpected extra elements in the reply: ' +
                        elements.slice(1)
                );
            }

            // Extract the return value, if any: some requests don't return
            // anything.
            // We could return "undefined" from here, but it compares equal to
            // null, which means that an error has occurred, when using "==",
            // so to avoid any misunderstandings, return an empty array instead.
            const data: any[] = elements.length === 0 ? [] : elements[0];

            const reply: IReply = { replyId, session, data, notification };

            const request = this.requests.get(replyId);
            if (request) {
                if (replyError) {
                    request.reject(replyError);
                } else {
                    request.resolve(reply);
                }
                this.requests.delete(replyId);
            } else {
                if (this.replyOperation) {
                    if (replyError) {
                        this.replyOperation.reject(replyError);
                    } else {
                        this.replyOperation.resolve(reply);
                    }
                    this.replyOperation = null;
                } else {
                    if (replyError) {
                        this.replies.push({ error: replyError });
                    } else {
                        this.replies.push({ reply });
                    }
                }
            }
        } catch (e) {
            this._rejectWithError(e);
        }
    }

    private _rejectWithError(
        error: FrontPanelError,
        doNotRejectClose?: boolean
    ) {
        this.lastError = error;
        if (this.openOperation !== null) {
            this.openOperation.reject(error);
            this.openOperation = null;
        }
        if (this.closeOperation !== null && !doNotRejectClose) {
            this.closeOperation.reject(error);
            this.closeOperation = null;
        }
        if (this.replyOperation !== null) {
            this.replyOperation.reject(error);
            this.replyOperation = null;
        }
        if (this.requests.size !== 0) {
            this.requests.forEach((request: AsyncOperation<IReply>) => {
                request.reject(error);
            });
            this.requests.clear();
        }
        // Close WebSocket on an error.
        if (this.ws !== null) {
            this.ws.close();
        }
    }

    private _getWS(): WebSocket {
        if (this.ws === null) {
            throw new FrontPanelError(
                ErrorCode.Failed,
                'WebSocket is unexpectedly null'
            );
        }
        return this.ws;
    }
}
