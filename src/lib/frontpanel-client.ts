
import { ErrorCode, FrontPanelError } from './error';
import { AsyncWebSocket, IReply } from './ws-async';

const PROTOCOL_VERSION = 20;

function makeError(e: any, msg: string) {
    const code = e instanceof FrontPanelError ? e.code : ErrorCode.Failed;
    const errorMsg =
        e instanceof FrontPanelError
            ? e.reason
            : e instanceof Error
                ? e.message
                : (e as string);
    return new FrontPanelError(code, `${msg} with error ${errorMsg}`);
}

export class FrontPanelClient {
    private readonly socket: AsyncWebSocket;

    /**
     * Initializes the object with the asynchronous websocket to use
     * for communicating with the remote server.
     *
     * @param socket Websocket to use for communicating with the FrontPanel
     * over IP Server.
     */
    constructor(socket: AsyncWebSocket) {
        this.socket = socket;
    }

    /**
     * Returns true if the object is connected to the remote server.
     *
     * This value is initially `false` and becomes `true` once [[connect]]
     * completes successfully.
     *
     * No other method of this class other than `connect()` can be used until
     * this property becomes `true`.
     */
    public get isConnected(): boolean {
        return this.socket.isOpened;
    }

    /**
     * Initiates connection to the server.
     *
     * This async function will satisfy its promise when connecting succeeds
     * or break it when it fails.
     *
     * See [[isConnected]].
     */
    public async connect(): Promise<void> {
        try {
            await this.socket.open();
        } catch (e) {
            throw makeError(e, 'Failed to connect');
        }
    }

    /**
     * Initiates disconnection from the server.
     *
     * @param code Optional standard WebSocket close code explaining why the
     * connection is being closed.
     */
    public async disconnect(code?: number): Promise<void> {
        try {
            await this.socket.close(code);
        } catch (e) {
            throw makeError(e, 'Failed to disconnect');
        }
    }

    /**
     * Asynchronously waits for any unsolicited server reply.
     *
     * Unsolicited replies are sent by the server not in reply to a client
     * request but due to an event on the server-side, e.g. new device
     * connection.
     */
    public async waitForServer(): Promise<IReply> {
        try {
            return this.socket.waitForServer();
        } catch (e) {
            throw makeError(e, 'Failed to wait for the server reply');
        }
    }

    /**
     * Initiates login to the server.
     *
     * As the provided credentials are transmitted unencrypted, connection
     * itself must be secure, i.e. use TLS.
     *
     * After successfully logging in, call [[openDevice]] to start working
     * with one of the devices from the list returned by the server.
     *
     * @param username The username to use for authentication.
     * @param password The password to use for authentication.
     * @returns List of available devices in case of successful login.
     */
    public async login(username: string, password: string): Promise<string[]> {
        const devices = await this.sendRequest(
            RequestCode.Login,
            PROTOCOL_VERSION,
            username,
            password
        );
        return devices.data;
    }

    /**
     * Sends a request with a set of arguments to the server and returns
     * the reply received in response to the request.
     * 
     * @param req RequestCode specifying the type of request to be sent.
     * @param args Set of arguments that correspond to the request.
     * @returns Reply received from the server in response to the request.
     */
    public async sendRequest(
        req: RequestCode,
        ...args: any
    ): Promise<IReply> {
        try {
            const request = [req].concat(args);
            const reply = await this.socket.send(...request);
            return reply;
        } catch (e) {
            throw makeError(e, `Request ${RequestCode[req]} failed`);
        }
    }
}


// FPOIP request constants.
export enum RequestCode {
    Login = 1,
    Open,
    GetDeviceInfo,
    GetDeviceInfoPrivate,
    GetHostInterfaceWidth, // Deprecated.
    IsFrontPanel3Supported,
    SetBTPipePollingInterval,
    SetDeviceID,
    SetTimeout,
    GetLastTransferLength,
    ResetFPGA,
    ActivateTriggerIn,
    ReadI2C,
    ReadFromBlockPipeOut,
    ReadFromPipeOut,
    ConfigureFPGA,
    LoadScript,
    RunScriptFunction,
    DestroyScriptEngine,
    IsFrontPanelEnabled,
    UpdateWireIns,
    UpdateWireOuts,
    UpdateTriggerOuts,
    UpdateAllOuts,
    WriteI2C,
    WriteToPipeIn,
    WriteToBlockPipeIn,
    CloseDevice,
    ReadRegisters,
    WriteRegisters,
    ClearFPGAConfiguration,
    FlashEraseSector,
    FlashWrite,
    FlashRead,
    DeviceSettingsList,
    DeviceSettingsSave,
    DeviceSettingsDelete,
    DeviceSettingsSetInteger,
    DeviceSettingsSetString,
    DeviceSettingsGetInteger,
    DeviceSettingsGetString,
    GetDeviceSensors,
    ConfigureFPGAWithReset,
    ConfigureFPGAFromFlash,
    GetFPGAResetProfile,
    SetFPGAResetProfile,
    LoadDefaultPLLConfiguration,
    GetPLL22150Configuration,
    SetPLL22150Configuration,
    GetEepromPLL22150Configuration,
    SetEepromPLL22150Configuration,
    GetUsb3DeviceInfoPrivate,
    GetUsbFPXDeviceInfoPrivate
}
