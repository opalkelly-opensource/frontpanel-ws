import * as fs from 'fs';
import { expect } from 'chai';
import 'mocha';
import { FPGAConfigurationMethod, FPGAResetProfile } from '../src/lib/fpga-reset-profile';
import { RegisterEntry } from '../src/lib/frontpanel-registers';
import { TriggerEntry } from '../src/lib/frontpanel-triggers';
import { WireValue } from '../src/lib/frontpanel-wires';
import { IFixture, setupFP, teardownFP, getBitfileFullPath, BITFILE_FRONTPANEL_TEST } from './regression';

describe('Reset Profiles', () => {
    let fixture: IFixture;

    let initialNVRAMProfile: FPGAResetProfile;
    let initialJTAGProfile: FPGAResetProfile;

    beforeEach(async () => {
        fixture = await setupFP({});

        // Retrieve the initial Profile.
        initialNVRAMProfile = await fixture.fp.getFPGAResetProfile(FPGAConfigurationMethod.NVRAM);
        initialJTAGProfile = await fixture.fp.getFPGAResetProfile(FPGAConfigurationMethod.JTAG);
    });

    it('Get/Set NVRAM Reset Profile', async function () {
        // Setup Test Reset Profile.
        const testProfile: FPGAResetProfile = new FPGAResetProfile();

        testProfile.magic = FPGAResetProfile.FPGA_RESETPROFILE_MAGIC;
        testProfile.configFileLocation = 0;
        testProfile.configFileLength = 0;

        testProfile.doneWaitUS = 100;
        testProfile.resetWaitUS = 300;
        testProfile.registerWaitUS = 300;

        testProfile.registerEntries.addEntry(0x00, 0x00adfe00)
        testProfile.registerEntries.addEntry(0xfe, 0xfeadfead)
        testProfile.registerEntries.addEntry(0x73, 0xdeaffead)
        testProfile.registerEntries.addEntry(0xff, 0xffeeaadd)

        testProfile.wireInEndpoints.setWire(testProfile.wireInEndpoints.baseAddress + 11, 0xeadfeadf);
        testProfile.wireInEndpoints.setWire(testProfile.wireInEndpoints.baseAddress + 5, 0xeadfeadf);
        testProfile.wireInEndpoints.setWire(testProfile.wireInEndpoints.baseAddress + 0, 0xdeaffead);
        testProfile.wireInEndpoints.setWire(testProfile.wireInEndpoints.baseAddress + 31, 0xffeeaadd);

        testProfile.triggerEntries.addEntry(testProfile.triggerEntries.baseAddress + 31, 0x000000ff);
        testProfile.triggerEntries.addEntry(testProfile.triggerEntries.baseAddress + 11, 0x00ff00ff);
        testProfile.triggerEntries.addEntry(testProfile.triggerEntries.baseAddress + 0, 0xff00ff00);

        // Set the Test Reset Profile.
        await fixture.fp.setFPGAResetProfile(FPGAConfigurationMethod.NVRAM, testProfile);

        // Verify that the Reset Profile was set.
        const profile: FPGAResetProfile = await fixture.fp.getFPGAResetProfile(FPGAConfigurationMethod.NVRAM);

        expect(profile.magic).equals(testProfile.magic);
        expect(profile.configFileLocation).equals(testProfile.configFileLocation);
        expect(profile.configFileLength).equals(testProfile.configFileLength);

        expect(profile.doneWaitUS).equals(testProfile.doneWaitUS);
        expect(profile.resetWaitUS).equals(testProfile.resetWaitUS);
        expect(profile.registerWaitUS).equals(testProfile.registerWaitUS);

        // Verify Register Entries.
        const registerEntries: RegisterEntry[] = profile.registerEntries.registerEntries;
        const testRegisterEntries: RegisterEntry[] = testProfile.registerEntries.registerEntries;

        for (let registerIndex = 0; registerIndex < testRegisterEntries.length; registerIndex++) {
            const registerEntry: RegisterEntry = registerEntries[registerIndex];
            const testRegisterEntry: RegisterEntry = testRegisterEntries[registerIndex];

            expect(registerEntry[0]).equals(testRegisterEntry[0]);
            expect(registerEntry[1]).equals(testRegisterEntry[1]);
        }

        // Verify Wires.
        const wires: WireValue[] = profile.wireInEndpoints.wireValues;
        const testWires: WireValue[] = testProfile.wireInEndpoints.wireValues;

        for (let wireIndex = 0; wireIndex < wires.length; wireIndex++) {
            expect(wires[wireIndex]).equals(testWires[wireIndex]);
        }

        // Verify Trigger Entries.
        const triggerEntries: TriggerEntry[] = profile.triggerEntries.triggerEntries;
        const testTriggerEntries: TriggerEntry[] = testProfile.triggerEntries.triggerEntries;

        for (let triggerIndex = 0; triggerIndex < testTriggerEntries.length; triggerIndex++) {
            const triggerEntry: TriggerEntry = triggerEntries[triggerIndex];
            const testTriggerEntry: TriggerEntry = testTriggerEntries[triggerIndex];

            expect(triggerEntry[0]).equals(testTriggerEntry[0]);
            expect(triggerEntry[1]).equals(testTriggerEntry[1]);
        }
    });

    it('Get/Set JTAG Reset Profile', async function () {
        // Setup Test Reset Profile.
        const testProfile: FPGAResetProfile = new FPGAResetProfile();

        testProfile.magic = FPGAResetProfile.FPGA_RESETPROFILE_MAGIC;
        testProfile.configFileLocation = 0;
        testProfile.configFileLength = 0;

        testProfile.doneWaitUS = 100;
        testProfile.resetWaitUS = 300;
        testProfile.registerWaitUS = 300;

        testProfile.registerEntries.addEntry(0x00, 0x00adfe00)
        testProfile.registerEntries.addEntry(0xfe, 0xfeadfead)
        testProfile.registerEntries.addEntry(0x73, 0xdeaffead)
        testProfile.registerEntries.addEntry(0xff, 0xffeeaadd)

        testProfile.wireInEndpoints.setWire(testProfile.wireInEndpoints.baseAddress + 11, 0xeadfeadf);
        testProfile.wireInEndpoints.setWire(testProfile.wireInEndpoints.baseAddress + 5, 0xeadfeadf);
        testProfile.wireInEndpoints.setWire(testProfile.wireInEndpoints.baseAddress + 0, 0xdeaffead);
        testProfile.wireInEndpoints.setWire(testProfile.wireInEndpoints.baseAddress + 31, 0xffeeaadd);

        testProfile.triggerEntries.addEntry(testProfile.triggerEntries.baseAddress + 31, 0x000000ff);
        testProfile.triggerEntries.addEntry(testProfile.triggerEntries.baseAddress + 11, 0x00ff00ff);
        testProfile.triggerEntries.addEntry(testProfile.triggerEntries.baseAddress + 0, 0xff00ff00);

        // Set the Test Reset Profile.
        await fixture.fp.setFPGAResetProfile(FPGAConfigurationMethod.JTAG, testProfile);

        // Verify that the Reset Profile was set.
        const profile: FPGAResetProfile = await fixture.fp.getFPGAResetProfile(FPGAConfigurationMethod.JTAG);

        expect(profile.magic).equals(testProfile.magic);
        expect(profile.configFileLocation).equals(testProfile.configFileLocation);
        expect(profile.configFileLength).equals(testProfile.configFileLength);

        expect(profile.doneWaitUS).equals(testProfile.doneWaitUS);
        expect(profile.resetWaitUS).equals(testProfile.resetWaitUS);
        expect(profile.registerWaitUS).equals(testProfile.registerWaitUS);

        // Verify Register Entries.
        const registerEntries: RegisterEntry[] = profile.registerEntries.registerEntries;
        const testRegisterEntries: RegisterEntry[] = testProfile.registerEntries.registerEntries;

        for (let registerIndex = 0; registerIndex < testRegisterEntries.length; registerIndex++) {
            const registerEntry: RegisterEntry = registerEntries[registerIndex];
            const testRegisterEntry: RegisterEntry = testRegisterEntries[registerIndex];

            expect(registerEntry[0]).equals(testRegisterEntry[0]);
            expect(registerEntry[1]).equals(testRegisterEntry[1]);
        }

        // Verify Wires.
        const wires: WireValue[] = profile.wireInEndpoints.wireValues;
        const testWires: WireValue[] = testProfile.wireInEndpoints.wireValues;

        for (let wireIndex = 0; wireIndex < wires.length; wireIndex++) {
            expect(wires[wireIndex]).equals(testWires[wireIndex]);
        }

        // Verify Trigger Entries.
        const triggerEntries: TriggerEntry[] = profile.triggerEntries.triggerEntries;
        const testTriggerEntries: TriggerEntry[] = testProfile.triggerEntries.triggerEntries;

        for (let triggerIndex = 0; triggerIndex < testTriggerEntries.length; triggerIndex++) {
            const triggerEntry: TriggerEntry = triggerEntries[triggerIndex];
            const testTriggerEntry: TriggerEntry = testTriggerEntries[triggerIndex];

            expect(triggerEntry[0]).equals(testTriggerEntry[0]);
            expect(triggerEntry[1]).equals(testTriggerEntry[1]);
        }
    });

    afterEach(async () => {

        // Restore the initial Profile
        await fixture.fp.setFPGAResetProfile(FPGAConfigurationMethod.NVRAM, initialNVRAMProfile);
        await fixture.fp.setFPGAResetProfile(FPGAConfigurationMethod.JTAG, initialJTAGProfile);

        await teardownFP(fixture);
    });
});

