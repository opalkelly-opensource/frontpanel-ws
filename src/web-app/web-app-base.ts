/**
 * The FrontPanel Web Application Base class.
 */

import * as frontpanelWs from '../FrontPanelAPI';

enum HTTPResponseType {
    ArrayBuffer,
    Text
}

/**
 * This class encapsulates the basic functionality of a web application
 * using FrontPanel API via web socket interface.
 */
export abstract class FrontPanelWebAppBase {
    /**
     * The instance of [[FrontPanel]]. Throws an exception if the variable is
     * `undefined` (use [[connectAndLogin]] to initialize it).
     */
    get fp(): frontpanelWs.FrontPanel {
        if (this._fp === undefined) {
            throw new frontpanelWs.FrontPanelError(
                frontpanelWs.ErrorCode.Failed,
                'Not connected to FrontPanel server'
            );
        }
        return this._fp;
    }

    /**
     * The name of the currently connected server or `undefined` if not connected.
     */
    get server(): string | undefined {
        return this._server;
    }

    /**
     * Whether the application is connected to the server.
     */
    get isConnected(): boolean {
        return this._fp !== undefined && this._fp.isConnected;
    }

    /**
     * The list of the devices on the server we're currently connected to.
     */
    get devices(): string[] {
        return this._devices;
    }

    /**
     * The name of the currently configured device or `undefined` if not
     * configured.
     */
    get configuredDevice(): string | undefined {
        return this._configuredDevice;
    }

    public onConnect?: () => Promise<void>;
    public onDisconnect?: () => Promise<void>;
    public onAddDevice?: (device: string) => Promise<void>;
    public onRemoveDevice?: (device: string) => Promise<void>;
    public onConfigure?: () => Promise<void>;

    private _fp?: frontpanelWs.FrontPanel;
    private _server?: string;
    private _devices: string[] = [];
    private _configuredDevice?: string;

    /**
     * Connects to the server and login with the given credentials.
     */
    public async connectAndLogin(
        server: string,
        user: string,
        password: string
    ): Promise<void> {
        this._fp = new frontpanelWs.FrontPanel({ server });

        await this.fp.connect();

        this._devices = await this.fp.login(user, password);

        await this._setConnected(server);
    }

    /**
     * Disconnects from the server if connected (do nothing if not connected).
     */
    public async disconnect(): Promise<void> {
        if (this.isConnected) {
            await this.fp.disconnect();
        }
        await this._setConnected(undefined);
    }

    /**
     * Configures the device with the given file.
     */
    public async configure(device: string, file: Blob): Promise<void> {
        this._configuredDevice = device;
        await this.fp.openDevice(this._configuredDevice);

        const data = await this._readFile(file);

        await this.fp.configureFPGA(data);

        this.onConfigure?.();
    }

    /**
     * Waits for an unsolicited server reply and treats it as a server
     * notification (throw an error on any other kind of replies). Processes
     * device connection and disconnection notifications to update the list
     * of devices and call [[onAddDevice]] and [[onRemoveDevice]] handlers.
     * If the current configured device was disconnected, call [[disconnect]].
     */
    public async processServerNotifications(): Promise<void> {
        const result = await this.fp.waitForServer();
        if (result.notification) {
            const device = result.data;
            switch (result.notification) {
                case frontpanelWs.Notification.DeviceConnected:
                    this._devices.push(device);
                    await this.onAddDevice?.(device);
                    break;
                case frontpanelWs.Notification.DeviceDisconnected:
                    this._devices = this._devices.filter(e => e !== device);
                    await this.onRemoveDevice?.(device);
                    if (this._configuredDevice === device) {
                        await this.disconnect();
                    }
                    break;
                default:
                    throw new frontpanelWs.FrontPanelError(
                        frontpanelWs.ErrorCode.Failed,
                        `Unexpected server notification: ${result.data}`
                    );
            }
        } else {
            throw new frontpanelWs.FrontPanelError(
                frontpanelWs.ErrorCode.Failed,
                `Unexpected reply from the server: ${result.data}`
            );
        }
    }

    /**
     * Executes `func` and in case of an error call [[_processError]] and update
     * the UI with [[_updateConnectionStatus]].
     */
    public async callAndCheckErrors(func: () => Promise<void>) {
        try {
            await func();
        } catch (e) {
            // Don't log disconnection errors if we closed the connection ourselves.
            if (
                e instanceof frontpanelWs.FrontPanelError &&
                e.code === frontpanelWs.ErrorCode.DisconnectByClient
            ) {
                this.disconnect();
            } else {
                this._processError(e);
            }
        }
    }

    /**
     * Executes `func` using `setTimeout` while `condition` returns `true` with
     * `ms` timeout.
     */
    public async repeatWhile(
        condition: () => boolean,
        func: () => void,
        ms: number
    ): Promise<void> {
        // Use callAndCheckErrors() to correctly process errors even if
        // repeatWhile() called without `await`.
        await this.callAndCheckErrors(async () => {
            for (;;) {
                await new Promise(resolve => setTimeout(resolve, ms));

                if (!condition()) {
                    return;
                }

                await func();
            }
        });
    }

    /**
     * Asynchronously sends the `GET` request and returns the [[Promise]]
     * which will be resolved with the response as an array buffer when the
     * request is complete.
     */
    public async httpBinaryRequest(path: string): Promise<Uint8Array> {
        const req = await this._httpRequest(path, HTTPResponseType.ArrayBuffer);
        return new Uint8Array(req.response);
    }

    /**
     * Asynchronously sends the `GET` request and returns the [[Promise]]
     * which will be resolved with the response text when the request is
     * complete.
     */
    public async httpTextRequest(path: string): Promise<string> {
        const req = await this._httpRequest(path, HTTPResponseType.Text);
        return req.responseText;
    }

    /**
     * Processes the error caught inside [[callAndCheckErrors]]. For example log
     * an error and [[disconnect]].
     */
    protected abstract _processError(e: any): void;

    /**
     * Updates the application UI when a connection or disconnection has
     * occurred.
     */
    protected abstract async _updateConnectionStatus(): Promise<void>;

    private async _httpRequest(
        path: string,
        responseType: HTTPResponseType
    ): Promise<XMLHttpRequest> {
        return new Promise((resolve, reject) => {
            const req = new XMLHttpRequest();
            req.open('GET', path, true);
            if (responseType === HTTPResponseType.ArrayBuffer) {
                req.responseType = 'arraybuffer';
            }
            req.onerror = () => {
                reject(`Failed to get the file: ${req.statusText}`);
            };
            req.onload = () => {
                resolve(req);
            };
            req.send();
        });
    }

    private async _readFile(file: Blob): Promise<Uint8Array> {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.onload = () => {
                resolve(new Uint8Array(reader.result as ArrayBuffer));
            };
            reader.onerror = () => {
                reject(reader.error);
            };
            reader.readAsArrayBuffer(file);
        });
    }

    private async _setConnected(server: string | undefined): Promise<void> {
        if (this._server === server) {
            return;
        }
        this._server = server;
        if (server) {
            await this.onConnect?.();
        } else {
            await this.onDisconnect?.();
            this._fp = undefined;
            this._devices = [];
            this._configuredDevice = undefined;
        }
        this._updateConnectionStatus();
    }
}
