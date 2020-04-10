/**
 * The FrontPanel error.
 */

/**
 * FrontPanel API return codes.
 */
export enum ErrorCode {
    Failed = -1,
    Timeout = -2,
    DoneNotHigh = -3,
    TransferError = -4,
    CommunicationError = -5,
    InvalidBitstream = -6,
    FileError = -7,
    DeviceNotOpen = -8,
    InvalidEndpoint = -9,
    InvalidBlockSize = -10,
    I2CRestrictedAddress = -11,
    I2CBitError = -12,
    I2CNack = -13,
    I2CUnknownStatus = -14,
    UnsupportedFeature = -15,
    FIFOUnderflow = -16,
    FIFOOverflow = -17,
    DataAlignmentError = -18,
    InvalidResetProfile = -19,
    InvalidParameter = -20,
    DisconnectByClient = -100,
    DisconnectByServer = -101
}

/**
 * The FrontPanel error class.
 */
export class FrontPanelError extends Error {
    public readonly code: ErrorCode;
    public readonly reason: string;

    constructor(code: ErrorCode, reason: string) {
        super(`${reason} with error code ${ErrorCode[code]}`);

        this.code = code;
        this.reason = reason;

        // Set the prototype explicitly.
        // See: https://github.com/microsoft/TypeScript-wiki/blob/adb1638fb20073df92b3d4bbd3821c9b78316faa/Breaking-Changes.md#extending-built-ins-like-error-array-and-map-may-no-longer-work
        Object.setPrototypeOf(this, FrontPanelError.prototype);
    }
}