describe('Configure FPGA with Reset Profile', () => {
    let fixture: IFixture;

    let initialProfile: FPGAResetProfile;

    beforeEach(async () => {
        fixture = await setupFP({});

        // Retrieve the initial Profile.
        initialProfile = await fixture.fp.getFPGAResetProfile(FPGAConfigurationMethod.NVRAM);
    });

    it('Configure FPGA with Reset Profile', async function () {
        // Clear the FPGA Configuration
        fixture.fp.clearFPGAConfiguration();

        expect(await fixture.fp.isFrontPanelEnabled()).to.be.false;

        // Setup Test Reset Profile.
        const testProfile: FPGAResetProfile = new FPGAResetProfile();

        testProfile.magic = FPGAResetProfile.FPGA_RESETPROFILE_MAGIC;
        testProfile.configFileLocation = 0;
        testProfile.configFileLength = 0;

        testProfile.doneWaitUS = 100;
        testProfile.resetWaitUS = 300;
        testProfile.registerWaitUS = 300;

        testProfile.registerEntries.addEntry(0x00, 0x00adfe00)
        testProfile.registerEntries.addEntry(0xfe, 0xfeadfead)
        testProfile.registerEntries.addEntry(0x73, 0xdeaffead)
        testProfile.registerEntries.addEntry(0xff, 0xffeeaadd)

        testProfile.wireInEndpoints.setWire(testProfile.wireInEndpoints.baseAddress + 11, 0xeadfeadf);
        testProfile.wireInEndpoints.setWire(testProfile.wireInEndpoints.baseAddress + 5, 0xeadfeadf);
        testProfile.wireInEndpoints.setWire(testProfile.wireInEndpoints.baseAddress + 0, 0xdeaffead);
        testProfile.wireInEndpoints.setWire(testProfile.wireInEndpoints.baseAddress + 31, 0xffeeaadd);

        testProfile.triggerEntries.addEntry(testProfile.triggerEntries.baseAddress + 31, 0x000000ff);
        testProfile.triggerEntries.addEntry(testProfile.triggerEntries.baseAddress + 11, 0x00ff00ff);
        testProfile.triggerEntries.addEntry(testProfile.triggerEntries.baseAddress + 0, 0xff00ff00);

        // Configure the FPGA with the Test Reset Profile.
        const bitfilePath = getBitfileFullPath(
            BITFILE_FRONTPANEL_TEST,
            fixture.devInfo.productName
        );
        const data = new Uint8Array(fs.readFileSync(bitfilePath));

        fixture.fp.configureFPGAWithReset(data, testProfile);

        expect(await fixture.fp.isFrontPanelEnabled()).to.be.true;

        // Clear the FPGA Configuration
        fixture.fp.clearFPGAConfiguration();

        expect(await fixture.fp.isFrontPanelEnabled()).to.be.false;
    });

    it('Configure FPGA with Reset Profile specifying the config file location', async function () {
        // Clear the FPGA Configuration.
        fixture.fp.clearFPGAConfiguration();

        expect(await fixture.fp.isFrontPanelEnabled()).to.be.false;

        // Load the FPGA Configuration.
        const bitfilePath = getBitfileFullPath(
            BITFILE_FRONTPANEL_TEST,
            fixture.devInfo.productName
        );
        const data = new Uint8Array(fs.readFileSync(bitfilePath));

        // Write the FPGA Configuration to Flash Memory
        const address = fixture.devInfo.flashSystem.minUserSector * fixture.devInfo.flashSystem.sectorSize;

        fixture.fp.flashWrite(address, data);

        // Setup Test Reset Profile.
        const testProfile: FPGAResetProfile = new FPGAResetProfile();

        testProfile.magic = FPGAResetProfile.FPGA_RESETPROFILE_MAGIC;
        testProfile.configFileLocation = address;
        testProfile.configFileLength = data.length;

        testProfile.doneWaitUS = 100;
        testProfile.resetWaitUS = 300;
        testProfile.registerWaitUS = 300;

        testProfile.registerEntries.addEntry(0x00, 0x00adfe00)
        testProfile.registerEntries.addEntry(0xfe, 0xfeadfead)
        testProfile.registerEntries.addEntry(0x73, 0xdeaffead)
        testProfile.registerEntries.addEntry(0xff, 0xffeeaadd)

        testProfile.wireInEndpoints.setWire(testProfile.wireInEndpoints.baseAddress + 11, 0xeadfeadf);
        testProfile.wireInEndpoints.setWire(testProfile.wireInEndpoints.baseAddress + 5, 0xeadfeadf);
        testProfile.wireInEndpoints.setWire(testProfile.wireInEndpoints.baseAddress + 0, 0xdeaffead);
        testProfile.wireInEndpoints.setWire(testProfile.wireInEndpoints.baseAddress + 31, 0xffeeaadd);

        testProfile.triggerEntries.addEntry(testProfile.triggerEntries.baseAddress + 31, 0x000000ff);
        testProfile.triggerEntries.addEntry(testProfile.triggerEntries.baseAddress + 11, 0x00ff00ff);
        testProfile.triggerEntries.addEntry(testProfile.triggerEntries.baseAddress + 0, 0xff00ff00);

        // Configure the FPGA with the Test Reset Profile.
        fixture.fp.setFPGAResetProfile(FPGAConfigurationMethod.NVRAM, testProfile);

        fixture.fp.resetFPGA();

        expect(await fixture.fp.isFrontPanelEnabled()).to.be.true;

        // Clear the FPGA Configuration
        fixture.fp.clearFPGAConfiguration();

        expect(await fixture.fp.isFrontPanelEnabled()).to.be.false;
    });

    afterEach(async () => {

        // Restore the initial Profile
        await fixture.fp.setFPGAResetProfile(FPGAConfigurationMethod.NVRAM, initialProfile);

        await teardownFP(fixture);
    });
});
