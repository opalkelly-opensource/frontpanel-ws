import { expect } from 'chai';
import 'mocha';
import { IFixture, setupFP, teardownFP } from './regression';
import { DividerSource, PLL22150Configuration } from '../src/lib/pll22150-configuration';

describe('Device PLL 22150 Configuration', () => {
    let fixture: IFixture;
    beforeEach(async () => {
        fixture = await setupFP({});
    });

    it('Set/Get PLL Configuration', async function () {
        const originalConfiguration: PLL22150Configuration = await fixture.fp.getPLL22150Configuration();

        // Setup test PLL Configuration.
        const testConfiguration: PLL22150Configuration = new PLL22150Configuration;

        testConfiguration.setReference(originalConfiguration.reference, true);
        testConfiguration.setVCOParameters(originalConfiguration.vcoP + 1, originalConfiguration.vcoQ + 1);
        testConfiguration.setDivider1(DividerSource.DivSrc_VCO, 100);
        testConfiguration.setDivider2(DividerSource.DivSrc_Ref, 20);

        for (let outputIndex = 0; outputIndex < PLL22150Configuration.OUTPUT_COUNT; outputIndex++) {
            testConfiguration.setOutputEnable(outputIndex, ((outputIndex % 3) == 0));
            testConfiguration.setOutputSource(outputIndex, (outputIndex % 6))
        }

        // Set the Test Configuration.
        await fixture.fp.setPLL22150Configuration(testConfiguration);

        // Verify that the Configuration was set.
        const configuration: PLL22150Configuration = await fixture.fp.getPLL22150Configuration();

        for (let outputIndex = 0; outputIndex < PLL22150Configuration.OUTPUT_COUNT; outputIndex++) {
            expect(configuration.getOutputFrequency(outputIndex)).equals(testConfiguration.getOutputFrequency(outputIndex));
        }

        // Restore the Original Configuration.
        await fixture.fp.setPLL22150Configuration(testConfiguration);
    });

    it('Set/Get PLL Configuration from EEPROM', async () => {
        const originalConfiguration: PLL22150Configuration = await fixture.fp.getEepromPLL22150Configuration();

        // Setup test PLL Configuration.
        const testConfiguration: PLL22150Configuration = new PLL22150Configuration;

        testConfiguration.setReference(originalConfiguration.reference, true);
        testConfiguration.setVCOParameters(originalConfiguration.vcoP + 1, originalConfiguration.vcoQ + 1);
        testConfiguration.setDivider1(DividerSource.DivSrc_VCO, 100);
        testConfiguration.setDivider2(DividerSource.DivSrc_Ref, 20);

        for (let outputIndex = 0; outputIndex < PLL22150Configuration.OUTPUT_COUNT; outputIndex++) {
            testConfiguration.setOutputEnable(outputIndex, ((outputIndex % 3) == 0));
            testConfiguration.setOutputSource(outputIndex, (outputIndex % 6))
        }

        // Set the Test Configuration.
        await fixture.fp.setEepromPLL22150Configuration(testConfiguration);

        // Verify that the Configuration was set.
        const configuration: PLL22150Configuration = await fixture.fp.getEepromPLL22150Configuration();

        for (let outputIndex = 0; outputIndex < PLL22150Configuration.OUTPUT_COUNT; outputIndex++) {
            expect(configuration.getOutputFrequency(outputIndex)).equals(testConfiguration.getOutputFrequency(outputIndex));
        }

        // Restore the Original Configuration.
        await fixture.fp.setEepromPLL22150Configuration(testConfiguration);
    });

    afterEach(async () => {
        await teardownFP(fixture);
    });
});
