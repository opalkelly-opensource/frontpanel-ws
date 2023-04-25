/**
 * The FrontPanel Web API implements the client part of FPoIP protocol.
 */

import { IDeviceInfo } from './device-info';
import { ErrorCode, FrontPanelError } from './error';
import { AsyncWebSocket, IReply } from './ws-async';
import { FrontPanelClient, RequestCode } from './frontpanel-client';
import { DeviceSettings } from './device-settings';
import { FPGAResetProfile, FPGAConfigurationMethod } from './fpga-reset-profile';
import { FrontPanelCodec } from './frontpanel-codec';

export const MAX_SERIALNUMBER_LENGTH = 10;
export const MAX_DEVICEID_LENGTH = 32;
export const MAX_SECURITY_DATA_LENGTH = 64;
export const MAX_ENDPOINTS = 256;
export const MAX_COMPONENTS = 256;
export const FIRST_WIREIN_ENDPOINT = 0x00;
export const LAST_WIREIN_ENDPOINT = 0x1f;
export const FIRST_WIREOUT_ENDPOINT = 0x20;
export const LAST_WIREOUT_ENDPOINT = 0x3f;
export const FIRST_TRIGGERIN_ENDPOINT = 0x40;
export const LAST_TRIGGERIN_ENDPOINT = 0x5f;
export const FIRST_TRIGGEROUT_ENDPOINT = 0x60;
export const LAST_TRIGGEROUT_ENDPOINT = 0x7f;
export const FIRST_PIPEIN_ENDPOINT = 0x80;
export const LAST_PIPEIN_ENDPOINT = 0x9f;
export const FIRST_PIPEOUT_ENDPOINT = 0xa0;
export const LAST_PIPEOUT_ENDPOINT = 0xbf;

/**
 * This is the class that encapsulates the functionality of the FPGA
 * boards as well as the FrontPanel extensions such as wire and trigger
 * endpoints.
 */
export class FrontPanel {
    private readonly client: FrontPanelClient;

    // The values passed to updateWireIns() or retrieved from
    // update{Wire,Trigger}Outs().
    private wireInValues: number[];
    private wireOutValues: number[];
    private triggerOutValues: number[];

    /**
     * Initializes the object with the remote server address.
     *
     * The only mandatory parameter is `server` which specifies the remote
     * server, running FPoIP server, to connect to.
     *
     * @param parameters Parameters that must include the server address.
     */
    constructor(parameters: IConstructParameters) {
        const socket = new AsyncWebSocket(
            parameters.server,
            parameters.allowSelfSigned === true
        );
        this.client = new FrontPanelClient(socket);
        this.wireInValues = new Array<number>(
            LAST_WIREIN_ENDPOINT - FIRST_WIREIN_ENDPOINT + 1
        );
        this.wireOutValues = new Array<number>(
            LAST_WIREOUT_ENDPOINT - FIRST_WIREOUT_ENDPOINT + 1
        );
        this.triggerOutValues = new Array<number>(
            LAST_TRIGGEROUT_ENDPOINT - FIRST_TRIGGEROUT_ENDPOINT + 1
        );
        this._resetValues();
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
        return this.client.isConnected;
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
        return this.client.connect();
    }

    /**
     * Initiates disconnection from the server.
     *
     * @param code Optional standard WebSocket close code explaining why the
     * connection is being closed.
     */
    public async disconnect(code?: number): Promise<void> {
        return this.client.disconnect(code);
    }

    /**
     * Asynchronously waits for any unsolicited server reply.
     *
     * Unsolicited replies are sent by the server not in reply to a client
     * request but due to an event on the server-side, e.g. new device
     * connection.
     */
    public async waitForServer(): Promise<IReply> {
        return this.client.waitForServer();
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
        return this.client.login(username, password);
    }

