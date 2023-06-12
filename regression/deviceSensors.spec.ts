import { expect } from 'chai';
import 'mocha';
import { IFixture, setupFP, teardownFP } from './regression';
import { IDeviceSensor, DeviceSensorType } from '../src/lib/device-sensor';

describe('Device Sensors', () => {
    let fixture: IFixture;
    beforeEach(async () => {
        fixture = await setupFP({});
    });

    it('device sensors presence and length', async () => {
        const sensors: IDeviceSensor[] = await fixture.fp.getDeviceSensors()

        expect(sensors).to.have.length.greaterThan(0);
    });

    it('device sensors validate values', async () => {
        const sensors: IDeviceSensor[] = await fixture.fp.getDeviceSensors()

        expect(sensors).to.have.length.greaterThan(0);

        for (let sensorIndex = 0; sensorIndex < sensors.length; sensorIndex++) {
            const sensor: IDeviceSensor = sensors[sensorIndex];

            expect(sensor.type === DeviceSensorType.INVALID).false;
            expect(sensor.id).exist;
            expect(sensor.name).to.have.length.greaterThan(0);
            expect(sensor.description).to.have.length.greaterThan(0);

            expect(sensor.max).exist;
            expect(sensor.min).exist;
            expect(sensor.step).exist;
            expect(sensor.value).exist;
        }
    });

    afterEach(async () => {
        await teardownFP(fixture);
    });
});
