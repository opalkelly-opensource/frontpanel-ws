import { expect } from 'chai';
import 'mocha';
import { RegisterAddress, RegisterEntry, RegisterEntryList } from '../src/lib/frontpanel-registers';
import { IFixture, setupFP, teardownFP, BITFILE_FRONTPANEL_TEST } from './regression';
import { REGISTER_COUNT } from '../src/FrontPanelAPI';

describe('Registers', () => {
    let fixture: IFixture;

    it('Read and write Registers with host interface in HDL', async function () {
        fixture = await setupFP({ bitfile: BITFILE_FRONTPANEL_TEST });

        const registers: RegisterEntryList = new RegisterEntryList(REGISTER_COUNT);

        registers.addEntry(0x00, 0x00adfe00)
        registers.addEntry(0xfe, 0xfeadfead)
        registers.addEntry(0x73, 0xdeaffead)
        registers.addEntry(0xff, 0xffeeaadd)

        const entries: RegisterEntry[] = registers.registerEntries;

        await fixture.fp.writeRegisters(entries);

        const targetAddresses: RegisterAddress[] = [];

        targetAddresses[0] = entries[0][0];
        targetAddresses[1] = entries[1][0];

        // Read the first two registers that were written.
        let resultRegisters = await fixture.fp.readRegisters(targetAddresses);

        expect(resultRegisters.length).to.be.equal(targetAddresses.length);

        for (let resultIndex = 0; resultIndex < resultRegisters.length; resultIndex++) {
            expect(resultRegisters[resultIndex][0]).to.be.equal(entries[resultIndex][0]);
            expect(resultRegisters[resultIndex][1]).to.be.equal(entries[resultIndex][1]);
        }

        // Read all the registers that were written.
        targetAddresses[2] = entries[2][0];
        targetAddresses[3] = entries[3][0];

        resultRegisters = await fixture.fp.readRegisters(targetAddresses);

        expect(resultRegisters.length).to.be.equal(targetAddresses.length);

        for (let resultIndex = 0; resultIndex < resultRegisters.length; resultIndex++) {
            expect(resultRegisters[resultIndex][0]).to.be.equal(entries[resultIndex][0]);
            expect(resultRegisters[resultIndex][1]).to.be.equal(entries[resultIndex][1]);
        }
    });

    afterEach(async () => {
        await teardownFP(fixture);
    });
});
