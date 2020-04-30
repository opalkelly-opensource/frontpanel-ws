import * as chai from 'chai';
import * as chaiAsPromised from 'chai-as-promised';
import 'mocha';
import {
    BITFILE_FRONTPANEL_TEST,
    configureFPGA,
    IFixture,
    setupFP,
    skip,
    teardownFP
} from './regression';
import { DeviceInterface } from '../src/FrontPanelAPI';

chai.use(chaiAsPromised);
const expect = chai.expect;

describe('Reset', () => {
    let fixture: IFixture;

    // Without Reset Profile
    it('wireIns in HDL are 0 after configuration without Reset Profile', async function() {
        fixture = await setupFP({ bitfile: BITFILE_FRONTPANEL_TEST });

        if (
            fixture.devInfo.deviceInterface !== DeviceInterface.INTERFACE_USB3
        ) {
            return await skip(fixture, this);
        }

        await fixture.fp.updateWireOuts();
        expect(fixture.fp.getWireOutValue(0x2f)).to.be.equal(0x00000000);

        fixture.fp.setWireInValue(0x0f, 3);
        await fixture.fp.updateWireIns();
        await fixture.fp.updateWireOuts();
        expect(fixture.fp.getWireOutValue(0x20)).to.be.equal(0x00000000);
        expect(fixture.fp.getWireOutValue(0x3f)).to.be.equal(0x00000000);
    });

    it('wireIns are 0 after configuration without Reset Profile', async function() {
        fixture = await setupFP({ bitfile: BITFILE_FRONTPANEL_TEST });

        if (
            fixture.devInfo.deviceInterface !== DeviceInterface.INTERFACE_USB3
        ) {
            return await skip(fixture, this);
        }
        await fixture.fp.updateWireIns();
        expect(fixture.fp.getWireInValue(0x00)).to.be.equal(0x00000000);
        expect(fixture.fp.getWireInValue(0x0f)).to.be.equal(0x00000000);
        expect(fixture.fp.getWireInValue(0x1f)).to.be.equal(0x00000000);
    });

    it('wireIns are cleared after configuration without Reset Profile', async function() {
        fixture = await setupFP({ bitfile: BITFILE_FRONTPANEL_TEST });

        if (
            fixture.devInfo.deviceInterface !== DeviceInterface.INTERFACE_USB3
        ) {
            return await skip(fixture, this);
        }
        fixture.fp.setWireInValue(0x00, 0x12345678);
        fixture.fp.setWireInValue(0x0f, 3);
        fixture.fp.setWireInValue(0x1f, 0x56781234);
        await fixture.fp.updateWireIns();

        await configureFPGA(fixture, BITFILE_FRONTPANEL_TEST);

        await fixture.fp.updateWireIns();
        expect(fixture.fp.getWireInValue(0x00)).to.be.equal(0x00000000);
        expect(fixture.fp.getWireInValue(0x0f)).to.be.equal(0x00000000);
        expect(fixture.fp.getWireInValue(0x1f)).to.be.equal(0x00000000);

        fixture.fp.setWireInValue(0x0f, 3);
        await fixture.fp.updateWireIns();
        await fixture.fp.updateWireOuts();
        expect(fixture.fp.getWireOutValue(0x20)).to.be.equal(0x00000000);
        expect(fixture.fp.getWireOutValue(0x3f)).to.be.equal(0x00000000);
    });

    it('no Triggers after configuration without Reset Profile', async function() {
        fixture = await setupFP({ bitfile: BITFILE_FRONTPANEL_TEST });

        if (
            fixture.devInfo.deviceInterface !== DeviceInterface.INTERFACE_USB3
        ) {
            return await skip(fixture, this);
        }
        const MSB = fixture.devInfo.triggerWidth - 1;

        for (let i = 0; i < MSB; i++) {
            expect(fixture.fp.isTriggered(0x60, 0x00000001 << i)).to.be.false;
            expect(fixture.fp.isTriggered(0x7f, 0x00000001 << i)).to.be.false;
        }
    });

    it('reset deaserted after configuration without Reset Profile', async function() {
        fixture = await setupFP({ bitfile: BITFILE_FRONTPANEL_TEST });

        if (
            fixture.devInfo.deviceInterface !== DeviceInterface.INTERFACE_USB3
        ) {
            return await skip(fixture, this);
        }
        await fixture.fp.updateWireOuts();
        expect(fixture.fp.getWireOutValue(0x31)).to.be.equal(0x00000000);
    });

    afterEach(async () => {
        await teardownFP(fixture);
    });
});