    /**
     * Requests opening the specified device.
     *
     * Opening the device is required before using any functions other than
     * [[connect]], [[login]] and [[disconnect]].
     *
     * @param device One of the devices returned from [[login]].
     */
    public async openDevice(device: string): Promise<void> {
        await this.client.sendRequest(RequestCode.Open, device);
    }

    /**
     * Requests closing the currently opened device.
     *
     * [[openDevice]] can be called again, with the same or different device
     * after calling this function.
     */
    public async closeDevice(): Promise<void> {
        await this.client.sendRequest(RequestCode.CloseDevice);
    }

    /**
     * Requests information about the currently opened device.
     *
     * @returns [[IDeviceInfo]] object containing device characteristics.
     */
    public async getDeviceInfo(): Promise<IDeviceInfo> {
        const info = await this.client.sendRequest(RequestCode.GetDeviceInfo);
        const result: Required<IDeviceInfo> = {
            deviceID: info.data[0],
            serialNumber: info.data[1],
            productName: info.data[2],
            productID: info.data[3],
            deviceInterface: info.data[4],
            usbSpeed: info.data[5],
            deviceMajorVersion: info.data[6],
            deviceMinorVersion: info.data[7],
            hostInterfaceMajorVersion: info.data[8],
            hostInterfaceMinorVersion: info.data[9],
            isPLL22150Supported: info.data[10],
            isPLL22393Supported: info.data[11],
            isFrontPanelEnabled: info.data[12],
            wireWidth: info.data[13],
            triggerWidth: info.data[14],
            pipeWidth: info.data[15],
            registerAddressWidth: info.data[16],
            registerDataWidth: info.data[17],
            flashSystem: {
                sectorCount: info.data[18][0],
                sectorSize: info.data[18][1],
                pageSize: info.data[18][2],
                minUserSector: info.data[18][3],
                maxUserSector: info.data[18][4]
            },
            flashFPGA: {
                sectorCount: info.data[19][0],
                sectorSize: info.data[19][1],
                pageSize: info.data[19][2],
                minUserSector: info.data[19][3],
                maxUserSector: info.data[19][4]
            },
            hasFMCEEPROM: info.data[20],
            hasResetProfiles: info.data[21],
            fpgaVendor: info.data[22],
            interfaceCount: info.data[23],
            interfaceIndex: info.data[24],
            configuresFromSystemFlash: info.data[25],
            hasQuadConfigFlash: info.data[26]
        };
        return result;
    }

    /**
     * Creates an object providing an interface to Device Settings.
     *
     * @returns [[DeviceSettings]] object providing access to Device Settings.
     */
    public getDeviceSettings(): DeviceSettings {
        const deviceSettings = new DeviceSettings(this.client);
        return deviceSettings;
    }

    /**
     * Returns true if FrontPanel-3 is firmware-supported.
     */
    public async isFrontPanel3Supported(): Promise<boolean> {
        const reply = await this.client.sendRequest(
            RequestCode.IsFrontPanel3Supported
        );
        return reply.data;
    }

    /**
     * At the completion of a BTPipeIn transfer, the host polls the
     * hardware to confirm that all of the data has been consumed
     * by the FPGA before returning from the function. The polling
     * interval is set by this method.
     *
     * The valid range for this interval is 1 to 100 milliseconds.
     * Values outside this range throws the error [[Failed]].
     * The default is 25 milliseconds.
     *
     * @param interval Polling interval (in milliseconds).
     */
    public async setBTPipePollingInterval(interval: number): Promise<void> {
        await this.client.sendRequest(RequestCode.SetBTPipePollingInterval, interval);
    }

    /**
     * This method modifies the XEM Device ID string with the new string.
     * The Device ID string is a user-programmable string of up to 32 characters
     * that can be used to uniquely identify a particular XEM. The string will
     * be truncated if it exceeds 32 characters.
     *
     * @param str A string containing the new Device ID.
     */
    public async setDeviceID(str: string): Promise<void> {
        await this.client.sendRequest(RequestCode.SetDeviceID, str);
    }

