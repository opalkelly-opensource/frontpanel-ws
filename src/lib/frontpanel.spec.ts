import { expect } from 'chai';
import * as fs from 'fs';
import 'mocha';
import { DeviceInterface } from './device-info';
import {
    FrontPanel,
    MAX_DEVICEID_LENGTH,
    MAX_SERIALNUMBER_LENGTH
} from './frontpanel';

const SERVER = 'wss://localhost:9999';
const USER = 'User';
const PASSWORD = 'Test';
const COUNTERS_BITFILE = 'counters.bit';
const PIPETEST_BITFILE = 'pipetest.bit';
const SCRIPT_ENGINE = 1;
const SCRIPT_NAME = 'test.lua';
const SCRIPT_CODE = `
function TestFunction(epTrigger, epWireOut)
    -- Increment the second counter.
    okFP:ActivateTriggerIn(epTrigger, 1)

    -- And read its value.
    okFP:UpdateWireOuts()
    return okFP:GetWireOutValue(epWireOut)
end
`;

function makeBitfilePath(fileName: string, productName: string): string {
    return (
        process.env.okTEST_PATH_BITFILES + '/' + productName + '/' + fileName
    );
}

describe('FrontPanel', () => {
    let frontPanel: FrontPanel;
    beforeEach(async () => {
        frontPanel = new FrontPanel({ server: SERVER, allowSelfSigned: true });
        await frontPanel.connect();
    });

    it('should login', async () => {
        const devices = await frontPanel.login(USER, PASSWORD);

        expect(devices).to.have.lengthOf(1);
        expect(devices[0]).to.be.a('string');
    });

    it('should open the device', async () => {
        const devices = await frontPanel.login(USER, PASSWORD);

        await frontPanel.openDevice(devices[0]);
    });

    it('should get the device info', async () => {
        const devices = await frontPanel.login(USER, PASSWORD);
        await frontPanel.openDevice(devices[0]);

        const info = await frontPanel.getDeviceInfo();
        expect(info.deviceID).to.have.lengthOf.at.most(MAX_DEVICEID_LENGTH);
        expect(info.serialNumber).to.have.lengthOf.at.most(
            MAX_SERIALNUMBER_LENGTH
        );
    });

    it('should configure the device', async () => {
        const devices = await frontPanel.login(USER, PASSWORD);
        await frontPanel.openDevice(devices[0]);

        const info = await frontPanel.getDeviceInfo();

        const bitfilePath = makeBitfilePath(COUNTERS_BITFILE, info.productName);
        const data = new Uint8Array(fs.readFileSync(bitfilePath));
        await frontPanel.configureFPGA(data);

        await frontPanel.updateWireOuts();
        expect(frontPanel.getWireOutValue(0x21)).to.equal(0);
    });

    it('should activate the trigger and check the wire out value', async () => {
        const devices = await frontPanel.login(USER, PASSWORD);
        await frontPanel.openDevice(devices[0]);

        // Increment the second counter.
        await frontPanel.activateTriggerIn(0x40, 1);

        // And read its value.
        await frontPanel.updateAllOuts();
        expect(frontPanel.getWireOutValue(0x21)).to.equal(1);
    });

    it('should read from pipe in and write to pipe out', async () => {
        const devices = await frontPanel.login(USER, PASSWORD);
        await frontPanel.openDevice(devices[0]);

        const info = await frontPanel.getDeviceInfo();

        const bitfilePath = makeBitfilePath(PIPETEST_BITFILE, info.productName);
        const bitfileData = new Uint8Array(fs.readFileSync(bitfilePath));
        await frontPanel.configureFPGA(bitfileData);

        const pipeOutAddr = 0xa0;
        const pipeInAddr = 0x80;
        const length = 0x10;
        const blockSize = length;
        const secondNumberIndex = info.pipeWidth / 8;

        const reset = async () => {
            let throttleBit;
            let resetBit;
            if (info.deviceInterface === DeviceInterface.INTERFACE_USB3) {
                throttleBit = 1;
                resetBit = 0;
            } else {
                throttleBit = 5;
                resetBit = 2;
            }
            frontPanel.setWireInValue(0x02, 0xffffffff); // Pipe In throttle
            frontPanel.setWireInValue(0x01, 0xffffffff); // Pipe Out throttle
            frontPanel.setWireInValue(
                0x00,
                (1 << throttleBit) | (1 << resetBit)
            ); // SET_THROTTLE=1 | RESET=1
            await frontPanel.updateWireIns();
            frontPanel.setWireInValue(
                0x00,
                (0 << throttleBit) | (0 << resetBit)
            ); // SET_THROTTLE=0 | RESET=0
            await frontPanel.updateWireIns();
        };

        // Read from Pipes.
        await reset();
        let pipeData = await frontPanel.readFromBlockPipeOut(
            pipeOutAddr,
            blockSize,
            length
        );
        expect(pipeData).to.have.lengthOf(length);
        expect(pipeData[0]).to.be.equal(1);
        expect(pipeData[secondNumberIndex]).to.be.equal(2);

        await reset();
        pipeData = await frontPanel.readFromPipeOut(pipeOutAddr, length);
        expect(pipeData).to.have.lengthOf(length);
        expect(pipeData[0]).to.be.equal(1);
        expect(pipeData[secondNumberIndex]).to.be.equal(2);

        // Write to Pipes.
        await reset();
        let result = await frontPanel.writeToBlockPipeIn(
            pipeInAddr,
            blockSize,
            pipeData
        );
        expect(result).to.be.equal(length);

        await reset();
        result = await frontPanel.writeToPipeIn(pipeInAddr, pipeData);
        expect(result).to.be.equal(length);
    });

    it('should run the script function', async () => {
        const devices = await frontPanel.login(USER, PASSWORD);
        await frontPanel.openDevice(devices[0]);

        const info = await frontPanel.getDeviceInfo();

        const bitfilePath = makeBitfilePath(COUNTERS_BITFILE, info.productName);
        const data = new Uint8Array(fs.readFileSync(bitfilePath));
        await frontPanel.configureFPGA(data);

        await frontPanel.loadScript(SCRIPT_ENGINE, SCRIPT_NAME, SCRIPT_CODE);

        const result = await frontPanel.runScriptFunction(
            SCRIPT_ENGINE,
            'TestFunction',
            0x40,
            0x21
        );
        expect(result).to.have.lengthOf(1);
        expect(result[0]).to.be.equal(1);

        await frontPanel.destroyScriptEngine(SCRIPT_ENGINE);
    });

    afterEach(async () => {
        if (frontPanel.isConnected) {
            await frontPanel.disconnect();
        }
    });
});
