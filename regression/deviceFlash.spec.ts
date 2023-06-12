import * as fs from 'fs';
import { expect } from 'chai';
import 'mocha';
import { IFixture, setupFP, teardownFP, getBitfileFullPath, BITFILE_FRONTPANEL_TEST } from './regression';

describe('Device Flash Memory', () => {

    let fixture: IFixture;
    beforeEach(async () => {
        fixture = await setupFP({});
    });

    it('flash memory write read and erase one sector', async function () {
        this.timeout(30000);

        const testSector: number = fixture.devInfo.flashSystem.minUserSector;
        const testSectorAddress: number = (testSector * fixture.devInfo.flashSystem.sectorSize);
        const testDataLength: number = fixture.devInfo.flashSystem.sectorSize;

        // Read the initial sector data so that it may be restored later.
        const initialData: Uint8Array = await fixture.fp.flashRead(testSectorAddress, testDataLength);

        // Setup test data.
        const testData: Uint8Array = new Uint8Array(testDataLength);

        for (let byteIndex = 0; byteIndex < testData.length; byteIndex++) {
            testData[byteIndex] = byteIndex % 0xff;
        }

        // Erase the sector and write the test data.
        await fixture.fp.flashEraseSector(testSectorAddress);
        await fixture.fp.flashWrite(testSectorAddress, testData);

        // Verify the test data was written.
        let data: Uint8Array = await fixture.fp.flashRead(testSectorAddress, testDataLength);

        expect(data.length).to.be.equal(testData.length);

        let byteMismatchCount: number = 0;

        for (let byteIndex = 0; byteIndex < data.length; byteIndex++) {
            if (data[byteIndex] !== testData[byteIndex]) {
                byteMismatchCount++;
            }
        }

        expect(byteMismatchCount).to.be.equal(0);

        // Erase the test data.
        await fixture.fp.flashEraseSector(testSectorAddress);
        data = await fixture.fp.flashRead(testSectorAddress, testDataLength);

        // Verify that the test data was erased.
        byteMismatchCount = 0;

        for (let byteIndex = 0; byteIndex < data.length; byteIndex++) {
            if (data[byteIndex] !== 0xff) {
                byteMismatchCount++;
            }
        }

        expect(byteMismatchCount).to.be.equal(0);

        // Restore the initial sector data.
        fixture.fp.flashWrite(testSectorAddress, initialData);
    });

    afterEach(async () => {
        await teardownFP(fixture);
    });
});

describe('Configure FPGA from device Flash Memory', async function () {
    this.timeout(120000);

    let fixture: IFixture;
    beforeEach(async () => {
        fixture = await setupFP({});
    });

    it('Configure FPGA from flash', async function () {
        this.timeout(30000);

        // Clear the FPGA Configuration.
        await fixture.fp.clearFPGAConfiguration();

        expect(await fixture.fp.isFrontPanelEnabled()).to.be.false;

        // Load the FPGA Configuration.
        const bitfilePath = getBitfileFullPath(
            BITFILE_FRONTPANEL_TEST,
            fixture.devInfo.productName
        );

        let bitfileContents: Buffer = fs.readFileSync(bitfilePath);

        // Find the start sequence.
        const searchLength: number = Math.min(1000, bitfileContents.length);

        let startIndex = 0;

        for (let byteIndex = 0; (byteIndex < (searchLength - 4)); byteIndex++) {
            if ((bitfileContents[byteIndex] = 0xff) && (bitfileContents[byteIndex + 1] = 0xff) && (bitfileContents[byteIndex + 2] = 0xff) && (bitfileContents[byteIndex + 3] = 0xff)) {
                startIndex = byteIndex;
                break;
            }
        }

        // Write the FPGA Configuration to Flash Memory
        const configFileData: Uint8Array = bitfileContents.slice(startIndex);

        const paddingByteCount: number = fixture.devInfo.flashSystem.pageSize - (configFileData.length % fixture.devInfo.flashSystem.pageSize);

        const padding = new Uint8Array(paddingByteCount);
        const data = new Uint8Array(configFileData.length + paddingByteCount);

        data.set(configFileData);
        data.set(padding, configFileData.length);

        //const address = fixture.devInfo.flashSystem.minUserSector * fixture.devInfo.flashSystem.sectorSize;

        //await fixture.fp.flashWrite(address, data);

        // Verify that the FPGA was configured successfully.
        await fixture.fp.configureFPGAFromFlash(0);

        expect(await fixture.fp.isFrontPanelEnabled()).to.be.true;

        // Clear the FPGA Configuration
        await fixture.fp.clearFPGAConfiguration();

        expect(await fixture.fp.isFrontPanelEnabled()).to.be.false;
    });

    afterEach(async () => {
        await teardownFP(fixture);
    });
});