    /**
     * This method sets the timeout value used by USB transactions when
     * communicating with the target device. Note that this is not necessarily
     * the timeout for a particular API call. By default, the timeout is
     * set to 10 seconds).
     *
     * Note that a timeout is not always provided by the underlying calls nor
     * by the operating system. Most generally, the timeout will apply to
     * pipe transfers and FPGA configuration transfers.
     *
     * @param timeout Timeout duration specified in milliseconds.
     */
    public async setTimeout(timeout: number): Promise<void> {
        await this.client.sendRequest(RequestCode.SetTimeout, timeout);
    }

    /**
     * Returns the length of the last transfer (successful or not).
     */
    public async getLastTransferLength(): Promise<number> {
        const reply = await this.client.sendRequest(
            RequestCode.GetLastTransferLength
        );
        return reply.data;
    }

    /**
     * Performs a RESET of the FPGA internals. This requires that FrontPanel
     * support be present in the FPGA design because the RESET signal actually
     * comes from the FrontPanel Host Interface.
     */
    public async resetFPGA(): Promise<void> {
        await this.client.sendRequest(RequestCode.ResetFPGA);
    }

    /**
     * Configures the device with the given firmware data.
     *
     * @param buf Contains firmware data.
     */
    public async configureFPGA(buf: Uint8Array): Promise<void> {
        // (Re)configuring the devices resets all wire/trigger values.
        this._resetValues();

        await this.client.sendRequest(RequestCode.ConfigureFPGA, buf);
    }

    /**
     * Configures the device with the given firmware data and reset profile.
     *
     * @param buf Contains firmware data.
     * @oaram reset Specifies the reset profile to use.
     */
    public async configureFPGAWithReset(buf: Uint8Array, reset: FPGAResetProfile): Promise<void> {
        // (Re)configuring the devices resets all wire/trigger values.
        this._resetValues();

        const parameters: any[] = FrontPanelCodec.encodeFPGAResetProfile(reset);

        await this.client.sendRequest(RequestCode.ConfigureFPGAWithReset, buf, parameters);
    }

    /**
     * Configures the device with data stored in flash memory.
     *
     * @param configIndex Reserved for future use.
     */
    public async configureFPGAFromFlash(configIndex: number): Promise<void> {
        // (Re)configuring the devices resets all wire/trigger values.
        this._resetValues();

        await this.client.sendRequest(RequestCode.ConfigureFPGAFromFlash, configIndex);
    }

    /**
     * Clears the FPGA configuration.
     */
    public async clearFPGAConfiguration(): Promise<void> {
        await this.client.sendRequest(RequestCode.ClearFPGAConfiguration);
    }

    /**
     * Retrieves the FPGA reset profile.
     * 
     * @param method.
     */
    public async getFPGAResetProfile(method: FPGAConfigurationMethod): Promise<FPGAResetProfile> {
        const reply: IReply = await this.client.sendRequest(RequestCode.GetFPGAResetProfile, method);

        return FrontPanelCodec.decodeFPGAResetProfile(reply.data);
    }

    /**
     * Sets the FPGA reset profile.
     * 
     * @param method.
     */
    public async setFPGAResetProfile(method: FPGAConfigurationMethod, profile: FPGAResetProfile): Promise<void> {
        const parameters: any[] = FrontPanelCodec.encodeFPGAResetProfile(profile);

        await this.client.sendRequest(RequestCode.SetFPGAResetProfile, method, parameters);
    }


    /**
     * Activates a given trigger.
     */
    public async activateTriggerIn(epAddr: number, bit: number): Promise<void> {
        await this.client.sendRequest(RequestCode.ActivateTriggerIn, epAddr, bit);
    }


    /**
     * Reads a string of bytes from the target Flash Memory address.
     *
     * @param addr Flash memory address.
     * @param length Length of data (in bytes).
     */
    public async flashRead(addr: number, length: number): Promise<Uint8Array> {
        const result = await this.client.sendRequest(
            RequestCode.FlashRead,
            addr,
            length
        );
        return result.data;
    }

