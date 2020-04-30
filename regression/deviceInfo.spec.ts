import { expect, assert } from 'chai';
import 'mocha';
import { IFixture, setupFP, teardownFP } from './regression';
import { DeviceInterface, FPGAVendor, ProductID } from '../src/FrontPanelAPI';

describe('Device Info', () => {
    let fixture: IFixture;
    beforeEach(async () => {
        fixture = await setupFP({});
    });

    it('serial number presence and length', async () => {
        expect(fixture.devInfo.serialNumber).to.have.lengthOf(10);
    });

    it('interface widths for various devices', async () => {
        switch (fixture.devInfo.deviceInterface) {
            case DeviceInterface.INTERFACE_USB3:
                expect(fixture.devInfo.pipeWidth).to.be.equal(32);
                expect(fixture.devInfo.wireWidth).to.be.equal(32);
                expect(fixture.devInfo.triggerWidth).to.be.equal(32);
                expect(fixture.devInfo.registerAddressWidth).to.be.equal(32);
                expect(fixture.devInfo.registerDataWidth).to.be.equal(32);
                break;

            case DeviceInterface.INTERFACE_USB2:
                if (ProductID.PRODUCT_XEM3001V1 === fixture.devInfo.productID) {
                    expect(fixture.devInfo.pipeWidth).to.be.equal(8);
                    expect(fixture.devInfo.wireWidth).to.be.equal(8);
                    expect(fixture.devInfo.triggerWidth).to.be.equal(8);
                } else {
                    expect(fixture.devInfo.pipeWidth).to.be.equal(16);
                    expect(fixture.devInfo.wireWidth).to.be.equal(16);
                    expect(fixture.devInfo.triggerWidth).to.be.equal(16);
                }
                expect(fixture.devInfo.registerAddressWidth).to.be.equal(0);
                expect(fixture.devInfo.registerDataWidth).to.be.equal(0);
                break;

            case DeviceInterface.INTERFACE_PCIE:
                expect(fixture.devInfo.pipeWidth).to.be.equal(64);
                expect(fixture.devInfo.wireWidth).to.be.equal(32);
                expect(fixture.devInfo.triggerWidth).to.be.equal(32);
                expect(fixture.devInfo.registerAddressWidth).to.be.equal(0);
                expect(fixture.devInfo.registerDataWidth).to.be.equal(0);
                break;

            case DeviceInterface.INTERFACE_UNKNOWN:
                assert.fail(
                    DeviceInterface[fixture.devInfo.deviceInterface],
                    'not UNKNOWN',
                    'Unexpected value'
                );
                break;

            default:
                // `deviceInterface` here evaluated to `never` so explicitly
                // cast it to `number`.
                assert.fail(
                    (fixture.devInfo.deviceInterface as number).toString(),
                    'any interface',
                    'Unknown value'
                );
        }
    });

    it('FPGA vendor', async () => {
        switch (fixture.devInfo.fpgaVendor) {
            case FPGAVendor.FPGAVENDOR_UNKNOWN:
                assert.fail(
                    DeviceInterface[fixture.devInfo.deviceInterface],
                    'not UNKNOWN',
                    'Unexpected value'
                );
                break;

            case FPGAVendor.FPGAVENDOR_XILINX:
                break;

            case FPGAVendor.FPGAVENDOR_INTEL:
                break;

            default:
                // `fpgaVendor` here evaluated to `never` so explicitly
                // cast it to `number`.
                assert.fail(
                    (fixture.devInfo.fpgaVendor as number).toString(),
                    'any vendor',
                    'Unknown value'
                );
        }
    });

    afterEach(async () => {
        await teardownFP(fixture);
    });
});
