/**
 * The Device Settings.
 */

import { FrontPanelClient, RequestCode } from './frontpanel-client';

export class DeviceSettings {

    private readonly client: FrontPanelClient;

    constructor(client: FrontPanelClient) {
        this.client = client;
    }

    public async getString(name: string): Promise<string> {
        const reply = await this.client.sendRequest(RequestCode.DeviceSettingsGetString, name);
        return reply.data;
    }

    public async getInt(name: string): Promise<number> {
        const reply = await this.client.sendRequest(RequestCode.DeviceSettingsGetInteger, name);
        return reply.data;
    }

    public async setString(name: string, value: string): Promise<void> {
        await this.client.sendRequest(RequestCode.DeviceSettingsSetString, name, value);
    }

    public async setInt(name: string, value: number): Promise<void> {
        await this.client.sendRequest(RequestCode.DeviceSettingsSetInteger, name, value);
    }

    public async list(): Promise<string[]> {
        const reply = await this.client.sendRequest(RequestCode.DeviceSettingsList);
        return reply.data;
    }

    public async delete(name: string): Promise<void> {
        await this.client.sendRequest(RequestCode.DeviceSettingsDelete, name);
    }

    public async save(): Promise<void> {
        await this.client.sendRequest(RequestCode.DeviceSettingsSave);
    }
}