    /**
     * This method reads a string of bytes from the target I2C address. This
     * transfer does not utilize the FPGA and can be done prior to configuration.
     *
     * The following errors can be thrown:
     * - DeviceNotOpen - Communication with a XEM is not established.
     * - CommunicationError - Communication error with the firmware.
     * - I2CRestrictedAddress - Read from a restricted I2C address.
     * - I2CBitError - I2C bit error occurred.
     * - I2CNack - I2C device responded with NACK.
     * - I2CUnknownStatus - Unknown result status.
     *
     * @param addr I2C address of the target device.
     * @param length Length of data (in bytes).
     */
    public async readI2C(addr: number, length: number): Promise<Uint8Array> {
        const result = await this.client.sendRequest(
            RequestCode.ReadI2C,
            addr,
            length
        );
        return result.data;
    }

    /**
     * Reads data from a BlockPipeOut endpoint.
     */
    public async readFromBlockPipeOut(
        epAddr: number,
        blockSize: number,
        length: number
    ): Promise<Uint8Array> {
        const result = await this.client.sendRequest(
            RequestCode.ReadFromBlockPipeOut,
            epAddr,
            blockSize,
            length
        );
        return result.data;
    }

    /**
     * Reads a block from a Pipe Out endpoint.
     */
    public async readFromPipeOut(
        epAddr: number,
        length: number
    ): Promise<Uint8Array> {
        const result = await this.client.sendRequest(
            RequestCode.ReadFromPipeOut,
            epAddr,
            length
        );
        return result.data;
    }

    /**
     * Gets the value of a particular Wire In from the internal wire data structure.
     */
    public getWireInValue(epAddr: number): number {
        if (epAddr < FIRST_WIREIN_ENDPOINT || epAddr > LAST_WIREIN_ENDPOINT) {
            throw new FrontPanelError(
                ErrorCode.InvalidEndpoint,
                'The wire in endpoint address is out of range'
            );
        }
        return this.wireInValues[epAddr - FIRST_WIREIN_ENDPOINT];
    }

    /**
     * Prepare a script for later execution.
     *
     * This method parses the given Lua code and makes it possible to execute
     * functions defined in it later, see [[runScriptFunction]].
     */
    public async loadScript(
        engine: number,
        name: string,
        code: string
    ): Promise<void> {
        const result = await this.client.sendRequest(
            RequestCode.LoadScript,
            engine,
            name,
            code
        );
        if (result.data !== true) {
            throw new FrontPanelError(ErrorCode.Failed, result.data);
        }
    }

    /**
     * Runs a function defined in a previously loaded script, see [[loadScript]].
     */
    public async runScriptFunction(
        engine: number,
        name: string,
        ...args: any
    ): Promise<any[]> {
        const result = await this.client.sendRequest(
            RequestCode.RunScriptFunction,
            engine,
            name,
            [...args]
        );
        const values = result.data as any[];
        const lastValue = values.pop();
        if (lastValue !== true) {
            throw new FrontPanelError(ErrorCode.Failed, lastValue);
        }
        return values;
    }

    /**
     * Destroys the script engine earlier loaded in [[loadScript]] function.
     */
    public async destroyScriptEngine(engine: number): Promise<void> {
        await this.client.sendRequest(RequestCode.DestroyScriptEngine, engine);
    }

    /**
     * This method checks to see if the FrontPanel Host Interface has been
     * instantiated in the FPGA design. If it is detected, FrontPanel support
     * is enabled and endpoint functionality is available.
     */
    public async isFrontPanelEnabled(): Promise<boolean> {
        const reply = await this.client.sendRequest(RequestCode.IsFrontPanelEnabled);
        return reply.data;
    }

