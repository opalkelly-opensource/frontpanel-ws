import * as fs from 'fs';
import { FrontPanel, IDeviceInfo } from '../src/FrontPanelAPI';
import { URL } from 'url';

export const BITFILE_FRONTPANEL_TEST = 'fptest_hv.bit';
export const BITFILE_NOHOST = 'nohost.bit';
// Use a bitfile for a different board here.
export const BITFILE_INCOMPATIBLE_WITH_FPGA = 'incompatible.bit';

// Input parameters.
export interface IConstructParameters {
    bitfile?: string;
    setupFPNoHost?: boolean;
}

export interface IFixture {
    fp: FrontPanel;
    devInfo: IDeviceInfo;
}

export async function setupFP(
    parameters: IConstructParameters
): Promise<IFixture> {
    const realm =
        process.env.okFP_REALM !== undefined
            ? process.env.okFP_REALM
            : 'wss://User:Test@127.0.0.1:9999';
    const uri = new URL(realm);
    const server = `wss://${uri.host}`;

    const fp = new FrontPanel({ server, allowSelfSigned: true });

    try {
        await fp.connect();

        const devices = await fp.login(uri.username, uri.password);
        if (devices.length === 0) {
            throw new Error('No connected devices');
        }

        await fp.openDevice(devices[0]);

        const devInfo = await fp.getDeviceInfo();

        const fixture: Required<IFixture> = { fp, devInfo };

        if (parameters.bitfile !== undefined) {
            await configureFPGA(fixture, parameters.bitfile);

            const isFPEnabled = await fp.isFrontPanelEnabled();
            if (isFPEnabled !== !parameters.setupFPNoHost) {
                throw new Error(
                    isFPEnabled
                        ? `FrontPanel is enabled in the FPGA configuration (and shouldn't be)`
                        : 'FrontPanel is not enabled in the FPGA configuration'
                );
            }
        }

        return fixture;
    } catch (e) {
        // Disconnect on an error.
        if (fp.isConnected) {
            fp.disconnect();
        }

        throw e;
    }
}

export async function configureFPGA(
    fixture: IFixture,
    bitfile: string
): Promise<void> {
    const bitfilePath = getBitfileFullPath(
        bitfile,
        fixture.devInfo.productName
    );
    const data = new Uint8Array(fs.readFileSync(bitfilePath));
    await fixture.fp.configureFPGA(data);
}

export async function teardownFP(fixture: IFixture): Promise<void> {
    if (fixture !== undefined && fixture.fp.isConnected) {
        await fixture.fp.disconnect();
    }
}

export async function skip(
    fixture: IFixture,
    ctx: Mocha.Context
): Promise<void> {
    await teardownFP(fixture);
    ctx.skip();
}

/**
 * Return the full path to the given bitfile. Notice that this function uses
 * devInfo, i.e. the device must be opened for it to work. It also relies on
 * okTEST_PATH_BITFILES environment variable, containing the root directory
 * with the bit files, being defined.
 */
export function getBitfileFullPath(
    bitfile: string,
    productName: string
): string {
    const root = process.env.okTEST_PATH_BITFILES;
    if (root === undefined) {
        throw new Error('okTEST_PATH_BITFILES environment variable is not set');
    }

    return `${root}/${productName}/${bitfile}`;
}
