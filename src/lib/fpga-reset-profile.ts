
import { WireEndpointBlock, WIREIN_ENDPOINT_BASEADDRESS } from './frontpanel-wires';
import { TriggerEntryList, TRIGGERIN_ENDPOINT_BASEADDRESS } from './frontpanel-triggers';
import { RegisterEntryList } from './frontpanel-registers';

export enum FPGAConfigurationMethod {
    NVRAM = 0,
    JTAG = 1
};

export class FPGAResetProfile {

    public static readonly FPGA_RESETPROFILE_MAGIC: number = 0xBE097C3D;
    public static readonly FPGA_RESETPROFILE_WIRECOUNT: number = 32;
    public static readonly FPGA_RESETPROFILE_TRIGGERCOUNT: number = 32;
    public static readonly FPGA_RESETPROFILE_REGISTERCOUNT: number = 256;

    private _wireInEndpoints: WireEndpointBlock;
    private _registerEntries: RegisterEntryList;
    private _triggerEntries: TriggerEntryList;

    /**
     * Initial values of WireIns.  These are loaded prior to deasserting logic RESET.  (32*4 = 128 bytes)
     */
    public get wireInEndpoints() {
        return this._wireInEndpoints;
    }

    /**
     * Initial register loads.  (256*8 = 2048 bytes)
     */
    public get registerEntries() {
        return this._registerEntries;
    }

    /**
     * Initial trigger assertions.  These are performed last. (32*8 = 256 bytes)
     */
    public get triggerEntries() {
        return this._triggerEntries;
    }

    /**
     * Magic number indicating the profile is valid.  (4 byte = 0xBE097C3D)
     */
    public magic: number;

    /**
     * Location of the configuration file (Flash boot).  (4 bytes)
     */
    public configFileLocation: number;

    /**
     * Length of the configuration file.  (4 bytes)
     */
    public configFileLength: number;

    /**
     * Number of microseconds to wait after DONE goes high before starting the reset profile.  (4 bytes)
     */
    public doneWaitUS: number;

    /**
     * Number of microseconds to wait after wires are updated before deasserting logic RESET.  (4 bytes)
     */
    public resetWaitUS: number;

    /**
     * Number of microseconds to wait after RESET is deasserted before loading registers.  (4 bytes)
     */
    public registerWaitUS: number;

    constructor() {
        this.magic = 0;

        this.configFileLocation = 0;
        this.configFileLength = 0;

        this.doneWaitUS = 0;
        this.resetWaitUS = 0;
        this.registerWaitUS = 0;

        this._wireInEndpoints = new WireEndpointBlock(WIREIN_ENDPOINT_BASEADDRESS, FPGAResetProfile.FPGA_RESETPROFILE_WIRECOUNT);

        this._registerEntries = new RegisterEntryList(FPGAResetProfile.FPGA_RESETPROFILE_REGISTERCOUNT);

        this._triggerEntries = new TriggerEntryList(TRIGGERIN_ENDPOINT_BASEADDRESS, FPGAResetProfile.FPGA_RESETPROFILE_TRIGGERCOUNT);
    }
}
