import { expect } from 'chai';
import 'mocha';
import { IFixture, setupFP, teardownFP } from './regression';
import { DeviceSettings } from '../src/lib/device-settings';
import { ErrorCode } from '../src/FrontPanelAPI';

describe('Device Settings', () => {

    let fixture: IFixture;

    beforeEach(async () => {
        fixture = await setupFP({});
    });

    it('device settings list presence and length', async () => {
        const settings: DeviceSettings = fixture.fp.getDeviceSettings();

        const names: string[] = await settings.list();
        expect(names).to.have.length.greaterThan(0);
    });

    it('device settings list names and get integer and string settings', async () => {
        const settings: DeviceSettings = fixture.fp.getDeviceSettings();

        const names: string[] = await settings.list();
        expect(names).to.have.length.greaterThan(0);

        for (let settingIndex = 0; settingIndex < names.length; settingIndex++) {
            // Attempt to retrieve integer setting value.
            let isInteger: boolean;

            try {
                const integerValue: number = await settings.getInt(names[settingIndex]);
                isInteger = true;

                expect(integerValue).exist;
                expect(integerValue).to.be.a('number');
            }
            catch (e) { isInteger = false; }

            // Attempt to retrieve string setting value.
            let isString: boolean;

            try {
                const stringValue: string = await settings.getString(names[settingIndex]);
                isString = true;

                expect(stringValue).exist;
                expect(stringValue).to.be.a('string');
            }
            catch (e) { isString = false; }

            // Verify that either getInt or getString succeeded.
            expect(isInteger || isString).true;
        }
    });

    it('private device settings', async () => {
        const testIntegerName: string = 'OK_TEST_PRIVATE_INT32';
        const testStringName: string = 'OK_TEST_PRIVATE_STRING';

        const settings: DeviceSettings = fixture.fp.getDeviceSettings();
        let names: string[] = await settings.list();

        // Ensure that the Test Integer and String settings are not present.
        if (names.includes(testIntegerName)) {
            await settings.delete(testIntegerName);
        }

        if (names.includes(testStringName)) {
            await settings.delete(testStringName);
        }

        // Verify that private device settings are not present in the settings list.
        expect(names.includes(testIntegerName), 'Is ' + testIntegerName + ' included in list').to.be.false;
        expect(names.includes(testStringName), 'Is ' + testStringName + ' included in list').to.be.false;

        // Verify that write to private device settings operations fails.
        expect(() => settings.setInt(testIntegerName, 12345))
            .to.throw()
            .and.has.property('code', ErrorCode.Failed);
        expect(() => settings.setString(testStringName, 'Test Private String'))
            .to.throw()
            .and.has.property('code', ErrorCode.Failed);

        // Verify that the write operations did not add the settings to the settings list.
        names = await settings.list();

        expect(names.includes(testIntegerName), 'Is ' + testIntegerName + ' included in list after set').to.be.false;
        expect(names.includes(testStringName), 'Is ' + testStringName + ' included in list after set').to.be.false;

        // Verify that reading private device settings fails.
        expect(() => settings.getInt(testIntegerName))
            .to.throw()
            .and.has.property('code', ErrorCode.Failed);
        expect(() => settings.getString(testStringName))
            .to.throw()
            .and.has.property('code', ErrorCode.Failed);

        // Verify that deleting private device settings fails.
        expect(() => settings.delete(testIntegerName))
            .to.throw()
            .and.has.property('code', ErrorCode.Failed);
        expect(() => settings.delete(testStringName))
            .to.throw()
            .and.has.property('code', ErrorCode.Failed);
    });

    it('public device settings', async () => {
        const testIntegerName: string = 'OK_TEST_PUBLIC_INT32';
        const testStringName: string = 'OK_TEST_PUBLIC_STRING';

        const testIntegerValue: number = 12345;
        const testStringValue: string = 'Test Public String';

        const settings: DeviceSettings = fixture.fp.getDeviceSettings();

        let names: string[] = await settings.list();
        expect(names).to.have.length.greaterThan(0);

        // Ensure that the Test Integer and String settings are not present.
        if (names.includes(testIntegerName)) {
            await settings.delete(testIntegerName);
        }

        if (names.includes(testStringName)) {
            await settings.delete(testStringName);
        }

        // Verify that write to public device settings succeeds.
        await settings.setInt(testIntegerName, testIntegerValue);
        await settings.setString(testStringName, testStringValue);

        // Verify that the write operations added the settings to the settings list.
        names = await settings.list();

        expect(names.includes(testIntegerName), 'Is ' + testIntegerName + ' included in list after set').to.be.true;
        expect(names.includes(testStringName), 'Is ' + testStringName + ' included in list after set').to.be.true;

        // Verify that reading public device settings succeeds.
        const integerValue: number = await settings.getInt(testIntegerName);

        expect(integerValue).equals(testIntegerValue);

        const stringValue: string = await settings.getString(testStringName);

        expect(stringValue).equals(testStringValue);

        // Verify that deleting public device settings succeeds.
        await settings.delete(testIntegerName);
        await settings.delete(testStringName);

        // Verify that the delete operations removed the settings from the settings list.
        names = await settings.list();

        expect(names.includes(testIntegerName), 'Is ' + testIntegerName + ' included in list after delete').to.be.false;
        expect(names.includes(testStringName), 'Is ' + testStringName + ' included in list after delete').to.be.false;

    });

    it('public readonly device settings', async () => {
        const testIntegerName: string = 'OK_TEST_FIXED_INT32';
        const testStringName: string = 'OK_TEST_FIXED_STRING';

        const testIntegerValue: number = 12345;
        const testStringValue: string = 'Test ReadOnly String';

        const settings: DeviceSettings = fixture.fp.getDeviceSettings();

        let names: string[] = await settings.list();
        expect(names).to.have.length.greaterThan(0);

        // Ensure that the Test Integer and String settings are not present.
        if (names.includes(testIntegerName)) {
            await settings.delete(testIntegerName);
        }

        if (names.includes(testStringName)) {
            await settings.delete(testStringName);
        }

        // Verify that write to public readonly device settings fails.
        expect(() => settings.setInt(testIntegerName, testIntegerValue), 'Write ' + testIntegerName + ' Value=' + testIntegerValue)
            .to.throw()
            .and.has.property('code', ErrorCode.Failed);
        expect(() => settings.setString(testStringName, testStringValue), 'Write ' + testStringName + ' Value=' + testStringValue)
            .to.throw()
            .and.has.property('code', ErrorCode.Failed);

        // Verify that the write operations did not add the settings to the settings list.
        names = await settings.list();

        expect(names.includes(testIntegerName), 'Is ' + testIntegerName + ' included').to.be.false;
        expect(names.includes(testStringName), 'Is ' + testStringName + ' included').to.be.false;

        // Verify that reading public readonly device settings succeeds.
        const integerValue: number = await settings.getInt(testIntegerName);

        expect(integerValue).equals(testIntegerValue);

        const stringValue: string = await settings.getString(testStringName);

        expect(stringValue).equals(testStringValue);

        // Verify that deleting public device settings succeeds.
        await settings.delete(testIntegerName);
        await settings.delete(testStringName);

        // Verify that the delete operations removed the settings from the settings list.
        names = await settings.list();

        expect(names.includes(testIntegerName), 'Expected ' + testIntegerName + ' not to be included in list after set').to.be.false;
        expect(names.includes(testStringName), 'Expected ' + testStringName + ' not to be included in list after set').to.be.false;

    });

    it('public writeonly device settings', async () => {
        const testIntegerName: string = 'OK_TEST_WRITEONLY_INT32';
        const testStringName: string = 'OK_TEST_WRITEONLY_STRING';

        const testIntegerValue: number = 12345;
        const testStringValue: string = 'Test WriteOnly String';

        const settings: DeviceSettings = fixture.fp.getDeviceSettings();

        let names: string[] = await settings.list();
        expect(names).to.have.length.greaterThan(0);

        // Ensure that the Test Integer and String settings are not present.
        if (names.includes(testIntegerName)) {
            await settings.delete(testIntegerName);
        }

        if (names.includes(testStringName)) {
            await settings.delete(testStringName);
        }

        // Verify that write to public device settings succeeds.
        await settings.setInt(testIntegerName, testIntegerValue);
        await settings.setString(testStringName, testStringValue);

        // Verify that the write operations added the settings to the settings list.
        names = await settings.list();

        expect(names.includes(testIntegerName), 'Is ' + testIntegerName + ' included in list after set').to.be.true;
        expect(names.includes(testStringName), 'Is ' + testStringName + ' included in list after set').to.be.true;

        // Verify that reading public writeonly device settings fails.
        expect(() => settings.getInt(testIntegerName), 'Read ' + testIntegerName)
            .to.throw()
            .and.has.property('code', ErrorCode.Failed);
        expect(() => settings.getString(testStringName), 'Read ' + testStringName)
            .to.throw()
            .and.has.property('code', ErrorCode.Failed);

        // Verify that deleting public device settings succeeds.
        await settings.delete(testIntegerName);
        await settings.delete(testStringName);

        // Verify that the delete operations removed the settings from the settings list.
        names = await settings.list();

        expect(names.includes(testIntegerName), 'Is ' + testIntegerName + ' included in list after delete').to.be.false;
        expect(names.includes(testStringName), 'Is ' + testStringName + ' included in list after delete').to.be.false;

    });

    afterEach(async () => {
        await teardownFP(fixture);
    });
});
