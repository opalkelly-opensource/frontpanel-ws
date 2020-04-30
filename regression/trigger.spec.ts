import * as chai from 'chai';
import * as chaiAsPromised from 'chai-as-promised';
import 'mocha';
import {
    BITFILE_FRONTPANEL_TEST,
    IFixture,
    setupFP,
    teardownFP
} from './regression';
import { ErrorCode } from '../src/FrontPanelAPI';

chai.use(chaiAsPromised);
const expect = chai.expect;

// Return the mask corresponding to the width of the wires used by g_devInfo.
function getTriggerWidthMask(width: number): number {
    // Get the proper wire mask so that we only test valid bits for
    // the device.
    switch (width) {
        case 8:
            return 0x000000ff;
        case 16:
            return 0x0000ffff;
        case 32:
            return 0xffffffff;
        default:
            throw new Error(`Unknown wire width: ${width}`);
    }
}

describe('Trigger', () => {
    let fixture: IFixture;

    it('activateTriggerIn returns InvalidEndpoint for out-of-bounds trigger address', async function() {
        fixture = await setupFP({});

        await expect(
            fixture.fp.activateTriggerIn(0x3f, 0)
        ).to.eventually.be.rejected.and.has.property(
            'code',
            ErrorCode.InvalidEndpoint
        );

        await expect(
            fixture.fp.activateTriggerIn(0x60, 0)
        ).to.eventually.be.rejected.and.has.property(
            'code',
            ErrorCode.InvalidEndpoint
        );
    });

    it('isTriggered behaves properly when bounds-checking wire address', async function() {
        fixture = await setupFP({});

        expect(() => fixture.fp.isTriggered(0x5f, 0))
            .to.throw()
            .and.has.property('code', ErrorCode.InvalidEndpoint);
        expect(() => fixture.fp.isTriggered(0x80, 0))
            .to.throw()
            .and.has.property('code', ErrorCode.InvalidEndpoint);
    });

    it('isTriggered tests on the USB 3.0 hosts', async function() {
        fixture = await setupFP({ bitfile: BITFILE_FRONTPANEL_TEST });

        await fixture.fp.updateTriggerOuts();

        const u32Mask = getTriggerWidthMask(fixture.devInfo.wireWidth);

        expect(fixture.fp.isTriggered(0x6f, (0x12345678 & u32Mask) >>> 0)).to.be
            .true;
        expect(fixture.fp.isTriggered(0x70, (0x87654321 & u32Mask) >>> 0)).to.be
            .true;
    });

    it('getTriggerOutVector tests on the USB 3.0 hosts', async function() {
        fixture = await setupFP({ bitfile: BITFILE_FRONTPANEL_TEST });

        await fixture.fp.updateTriggerOuts();

        const u32Mask = getTriggerWidthMask(fixture.devInfo.wireWidth);

        expect(fixture.fp.getTriggerOutVector(0x6f)).to.be.equal(
            (0x12345678 & u32Mask) >>> 0
        );
        expect(fixture.fp.getTriggerOutVector(0x70)).to.be.equal(
            (0x87654321 & u32Mask) >>> 0
        );
    });

    it('activateTriggerIn tests on the USB 3.0 hosts', async function() {
        fixture = await setupFP({ bitfile: BITFILE_FRONTPANEL_TEST });

        const MSB = fixture.devInfo.triggerWidth - 1;

        fixture.fp.activateTriggerIn(0x40, 0);
        fixture.fp.activateTriggerIn(0x5f, MSB);
        await fixture.fp.updateTriggerOuts();

        const u32Mask = getTriggerWidthMask(fixture.devInfo.wireWidth);

        expect(fixture.fp.isTriggered(0x60, (0x00000001 & u32Mask) >>> 0)).to.be
            .true;
        expect(
            fixture.fp.isTriggered(0x7f, ((0x00000001 << MSB) & u32Mask) >>> 0)
        ).to.be.true;

        fixture.fp.activateTriggerIn(0x40, MSB);
        fixture.fp.activateTriggerIn(0x5f, 0);
        await fixture.fp.updateTriggerOuts();
        expect(
            fixture.fp.isTriggered(0x60, ((0x00000001 << MSB) & u32Mask) >>> 0)
        ).to.be.true;
        expect(fixture.fp.isTriggered(0x7f, (0x00000001 & u32Mask) >>> 0)).to.be
            .true;

        // Mask test
        fixture.fp.activateTriggerIn(0x40, 0);
        fixture.fp.activateTriggerIn(0x40, 4);
        fixture.fp.activateTriggerIn(0x40, MSB);
        await fixture.fp.updateTriggerOuts();
        expect(
            fixture.fp.isTriggered(0x60, ((0x00000001 << 0) & u32Mask) >>> 0)
        ).to.be.true;
        expect(
            fixture.fp.isTriggered(0x60, ((0x00000001 << 1) & u32Mask) >>> 0)
        ).to.be.false;
        expect(
            fixture.fp.isTriggered(0x60, ((0x00000001 << 4) & u32Mask) >>> 0)
        ).to.be.true;
        expect(
            fixture.fp.isTriggered(
                0x60,
                ((0x00000001 << (MSB - 1)) & u32Mask) >>> 0
            )
        ).to.be.false;
        expect(
            fixture.fp.isTriggered(0x60, ((0x00000001 << MSB) & u32Mask) >>> 0)
        ).to.be.true;
    });

    afterEach(async () => {
        await teardownFP(fixture);
    });
});
