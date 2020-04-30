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

describe('Wire', () => {
    let fixture: IFixture;

    it('setWireIn returns InvalidEndpoint for out-of-bounds wire address', async function() {
        fixture = await setupFP({});

        expect(() => fixture.fp.setWireInValue(0x20, 0x00))
            .to.throw()
            .and.has.property('code', ErrorCode.InvalidEndpoint);

        // Should not throw an exception.
        fixture.fp.setWireInValue(0x00, 0x00);
        fixture.fp.setWireInValue(0x1f, 0x00);
    });

    it('getWireOut behaves properly when bounds-checking wire address', async function() {
        fixture = await setupFP({});

        expect(() => fixture.fp.getWireOutValue(0x1f))
            .to.throw()
            .and.has.property('code', ErrorCode.InvalidEndpoint);
        expect(() => fixture.fp.getWireOutValue(0x40))
            .to.throw()
            .and.has.property('code', ErrorCode.InvalidEndpoint);
    });

    it('getWireOutValue tests on the USB 3.0 hosts', async function() {
        fixture = await setupFP({ bitfile: BITFILE_FRONTPANEL_TEST });

        let u32Mask: number;
        // Get the proper wire mask so that we only test valid bits for
        // the device.
        switch (fixture.devInfo.wireWidth) {
            case 8:
                u32Mask = 0x000000ff;
                break;
            case 16:
                u32Mask = 0x0000ffff;
                break;
            case 32:
                u32Mask = 0xffffffff;
                break;
            default:
                throw new Error('Unknown wire width.');
        }

        await fixture.fp.updateWireOuts();
        expect(fixture.fp.getWireOutValue(0x30)).to.be.equal(
            (0x600df00d & u32Mask) >>> 0
        );

        for (let i = 0; i < 16; i++) {
            fixture.fp.setWireInValue(0x0f, i);
            await fixture.fp.updateWireIns();
            await fixture.fp.updateWireOuts();
            expect(fixture.fp.getWireOutValue(0x2f)).to.be.equal(
                (i & u32Mask) >>> 0
            );
        }

        fixture.fp.setWireInValue(0x0f, 1);
        await fixture.fp.updateWireIns();
        await fixture.fp.updateWireOuts();
        expect(fixture.fp.getWireOutValue(0x20)).to.be.equal(
            (0x12345678 & u32Mask) >>> 0
        );
        expect(fixture.fp.getWireOutValue(0x3f)).to.be.equal(
            (0x87654321 & u32Mask) >>> 0
        );

        fixture.fp.setWireInValue(0x0f, 2);
        await fixture.fp.updateWireIns();
        await fixture.fp.updateWireOuts();
        expect(fixture.fp.getWireOutValue(0x20)).to.be.equal(
            (0xabcd1234 & u32Mask) >>> 0
        );
        expect(fixture.fp.getWireOutValue(0x3f)).to.be.equal(
            (0x1234abcd & u32Mask) >>> 0
        );
    });

    it('setWireInValue tests on the USB 3.0 hosts', async function() {
        fixture = await setupFP({ bitfile: BITFILE_FRONTPANEL_TEST });

        let u32Mask: number;
        // Get the proper wire mask so that we only test valid bits for
        // the device.
        switch (fixture.devInfo.wireWidth) {
            case 8:
                u32Mask = 0x000000ff;
                break;
            case 16:
                u32Mask = 0x0000ffff;
                break;
            case 32:
                u32Mask = 0xffffffff;
                break;
            default:
                throw new Error('Unknown wire width.');
        }

        fixture.fp.setWireInValue(0x0f, 3);
        fixture.fp.setWireInValue(0x00, 0x55555555);
        fixture.fp.setWireInValue(0x1f, 0x55555555);
        await fixture.fp.updateWireIns();
        await fixture.fp.updateWireOuts();
        expect(fixture.fp.getWireOutValue(0x20)).to.be.equal(
            (0x55555555 & u32Mask) >>> 0
        );
        expect(fixture.fp.getWireOutValue(0x3f)).to.be.equal(
            (0x55555555 & u32Mask) >>> 0
        );

        fixture.fp.setWireInValue(0x00, 0xaaaaaaaa);
        fixture.fp.setWireInValue(0x1f, 0xaaaaaaaa);
        await fixture.fp.updateWireIns();
        await fixture.fp.updateWireOuts();
        expect(fixture.fp.getWireOutValue(0x20)).to.be.equal(
            (0xaaaaaaaa & u32Mask) >>> 0
        );
        expect(fixture.fp.getWireOutValue(0x3f)).to.be.equal(
            (0xaaaaaaaa & u32Mask) >>> 0
        );

        let wire_exp = (0x12345678 & u32Mask) >>> 0;
        fixture.fp.setWireInValue(0x00, wire_exp, 0xffffffff);
        await fixture.fp.updateWireIns();
        await fixture.fp.updateWireOuts();
        expect(fixture.fp.getWireOutValue(0x20)).to.be.equal(wire_exp);

        // Mask test
        wire_exp = (0x1a3a5a7a & u32Mask) >>> 0;
        fixture.fp.setWireInValue(0x00, 0x12345678, 0xffffffff);
        fixture.fp.setWireInValue(0x00, 0xaaaaaaaa, 0x0f0f0f0f);
        await fixture.fp.updateWireIns();
        await fixture.fp.updateWireOuts();
        expect(fixture.fp.getWireOutValue(0x20)).to.be.equal(wire_exp);

        // Mask test
        wire_exp = (0xa2a4a6a8 & u32Mask) >>> 0;
        fixture.fp.setWireInValue(0x00, 0x12345678, 0xffffffff);
        fixture.fp.setWireInValue(0x00, 0xaaaaaaaa, 0xf0f0f0f0);
        await fixture.fp.updateWireIns();
        await fixture.fp.updateWireOuts();
        expect(fixture.fp.getWireOutValue(0x20)).to.be.equal(wire_exp);
    });

    afterEach(async () => {
        await teardownFP(fixture);
    });
});
