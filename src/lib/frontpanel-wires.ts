
export type WireEndpointAddress = number;
export type WireValue = number;
export type WireValueArray = WireValue[];

export const WIREIN_ENDPOINT_BASEADDRESS = 0x00;
export const WIREOUT_ENDPOINT_BASEADDRESS = 0x20;

export class WireEndpointBlock {

    private _baseAddress: WireEndpointAddress;
    private _wireValues: WireValueArray;

    public get baseAddress() {
        return this._baseAddress;
    }

    public get wireValues() {
        return this._wireValues.slice(0, this._wireValues.length)
    }

    constructor(baseAddress: WireEndpointAddress, count: number) {
        this._baseAddress = baseAddress;
        this._wireValues = [];
        this._wireValues.length = count;

        for (let wireIndex = 0; wireIndex < this._wireValues.length; wireIndex++) {
            this._wireValues[wireIndex] = 0x00000000;
        }
    }

    public setWire(address: WireEndpointAddress, value: WireValue): boolean {

        let retval: boolean;

        if (address >= this._baseAddress) {

            let wireIndex: number = (address - this._baseAddress);

            if (wireIndex < this._wireValues.length) {

                this._wireValues[wireIndex] = value;

                retval = true;
            }
            else {
                retval = false;     //ERROR: Invalid Address
            }
        }
        else {
            retval = false;     //ERROR: Invalid Address
        }

        return retval;
    }

    public getWire(address: WireEndpointAddress): WireValue {
        let retval: number;

        if (address >= this._baseAddress) {

            let wireIndex: number = (address - this._baseAddress);

            if (wireIndex < this._wireValues.length) {

                retval = this._wireValues[wireIndex];
            }
            else {
                retval = 0;     //ERROR: Invalid Address
            }
        }
        else {
            retval = 0;     //ERROR: Invalid Address
        }

        return retval;
    }


}
