
export enum ClockSource {
    ClkSrc_Ref = 0,
    ClkSrc_Div1ByN = 1,
    ClkSrc_Div1By2 = 2,
    ClkSrc_Div1By3 = 3,
    ClkSrc_Div2ByN = 4,
    ClkSrc_Div2By2 = 5,
    ClkSrc_Div2By4 = 6
};

export enum DividerSource {
    DivSrc_Ref = 0,
    DivSrc_VCO = 1
};

export class PLL22150Configuration {

    public static readonly OUTPUT_COUNT: number = 6;

    public static readonly MIN_DIVIDER_N_VALUE: number = 4;
    public static readonly MAX_DIVIDER_N_VALUE: number = 127;

    public static readonly MIN_P_VALUE: number = 8;
    public static readonly MAX_P_VALUE: number = 2055;

    public static readonly MIN_Q_VALUE: number = 2;
    public static readonly MAX_Q_VALUE: number = 129;

    private _pllReference: number;
    private _capLoad: number;

    // PLL internal parameters
    private _pllQ!: number;
    private _pllPB!: number;
    private _pllPO!: number;
    private _pllPTotal!: number;

    private _pllClockSource: ClockSource[];
    private _pllDividerSource1: DividerSource;
    private _pllDividerSource2: DividerSource;

    private _pllDivider1N: number;
    private _pllDivider2N: number;

    private _pllEnable: boolean[];
    private _pllExternalOscillatorEnabled: boolean;


    constructor() {
        this._pllReference = 10.0;
        this._capLoad = 22;

        // Set defaults to minimum values.
        this.setVCOParameters(8, 2);

        // Set default dividers.
        this._pllDividerSource1 = DividerSource.DivSrc_VCO;
        this._pllDivider1N = 4;

        this._pllDividerSource2 = DividerSource.DivSrc_VCO;
        this._pllDivider2N = 4;

        // Turn off and disable all outputs.
        this._pllClockSource = [];
        this._pllEnable = [];

        for (let index: number = 0; index < PLL22150Configuration.OUTPUT_COUNT; index++) {
            this._pllClockSource[index] = ClockSource.ClkSrc_Ref;
            this._pllEnable[index] = false;
        }

        this._pllExternalOscillatorEnabled = false;
    }


    public get crystalLoad(): number {
        return this._capLoad;
    }

    public get reference(): number {
        return this._pllReference;
    }

    public get vcoP(): number {
        return this._pllPTotal;
    }

    public get vcoQ(): number {
        return (this._pllQ + 2);
    }

    public get vcoFrequency(): number {
        const frequency = this._pllReference / (this.vcoQ * this._pllPTotal);
        return frequency;
    }

    public get divider1Source(): DividerSource {
        return this._pllDividerSource1;
    }

    public get divider2Source(): DividerSource {
        return this._pllDividerSource2;
    }

    public get divider1(): number {
        return this._pllDivider1N;
    }

    public get divider2(): number {
        return this._pllDivider2N;
    }

    public get isExternalOscillatorEnabled(): boolean {
        return this._pllExternalOscillatorEnabled;
    }


    public getOutputFrequency(output: number): number {
        var frequency: number;

        if ((output < this._pllClockSource.length) && (output >= 0)) {

            const vco = this._pllReference / (this.vcoQ * this._pllPTotal);

            const frequency1 = (this._pllDividerSource1 == DividerSource.DivSrc_Ref) ? this._pllReference : vco;
            const frequency2 = (this._pllDividerSource2 == DividerSource.DivSrc_Ref) ? this._pllReference : vco;


            switch (this._pllClockSource[output]) {
                case ClockSource.ClkSrc_Ref:
                    frequency = this._pllReference;
                    break;
                case ClockSource.ClkSrc_Div1ByN:
                    frequency = frequency1 / this._pllDivider1N;
                    break;
                case ClockSource.ClkSrc_Div1By2:
                    frequency = frequency1 / 2.0;
                    break;
                case ClockSource.ClkSrc_Div1By3:
                    frequency = frequency1 / 3.0;
                    break;
                case ClockSource.ClkSrc_Div2ByN:
                    frequency = frequency2 / this._pllDivider2N;
                    break;
                case ClockSource.ClkSrc_Div2By2:
                    frequency = frequency2 / 2.0;
                    break;
                case ClockSource.ClkSrc_Div2By4:
                    frequency = frequency2 / 4.0;
                    break;
                default:
                    frequency = 0.0;
                    break;
            }
        }
        else {
            frequency = 0.0;
        }

        return frequency;
    }

    public getOutputSource(output: number): ClockSource {
        var source: ClockSource;

        if ((output < this._pllClockSource.length) && (output >= 0)) {
            source = this._pllClockSource[output];
        }
        else {
            source = ClockSource.ClkSrc_Ref;
        }

        return source;
    }

    public isOutputEnabled(output: number): boolean {
        var retval: boolean;

        if ((output < this._pllEnable.length) && (output >= 0)) {
            retval = this._pllEnable[output];
        }
        else {
            retval = false;
        }

        return retval;
    }


    public set crystalLoad(capload: number) {
        this._capLoad = capload;
    }


    public setReference(frequency: number, externalOscillatorEnable: boolean) {
        this._pllReference = frequency;
        this._pllExternalOscillatorEnabled = externalOscillatorEnable;
    }

    public setVCOParameters(p: number, q: number): boolean {
        const retval: boolean = ((p >= PLL22150Configuration.MIN_P_VALUE) &&
            (p <= PLL22150Configuration.MAX_P_VALUE) &&
            (q >= PLL22150Configuration.MIN_Q_VALUE) &&
            (q <= PLL22150Configuration.MAX_Q_VALUE));

        if (retval) {
            this._pllQ = q - 2;
            this._pllPO = p % 2;
            this._pllPB = (p - this._pllPO) / 2 - 4;
            this._pllPTotal = 2 * (this._pllPB + 4) + this._pllPO;
        }

        return retval;
    }

    public setDivider1(source: DividerSource, n: number) {
        if ((n >= PLL22150Configuration.MIN_DIVIDER_N_VALUE) && (n <= PLL22150Configuration.MAX_DIVIDER_N_VALUE)) {
            this._pllDividerSource1 = source;
            this._pllDivider1N = n;
        }
    }

    public setDivider2(source: DividerSource, n: number) {
        if ((n >= PLL22150Configuration.MIN_DIVIDER_N_VALUE) && (n <= PLL22150Configuration.MAX_DIVIDER_N_VALUE)) {
            this._pllDividerSource2 = source;
            this._pllDivider2N = n;
        }
    }

    public setOutputSource(output: number, source: ClockSource) {
        if ((output >= 0) && (output < this._pllClockSource.length)) {
            this._pllClockSource[output] = source;
        }
    }

    public setOutputEnable(output: number, enable: boolean) {
        if ((output >= 0) && (output < this._pllClockSource.length)) {
            this._pllEnable[output] = enable;
        }
    }


    public computeCapLoad() {
        var capload: number = (this._capLoad - 2 - 6) / 0.09375;

        if (capload < 0) {
            capload = 0;
        }
        else if (capload > 255) {
            capload = 255;
        }

        return capload;
    }
}
