import * as chai from 'chai';
import * as chaiAsPromised from 'chai-as-promised';
import 'mocha';
import {
    BITFILE_FRONTPANEL_TEST,
    BITFILE_INCOMPATIBLE_WITH_FPGA,
    BITFILE_NOHOST,
    configureFPGA,
    IFixture,
    setupFP,
    teardownFP
} from './regression';
import { ErrorCode } from '../src/FrontPanelAPI';

chai.use(chaiAsPromised);
const expect = chai.expect;

describe('Config', () => {
    let fixture: IFixture;

    it('configureFPGA with no host interface in HDL', async function() {
        fixture = await setupFP({
            bitfile: BITFILE_NOHOST,
            setupFPNoHost: true
        });

        expect(await fixture.fp.isFrontPanelEnabled()).to.be.false;
    });

    it('configureFPGA with host interface in HDL', async function() {
        fixture = await setupFP({ bitfile: BITFILE_FRONTPANEL_TEST });

        expect(await fixture.fp.isFrontPanelEnabled()).to.be.true;
    });

    it('configureFPGA cycle with host and without host', async function() {
        fixture = await setupFP({});

        // Cycle host-present, host-not-present to confirm that FrontPanel is updating properly.
        await configureFPGA(fixture, BITFILE_NOHOST);
        expect(await fixture.fp.isFrontPanelEnabled()).to.be.false;
        await configureFPGA(fixture, BITFILE_FRONTPANEL_TEST);
        expect(await fixture.fp.isFrontPanelEnabled()).to.be.true;
        await configureFPGA(fixture, BITFILE_NOHOST);
        expect(await fixture.fp.isFrontPanelEnabled()).to.be.false;
        await configureFPGA(fixture, BITFILE_FRONTPANEL_TEST);
        expect(await fixture.fp.isFrontPanelEnabled()).to.be.true;
    });

    it('attempt to configure with incompatible bitfile and then re-configure with host', async function() {
        fixture = await setupFP({});

        await configureFPGA(fixture, BITFILE_FRONTPANEL_TEST);
        expect(await fixture.fp.isFrontPanelEnabled()).to.be.true;
        await expect(
            configureFPGA(fixture, BITFILE_INCOMPATIBLE_WITH_FPGA)
        ).to.eventually.be.rejected.and.has.property(
            'code',
            ErrorCode.DoneNotHigh
        );
        expect(await fixture.fp.isFrontPanelEnabled()).to.be.false;
        await configureFPGA(fixture, BITFILE_FRONTPANEL_TEST);
        expect(await fixture.fp.isFrontPanelEnabled()).to.be.true;
    });

    afterEach(async () => {
        await teardownFP(fixture);
    });
});
