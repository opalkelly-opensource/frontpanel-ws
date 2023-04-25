
export type RegisterAddress = number;
export type RegisterValue = number;
export type RegisterEntry = [RegisterAddress, RegisterValue];

export class RegisterEntryList {

    private _registerCount: number;
    private _registerEntries: RegisterEntry[];

    public get capacity() {
        return this._registerCount;
    }

    public get registerEntries() {
        return this._registerEntries.slice(0, this._registerEntries.length);
    }

    constructor(registerCount: number) {
        this._registerCount = registerCount;
        this._registerEntries = [];
    }

    public addEntry(address: RegisterAddress, value: RegisterValue): boolean {

        let retval: boolean;

        if (this._registerEntries.length < this._registerCount) {
            let newEntry: RegisterEntry = [address, value];

            this._registerEntries.push(newEntry);

            retval = true;
        }
        else {
            retval = false;
        }

        return retval;
    }
}
