
export type TriggerEndpointAddress = number;
export type TriggerMask = number;
export type TriggerEntry = [TriggerEndpointAddress, TriggerMask];

export const TRIGGERIN_ENDPOINT_BASEADDRESS = 0x40;
export const TRIGGEROUT_ENDPOINT_BASEADDRESS = 0x60;

export class TriggerEntryList {

    private _baseAddress: TriggerEndpointAddress;
    private _triggerCount: number;
    private _triggerEntries: TriggerEntry[];

    public get baseAddress() {
        return this._baseAddress;
    }

    public get capacity() {
        return this._triggerCount;
    }

    public get triggerEntries() {
        return this._triggerEntries.slice(0, this._triggerEntries.length);
    }

    constructor(baseAddress: TriggerEndpointAddress, triggerCount: number) {
        this._baseAddress = baseAddress;
        this._triggerCount = triggerCount;
        this._triggerEntries = [];
    }

    public addEntry(address: TriggerEndpointAddress, mask: TriggerMask): boolean {

        let retval: boolean;

        if (this._triggerEntries.length < this._triggerCount) {
            if (address >= this._baseAddress) {

                let wireIndex: number = (address - this._baseAddress);

                if (wireIndex < this._triggerCount) {

                    let newEntry: TriggerEntry = [address, mask];

                    this._triggerEntries.push(newEntry);

                    retval = true;
                }
                else {
                    retval = false;     // ERROR: Invalid Address
                }
            }
            else {
                retval = false;     // ERROR: Invalid Address
            }
        }
        else {
            retval = false;     // ERROR: Trigger Entry Capacity Exceeded
        }

        return retval;
    }
}