    /**
     * Gets the value of a particular Wire Out from the internal wire data structure.
     */
    public getWireOutValue(epAddr: number): number {
        if (epAddr < FIRST_WIREOUT_ENDPOINT || epAddr > LAST_WIREOUT_ENDPOINT) {
            throw new FrontPanelError(
                ErrorCode.InvalidEndpoint,
                'The wire out endpoint address is out of range'
            );
        }
        return this.wireOutValues[epAddr - FIRST_WIREOUT_ENDPOINT];
    }

    /**
     * Returns true if the trigger has been triggered.
     */
    public isTriggered(epAddr: number, mask: number): boolean {
        if (
            epAddr < FIRST_TRIGGEROUT_ENDPOINT ||
            epAddr > LAST_TRIGGEROUT_ENDPOINT
        ) {
            throw new FrontPanelError(
                ErrorCode.InvalidEndpoint,
                'The trigger out endpoint address is out of range'
            );
        }
        const epIndex = epAddr - FIRST_TRIGGEROUT_ENDPOINT;
        return (this.triggerOutValues[epIndex] & mask) !== 0;
    }

    /**
     * Returns the value of the given trigger.
     */
    public getTriggerOutVector(epAddr: number): number {
        if (
            epAddr < FIRST_TRIGGEROUT_ENDPOINT ||
            epAddr > LAST_TRIGGEROUT_ENDPOINT
        ) {
            throw new FrontPanelError(
                ErrorCode.InvalidEndpoint,
                'The trigger out endpoint address is out of range'
            );
        }
        return this.triggerOutValues[epAddr - FIRST_TRIGGEROUT_ENDPOINT];
    }

    /**
     * Sets a wire value in the internal wire data structure.
     */
    public setWireInValue(epAddr: number, val: number, mask?: number): void {
        if (epAddr < FIRST_WIREIN_ENDPOINT || epAddr > LAST_WIREIN_ENDPOINT) {
            throw new FrontPanelError(
                ErrorCode.InvalidEndpoint,
                'The wire in endpoint address is out of range'
            );
        }
        const epIndex = epAddr - FIRST_WIREIN_ENDPOINT;
        const m = mask === undefined ? 0xffffffff : mask;
        let newValue = this.wireInValues[epIndex] & ~m;
        newValue = newValue | (val & m);
        // Bitwise operations in JS/TS are performed on signed 32bit numbers
        // so convert the result back to the 32 bit unsigned number.
        newValue >>>= 0;
        this.wireInValues[epIndex] = newValue;
    }

    /**
     * Reads Trigger Out endpoints.
     */
    public async updateTriggerOuts(): Promise<void> {
        this.triggerOutValues = await this._updateTriggerOuts();
    }

    /**
     * Transfers current Wire In values to the FPGA.
     */
    public async updateWireIns(): Promise<void> {
        await this.client.sendRequest(RequestCode.UpdateWireIns, this.wireInValues);
    }

    /**
     * Transfers current Wire Out values from the FPGA.
     */
    public async updateWireOuts(): Promise<void> {
        this.wireOutValues = await this._updateWireOuts();
    }

    /**
     * Transfers both trigger and wire outs from the FPGA at once, equivalent
     * to calling [[updateTriggerOuts]] and [[updateWireOuts]] consecutively,
     * but can be more efficient.
     */
    public async updateAllOuts(): Promise<void> {
        const numWireOuts = LAST_WIREOUT_ENDPOINT - FIRST_WIREOUT_ENDPOINT + 1;
        const numTriggerOuts =
            LAST_TRIGGEROUT_ENDPOINT - FIRST_TRIGGEROUT_ENDPOINT + 1;

        const result = await this.client.sendRequest(RequestCode.UpdateAllOuts);
        const values = result.data as number[];
        if (values.length !== numWireOuts + numTriggerOuts) {
            throw new FrontPanelError(
                ErrorCode.Failed,
                'Trigger and wire outs update failed: unexpectedly received ' +
                    `${values.length} values instead of ` +
                    `${numWireOuts + numTriggerOuts} expected ones.`
            );
        }

        this.triggerOutValues = values.splice(0, numTriggerOuts);
        this.wireOutValues = values;
    }

