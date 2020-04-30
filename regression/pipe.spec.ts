import * as chai from 'chai';
import * as chaiAsPromised from 'chai-as-promised';
import 'mocha';
import {
    BITFILE_FRONTPANEL_TEST,
    BITFILE_NOHOST,
    IFixture,
    setupFP,
    skip,
    teardownFP
} from './regression';
import { DeviceInterface, ErrorCode } from '../src/FrontPanelAPI';

chai.use(chaiAsPromised);
const expect = chai.expect;

const USB3_MIN_BLOCK_SIZE = 16;
const USB3_MAX_BLOCK_SIZE = 1024;
const USB3_MAX_TRANSFER_SIZE = 16777200;
const USB3_MAX_MAXBLOCK_TRANSFER_SIZE =
    USB3_MAX_TRANSFER_SIZE - (USB3_MAX_TRANSFER_SIZE % USB3_MAX_BLOCK_SIZE);
const USB3_LARGE_TRANSFER_SIZE = 20971520;

function checkData32(valid: Uint8Array): number {
    let errors = 0;
    for (let count = 1, i = 0; i < valid.length; i = i + 4) {
        if (
            count !=
            ((valid[i + 3] << 24) |
                (valid[i + 2] << 16) |
                (valid[i + 1] << 8) |
                valid[i]) >>>
                0
        ) {
            errors++;
        }
        count = ((count + 5) & 0xffffffff) >>> 0;
    }
    return errors;
}

function generateData32(length: number): Uint8Array {
    const data = new Uint8Array(length);
    for (let count = 1, i = 0; i < length; i = i + 4) {
        data[i] = count & 0xff;
        data[i + 1] = (count >> 8) & 0xff;
        data[i + 2] = (count >> 16) & 0xff;
        data[i + 3] = (count >> 24) & 0xff;
        count = ((count + 5) & 0xffffffff) >>> 0;
    }
    return data;
}

