import { IDeviceSensor } from "./device-sensor";
import { FPGAResetProfile } from "./fpga-reset-profile";
import { RegisterEntryList, RegisterEntry } from "./frontpanel-registers";
import { TriggerEntryList, TriggerEntry } from "./frontpanel-triggers";
import { WireEndpointBlock, WireValue } from "./frontpanel-wires";


export class FrontPanelCodec {
    // Encode Methods
    public static encodeFPGAResetProfile(profile: FPGAResetProfile): any[] {

        const parameters: any[] = [];

        parameters[0] = profile.magic;
        parameters[1] = profile.configFileLocation;
        parameters[2] = profile.configFileLength;
        parameters[3] = profile.doneWaitUS;
        parameters[4] = profile.resetWaitUS;
        parameters[5] = profile.registerWaitUS;
        parameters[6] = this.encodeWireEndpointBlock(profile.wireInEndpoints);
        parameters[7] = profile.registerEntries.registerEntries.length;
        parameters[8] = this.encodeRegisterEntryList(profile.registerEntries);
        parameters[9] = profile.triggerEntries.triggerEntries.length;
        parameters[10] = this.encodeTriggerEntryList(profile.triggerEntries);

        return parameters;
    }

    public static encodeWireEndpointBlock(wires: WireEndpointBlock): any[] {
        const data: any[] = wires.wireValues;
        return data;
    }

    public static encodeRegisterEntryList(entries: RegisterEntryList): any[] {
        const data: any[] = entries.registerEntries;

        for (let entryIndex = data.length; entryIndex < entries.capacity; entryIndex++) {
            let newEntry: RegisterEntry = [0x00, 0x00];
            data[entryIndex] = newEntry;
        }

        return data;
    }

    public static encodeTriggerEntryList(entries: TriggerEntryList): any[] {
        const data: any[] = entries.triggerEntries;

        for (let entryIndex = data.length; entryIndex < entries.capacity; entryIndex++) {
            let newEntry: TriggerEntry = [0x00, 0x00];
            data[entryIndex] = newEntry;
        }

        return data;
    }

    // Decode Methods
    public static decodeFPGAResetProfile(data: any[]): FPGAResetProfile {

        const profile: FPGAResetProfile = new FPGAResetProfile();

        profile.magic = data[0];
        profile.configFileLocation = data[1];
        profile.configFileLength = data[2];

        profile.doneWaitUS = data[3];
        profile.resetWaitUS = data[4];
        profile.registerWaitUS = data[5];

        // Set the WireIn Endpoints
        const wires: WireValue[] = data[6];

        for (let wireIndex = 0; wireIndex < wires.length; wireIndex++) {
            profile.wireInEndpoints.setWire(profile.wireInEndpoints.baseAddress + wireIndex, wires[wireIndex]);
        }

        // Set the Register
        const registerCount = data[7];
        const registers: RegisterEntry[] = data[8];

        for (let registerIndex = 0; registerIndex < registerCount; registerIndex++) {
            let entry: RegisterEntry = registers[registerIndex];
            profile.registerEntries.addEntry(entry[0], entry[1]);
        }

        // Set the TrigerIn Endpoints
        const triggerCount = data[9];
        const triggers: TriggerEntry[] = data[10];

        for (let triggerIndex = 0; triggerIndex < triggerCount; triggerIndex++) {
            let entry: TriggerEntry = triggers[triggerIndex];
            profile.triggerEntries.addEntry(entry[0], entry[1]);
        }

        return profile;
    }

    public static decodeDeviceSensors(data: any[]): IDeviceSensor[] {

        const sensors: Required<IDeviceSensor>[] = [];

        for (let sensorIndex = 0; sensorIndex < data.length; sensorIndex++) {
            const sensorData: any[] = data[sensorIndex];
            sensors[sensorIndex] = {
                id: sensorData[0],
                type: sensorData[1],
                name: sensorData[2],
                description: sensorData[3],
                min: sensorData[4],
                max: sensorData[5],
                step: sensorData[6],
                value: sensorData[7]
            }
        }

        return sensors;
    }
}