    /**
     * Erases a flash memory sector at the specified address.
     *
     * @param addr Flash memory address.
     */
    public async flashEraseSector(addr: number): Promise<void> {
        await this.client.sendRequest(RequestCode.FlashEraseSector, addr);
    }

    /**
     * Writes a string of bytes to the target Flash memory address.
     *
     * @param addr Flash memory address.
     * @param buf Data to be written.
     */
    public async flashWrite(addr: number, buf: Uint8Array): Promise<void> {
        await this.client.sendRequest(RequestCode.FlashWrite, addr, buf);
    }

    /**
     * This method writes a string of bytes to the target I2C address. This
     * transfer does not utilize the FPGA and can be done prior to configuration.
     *
     * The following errors can be thrown:
     * - DeviceNotOpen - Communication with a XEM is not established.
     * - CommunicationError - Communication error with the firmware.
     * - I2CRestrictedAddress - Write to a restricted I2C address.
     * - I2CBitError - I2C bit error occurred.
     * - I2CNack - I2C device responded with NACK.
     * - I2CUnknownStatus - Unknown result status.
     *
     * @param addr I2C address of the target device.
     * @param buf Data to be written.
     */
    public async writeI2C(addr: number, buf: Uint8Array): Promise<void> {
        await this.client.sendRequest(RequestCode.WriteI2C, addr, buf);
    }

    /**
     * Writes data to a BlockPipeIn endpoint.
     */
    public async writeToBlockPipeIn(
        epAddr: number,
        blockSize: number,
        buf: Uint8Array
    ): Promise<number> {
        const result = await this.client.sendRequest(
            RequestCode.WriteToBlockPipeIn,
            epAddr,
            blockSize,
            buf
        );
        return result.data;
    }

    /**
     * Writes a block to a Pipe In endpoint.
     */
    public async writeToPipeIn(
        epAddr: number,
        buf: Uint8Array
    ): Promise<number> {
        const result = await this.client.sendRequest(
            RequestCode.WriteToPipeIn,
            epAddr,
            buf
        );
        return result.data;
    }

    private async _updateWireOuts(): Promise<number[]> {
        const numWireOuts = LAST_WIREOUT_ENDPOINT - FIRST_WIREOUT_ENDPOINT + 1;

        const result = await this.client.sendRequest(RequestCode.UpdateWireOuts);
        if (result.data.length !== numWireOuts) {
            throw new FrontPanelError(
                ErrorCode.Failed,
                'Wire outs update failed: unexpectedly received ' +
                    `${result.data.length} values instead of ` +
                    `${numWireOuts} expected ones.`
            );
        }
        return result.data;
    }

    private async _updateTriggerOuts(): Promise<number[]> {
        const numTriggerOuts =
            LAST_TRIGGEROUT_ENDPOINT - FIRST_TRIGGEROUT_ENDPOINT + 1;

        const result = await this.client.sendRequest(RequestCode.UpdateTriggerOuts);
        if (result.data.length !== numTriggerOuts) {
            throw new FrontPanelError(
                ErrorCode.Failed,
                'Trigger outs update failed: unexpected received ' +
                    `${result.data.length} values instead of ` +
                    `${numTriggerOuts} expected ones.`
            );
        }
        return result.data;
    }

    private _resetValues() {
        this.wireInValues.fill(0);
        this.wireOutValues.fill(0);
        this.triggerOutValues.fill(0);
    }
}

/**
 * Parameters for FrontPanel constructor.
 */
export interface IConstructParameters {
    /**
     * Mandatory: server to connect to.
     *
     * This string may include the port number.
     */
    server: string;

    /**
     * Optional: specify if self-signed certificates are accepted.
     *
     * Specifying `true` for this parameter can be useful during development
     * and testing.
     */
    allowSelfSigned?: boolean;
}