describe('Pipes', () => {
    let fixture: IFixture;

    // Regular Pipes

    // Endpoint Bounds
    it('readFromPipeOut returns appropriately for out-of-bounds endpoint (no host)', async function() {
        fixture = await setupFP({
            bitfile: BITFILE_NOHOST,
            setupFPNoHost: true
        });

        if (
            fixture.devInfo.deviceInterface !== DeviceInterface.INTERFACE_USB3
        ) {
            return await skip(fixture, this);
        }

        await expect(
            fixture.fp.readFromPipeOut(0x80, 32)
        ).to.eventually.be.rejected.and.has.property(
            'code',
            ErrorCode.InvalidEndpoint
        );
        await expect(
            fixture.fp.readFromPipeOut(0xa0, 32)
        ).to.eventually.be.rejected.and.has.property(
            'code',
            ErrorCode.UnsupportedFeature
        );
        await expect(
            fixture.fp.readFromPipeOut(0xbf, 32)
        ).to.eventually.be.rejected.and.has.property(
            'code',
            ErrorCode.UnsupportedFeature
        );
    });

    it('writeToPipeIn returns appropriately for out-of-bounds endpoint (no host)', async function() {
        fixture = await setupFP({
            bitfile: BITFILE_NOHOST,
            setupFPNoHost: true
        });

        if (
            fixture.devInfo.deviceInterface !== DeviceInterface.INTERFACE_USB3
        ) {
            return await skip(fixture, this);
        }

        const data = new Uint8Array(1024);
        await expect(
            fixture.fp.writeToPipeIn(0xa0, data.subarray(0, 32))
        ).to.eventually.be.rejected.and.has.property(
            'code',
            ErrorCode.InvalidEndpoint
        );
        await expect(
            fixture.fp.writeToPipeIn(0x80, data.subarray(0, 32))
        ).to.eventually.be.rejected.and.has.property(
            'code',
            ErrorCode.UnsupportedFeature
        );
        await expect(
            fixture.fp.writeToPipeIn(0x9f, data.subarray(0, 32))
        ).to.eventually.be.rejected.and.has.property(
            'code',
            ErrorCode.UnsupportedFeature
        );
    });

    it('readFromPipeOut returns appropriately for out-of-bounds endpoint (host)', async function() {
        fixture = await setupFP({ bitfile: BITFILE_FRONTPANEL_TEST });

        if (
            fixture.devInfo.deviceInterface !== DeviceInterface.INTERFACE_USB3
        ) {
            return await skip(fixture, this);
        }

        await expect(
            fixture.fp.readFromPipeOut(0x80, 2)
        ).to.eventually.be.rejected.and.has.property(
            'code',
            ErrorCode.InvalidEndpoint
        );
        await expect(
            fixture.fp.readFromPipeOut(0xbf, 32)
        ).to.eventually.has.lengthOf(32);
    });

    it('writeToPipeIn returns appropriately for out-of-bounds endpoint (host)', async function() {
        fixture = await setupFP({ bitfile: BITFILE_FRONTPANEL_TEST });

        if (
            fixture.devInfo.deviceInterface !== DeviceInterface.INTERFACE_USB3
        ) {
            return await skip(fixture, this);
        }

        const data = new Uint8Array(1024);
        await expect(
            fixture.fp.writeToPipeIn(0xa0, data.subarray(0, 32))
        ).to.eventually.be.rejected.and.has.property(
            'code',
            ErrorCode.InvalidEndpoint
        );
        await expect(
            fixture.fp.writeToPipeIn(0x9f, data.subarray(0, 32))
        ).to.eventually.be.equal(32);
    });

    // Length Bounds
    it('readFromPipeOut returns appropriately for length bounds (no host)', async function() {
        fixture = await setupFP({
            bitfile: BITFILE_NOHOST,
            setupFPNoHost: true
        });

        if (
            fixture.devInfo.deviceInterface !== DeviceInterface.INTERFACE_USB3
        ) {
            return await skip(fixture, this);
        }

        await expect(
            fixture.fp.readFromPipeOut(0xbf, 0)
        ).to.eventually.has.lengthOf(0);

        await expect(
            fixture.fp.readFromPipeOut(0xbf, 3)
        ).to.eventually.be.rejected.and.has.property(
            'code',
            ErrorCode.UnsupportedFeature
        );
        await expect(
            fixture.fp.readFromPipeOut(0xbf, 4)
        ).to.eventually.be.rejected.and.has.property(
            'code',
            ErrorCode.UnsupportedFeature
        );
        await expect(
            fixture.fp.readFromPipeOut(0xbf, 32)
        ).to.eventually.be.rejected.and.has.property(
            'code',
            ErrorCode.UnsupportedFeature
        );
        await expect(
            fixture.fp.readFromPipeOut(0xbf, 33)
        ).to.eventually.be.rejected.and.has.property(
            'code',
            ErrorCode.UnsupportedFeature
        );
        await expect(
            fixture.fp.readFromPipeOut(0xbf, 16777212)
        ).to.eventually.be.rejected.and.has.property(
            'code',
            ErrorCode.UnsupportedFeature
        );
        await expect(
            fixture.fp.readFromPipeOut(0xbf, 16777213)
        ).to.eventually.be.rejected.and.has.property(
            'code',
            ErrorCode.UnsupportedFeature
        );
    });

    it('writeToPipeIn returns appropriately for length bounds (no host)', async function() {
        fixture = await setupFP({
            bitfile: BITFILE_NOHOST,
            setupFPNoHost: true
        });

        if (
            fixture.devInfo.deviceInterface !== DeviceInterface.INTERFACE_USB3
        ) {
            return await skip(fixture, this);
        }

        const data = new Uint8Array(USB3_MAX_TRANSFER_SIZE);
        await expect(
            fixture.fp.writeToPipeIn(0x9f, data.subarray(0, 0))
        ).to.eventually.be.equal(0);

        await expect(
            fixture.fp.writeToPipeIn(0x9f, data.subarray(0, 3))
        ).to.eventually.be.rejected.and.has.property(
            'code',
            ErrorCode.UnsupportedFeature
        );
        await expect(
            fixture.fp.writeToPipeIn(0x9f, data.subarray(0, 4))
        ).to.eventually.be.rejected.and.has.property(
            'code',
            ErrorCode.UnsupportedFeature
        );
        await expect(
            fixture.fp.writeToPipeIn(0x9f, data.subarray(0, 32))
        ).to.eventually.be.rejected.and.has.property(
            'code',
            ErrorCode.UnsupportedFeature
        );
        await expect(
            fixture.fp.writeToPipeIn(0x9f, data.subarray(0, 33))
        ).to.eventually.be.rejected.and.has.property(
            'code',
            ErrorCode.UnsupportedFeature
        );
        await expect(
            fixture.fp.writeToPipeIn(0x9f, data.subarray(0, 16777212))
        ).to.eventually.be.rejected.and.has.property(
            'code',
            ErrorCode.UnsupportedFeature
        );
        await expect(
            fixture.fp.writeToPipeIn(0x9f, data.subarray(0, 16777213))
        ).to.eventually.be.rejected.and.has.property(
            'code',
            ErrorCode.UnsupportedFeature
        );
    });

    it('readFromPipeOut returns appropriately for length bounds (with host)', async function() {
        fixture = await setupFP({ bitfile: BITFILE_FRONTPANEL_TEST });

        if (
            fixture.devInfo.deviceInterface !== DeviceInterface.INTERFACE_USB3
        ) {
            return await skip(fixture, this);
        }

        await expect(
            fixture.fp.readFromPipeOut(0xbf, 0)
        ).to.eventually.has.lengthOf(0);

        await expect(
            fixture.fp.readFromPipeOut(0xbf, 3)
        ).to.eventually.be.rejected.and.has.property(
            'code',
            ErrorCode.UnsupportedFeature
        );
        await expect(
            fixture.fp.readFromPipeOut(0xbf, 8)
        ).to.eventually.be.rejected.and.has.property(
            'code',
            ErrorCode.UnsupportedFeature
        );
        await expect(
            fixture.fp.readFromPipeOut(0xbf, USB3_MIN_BLOCK_SIZE)
        ).to.eventually.has.lengthOf(USB3_MIN_BLOCK_SIZE);
        await expect(
            fixture.fp.readFromPipeOut(0xbf, USB3_MIN_BLOCK_SIZE * 2)
        ).to.eventually.has.lengthOf(USB3_MIN_BLOCK_SIZE * 2);
        await expect(
            fixture.fp.readFromPipeOut(0xbf, 33)
        ).to.eventually.be.rejected.and.has.property(
            'code',
            ErrorCode.UnsupportedFeature
        );
        await expect(
            fixture.fp.readFromPipeOut(0xbf, USB3_MAX_TRANSFER_SIZE)
        ).to.eventually.has.lengthOf(USB3_MAX_TRANSFER_SIZE);
        await expect(
            fixture.fp.readFromPipeOut(0xbf, USB3_MAX_TRANSFER_SIZE + 8)
        ).to.eventually.be.rejected.and.has.property(
            'code',
            ErrorCode.UnsupportedFeature
        );
        await expect(
            fixture.fp.readFromPipeOut(0xbf, USB3_MAX_TRANSFER_SIZE + 12)
        ).to.eventually.be.rejected.and.has.property(
            'code',
            ErrorCode.UnsupportedFeature
        );
        await expect(
            fixture.fp.readFromPipeOut(0xbf, USB3_MAX_TRANSFER_SIZE + 13)
        ).to.eventually.be.rejected.and.has.property(
            'code',
            ErrorCode.UnsupportedFeature
        );
        await expect(
            fixture.fp.readFromPipeOut(0xbf, USB3_MAX_TRANSFER_SIZE + 16)
        ).to.eventually.has.lengthOf(USB3_MAX_TRANSFER_SIZE + 16);
        await expect(
            fixture.fp.readFromPipeOut(0xbf, USB3_LARGE_TRANSFER_SIZE)
        ).to.eventually.has.lengthOf(USB3_LARGE_TRANSFER_SIZE);
        await expect(
            fixture.fp.readFromPipeOut(0xbf, USB3_LARGE_TRANSFER_SIZE - 256)
        ).to.eventually.has.lengthOf(USB3_LARGE_TRANSFER_SIZE - 256);
    });

    it('writeToPipeIn returns appropriately for length bounds (with host)', async function() {
        fixture = await setupFP({ bitfile: BITFILE_FRONTPANEL_TEST });

        if (
            fixture.devInfo.deviceInterface !== DeviceInterface.INTERFACE_USB3
        ) {
            return await skip(fixture, this);
        }

        const data = new Uint8Array(USB3_LARGE_TRANSFER_SIZE);
        await expect(
            fixture.fp.writeToPipeIn(0x9f, data.subarray(0, 0))
        ).to.eventually.be.equal(0);

        await expect(
            fixture.fp.writeToPipeIn(0x9f, data.subarray(0, 3))
        ).to.eventually.be.rejected.and.has.property(
            'code',
            ErrorCode.UnsupportedFeature
        );
        await expect(
            fixture.fp.writeToPipeIn(0x9f, data.subarray(0, 4))
        ).to.eventually.be.rejected.and.has.property(
            'code',
            ErrorCode.UnsupportedFeature
        );
        await expect(
            fixture.fp.writeToPipeIn(0x9f, data.subarray(0, 8))
        ).to.eventually.be.rejected.and.has.property(
            'code',
            ErrorCode.UnsupportedFeature
        );
        await expect(
            fixture.fp.writeToPipeIn(
                0x9f,
                data.subarray(0, USB3_MIN_BLOCK_SIZE)
            )
        ).to.eventually.be.equal(USB3_MIN_BLOCK_SIZE);
        await expect(
            fixture.fp.writeToPipeIn(
                0x9f,
                data.subarray(0, USB3_MIN_BLOCK_SIZE * 2)
            )
        ).to.eventually.be.equal(USB3_MIN_BLOCK_SIZE * 2);
        await expect(
            fixture.fp.writeToPipeIn(0x9f, data.subarray(0, 33))
        ).to.eventually.be.rejected.and.has.property(
            'code',
            ErrorCode.UnsupportedFeature
        );
        await expect(
            fixture.fp.writeToPipeIn(
                0x9f,
                data.subarray(0, USB3_MAX_TRANSFER_SIZE)
            )
        ).to.eventually.be.equal(USB3_MAX_TRANSFER_SIZE);
        await expect(
            fixture.fp.writeToPipeIn(
                0x9f,
                data.subarray(0, USB3_MAX_TRANSFER_SIZE + 8)
            )
        ).to.eventually.be.rejected.and.has.property(
            'code',
            ErrorCode.UnsupportedFeature
        );
        await expect(
            fixture.fp.writeToPipeIn(
                0x9f,
                data.subarray(0, USB3_MAX_TRANSFER_SIZE + 12)
            )
        ).to.eventually.be.rejected.and.has.property(
            'code',
            ErrorCode.UnsupportedFeature
        );
        await expect(
            fixture.fp.writeToPipeIn(
                0x9f,
                data.subarray(0, USB3_MAX_TRANSFER_SIZE + 13)
            )
        ).to.eventually.be.rejected.and.has.property(
            'code',
            ErrorCode.UnsupportedFeature
        );
        await expect(
            fixture.fp.writeToPipeIn(
                0x9f,
                data.subarray(0, USB3_MAX_TRANSFER_SIZE + 16)
            )
        ).to.eventually.be.equal(USB3_MAX_TRANSFER_SIZE + 16);
        await expect(
            fixture.fp.writeToPipeIn(
                0x9f,
                data.subarray(0, USB3_LARGE_TRANSFER_SIZE)
            )
        ).to.eventually.be.equal(USB3_LARGE_TRANSFER_SIZE);
        await expect(
            fixture.fp.writeToPipeIn(
                0x9f,
                data.subarray(0, USB3_LARGE_TRANSFER_SIZE - 256)
            )
        ).to.eventually.be.equal(USB3_LARGE_TRANSFER_SIZE - 256);
    });

    // Data Integrity Testing
    it('readFromPipeOut maintains data integrity', async function() {
        fixture = await setupFP({ bitfile: BITFILE_FRONTPANEL_TEST });

        if (
            fixture.devInfo.deviceInterface !== DeviceInterface.INTERFACE_USB3
        ) {
            return await skip(fixture, this);
        }

        let data: Uint8Array;

        //Set Throttle Values
        fixture.fp.setWireInValue(0x10, 0xffffffff);
        fixture.fp.setWireInValue(0x11, 0xffffffff);
        await fixture.fp.updateWireIns();
        // Reset and Latch Throttles
        fixture.fp.setWireInValue(0x00, 0x00000001);
        await fixture.fp.updateWireIns();
        fixture.fp.setWireInValue(0x00, 0x00000000);
        await fixture.fp.updateWireIns();

        data = await fixture.fp.readFromPipeOut(0xbf, USB3_MIN_BLOCK_SIZE);
        expect(data).to.has.lengthOf(USB3_MIN_BLOCK_SIZE);
        expect(checkData32(data)).to.be.equal(0);

        // Reset and Latch Throttles
        fixture.fp.setWireInValue(0x00, 0x00000001);
        await fixture.fp.updateWireIns();
        fixture.fp.setWireInValue(0x00, 0x00000000);
        await fixture.fp.updateWireIns();

        data = await fixture.fp.readFromPipeOut(0xbf, 1024);
        expect(data).to.has.lengthOf(1024);
        expect(checkData32(data)).to.be.equal(0);

        // Reset and Latch Throttles
        fixture.fp.setWireInValue(0x00, 0x00000001);
        await fixture.fp.updateWireIns();
        fixture.fp.setWireInValue(0x00, 0x00000000);
        await fixture.fp.updateWireIns();

        data = await fixture.fp.readFromPipeOut(0xbf, USB3_MAX_TRANSFER_SIZE);
        expect(data).to.has.lengthOf(USB3_MAX_TRANSFER_SIZE);
        expect(checkData32(data)).to.be.equal(0);

        // Reset and Latch Throttles
        fixture.fp.setWireInValue(0x00, 0x00000001);
        await fixture.fp.updateWireIns();
        fixture.fp.setWireInValue(0x00, 0x00000000);
        await fixture.fp.updateWireIns();

        data = await fixture.fp.readFromPipeOut(0xbf, USB3_LARGE_TRANSFER_SIZE);
        expect(data).to.has.lengthOf(USB3_LARGE_TRANSFER_SIZE);
        expect(checkData32(data)).to.be.equal(0);

        // Reset and Latch Throttles
        fixture.fp.setWireInValue(0x00, 0x00000001);
        await fixture.fp.updateWireIns();
        fixture.fp.setWireInValue(0x00, 0x00000000);
        await fixture.fp.updateWireIns();

        data = await fixture.fp.readFromPipeOut(
            0xbf,
            USB3_LARGE_TRANSFER_SIZE - 256
        );
        expect(data).to.has.lengthOf(USB3_LARGE_TRANSFER_SIZE - 256);
        expect(checkData32(data)).to.be.equal(0);
    });

    it('writeToPipeIn maintains data integrity', async function() {
        fixture = await setupFP({ bitfile: BITFILE_FRONTPANEL_TEST });

        if (
            fixture.devInfo.deviceInterface !== DeviceInterface.INTERFACE_USB3
        ) {
            return await skip(fixture, this);
        }

        //Initialize data
        const data = generateData32(USB3_LARGE_TRANSFER_SIZE);

        //Set Throttle Values
        fixture.fp.setWireInValue(0x10, 0xffffffff);
        fixture.fp.setWireInValue(0x11, 0xffffffff);
        await fixture.fp.updateWireIns();
        // Reset and Latch Throttles
        fixture.fp.setWireInValue(0x00, 0x00000001);
        await fixture.fp.updateWireIns();
        fixture.fp.setWireInValue(0x00, 0x00000000);
        await fixture.fp.updateWireIns();

        await expect(
            fixture.fp.writeToPipeIn(
                0x9f,
                data.subarray(0, USB3_MIN_BLOCK_SIZE)
            )
        ).to.eventually.be.equal(USB3_MIN_BLOCK_SIZE);
        await fixture.fp.updateWireOuts();
        expect(fixture.fp.getWireOutValue(0x3b)).to.be.equal(0);

        // Reset and Latch Throttles
        fixture.fp.setWireInValue(0x00, 0x00000001);
        await fixture.fp.updateWireIns();
        fixture.fp.setWireInValue(0x00, 0x00000000);
        await fixture.fp.updateWireIns();

        await expect(
            fixture.fp.writeToPipeIn(0x9f, data.subarray(0, 1024))
        ).to.eventually.be.equal(1024);
        await fixture.fp.updateWireOuts();
        expect(fixture.fp.getWireOutValue(0x3b)).to.be.equal(0);

        // Reset and Latch Throttles
        fixture.fp.setWireInValue(0x00, 0x00000001);
        await fixture.fp.updateWireIns();
        fixture.fp.setWireInValue(0x00, 0x00000000);
        await fixture.fp.updateWireIns();

        await expect(
            fixture.fp.writeToPipeIn(
                0x9f,
                data.subarray(0, USB3_MAX_TRANSFER_SIZE)
            )
        ).to.eventually.be.equal(USB3_MAX_TRANSFER_SIZE);
        await fixture.fp.updateWireOuts();
        expect(fixture.fp.getWireOutValue(0x3b)).to.be.equal(0);

        // Reset and Latch Throttles
        fixture.fp.setWireInValue(0x00, 0x00000001);
        await fixture.fp.updateWireIns();
        fixture.fp.setWireInValue(0x00, 0x00000000);
        await fixture.fp.updateWireIns();

        await expect(
            fixture.fp.writeToPipeIn(
                0x9f,
                data.subarray(0, USB3_LARGE_TRANSFER_SIZE)
            )
        ).to.eventually.be.equal(USB3_LARGE_TRANSFER_SIZE);
        await fixture.fp.updateWireOuts();
        expect(fixture.fp.getWireOutValue(0x3b)).to.be.equal(0);

        // Reset and Latch Throttles
        fixture.fp.setWireInValue(0x00, 0x00000001);
        await fixture.fp.updateWireIns();
        fixture.fp.setWireInValue(0x00, 0x00000000);
        await fixture.fp.updateWireIns();

        await expect(
            fixture.fp.writeToPipeIn(
                0x9f,
                data.subarray(0, USB3_LARGE_TRANSFER_SIZE - 256)
            )
        ).to.eventually.be.equal(USB3_LARGE_TRANSFER_SIZE - 256);
        await fixture.fp.updateWireOuts();
        expect(fixture.fp.getWireOutValue(0x3b)).to.be.equal(0);
    });

    // Block  Pipes

    // Endpoint Bounds
    it('readFromBlockPipeOut returns appropriately for out-of-bounds endpoint (no host)', async function() {
        fixture = await setupFP({
            bitfile: BITFILE_NOHOST,
            setupFPNoHost: true
        });

        if (
            fixture.devInfo.deviceInterface !== DeviceInterface.INTERFACE_USB3
        ) {
            return await skip(fixture, this);
        }

        await expect(
            fixture.fp.readFromBlockPipeOut(0x80, USB3_MIN_BLOCK_SIZE, 0)
        ).to.eventually.be.rejected.and.has.property(
            'code',
            ErrorCode.InvalidEndpoint
        );
        await expect(
            fixture.fp.readFromBlockPipeOut(0xa0, USB3_MIN_BLOCK_SIZE, 32)
        ).to.eventually.be.rejected.and.has.property(
            'code',
            ErrorCode.UnsupportedFeature
        );
    });

    it('writeToBlockPipeIn returns appropriately for out-of-bounds endpoint (no host)', async function() {
        fixture = await setupFP({
            bitfile: BITFILE_NOHOST,
            setupFPNoHost: true
        });

        if (
            fixture.devInfo.deviceInterface !== DeviceInterface.INTERFACE_USB3
        ) {
            return await skip(fixture, this);
        }

        const data = new Uint8Array(1024);
        await expect(
            fixture.fp.writeToBlockPipeIn(
                0xa0,
                USB3_MIN_BLOCK_SIZE,
                data.subarray(0, 0)
            )
        ).to.eventually.be.rejected.and.has.property(
            'code',
            ErrorCode.InvalidEndpoint
        );
        await expect(
            fixture.fp.writeToBlockPipeIn(
                0x80,
                USB3_MIN_BLOCK_SIZE,
                data.subarray(0, 32)
            )
        ).to.eventually.be.rejected.and.has.property(
            'code',
            ErrorCode.UnsupportedFeature
        );
    });

    it('readFromBlockPipeOut returns appropriately for out-of-bounds endpoint (with host)', async function() {
        fixture = await setupFP({ bitfile: BITFILE_FRONTPANEL_TEST });

        if (
            fixture.devInfo.deviceInterface !== DeviceInterface.INTERFACE_USB3
        ) {
            return await skip(fixture, this);
        }

        // If pipetest is not configured properly in test: readFromBlockPipeOut returns appropriately for length bounds (with host)
        // await expect(fixture.fp.readFromBlockPipeOut(0xA0, 8, 32)).to.eventually.has.lengthOf(32                                );
        // will fail (-1) and subsequent tests will fail and FPGA will be unable to be reconfigured.
        //Set Throttle Values
        fixture.fp.setWireInValue(0x10, 0xffffffff);
        fixture.fp.setWireInValue(0x11, 0xffffffff);
        await fixture.fp.updateWireIns();
        // Reset and Latch Throttles
        fixture.fp.setWireInValue(0x00, 0x00000001);
        await fixture.fp.updateWireIns();
        fixture.fp.setWireInValue(0x00, 0x00000000);
        await fixture.fp.updateWireIns();

        await expect(
            fixture.fp.readFromBlockPipeOut(0x80, USB3_MIN_BLOCK_SIZE, 0)
        ).to.eventually.be.rejected.and.has.property(
            'code',
            ErrorCode.InvalidEndpoint
        );
        await expect(
            fixture.fp.readFromBlockPipeOut(0xa0, USB3_MIN_BLOCK_SIZE, 32)
        ).to.eventually.has.lengthOf(32);
    });

    it('writeToBlockPipeIn returns appropriately for out-of-bounds endpoint (with host)', async function() {
        fixture = await setupFP({ bitfile: BITFILE_FRONTPANEL_TEST });

        if (
            fixture.devInfo.deviceInterface !== DeviceInterface.INTERFACE_USB3
        ) {
            return await skip(fixture, this);
        }

        const data = new Uint8Array(1024);
        await expect(
            fixture.fp.writeToBlockPipeIn(
                0xa0,
                USB3_MIN_BLOCK_SIZE,
                data.subarray(0, 0)
            )
        ).to.eventually.be.rejected.and.has.property(
            'code',
            ErrorCode.InvalidEndpoint
        );
        await expect(
            fixture.fp.writeToBlockPipeIn(
                0x80,
                USB3_MIN_BLOCK_SIZE,
                data.subarray(0, 32)
            )
        ).to.eventually.be.equal(32);
    });

    // Length Bounds
    // USB 2.0: Multiple of 2  [ 2 .. 16777214].
    // USB 3.0: Multiple of 16 [16 .. 16777200].
    // PCIe:    Multiple of 8  [ 8 .. 16777208].
    it('readFromBlockPipeOut returns appropriately for length bounds (no host)', async function() {
        fixture = await setupFP({
            bitfile: BITFILE_NOHOST,
            setupFPNoHost: true
        });

        if (
            fixture.devInfo.deviceInterface !== DeviceInterface.INTERFACE_USB3
        ) {
            return await skip(fixture, this);
        }

        await expect(
            fixture.fp.readFromBlockPipeOut(0xa0, USB3_MIN_BLOCK_SIZE, 0)
        ).to.eventually.has.lengthOf(0);

        await expect(
            fixture.fp.readFromBlockPipeOut(0xa0, USB3_MIN_BLOCK_SIZE, 7)
        ).to.eventually.be.rejected.and.has.property(
            'code',
            ErrorCode.UnsupportedFeature
        );
        await expect(
            fixture.fp.readFromBlockPipeOut(0xa0, USB3_MIN_BLOCK_SIZE, 8)
        ).to.eventually.be.rejected.and.has.property(
            'code',
            ErrorCode.UnsupportedFeature
        );
        await expect(
            fixture.fp.readFromBlockPipeOut(0xa0, USB3_MIN_BLOCK_SIZE, 32)
        ).to.eventually.be.rejected.and.has.property(
            'code',
            ErrorCode.UnsupportedFeature
        );
        await expect(
            fixture.fp.readFromBlockPipeOut(0xa0, USB3_MIN_BLOCK_SIZE, 33)
        ).to.eventually.be.rejected.and.has.property(
            'code',
            ErrorCode.UnsupportedFeature
        );
        await expect(
            fixture.fp.readFromBlockPipeOut(0xa0, USB3_MIN_BLOCK_SIZE, 16777208)
        ).to.eventually.be.rejected.and.has.property(
            'code',
            ErrorCode.UnsupportedFeature
        );
        await expect(
            fixture.fp.readFromBlockPipeOut(0xa0, USB3_MIN_BLOCK_SIZE, 16777213)
        ).to.eventually.be.rejected.and.has.property(
            'code',
            ErrorCode.UnsupportedFeature
        );
        await expect(
            fixture.fp.readFromBlockPipeOut(
                0xa0,
                USB3_MIN_BLOCK_SIZE,
                USB3_MAX_TRANSFER_SIZE
            )
        ).to.eventually.be.rejected.and.has.property(
            'code',
            ErrorCode.UnsupportedFeature
        );
    });

    it('writeToBlockPipeIn returns appropriately for length bounds (no host)', async function() {
        fixture = await setupFP({
            bitfile: BITFILE_NOHOST,
            setupFPNoHost: true
        });

        if (
            fixture.devInfo.deviceInterface !== DeviceInterface.INTERFACE_USB3
        ) {
            return await skip(fixture, this);
        }

        const data = new Uint8Array(USB3_MAX_TRANSFER_SIZE);
        await expect(
            fixture.fp.writeToBlockPipeIn(
                0x80,
                USB3_MIN_BLOCK_SIZE,
                data.subarray(0, 0)
            )
        ).to.eventually.be.equal(0);

        await expect(
            fixture.fp.writeToBlockPipeIn(
                0x80,
                USB3_MIN_BLOCK_SIZE,
                data.subarray(0, 7)
            )
        ).to.eventually.be.rejected.and.has.property(
            'code',
            ErrorCode.UnsupportedFeature
        );
        await expect(
            fixture.fp.writeToBlockPipeIn(
                0x80,
                USB3_MIN_BLOCK_SIZE,
                data.subarray(0, 8)
            )
        ).to.eventually.be.rejected.and.has.property(
            'code',
            ErrorCode.UnsupportedFeature
        );
        await expect(
            fixture.fp.writeToBlockPipeIn(
                0x80,
                USB3_MIN_BLOCK_SIZE,
                data.subarray(0, 32)
            )
        ).to.eventually.be.rejected.and.has.property(
            'code',
            ErrorCode.UnsupportedFeature
        );
        await expect(
            fixture.fp.writeToBlockPipeIn(
                0x80,
                USB3_MIN_BLOCK_SIZE,
                data.subarray(0, 33)
            )
        ).to.eventually.be.rejected.and.has.property(
            'code',
            ErrorCode.UnsupportedFeature
        );
        await expect(
            fixture.fp.writeToBlockPipeIn(
                0x80,
                USB3_MIN_BLOCK_SIZE,
                data.subarray(0, 16777208)
            )
        ).to.eventually.be.rejected.and.has.property(
            'code',
            ErrorCode.UnsupportedFeature
        );
        await expect(
            fixture.fp.writeToBlockPipeIn(
                0x80,
                USB3_MIN_BLOCK_SIZE,
                data.subarray(0, 16777213)
            )
        ).to.eventually.be.rejected.and.has.property(
            'code',
            ErrorCode.UnsupportedFeature
        );
        await expect(
            fixture.fp.writeToBlockPipeIn(
                0x80,
                USB3_MIN_BLOCK_SIZE,
                data.subarray(0, 16777216)
            )
        ).to.eventually.be.rejected.and.has.property(
            'code',
            ErrorCode.UnsupportedFeature
        );
    });

    it('readFromBlockPipeOut returns appropriately for length bounds (with host)', async function() {
        fixture = await setupFP({ bitfile: BITFILE_FRONTPANEL_TEST });

        if (
            fixture.devInfo.deviceInterface !== DeviceInterface.INTERFACE_USB3
        ) {
            return await skip(fixture, this);
        }

        //Set Throttle Values
        fixture.fp.setWireInValue(0x10, 0xffffffff);
        fixture.fp.setWireInValue(0x11, 0xffffffff);
        await fixture.fp.updateWireIns();
        // Reset and Latch Throttles
        fixture.fp.setWireInValue(0x00, 0x00000001);
        await fixture.fp.updateWireIns();
        fixture.fp.setWireInValue(0x00, 0x00000000);
        await fixture.fp.updateWireIns();

        await expect(
            fixture.fp.readFromBlockPipeOut(0xa0, USB3_MIN_BLOCK_SIZE, 0)
        ).to.eventually.has.lengthOf(0);
        await expect(
            fixture.fp.readFromBlockPipeOut(
                0xa0,
                USB3_MIN_BLOCK_SIZE,
                USB3_MAX_TRANSFER_SIZE - 1
            )
        ).to.eventually.be.rejected.and.has.property(
            'code',
            ErrorCode.UnsupportedFeature
        );
        await expect(
            fixture.fp.readFromBlockPipeOut(
                0xa0,
                USB3_MIN_BLOCK_SIZE,
                USB3_MIN_BLOCK_SIZE
            )
        ).to.eventually.has.lengthOf(USB3_MIN_BLOCK_SIZE);
        await expect(
            fixture.fp.readFromBlockPipeOut(0xa0, USB3_MIN_BLOCK_SIZE, 32)
        ).to.eventually.has.lengthOf(32);
        await expect(
            fixture.fp.readFromBlockPipeOut(0xa0, USB3_MIN_BLOCK_SIZE, 512)
        ).to.eventually.has.lengthOf(512);
        await expect(
            fixture.fp.readFromBlockPipeOut(0xa0, USB3_MIN_BLOCK_SIZE, 1024)
        ).to.eventually.has.lengthOf(1024);
        await expect(
            fixture.fp.readFromBlockPipeOut(
                0xa0,
                USB3_MIN_BLOCK_SIZE,
                USB3_MAX_TRANSFER_SIZE - 1
            )
        ).to.eventually.be.rejected.and.has.property(
            'code',
            ErrorCode.UnsupportedFeature
        );
        await expect(
            fixture.fp.readFromBlockPipeOut(
                0xa0,
                USB3_MIN_BLOCK_SIZE,
                USB3_MAX_TRANSFER_SIZE
            )
        ).to.eventually.has.lengthOf(USB3_MAX_TRANSFER_SIZE);
        await expect(
            fixture.fp.readFromBlockPipeOut(
                0xa0,
                USB3_MIN_BLOCK_SIZE,
                USB3_MAX_TRANSFER_SIZE + 1
            )
        ).to.eventually.be.rejected.and.has.property(
            'code',
            ErrorCode.UnsupportedFeature
        );
        await expect(
            fixture.fp.readFromBlockPipeOut(
                0xa0,
                USB3_MIN_BLOCK_SIZE,
                USB3_MAX_TRANSFER_SIZE + USB3_MIN_BLOCK_SIZE
            )
        ).to.eventually.has.lengthOf(
            USB3_MAX_TRANSFER_SIZE + USB3_MIN_BLOCK_SIZE
        );
        await expect(
            fixture.fp.readFromBlockPipeOut(
                0xa0,
                USB3_MIN_BLOCK_SIZE,
                USB3_MAX_TRANSFER_SIZE - USB3_MIN_BLOCK_SIZE
            )
        ).to.eventually.has.lengthOf(
            USB3_MAX_TRANSFER_SIZE - USB3_MIN_BLOCK_SIZE
        );
        await expect(
            fixture.fp.readFromBlockPipeOut(
                0xa0,
                USB3_MAX_BLOCK_SIZE,
                USB3_LARGE_TRANSFER_SIZE
            )
        ).to.eventually.has.lengthOf(USB3_LARGE_TRANSFER_SIZE);
    });

    it('writeToBlockPipeIn returns appropriately for length bounds (with host)', async function() {
        fixture = await setupFP({ bitfile: BITFILE_FRONTPANEL_TEST });

        if (
            fixture.devInfo.deviceInterface !== DeviceInterface.INTERFACE_USB3
        ) {
            return await skip(fixture, this);
        }

        const data = new Uint8Array(USB3_LARGE_TRANSFER_SIZE);

        //Set Throttle Values
        fixture.fp.setWireInValue(0x10, 0xffffffff);
        fixture.fp.setWireInValue(0x11, 0xffffffff);
        await fixture.fp.updateWireIns();
        // Reset and Latch Throttles
        fixture.fp.setWireInValue(0x00, 0x00000001);
        await fixture.fp.updateWireIns();
        fixture.fp.setWireInValue(0x00, 0x00000000);
        await fixture.fp.updateWireIns();

        await expect(
            fixture.fp.writeToBlockPipeIn(
                0x80,
                USB3_MIN_BLOCK_SIZE,
                data.subarray(0, 0)
            )
        ).to.eventually.be.equal(0);

        await expect(
            fixture.fp.writeToBlockPipeIn(
                0x80,
                USB3_MIN_BLOCK_SIZE,
                data.subarray(0, 3)
            )
        ).to.eventually.be.rejected.and.has.property(
            'code',
            ErrorCode.UnsupportedFeature
        );
        await expect(
            fixture.fp.writeToBlockPipeIn(
                0x80,
                USB3_MIN_BLOCK_SIZE,
                data.subarray(0, 4)
            )
        ).to.eventually.be.rejected.and.has.property(
            'code',
            ErrorCode.UnsupportedFeature
        );
        await expect(
            fixture.fp.writeToBlockPipeIn(
                0x80,
                USB3_MIN_BLOCK_SIZE,
                data.subarray(0, 15)
            )
        ).to.eventually.be.rejected.and.has.property(
            'code',
            ErrorCode.UnsupportedFeature
        );
        await expect(
            fixture.fp.writeToBlockPipeIn(
                0x80,
                USB3_MIN_BLOCK_SIZE,
                data.subarray(0, USB3_MIN_BLOCK_SIZE)
            )
        ).to.eventually.be.equal(USB3_MIN_BLOCK_SIZE);
        await expect(
            fixture.fp.writeToBlockPipeIn(
                0x80,
                USB3_MIN_BLOCK_SIZE,
                data.subarray(0, USB3_MIN_BLOCK_SIZE * 2)
            )
        ).to.eventually.be.equal(USB3_MIN_BLOCK_SIZE * 2);
        await expect(
            fixture.fp.writeToBlockPipeIn(
                0x80,
                USB3_MIN_BLOCK_SIZE,
                data.subarray(0, 33)
            )
        ).to.eventually.be.rejected.and.has.property(
            'code',
            ErrorCode.UnsupportedFeature
        );
        await expect(
            fixture.fp.writeToBlockPipeIn(
                0x80,
                USB3_MIN_BLOCK_SIZE,
                data.subarray(0, USB3_MAX_TRANSFER_SIZE - 1)
            )
        ).to.eventually.be.rejected.and.has.property(
            'code',
            ErrorCode.UnsupportedFeature
        );
        await expect(
            fixture.fp.writeToBlockPipeIn(
                0x80,
                USB3_MIN_BLOCK_SIZE,
                data.subarray(0, USB3_MAX_TRANSFER_SIZE)
            )
        ).to.eventually.be.equal(USB3_MAX_TRANSFER_SIZE);
        await expect(
            fixture.fp.writeToBlockPipeIn(
                0x80,
                USB3_MIN_BLOCK_SIZE,
                data.subarray(0, USB3_MAX_TRANSFER_SIZE + 1)
            )
        ).to.eventually.be.rejected.and.has.property(
            'code',
            ErrorCode.UnsupportedFeature
        );
        await expect(
            fixture.fp.writeToBlockPipeIn(
                0x80,
                USB3_MIN_BLOCK_SIZE,
                data.subarray(0, USB3_MAX_TRANSFER_SIZE + USB3_MIN_BLOCK_SIZE)
            )
        ).to.eventually.be.equal(USB3_MAX_TRANSFER_SIZE + USB3_MIN_BLOCK_SIZE);
        await expect(
            fixture.fp.writeToBlockPipeIn(
                0x80,
                USB3_MIN_BLOCK_SIZE,
                data.subarray(0, USB3_MAX_TRANSFER_SIZE - USB3_MIN_BLOCK_SIZE)
            )
        ).to.eventually.be.equal(USB3_MAX_TRANSFER_SIZE - USB3_MIN_BLOCK_SIZE);
        await expect(
            fixture.fp.writeToBlockPipeIn(
                0x80,
                USB3_MIN_BLOCK_SIZE,
                data.subarray(0, USB3_LARGE_TRANSFER_SIZE)
            )
        ).to.eventually.be.equal(USB3_LARGE_TRANSFER_SIZE);
    });

    // BlockSize Bounds
    // USB 2.0 HighSpeed - Multiple of two [2..1024]
    // USB 2.0 FullSpeed - Multiple of two [2..64]
    // USB 3.0           - Power of two [8..1024]
    // PCIe:             - Not applicable
    it('readFromBlockPipeOut returns appropriately for block size bounds (no host)', async function() {
        fixture = await setupFP({
            bitfile: BITFILE_NOHOST,
            setupFPNoHost: true
        });

        if (
            fixture.devInfo.deviceInterface !== DeviceInterface.INTERFACE_USB3
        ) {
            return await skip(fixture, this);
        }

        await expect(
            fixture.fp.readFromBlockPipeOut(0xa0, USB3_MIN_BLOCK_SIZE - 1, 32)
        ).to.eventually.be.rejected.and.has.property(
            'code',
            ErrorCode.InvalidBlockSize
        );
        await expect(
            fixture.fp.readFromBlockPipeOut(0xa0, USB3_MIN_BLOCK_SIZE, 32)
        ).to.eventually.be.rejected.and.has.property(
            'code',
            ErrorCode.UnsupportedFeature
        );
        await expect(
            fixture.fp.readFromBlockPipeOut(0xa0, USB3_MAX_BLOCK_SIZE - 1, 1024)
        ).to.eventually.be.rejected.and.has.property(
            'code',
            ErrorCode.InvalidBlockSize
        );
        await expect(
            fixture.fp.readFromBlockPipeOut(0xa0, USB3_MAX_BLOCK_SIZE, 1024)
        ).to.eventually.be.rejected.and.has.property(
            'code',
            ErrorCode.UnsupportedFeature
        );
        await expect(
            fixture.fp.readFromBlockPipeOut(0xa0, USB3_MAX_BLOCK_SIZE + 1, 1032)
        ).to.eventually.be.rejected.and.has.property(
            'code',
            ErrorCode.InvalidBlockSize
        );
        await expect(
            fixture.fp.readFromBlockPipeOut(0xa0, USB3_MAX_BLOCK_SIZE + 8, 1032)
        ).to.eventually.be.rejected.and.has.property(
            'code',
            ErrorCode.InvalidBlockSize
        );
    });

    it('writeToBlockPipeIn returns appropriately for block size bounds (no host)', async function() {
        fixture = await setupFP({
            bitfile: BITFILE_NOHOST,
            setupFPNoHost: true
        });

        if (
            fixture.devInfo.deviceInterface !== DeviceInterface.INTERFACE_USB3
        ) {
            return await skip(fixture, this);
        }

        const data = new Uint8Array(1032);
        await expect(
            fixture.fp.writeToBlockPipeIn(
                0x80,
                USB3_MIN_BLOCK_SIZE - 1,
                data.subarray(0, 32)
            )
        ).to.eventually.be.rejected.and.has.property(
            'code',
            ErrorCode.InvalidBlockSize
        );
        await expect(
            fixture.fp.writeToBlockPipeIn(
                0x80,
                USB3_MIN_BLOCK_SIZE,
                data.subarray(0, 32)
            )
        ).to.eventually.be.rejected.and.has.property(
            'code',
            ErrorCode.UnsupportedFeature
        );
        await expect(
            fixture.fp.writeToBlockPipeIn(
                0x80,
                USB3_MAX_BLOCK_SIZE - 1,
                data.subarray(0, 1024)
            )
        ).to.eventually.be.rejected.and.has.property(
            'code',
            ErrorCode.InvalidBlockSize
        );
        await expect(
            fixture.fp.writeToBlockPipeIn(
                0x80,
                USB3_MAX_BLOCK_SIZE,
                data.subarray(0, 1024)
            )
        ).to.eventually.be.rejected.and.has.property(
            'code',
            ErrorCode.UnsupportedFeature
        );
        await expect(
            fixture.fp.writeToBlockPipeIn(
                0x80,
                USB3_MAX_BLOCK_SIZE + 1,
                data.subarray(0, 1032)
            )
        ).to.eventually.be.rejected.and.has.property(
            'code',
            ErrorCode.InvalidBlockSize
        );
        await expect(
            fixture.fp.writeToBlockPipeIn(
                0x80,
                USB3_MAX_BLOCK_SIZE + 8,
                data.subarray(0, 1032)
            )
        ).to.eventually.be.rejected.and.has.property(
            'code',
            ErrorCode.InvalidBlockSize
        );
    });

    it('readFromBlockPipeOut returns appropriately for block size bounds (with host)', async function() {
        fixture = await setupFP({ bitfile: BITFILE_FRONTPANEL_TEST });

        if (
            fixture.devInfo.deviceInterface !== DeviceInterface.INTERFACE_USB3
        ) {
            return await skip(fixture, this);
        }

        //Set Throttle Values
        fixture.fp.setWireInValue(0x10, 0xffffffff);
        fixture.fp.setWireInValue(0x11, 0xffffffff);
        await fixture.fp.updateWireIns();
        // Reset and Latch Throttles
        fixture.fp.setWireInValue(0x00, 0x00000001);
        await fixture.fp.updateWireIns();
        fixture.fp.setWireInValue(0x00, 0x00000000);
        await fixture.fp.updateWireIns();

        await expect(
            fixture.fp.readFromBlockPipeOut(0xa0, USB3_MIN_BLOCK_SIZE - 1, 32)
        ).to.eventually.be.rejected.and.has.property(
            'code',
            ErrorCode.InvalidBlockSize
        );
        await expect(
            fixture.fp.readFromBlockPipeOut(0xa0, USB3_MIN_BLOCK_SIZE, 32)
        ).to.eventually.has.lengthOf(32);
        await expect(
            fixture.fp.readFromBlockPipeOut(0xa0, USB3_MAX_BLOCK_SIZE - 1, 1024)
        ).to.eventually.be.rejected.and.has.property(
            'code',
            ErrorCode.InvalidBlockSize
        );
        await expect(
            fixture.fp.readFromBlockPipeOut(0xa0, USB3_MAX_BLOCK_SIZE, 1024)
        ).to.eventually.has.lengthOf(1024);
        await expect(
            fixture.fp.readFromBlockPipeOut(0xa0, USB3_MAX_BLOCK_SIZE + 1, 1032)
        ).to.eventually.be.rejected.and.has.property(
            'code',
            ErrorCode.InvalidBlockSize
        );
        await expect(
            fixture.fp.readFromBlockPipeOut(0xa0, USB3_MAX_BLOCK_SIZE + 8, 1032)
        ).to.eventually.be.rejected.and.has.property(
            'code',
            ErrorCode.InvalidBlockSize
        );
    });

    it('writeToBlockPipeIn returns appropriately for block size bounds (with host)', async function() {
        fixture = await setupFP({ bitfile: BITFILE_FRONTPANEL_TEST });

        if (
            fixture.devInfo.deviceInterface !== DeviceInterface.INTERFACE_USB3
        ) {
            return await skip(fixture, this);
        }

        const data = new Uint8Array(1032);

        //Set Throttle Values
        fixture.fp.setWireInValue(0x10, 0xffffffff);
        fixture.fp.setWireInValue(0x11, 0xffffffff);
        await fixture.fp.updateWireIns();
        // Reset and Latch Throttles
        fixture.fp.setWireInValue(0x00, 0x00000001);
        await fixture.fp.updateWireIns();
        fixture.fp.setWireInValue(0x00, 0x00000000);
        await fixture.fp.updateWireIns();

        await expect(
            fixture.fp.writeToBlockPipeIn(
                0x80,
                USB3_MIN_BLOCK_SIZE - 1,
                data.subarray(0, 32)
            )
        ).to.eventually.be.rejected.and.has.property(
            'code',
            ErrorCode.InvalidBlockSize
        );
        await expect(
            fixture.fp.writeToBlockPipeIn(
                0x80,
                USB3_MIN_BLOCK_SIZE,
                data.subarray(0, 32)
            )
        ).to.eventually.be.equal(32);
        await expect(
            fixture.fp.writeToBlockPipeIn(
                0x80,
                USB3_MAX_BLOCK_SIZE - 1,
                data.subarray(0, 1024)
            )
        ).to.eventually.be.rejected.and.has.property(
            'code',
            ErrorCode.InvalidBlockSize
        );
        await expect(
            fixture.fp.writeToBlockPipeIn(
                0x80,
                USB3_MAX_BLOCK_SIZE,
                data.subarray(0, 1024)
            )
        ).to.eventually.be.equal(1024);
        await expect(
            fixture.fp.writeToBlockPipeIn(
                0x80,
                USB3_MAX_BLOCK_SIZE + 1,
                data.subarray(0, 1032)
            )
        ).to.eventually.be.rejected.and.has.property(
            'code',
            ErrorCode.InvalidBlockSize
        );
        await expect(
            fixture.fp.writeToBlockPipeIn(
                0x80,
                USB3_MAX_BLOCK_SIZE + 8,
                data.subarray(0, 1032)
            )
        ).to.eventually.be.rejected.and.has.property(
            'code',
            ErrorCode.InvalidBlockSize
        );
    });

    // Block Count Testing
    it('readFromBlockPipeOut issues correct number of block strobes in hardware', async function() {
        fixture = await setupFP({ bitfile: BITFILE_FRONTPANEL_TEST });

        if (
            fixture.devInfo.deviceInterface !== DeviceInterface.INTERFACE_USB3
        ) {
            return await skip(fixture, this);
        }

        //Set Throttle Values
        fixture.fp.setWireInValue(0x10, 0xffffffff);
        fixture.fp.setWireInValue(0x11, 0xffffffff);
        await fixture.fp.updateWireIns();
        // Reset and Latch Throttles
        fixture.fp.setWireInValue(0x00, 0x00000001);
        await fixture.fp.updateWireIns();
        fixture.fp.setWireInValue(0x00, 0x00000000);
        await fixture.fp.updateWireIns();

        await expect(
            fixture.fp.readFromBlockPipeOut(
                0xa0,
                USB3_MIN_BLOCK_SIZE,
                USB3_MIN_BLOCK_SIZE
            )
        ).to.eventually.has.lengthOf(USB3_MIN_BLOCK_SIZE);
        await fixture.fp.updateWireOuts();
        expect(fixture.fp.getWireOutValue(0x3a)).to.be.equal(
            USB3_MIN_BLOCK_SIZE / USB3_MIN_BLOCK_SIZE
        );

        // Reset and Latch Throttles
        fixture.fp.setWireInValue(0x00, 0x00000001);
        await fixture.fp.updateWireIns();
        fixture.fp.setWireInValue(0x00, 0x00000000);
        await fixture.fp.updateWireIns();

        await expect(
            fixture.fp.readFromBlockPipeOut(0xa0, USB3_MIN_BLOCK_SIZE, 1024)
        ).to.eventually.has.lengthOf(1024);
        await fixture.fp.updateWireOuts();
        expect(fixture.fp.getWireOutValue(0x3a)).to.be.equal(
            1024 / USB3_MIN_BLOCK_SIZE
        );

        // Reset and Latch Throttles
        fixture.fp.setWireInValue(0x00, 0x00000001);
        await fixture.fp.updateWireIns();
        fixture.fp.setWireInValue(0x00, 0x00000000);
        await fixture.fp.updateWireIns();

        await expect(
            fixture.fp.readFromBlockPipeOut(
                0xa0,
                USB3_MAX_BLOCK_SIZE,
                USB3_MAX_MAXBLOCK_TRANSFER_SIZE
            )
        ).to.eventually.has.lengthOf(USB3_MAX_MAXBLOCK_TRANSFER_SIZE);
        await fixture.fp.updateWireOuts();
        expect(fixture.fp.getWireOutValue(0x3a)).to.be.equal(
            USB3_MAX_MAXBLOCK_TRANSFER_SIZE / USB3_MAX_BLOCK_SIZE
        );

        // Reset and Latch Throttles
        fixture.fp.setWireInValue(0x00, 0x00000001);
        await fixture.fp.updateWireIns();
        fixture.fp.setWireInValue(0x00, 0x00000000);
        await fixture.fp.updateWireIns();

        await expect(
            fixture.fp.readFromBlockPipeOut(
                0xa0,
                USB3_MAX_BLOCK_SIZE,
                USB3_LARGE_TRANSFER_SIZE
            )
        ).to.eventually.has.lengthOf(USB3_LARGE_TRANSFER_SIZE);
        await fixture.fp.updateWireOuts();
        expect(fixture.fp.getWireOutValue(0x3a)).to.be.equal(
            USB3_LARGE_TRANSFER_SIZE / USB3_MAX_BLOCK_SIZE
        );
    });

    it('writeToBlockPipeIn issues correct number of block strobes in hardware', async function() {
        fixture = await setupFP({ bitfile: BITFILE_FRONTPANEL_TEST });

        if (
            fixture.devInfo.deviceInterface !== DeviceInterface.INTERFACE_USB3
        ) {
            return await skip(fixture, this);
        }

        const data = new Uint8Array(USB3_LARGE_TRANSFER_SIZE);

        //Set Throttle Values
        fixture.fp.setWireInValue(0x10, 0xffffffff);
        fixture.fp.setWireInValue(0x11, 0xffffffff);
        await fixture.fp.updateWireIns();
        // Reset and Latch Throttles
        fixture.fp.setWireInValue(0x00, 0x00000001);
        await fixture.fp.updateWireIns();
        fixture.fp.setWireInValue(0x00, 0x00000000);
        await fixture.fp.updateWireIns();

        await expect(
            fixture.fp.writeToBlockPipeIn(
                0x80,
                USB3_MIN_BLOCK_SIZE,
                data.subarray(0, USB3_MIN_BLOCK_SIZE)
            )
        ).to.eventually.be.equal(USB3_MIN_BLOCK_SIZE);
        await fixture.fp.updateWireOuts();
        expect(fixture.fp.getWireOutValue(0x39)).to.be.equal(
            USB3_MIN_BLOCK_SIZE / USB3_MIN_BLOCK_SIZE
        );

        // Reset and Latch Throttles
        fixture.fp.setWireInValue(0x00, 0x00000001);
        await fixture.fp.updateWireIns();
        fixture.fp.setWireInValue(0x00, 0x00000000);
        await fixture.fp.updateWireIns();

        await expect(
            fixture.fp.writeToBlockPipeIn(
                0x80,
                USB3_MIN_BLOCK_SIZE,
                data.subarray(0, 1024)
            )
        ).to.eventually.be.equal(1024);
        await fixture.fp.updateWireOuts();
        expect(fixture.fp.getWireOutValue(0x39)).to.be.equal(
            1024 / USB3_MIN_BLOCK_SIZE
        );

        // Reset and Latch Throttles
        fixture.fp.setWireInValue(0x00, 0x00000001);
        await fixture.fp.updateWireIns();
        fixture.fp.setWireInValue(0x00, 0x00000000);
        await fixture.fp.updateWireIns();

        await expect(
            fixture.fp.writeToBlockPipeIn(
                0x80,
                USB3_MAX_BLOCK_SIZE,
                data.subarray(0, USB3_MAX_MAXBLOCK_TRANSFER_SIZE)
            )
        ).to.eventually.be.equal(USB3_MAX_MAXBLOCK_TRANSFER_SIZE);
        await fixture.fp.updateWireOuts();
        expect(fixture.fp.getWireOutValue(0x39)).to.be.equal(
            USB3_MAX_MAXBLOCK_TRANSFER_SIZE / USB3_MAX_BLOCK_SIZE
        );

        // Reset and Latch Throttles
        fixture.fp.setWireInValue(0x00, 0x00000001);
        await fixture.fp.updateWireIns();
        fixture.fp.setWireInValue(0x00, 0x00000000);
        await fixture.fp.updateWireIns();

        await expect(
            fixture.fp.writeToBlockPipeIn(
                0x80,
                USB3_MAX_BLOCK_SIZE,
                data.subarray(0, USB3_LARGE_TRANSFER_SIZE)
            )
        ).to.eventually.be.equal(USB3_LARGE_TRANSFER_SIZE);
        await fixture.fp.updateWireOuts();
        expect(fixture.fp.getWireOutValue(0x39)).to.be.equal(
            USB3_LARGE_TRANSFER_SIZE / USB3_MAX_BLOCK_SIZE
        );
    });

    // Data Integrity Testing
    it('readFromBlockPipeOut maintains data integrity', async function() {
        fixture = await setupFP({ bitfile: BITFILE_FRONTPANEL_TEST });

        if (
            fixture.devInfo.deviceInterface !== DeviceInterface.INTERFACE_USB3
        ) {
            return await skip(fixture, this);
        }

        let data: Uint8Array;

        //Set Throttle Values
        fixture.fp.setWireInValue(0x10, 0xffffffff);
        fixture.fp.setWireInValue(0x11, 0xffffffff);
        await fixture.fp.updateWireIns();
        // Reset and Latch Throttles
        fixture.fp.setWireInValue(0x00, 0x00000001);
        await fixture.fp.updateWireIns();
        fixture.fp.setWireInValue(0x00, 0x00000000);
        await fixture.fp.updateWireIns();

        data = await fixture.fp.readFromBlockPipeOut(
            0xa0,
            USB3_MIN_BLOCK_SIZE,
            USB3_MIN_BLOCK_SIZE
        );
        expect(data).to.has.lengthOf(USB3_MIN_BLOCK_SIZE);
        expect(checkData32(data)).to.be.equal(0);

        // Reset and Latch Throttles
        fixture.fp.setWireInValue(0x00, 0x00000001);
        await fixture.fp.updateWireIns();
        fixture.fp.setWireInValue(0x00, 0x00000000);
        await fixture.fp.updateWireIns();

        data = await fixture.fp.readFromBlockPipeOut(
            0xa0,
            USB3_MIN_BLOCK_SIZE,
            1024
        );
        expect(data).to.has.lengthOf(1024);
        expect(checkData32(data)).to.be.equal(0);

        // Reset and Latch Throttles
        fixture.fp.setWireInValue(0x00, 0x00000001);
        await fixture.fp.updateWireIns();
        fixture.fp.setWireInValue(0x00, 0x00000000);
        await fixture.fp.updateWireIns();

        data = await fixture.fp.readFromBlockPipeOut(
            0xa0,
            USB3_MAX_BLOCK_SIZE,
            USB3_MAX_MAXBLOCK_TRANSFER_SIZE
        );
        expect(data).to.has.lengthOf(USB3_MAX_MAXBLOCK_TRANSFER_SIZE);
        expect(checkData32(data)).to.be.equal(0);

        // Reset and Latch Throttles
        fixture.fp.setWireInValue(0x00, 0x00000001);
        await fixture.fp.updateWireIns();
        fixture.fp.setWireInValue(0x00, 0x00000000);
        await fixture.fp.updateWireIns();

        data = await fixture.fp.readFromBlockPipeOut(
            0xa0,
            USB3_MAX_BLOCK_SIZE,
            USB3_LARGE_TRANSFER_SIZE
        );
        expect(data).to.has.lengthOf(USB3_LARGE_TRANSFER_SIZE);
        expect(checkData32(data)).to.be.equal(0);
    });

    it('writeToBlockPipeIn maintains data integrity', async function() {
        fixture = await setupFP({ bitfile: BITFILE_FRONTPANEL_TEST });

        if (
            fixture.devInfo.deviceInterface !== DeviceInterface.INTERFACE_USB3
        ) {
            return await skip(fixture, this);
        }

        //Initialize data
        const data = generateData32(USB3_LARGE_TRANSFER_SIZE);

        //Set Throttle Values
        fixture.fp.setWireInValue(0x10, 0xffffffff);
        fixture.fp.setWireInValue(0x11, 0xffffffff);
        await fixture.fp.updateWireIns();
        // Reset and Latch Throttles
        fixture.fp.setWireInValue(0x00, 0x00000001);
        await fixture.fp.updateWireIns();
        fixture.fp.setWireInValue(0x00, 0x00000000);
        await fixture.fp.updateWireIns();

        await expect(
            fixture.fp.writeToBlockPipeIn(
                0x80,
                USB3_MIN_BLOCK_SIZE,
                data.subarray(0, USB3_MIN_BLOCK_SIZE)
            )
        ).to.eventually.be.equal(USB3_MIN_BLOCK_SIZE);
        await fixture.fp.updateWireOuts();
        expect(fixture.fp.getWireOutValue(0x38)).to.be.equal(0);

        // Reset and Latch Throttles
        fixture.fp.setWireInValue(0x00, 0x00000001);
        await fixture.fp.updateWireIns();
        fixture.fp.setWireInValue(0x00, 0x00000000);
        await fixture.fp.updateWireIns();

        await expect(
            fixture.fp.writeToBlockPipeIn(
                0x80,
                USB3_MIN_BLOCK_SIZE,
                data.subarray(0, 1024)
            )
        ).to.eventually.be.equal(1024);
        await fixture.fp.updateWireOuts();
        expect(fixture.fp.getWireOutValue(0x38)).to.be.equal(0);

        // Reset and Latch Throttles
        fixture.fp.setWireInValue(0x00, 0x00000001);
        await fixture.fp.updateWireIns();
        fixture.fp.setWireInValue(0x00, 0x00000000);
        await fixture.fp.updateWireIns();

        await expect(
            fixture.fp.writeToBlockPipeIn(
                0x80,
                USB3_MAX_BLOCK_SIZE,
                data.subarray(0, USB3_MAX_MAXBLOCK_TRANSFER_SIZE)
            )
        ).to.eventually.be.equal(USB3_MAX_MAXBLOCK_TRANSFER_SIZE);
        await fixture.fp.updateWireOuts();
        expect(fixture.fp.getWireOutValue(0x38)).to.be.equal(0);

        // Reset and Latch Throttles
        fixture.fp.setWireInValue(0x00, 0x00000001);
        await fixture.fp.updateWireIns();
        fixture.fp.setWireInValue(0x00, 0x00000000);
        await fixture.fp.updateWireIns();

        await expect(
            fixture.fp.writeToBlockPipeIn(
                0x80,
                USB3_MAX_BLOCK_SIZE,
                data.subarray(0, USB3_LARGE_TRANSFER_SIZE)
            )
        ).to.eventually.be.equal(USB3_LARGE_TRANSFER_SIZE);
        await fixture.fp.updateWireOuts();
        expect(fixture.fp.getWireOutValue(0x38)).to.be.equal(0);
    });

    afterEach(async () => {
        await teardownFP(fixture);
    });
});
