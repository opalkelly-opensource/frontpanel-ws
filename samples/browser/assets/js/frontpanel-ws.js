(function(f){if(typeof exports==="object"&&typeof module!=="undefined"){module.exports=f()}else if(typeof define==="function"&&define.amd){define([],f)}else{var g;if(typeof window!=="undefined"){g=window}else if(typeof global!=="undefined"){g=global}else if(typeof self!=="undefined"){g=self}else{g=this}g.frontpanelWs = f()}})(function(){var define,module,exports;return (function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
"use strict";
function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
Object.defineProperty(exports, "__esModule", { value: true });
__export(require("./lib/frontpanel"));
__export(require("./lib/device-info"));
var ws_async_1 = require("./lib/ws-async");
exports.Notification = ws_async_1.Notification;
var error_1 = require("./lib/error");
exports.ErrorCode = error_1.ErrorCode;
exports.FrontPanelError = error_1.FrontPanelError;

},{"./lib/device-info":2,"./lib/error":3,"./lib/frontpanel":4,"./lib/ws-async":6}],2:[function(require,module,exports){
"use strict";
/**
 * Describes several attributes of a connected device.
 */
Object.defineProperty(exports, "__esModule", { value: true });
var ProductID;
(function (ProductID) {
    ProductID[ProductID["PRODUCT_UNKNOWN"] = 0] = "PRODUCT_UNKNOWN";
    ProductID[ProductID["PRODUCT_XEM3001V1"] = 1] = "PRODUCT_XEM3001V1";
    ProductID[ProductID["PRODUCT_XEM3001V2"] = 2] = "PRODUCT_XEM3001V2";
    ProductID[ProductID["PRODUCT_XEM3010"] = 3] = "PRODUCT_XEM3010";
    ProductID[ProductID["PRODUCT_XEM3005"] = 4] = "PRODUCT_XEM3005";
    ProductID[ProductID["PRODUCT_XEM3001CL"] = 5] = "PRODUCT_XEM3001CL";
    ProductID[ProductID["PRODUCT_XEM3020"] = 6] = "PRODUCT_XEM3020";
    ProductID[ProductID["PRODUCT_XEM3050"] = 7] = "PRODUCT_XEM3050";
    ProductID[ProductID["PRODUCT_XEM9002"] = 8] = "PRODUCT_XEM9002";
    ProductID[ProductID["PRODUCT_XEM3001RB"] = 9] = "PRODUCT_XEM3001RB";
    ProductID[ProductID["PRODUCT_XEM5010"] = 10] = "PRODUCT_XEM5010";
    ProductID[ProductID["PRODUCT_XEM6110LX45"] = 11] = "PRODUCT_XEM6110LX45";
    ProductID[ProductID["PRODUCT_XEM6001"] = 12] = "PRODUCT_XEM6001";
    ProductID[ProductID["PRODUCT_XEM6010LX45"] = 13] = "PRODUCT_XEM6010LX45";
    ProductID[ProductID["PRODUCT_XEM6010LX150"] = 14] = "PRODUCT_XEM6010LX150";
    ProductID[ProductID["PRODUCT_XEM6110LX150"] = 15] = "PRODUCT_XEM6110LX150";
    ProductID[ProductID["PRODUCT_XEM6006LX9"] = 16] = "PRODUCT_XEM6006LX9";
    ProductID[ProductID["PRODUCT_XEM6006LX16"] = 17] = "PRODUCT_XEM6006LX16";
    ProductID[ProductID["PRODUCT_XEM6006LX25"] = 18] = "PRODUCT_XEM6006LX25";
    ProductID[ProductID["PRODUCT_XEM5010LX110"] = 19] = "PRODUCT_XEM5010LX110";
    ProductID[ProductID["PRODUCT_ZEM4310"] = 20] = "PRODUCT_ZEM4310";
    ProductID[ProductID["PRODUCT_XEM6310LX45"] = 21] = "PRODUCT_XEM6310LX45";
    ProductID[ProductID["PRODUCT_XEM6310LX150"] = 22] = "PRODUCT_XEM6310LX150";
    ProductID[ProductID["PRODUCT_XEM6110V2LX45"] = 23] = "PRODUCT_XEM6110V2LX45";
    ProductID[ProductID["PRODUCT_XEM6110V2LX150"] = 24] = "PRODUCT_XEM6110V2LX150";
    ProductID[ProductID["PRODUCT_XEM6002LX9"] = 25] = "PRODUCT_XEM6002LX9";
    ProductID[ProductID["PRODUCT_XEM6310MTLX45T"] = 26] = "PRODUCT_XEM6310MTLX45T";
    ProductID[ProductID["PRODUCT_XEM6320LX130T"] = 27] = "PRODUCT_XEM6320LX130T";
    ProductID[ProductID["PRODUCT_XEM7350K70T"] = 28] = "PRODUCT_XEM7350K70T";
    ProductID[ProductID["PRODUCT_XEM7350K160T"] = 29] = "PRODUCT_XEM7350K160T";
    ProductID[ProductID["PRODUCT_XEM7350K410T"] = 30] = "PRODUCT_XEM7350K410T";
    ProductID[ProductID["PRODUCT_XEM6310MTLX150T"] = 31] = "PRODUCT_XEM6310MTLX150T";
    ProductID[ProductID["PRODUCT_ZEM5305A2"] = 32] = "PRODUCT_ZEM5305A2";
    ProductID[ProductID["PRODUCT_ZEM5305A7"] = 33] = "PRODUCT_ZEM5305A7";
    ProductID[ProductID["PRODUCT_XEM7001A15"] = 34] = "PRODUCT_XEM7001A15";
    ProductID[ProductID["PRODUCT_XEM7001A35"] = 35] = "PRODUCT_XEM7001A35";
    ProductID[ProductID["PRODUCT_XEM7360K160T"] = 36] = "PRODUCT_XEM7360K160T";
    ProductID[ProductID["PRODUCT_XEM7360K410T"] = 37] = "PRODUCT_XEM7360K410T";
    ProductID[ProductID["PRODUCT_ZEM5310A4"] = 38] = "PRODUCT_ZEM5310A4";
    ProductID[ProductID["PRODUCT_ZEM5310A7"] = 39] = "PRODUCT_ZEM5310A7";
    ProductID[ProductID["PRODUCT_ZEM5370A5"] = 40] = "PRODUCT_ZEM5370A5";
    ProductID[ProductID["PRODUCT_XEM7010A50"] = 41] = "PRODUCT_XEM7010A50";
    ProductID[ProductID["PRODUCT_XEM7010A200"] = 42] = "PRODUCT_XEM7010A200";
    ProductID[ProductID["PRODUCT_XEM7310A75"] = 43] = "PRODUCT_XEM7310A75";
    ProductID[ProductID["PRODUCT_XEM7310A200"] = 44] = "PRODUCT_XEM7310A200";
    ProductID[ProductID["PRODUCT_XEM7320A75T"] = 45] = "PRODUCT_XEM7320A75T";
    ProductID[ProductID["PRODUCT_XEM7320A200T"] = 46] = "PRODUCT_XEM7320A200T";
    ProductID[ProductID["PRODUCT_XEM7305"] = 47] = "PRODUCT_XEM7305";
    ProductID[ProductID["PRODUCT_FPXBARE"] = 48] = "PRODUCT_FPXBARE";
    ProductID[ProductID["PRODUCT_XEM8350KU060"] = 49] = "PRODUCT_XEM8350KU060";
    ProductID[ProductID["PRODUCT_XEM8350KU085"] = 50] = "PRODUCT_XEM8350KU085";
    ProductID[ProductID["PRODUCT_XEM8350KU115"] = 51] = "PRODUCT_XEM8350KU115";
    ProductID[ProductID["PRODUCT_XEM8350SECONDARY"] = 52] = "PRODUCT_XEM8350SECONDARY";
    ProductID[ProductID["PRODUCT_XEM7310MTA75"] = 53] = "PRODUCT_XEM7310MTA75";
    ProductID[ProductID["PRODUCT_XEM7310MTA200"] = 54] = "PRODUCT_XEM7310MTA200";
})(ProductID = exports.ProductID || (exports.ProductID = {}));
var DeviceInterface;
(function (DeviceInterface) {
    DeviceInterface[DeviceInterface["INTERFACE_UNKNOWN"] = 0] = "INTERFACE_UNKNOWN";
    DeviceInterface[DeviceInterface["INTERFACE_USB2"] = 1] = "INTERFACE_USB2";
    DeviceInterface[DeviceInterface["INTERFACE_PCIE"] = 2] = "INTERFACE_PCIE";
    DeviceInterface[DeviceInterface["INTERFACE_USB3"] = 3] = "INTERFACE_USB3";
})(DeviceInterface = exports.DeviceInterface || (exports.DeviceInterface = {}));
var USBSpeed;
(function (USBSpeed) {
    USBSpeed[USBSpeed["USBSPEED_UNKNOWN"] = 0] = "USBSPEED_UNKNOWN";
    USBSpeed[USBSpeed["USBSPEED_FULL"] = 1] = "USBSPEED_FULL";
    USBSpeed[USBSpeed["USBSPEED_HIGH"] = 2] = "USBSPEED_HIGH";
    USBSpeed[USBSpeed["USBSPEED_SUPER"] = 3] = "USBSPEED_SUPER";
})(USBSpeed = exports.USBSpeed || (exports.USBSpeed = {}));
var FPGAVendor;
(function (FPGAVendor) {
    FPGAVendor[FPGAVendor["FPGAVENDOR_UNKNOWN"] = 0] = "FPGAVENDOR_UNKNOWN";
    FPGAVendor[FPGAVendor["FPGAVENDOR_XILINX"] = 1] = "FPGAVENDOR_XILINX";
    FPGAVendor[FPGAVendor["FPGAVENDOR_INTEL"] = 2] = "FPGAVENDOR_INTEL";
})(FPGAVendor = exports.FPGAVendor || (exports.FPGAVendor = {}));

},{}],3:[function(require,module,exports){
"use strict";
/**
 * The FrontPanel error.
 */
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * FrontPanel API return codes.
 */
var ErrorCode;
(function (ErrorCode) {
    ErrorCode[ErrorCode["Failed"] = -1] = "Failed";
    ErrorCode[ErrorCode["Timeout"] = -2] = "Timeout";
    ErrorCode[ErrorCode["DoneNotHigh"] = -3] = "DoneNotHigh";
    ErrorCode[ErrorCode["TransferError"] = -4] = "TransferError";
    ErrorCode[ErrorCode["CommunicationError"] = -5] = "CommunicationError";
    ErrorCode[ErrorCode["InvalidBitstream"] = -6] = "InvalidBitstream";
    ErrorCode[ErrorCode["FileError"] = -7] = "FileError";
    ErrorCode[ErrorCode["DeviceNotOpen"] = -8] = "DeviceNotOpen";
    ErrorCode[ErrorCode["InvalidEndpoint"] = -9] = "InvalidEndpoint";
    ErrorCode[ErrorCode["InvalidBlockSize"] = -10] = "InvalidBlockSize";
    ErrorCode[ErrorCode["I2CRestrictedAddress"] = -11] = "I2CRestrictedAddress";
    ErrorCode[ErrorCode["I2CBitError"] = -12] = "I2CBitError";
    ErrorCode[ErrorCode["I2CNack"] = -13] = "I2CNack";
    ErrorCode[ErrorCode["I2CUnknownStatus"] = -14] = "I2CUnknownStatus";
    ErrorCode[ErrorCode["UnsupportedFeature"] = -15] = "UnsupportedFeature";
    ErrorCode[ErrorCode["FIFOUnderflow"] = -16] = "FIFOUnderflow";
    ErrorCode[ErrorCode["FIFOOverflow"] = -17] = "FIFOOverflow";
    ErrorCode[ErrorCode["DataAlignmentError"] = -18] = "DataAlignmentError";
    ErrorCode[ErrorCode["InvalidResetProfile"] = -19] = "InvalidResetProfile";
    ErrorCode[ErrorCode["InvalidParameter"] = -20] = "InvalidParameter";
    ErrorCode[ErrorCode["DisconnectByClient"] = -100] = "DisconnectByClient";
    ErrorCode[ErrorCode["DisconnectByServer"] = -101] = "DisconnectByServer";
})(ErrorCode = exports.ErrorCode || (exports.ErrorCode = {}));
/**
 * The FrontPanel error class.
 */
var FrontPanelError = /** @class */ (function (_super) {
    __extends(FrontPanelError, _super);
    function FrontPanelError(code, reason) {
        var _this = _super.call(this, reason + " with error code " + ErrorCode[code]) || this;
        _this.code = code;
        _this.reason = reason;
        // Set the prototype explicitly.
        // See: https://github.com/microsoft/TypeScript-wiki/blob/adb1638fb20073df92b3d4bbd3821c9b78316faa/Breaking-Changes.md#extending-built-ins-like-error-array-and-map-may-no-longer-work
        Object.setPrototypeOf(_this, FrontPanelError.prototype);
        return _this;
    }
    return FrontPanelError;
}(Error));
exports.FrontPanelError = FrontPanelError;

},{}],4:[function(require,module,exports){
"use strict";
/**
 * The FrontPanel Web API implements the client part of FPoIP protocol.
 */
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __spreadArrays = (this && this.__spreadArrays) || function () {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var error_1 = require("./error");
var ws_async_1 = require("./ws-async");
exports.MAX_SERIALNUMBER_LENGTH = 10;
exports.MAX_DEVICEID_LENGTH = 32;
exports.MAX_SECURITY_DATA_LENGTH = 64;
exports.MAX_ENDPOINTS = 256;
exports.MAX_COMPONENTS = 256;
exports.FIRST_WIREIN_ENDPOINT = 0x00;
exports.LAST_WIREIN_ENDPOINT = 0x1f;
exports.FIRST_WIREOUT_ENDPOINT = 0x20;
exports.LAST_WIREOUT_ENDPOINT = 0x3f;
exports.FIRST_TRIGGERIN_ENDPOINT = 0x40;
exports.LAST_TRIGGERIN_ENDPOINT = 0x5f;
exports.FIRST_TRIGGEROUT_ENDPOINT = 0x60;
exports.LAST_TRIGGEROUT_ENDPOINT = 0x7f;
exports.FIRST_PIPEIN_ENDPOINT = 0x80;
exports.LAST_PIPEIN_ENDPOINT = 0x9f;
exports.FIRST_PIPEOUT_ENDPOINT = 0xa0;
exports.LAST_PIPEOUT_ENDPOINT = 0xbf;
var PROTOCOL_VERSION = 18;
function makeError(e, msg) {
    var code = e instanceof error_1.FrontPanelError ? e.code : error_1.ErrorCode.Failed;
    var errorMsg = e instanceof error_1.FrontPanelError
        ? e.reason
        : e instanceof Error
            ? e.message
            : e;
    return new error_1.FrontPanelError(code, msg + " with error " + errorMsg);
}
/**
 * This is the class that encapsulates the functionality of the FPGA
 * boards as well as the FrontPanel extensions such as wire and trigger
 * endpoints.
 */
var FrontPanel = /** @class */ (function () {
    function FrontPanel(parameters) {
        this.ws = new ws_async_1.AsyncWebSocket(parameters.server, parameters.allowSelfSigned === true);
        this.wireInValues = new Array(exports.LAST_WIREIN_ENDPOINT - exports.FIRST_WIREIN_ENDPOINT + 1);
        this.wireOutValues = new Array(exports.LAST_WIREOUT_ENDPOINT - exports.FIRST_WIREOUT_ENDPOINT + 1);
        this.triggerOutValues = new Array(exports.LAST_TRIGGEROUT_ENDPOINT - exports.FIRST_TRIGGEROUT_ENDPOINT + 1);
        this._resetValues();
    }
    Object.defineProperty(FrontPanel.prototype, "isConnected", {
        get: function () {
            return this.ws.isOpened;
        },
        enumerable: true,
        configurable: true
    });
    FrontPanel.prototype.connect = function () {
        return __awaiter(this, void 0, void 0, function () {
            var e_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, this.ws.open()];
                    case 1:
                        _a.sent();
                        return [3 /*break*/, 3];
                    case 2:
                        e_1 = _a.sent();
                        throw makeError(e_1, 'Failed to connect');
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    FrontPanel.prototype.disconnect = function (code) {
        return __awaiter(this, void 0, void 0, function () {
            var e_2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, this.ws.close(code)];
                    case 1:
                        _a.sent();
                        return [3 /*break*/, 3];
                    case 2:
                        e_2 = _a.sent();
                        throw makeError(e_2, 'Failed to disconnect');
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    FrontPanel.prototype.waitForServer = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                try {
                    return [2 /*return*/, this.ws.waitForServer()];
                }
                catch (e) {
                    throw makeError(e, 'Failed to wait for the server reply');
                }
                return [2 /*return*/];
            });
        });
    };
    FrontPanel.prototype.login = function (username, password) {
        return __awaiter(this, void 0, void 0, function () {
            var devices;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this._sendRequest(RequestCode.Login, PROTOCOL_VERSION, username, password)];
                    case 1:
                        devices = _a.sent();
                        return [2 /*return*/, devices.data];
                }
            });
        });
    };
    FrontPanel.prototype.openDevice = function (device) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this._sendRequest(RequestCode.Open, device)];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    FrontPanel.prototype.closeDevice = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this._sendRequest(RequestCode.CloseDevice)];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    FrontPanel.prototype.getDeviceInfo = function () {
        return __awaiter(this, void 0, void 0, function () {
            var info, result;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this._sendRequest(RequestCode.GetDeviceInfo)];
                    case 1:
                        info = _a.sent();
                        result = {
                            deviceID: info.data[0],
                            serialNumber: info.data[1],
                            productName: info.data[2],
                            productID: info.data[3],
                            deviceInterface: info.data[4],
                            usbSpeed: info.data[5],
                            deviceMajorVersion: info.data[6],
                            deviceMinorVersion: info.data[7],
                            hostInterfaceMajorVersion: info.data[8],
                            hostInterfaceMinorVersion: info.data[9],
                            isPLL22150Supported: info.data[10],
                            isPLL22393Supported: info.data[11],
                            isFrontPanelEnabled: info.data[12],
                            wireWidth: info.data[13],
                            triggerWidth: info.data[14],
                            pipeWidth: info.data[15],
                            registerAddressWidth: info.data[16],
                            registerDataWidth: info.data[17],
                            flashSystem: {
                                sectorCount: info.data[18][0],
                                sectorSize: info.data[18][1],
                                pageSize: info.data[18][2],
                                minUserSector: info.data[18][3],
                                maxUserSector: info.data[18][4]
                            },
                            flashFPGA: {
                                sectorCount: info.data[19][0],
                                sectorSize: info.data[19][1],
                                pageSize: info.data[19][2],
                                minUserSector: info.data[19][3],
                                maxUserSector: info.data[19][4]
                            },
                            hasFMCEEPROM: info.data[20],
                            hasResetProfiles: info.data[21],
                            fpgaVendor: info.data[22],
                            interfaceCount: info.data[23],
                            interfaceIndex: info.data[24],
                            configuresFromSystemFlash: info.data[25],
                            hasQuadConfigFlash: info.data[26]
                        };
                        return [2 /*return*/, result];
                }
            });
        });
    };
    /**
     * Returns true if FrontPanel-3 is firmware-supported.
     */
    FrontPanel.prototype.isFrontPanel3Supported = function () {
        return __awaiter(this, void 0, void 0, function () {
            var reply;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this._sendRequest(RequestCode.IsFrontPanel3Supported)];
                    case 1:
                        reply = _a.sent();
                        return [2 /*return*/, reply.data];
                }
            });
        });
    };
    /**
     * At the completion of a BTPipeIn transfer, the host polls the
     * hardware to confirm that all of the data has been consumed
     * by the FPGA before returning from the function. The polling
     * interval is set by this method.
     *
     * The valid range for this interval is 1 to 100 milliseconds.
     * Values outside this range throws the error [[Failed]].
     * The default is 25 milliseconds.
     *
     * @param interval Polling interval (in milliseconds).
     */
    FrontPanel.prototype.setBTPipePollingInterval = function (interval) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this._sendRequest(RequestCode.SetBTPipePollingInterval, interval)];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    /**
     * This method modifies the XEM Device ID string with the new string.
     * The Device ID string is a user-programmable string of up to 32 characters
     * that can be used to uniquely identify a particular XEM. The string will
     * be truncated if it exceeds 32 characters.
     *
     * @param str A string containing the new Device ID.
     */
    FrontPanel.prototype.setDeviceID = function (str) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this._sendRequest(RequestCode.SetDeviceID, str)];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    /**
     * This method sets the timeout value used by USB transactions when
     * communicating with the target device. Note that this is not necessarily
     * the timeout for a particular API call. By default, the timeout is
     * set to 10 seconds).
     *
     * Note that a timeout is not always provided by the underlying calls nor
     * by the operating system. Most generally, the timeout will apply to
     * pipe transfers and FPGA configuration transfers.
     *
     * @param timeout Timeout duration specified in milliseconds.
     */
    FrontPanel.prototype.setTimeout = function (timeout) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this._sendRequest(RequestCode.SetTimeout, timeout)];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    /**
     * Returns the length of the last transfer (successful or not).
     */
    FrontPanel.prototype.getLastTransferLength = function () {
        return __awaiter(this, void 0, void 0, function () {
            var reply;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this._sendRequest(RequestCode.GetLastTransferLength)];
                    case 1:
                        reply = _a.sent();
                        return [2 /*return*/, reply.data];
                }
            });
        });
    };
    /**
     * Performs a RESET of the FPGA internals. This requires that FrontPanel
     * support be present in the FPGA design because the RESET signal actually
     * comes from the FrontPanel Host Interface.
     */
    FrontPanel.prototype.resetFPGA = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this._sendRequest(RequestCode.ResetFPGA)];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    FrontPanel.prototype.configureFPGA = function (buf) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        // (Re)configuring the devices resets all wire/trigger values.
                        this._resetValues();
                        return [4 /*yield*/, this._sendRequest(RequestCode.ConfigureFPGA, buf)];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    /**
     * Activates a given trigger.
     */
    FrontPanel.prototype.activateTriggerIn = function (epAddr, bit) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this._sendRequest(RequestCode.ActivateTriggerIn, epAddr, bit)];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    /**
     * This method reads a string of bytes from the target I2C address. This
     * transfer does not utilize the FPGA and can be done prior to configuration.
     *
     * The following errors can be thrown:
     * - DeviceNotOpen - Communication with a XEM is not established.
     * - CommunicationError - Communication error with the firmware.
     * - I2CRestrictedAddress - Read from a restricted I2C address.
     * - I2CBitError - I2C bit error occurred.
     * - I2CNack - I2C device responded with NACK.
     * - I2CUnknownStatus - Unknown result status.
     *
     * @param addr I2C address of the target device.
     * @param length Length of data (in bytes).
     */
    FrontPanel.prototype.readI2C = function (addr, length) {
        return __awaiter(this, void 0, void 0, function () {
            var result;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this._sendRequest(RequestCode.ReadI2C, addr, length)];
                    case 1:
                        result = _a.sent();
                        return [2 /*return*/, result.data];
                }
            });
        });
    };
    /**
     * Reads data from a BlockPipeOut endpoint.
     */
    FrontPanel.prototype.readFromBlockPipeOut = function (epAddr, blockSize, length) {
        return __awaiter(this, void 0, void 0, function () {
            var result;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this._sendRequest(RequestCode.ReadFromBlockPipeOut, epAddr, blockSize, length)];
                    case 1:
                        result = _a.sent();
                        return [2 /*return*/, result.data];
                }
            });
        });
    };
    /**
     * Reads a block from a Pipe Out endpoint.
     */
    FrontPanel.prototype.readFromPipeOut = function (epAddr, length) {
        return __awaiter(this, void 0, void 0, function () {
            var result;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this._sendRequest(RequestCode.ReadFromPipeOut, epAddr, length)];
                    case 1:
                        result = _a.sent();
                        return [2 /*return*/, result.data];
                }
            });
        });
    };
    /**
     * Gets the value of a particular Wire In from the internal wire data structure.
     */
    FrontPanel.prototype.getWireInValue = function (epAddr) {
        if (epAddr < exports.FIRST_WIREIN_ENDPOINT || epAddr > exports.LAST_WIREIN_ENDPOINT) {
            throw new error_1.FrontPanelError(error_1.ErrorCode.InvalidEndpoint, 'The wire in endpoint address is out of range');
        }
        return this.wireInValues[epAddr - exports.FIRST_WIREIN_ENDPOINT];
    };
    /**
     * Prepare a script for later execution.
     *
     * This method parses the given Lua code and makes it possible to execute
     * functions defined in it later, see [[runScriptFunction]].
     */
    FrontPanel.prototype.loadScript = function (engine, name, code) {
        return __awaiter(this, void 0, void 0, function () {
            var result;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this._sendRequest(RequestCode.LoadScript, engine, name, code)];
                    case 1:
                        result = _a.sent();
                        if (result.data !== true) {
                            throw new error_1.FrontPanelError(error_1.ErrorCode.Failed, result.data);
                        }
                        return [2 /*return*/];
                }
            });
        });
    };
    /**
     * Runs a function defined in a previously loaded script, see [[loadScript]].
     */
    FrontPanel.prototype.runScriptFunction = function (engine, name) {
        var args = [];
        for (var _i = 2; _i < arguments.length; _i++) {
            args[_i - 2] = arguments[_i];
        }
        return __awaiter(this, void 0, void 0, function () {
            var result, values, lastValue;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this._sendRequest(RequestCode.RunScriptFunction, engine, name, __spreadArrays(args))];
                    case 1:
                        result = _a.sent();
                        values = result.data;
                        lastValue = values.pop();
                        if (lastValue !== true) {
                            throw new error_1.FrontPanelError(error_1.ErrorCode.Failed, lastValue);
                        }
                        return [2 /*return*/, values];
                }
            });
        });
    };
    /**
     * Destroys the script engine earlier loaded in [[loadScript]] function.
     */
    FrontPanel.prototype.destroyScriptEngine = function (engine) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this._sendRequest(RequestCode.DestroyScriptEngine, engine)];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    /**
     * This method checks to see if the FrontPanel Host Interface has been
     * instantiated in the FPGA design. If it is detected, FrontPanel support
     * is enabled and endpoint functionality is available.
     */
    FrontPanel.prototype.isFrontPanelEnabled = function () {
        return __awaiter(this, void 0, void 0, function () {
            var reply;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this._sendRequest(RequestCode.IsFrontPanelEnabled)];
                    case 1:
                        reply = _a.sent();
                        return [2 /*return*/, reply.data];
                }
            });
        });
    };
    /**
     * Gets the value of a particular Wire Out from the internal wire data structure.
     */
    FrontPanel.prototype.getWireOutValue = function (epAddr) {
        if (epAddr < exports.FIRST_WIREOUT_ENDPOINT || epAddr > exports.LAST_WIREOUT_ENDPOINT) {
            throw new error_1.FrontPanelError(error_1.ErrorCode.InvalidEndpoint, 'The wire out endpoint address is out of range');
        }
        return this.wireOutValues[epAddr - exports.FIRST_WIREOUT_ENDPOINT];
    };
    /**
     * Returns true if the trigger has been triggered.
     */
    FrontPanel.prototype.isTriggered = function (epAddr, mask) {
        if (epAddr < exports.FIRST_TRIGGEROUT_ENDPOINT ||
            epAddr > exports.LAST_TRIGGEROUT_ENDPOINT) {
            throw new error_1.FrontPanelError(error_1.ErrorCode.InvalidEndpoint, 'The trigger out endpoint address is out of range');
        }
        var epIndex = epAddr - exports.FIRST_TRIGGEROUT_ENDPOINT;
        return (this.triggerOutValues[epIndex] & mask) !== 0;
    };
    /**
     * Returns the value of the given trigger.
     */
    FrontPanel.prototype.getTriggerOutVector = function (epAddr) {
        if (epAddr < exports.FIRST_TRIGGEROUT_ENDPOINT ||
            epAddr > exports.LAST_TRIGGEROUT_ENDPOINT) {
            throw new error_1.FrontPanelError(error_1.ErrorCode.InvalidEndpoint, 'The trigger out endpoint address is out of range');
        }
        return this.triggerOutValues[epAddr - exports.FIRST_TRIGGEROUT_ENDPOINT];
    };
    /**
     * Sets a wire value in the internal wire data structure.
     */
    FrontPanel.prototype.setWireInValue = function (epAddr, val, mask) {
        if (epAddr < exports.FIRST_WIREIN_ENDPOINT || epAddr > exports.LAST_WIREIN_ENDPOINT) {
            throw new error_1.FrontPanelError(error_1.ErrorCode.InvalidEndpoint, 'The wire in endpoint address is out of range');
        }
        var epIndex = epAddr - exports.FIRST_WIREIN_ENDPOINT;
        var m = mask === undefined ? 0xffffffff : mask;
        var newValue = this.wireInValues[epIndex] & ~m;
        newValue = newValue | (val & m);
        // Bitwise operations in JS/TS are performed on signed 32bit numbers
        // so convert the result back to the 32 bit unsigned number.
        newValue >>>= 0;
        this.wireInValues[epIndex] = newValue;
    };
    /**
     * Reads Trigger Out endpoints.
     */
    FrontPanel.prototype.updateTriggerOuts = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _a = this;
                        return [4 /*yield*/, this._updateTriggerOuts()];
                    case 1:
                        _a.triggerOutValues = _b.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    /**
     * Transfers current Wire In values to the FPGA.
     */
    FrontPanel.prototype.updateWireIns = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this._sendRequest(RequestCode.UpdateWireIns, this.wireInValues)];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    /**
     * Transfers current Wire Out values from the FPGA.
     */
    FrontPanel.prototype.updateWireOuts = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _a = this;
                        return [4 /*yield*/, this._updateWireOuts()];
                    case 1:
                        _a.wireOutValues = _b.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    /**
     * Transfers both trigger and wire outs from the FPGA at once, equivalent
     * to calling [[updateTriggerOuts]] and [[updateWireOuts]] consecutively,
     * but can be more efficient.
     */
    FrontPanel.prototype.updateAllOuts = function () {
        return __awaiter(this, void 0, void 0, function () {
            var numWireOuts, numTriggerOuts, result, values;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        numWireOuts = exports.LAST_WIREOUT_ENDPOINT - exports.FIRST_WIREOUT_ENDPOINT + 1;
                        numTriggerOuts = exports.LAST_TRIGGEROUT_ENDPOINT - exports.FIRST_TRIGGEROUT_ENDPOINT + 1;
                        return [4 /*yield*/, this._sendRequest(RequestCode.UpdateAllOuts)];
                    case 1:
                        result = _a.sent();
                        values = result.data;
                        if (values.length !== numWireOuts + numTriggerOuts) {
                            throw new error_1.FrontPanelError(error_1.ErrorCode.Failed, 'Trigger and wire outs update failed: unexpectedly received ' +
                                (values.length + " values instead of ") +
                                (numWireOuts + numTriggerOuts + " expected ones."));
                        }
                        this.triggerOutValues = values.splice(0, numTriggerOuts);
                        this.wireOutValues = values;
                        return [2 /*return*/];
                }
            });
        });
    };
    /**
     * This method writes a string of bytes to the target I2C address. This
     * transfer does not utilize the FPGA and can be done prior to configuration.
     *
     * The following errors can be thrown:
     * - DeviceNotOpen - Communication with a XEM is not established.
     * - CommunicationError - Communication error with the firmware.
     * - I2CRestrictedAddress - Write to a restricted I2C address.
     * - I2CBitError - I2C bit error occurred.
     * - I2CNack - I2C device responded with NACK.
     * - I2CUnknownStatus - Unknown result status.
     *
     * @param addr I2C address of the target device.
     * @param buf Data to be written.
     */
    FrontPanel.prototype.writeI2C = function (addr, buf) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this._sendRequest(RequestCode.WriteI2C, addr, buf)];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    /**
     * Writes data to a BlockPipeIn endpoint.
     */
    FrontPanel.prototype.writeToBlockPipeIn = function (epAddr, blockSize, buf) {
        return __awaiter(this, void 0, void 0, function () {
            var result;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this._sendRequest(RequestCode.WriteToBlockPipeIn, epAddr, blockSize, buf)];
                    case 1:
                        result = _a.sent();
                        return [2 /*return*/, result.data];
                }
            });
        });
    };
    /**
     * Writes a block to a Pipe In endpoint.
     */
    FrontPanel.prototype.writeToPipeIn = function (epAddr, buf) {
        return __awaiter(this, void 0, void 0, function () {
            var result;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this._sendRequest(RequestCode.WriteToPipeIn, epAddr, buf)];
                    case 1:
                        result = _a.sent();
                        return [2 /*return*/, result.data];
                }
            });
        });
    };
    FrontPanel.prototype._updateWireOuts = function () {
        return __awaiter(this, void 0, void 0, function () {
            var numWireOuts, result;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        numWireOuts = exports.LAST_WIREOUT_ENDPOINT - exports.FIRST_WIREOUT_ENDPOINT + 1;
                        return [4 /*yield*/, this._sendRequest(RequestCode.UpdateWireOuts)];
                    case 1:
                        result = _a.sent();
                        if (result.data.length !== numWireOuts) {
                            throw new error_1.FrontPanelError(error_1.ErrorCode.Failed, 'Wire outs update failed: unexpectedly received ' +
                                (result.data.length + " values instead of ") +
                                (numWireOuts + " expected ones."));
                        }
                        return [2 /*return*/, result.data];
                }
            });
        });
    };
    FrontPanel.prototype._updateTriggerOuts = function () {
        return __awaiter(this, void 0, void 0, function () {
            var numTriggerOuts, result;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        numTriggerOuts = exports.LAST_TRIGGEROUT_ENDPOINT - exports.FIRST_TRIGGEROUT_ENDPOINT + 1;
                        return [4 /*yield*/, this._sendRequest(RequestCode.UpdateTriggerOuts)];
                    case 1:
                        result = _a.sent();
                        if (result.data.length !== numTriggerOuts) {
                            throw new error_1.FrontPanelError(error_1.ErrorCode.Failed, 'Trigger outs update failed: unexpected received ' +
                                (result.data.length + " values instead of ") +
                                (numTriggerOuts + " expected ones."));
                        }
                        return [2 /*return*/, result.data];
                }
            });
        });
    };
    FrontPanel.prototype._resetValues = function () {
        this.wireInValues.fill(0);
        this.wireOutValues.fill(0);
        this.triggerOutValues.fill(0);
    };
    FrontPanel.prototype._sendRequest = function (req) {
        var args = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            args[_i - 1] = arguments[_i];
        }
        return __awaiter(this, void 0, void 0, function () {
            var request, reply, e_3;
            var _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _b.trys.push([0, 2, , 3]);
                        request = [req].concat(args);
                        return [4 /*yield*/, (_a = this.ws).send.apply(_a, request)];
                    case 1:
                        reply = _b.sent();
                        return [2 /*return*/, reply];
                    case 2:
                        e_3 = _b.sent();
                        throw makeError(e_3, "Request " + RequestCode[req] + " failed");
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    return FrontPanel;
}());
exports.FrontPanel = FrontPanel;
// FPOIP request constants.
var RequestCode;
(function (RequestCode) {
    RequestCode[RequestCode["Login"] = 1] = "Login";
    RequestCode[RequestCode["Open"] = 2] = "Open";
    RequestCode[RequestCode["GetDeviceInfo"] = 3] = "GetDeviceInfo";
    RequestCode[RequestCode["GetDeviceInfoPrivate"] = 4] = "GetDeviceInfoPrivate";
    RequestCode[RequestCode["GetHostInterfaceWidth"] = 5] = "GetHostInterfaceWidth";
    RequestCode[RequestCode["IsFrontPanel3Supported"] = 6] = "IsFrontPanel3Supported";
    RequestCode[RequestCode["SetBTPipePollingInterval"] = 7] = "SetBTPipePollingInterval";
    RequestCode[RequestCode["SetDeviceID"] = 8] = "SetDeviceID";
    RequestCode[RequestCode["SetTimeout"] = 9] = "SetTimeout";
    RequestCode[RequestCode["GetLastTransferLength"] = 10] = "GetLastTransferLength";
    RequestCode[RequestCode["ResetFPGA"] = 11] = "ResetFPGA";
    RequestCode[RequestCode["ActivateTriggerIn"] = 12] = "ActivateTriggerIn";
    RequestCode[RequestCode["ReadI2C"] = 13] = "ReadI2C";
    RequestCode[RequestCode["ReadFromBlockPipeOut"] = 14] = "ReadFromBlockPipeOut";
    RequestCode[RequestCode["ReadFromPipeOut"] = 15] = "ReadFromPipeOut";
    RequestCode[RequestCode["ConfigureFPGA"] = 16] = "ConfigureFPGA";
    RequestCode[RequestCode["LoadScript"] = 17] = "LoadScript";
    RequestCode[RequestCode["RunScriptFunction"] = 18] = "RunScriptFunction";
    RequestCode[RequestCode["DestroyScriptEngine"] = 19] = "DestroyScriptEngine";
    RequestCode[RequestCode["IsFrontPanelEnabled"] = 20] = "IsFrontPanelEnabled";
    RequestCode[RequestCode["UpdateWireIns"] = 21] = "UpdateWireIns";
    RequestCode[RequestCode["UpdateWireOuts"] = 22] = "UpdateWireOuts";
    RequestCode[RequestCode["UpdateTriggerOuts"] = 23] = "UpdateTriggerOuts";
    RequestCode[RequestCode["UpdateAllOuts"] = 24] = "UpdateAllOuts";
    RequestCode[RequestCode["WriteI2C"] = 25] = "WriteI2C";
    RequestCode[RequestCode["WriteToPipeIn"] = 26] = "WriteToPipeIn";
    RequestCode[RequestCode["WriteToBlockPipeIn"] = 27] = "WriteToBlockPipeIn";
    RequestCode[RequestCode["CloseDevice"] = 28] = "CloseDevice";
})(RequestCode || (RequestCode = {}));

},{"./error":3,"./ws-async":6}],5:[function(require,module,exports){
"use strict";
/**
 * The async operations.
 */
Object.defineProperty(exports, "__esModule", { value: true });
var AsyncOperation = /** @class */ (function () {
    function AsyncOperation(operation) {
        var _this = this;
        this.resolveCb = function () {
            /* Nothing to do by default. */
        };
        this.rejectCb = function () {
            /* Nothing to do by default. */
        };
        this.promise = new Promise(function (resolve, reject) {
            _this.resolveCb = resolve;
            _this.rejectCb = reject;
            operation();
        });
    }
    AsyncOperation.prototype.resolve = function (value) {
        this.resolveCb(value);
    };
    AsyncOperation.prototype.reject = function (reason) {
        this.rejectCb(reason);
    };
    return AsyncOperation;
}());
exports.AsyncOperation = AsyncOperation;

},{}],6:[function(require,module,exports){
"use strict";
/**
 * Implement promise-based WebSocket API, in order to keep dependencies
 * of this module minimal.
 */
Object.defineProperty(exports, "__esModule", { value: true });
var msgpack_1 = require("@msgpack/msgpack");
var WebSocket = require("isomorphic-ws");
var error_1 = require("./error");
var operation_1 = require("./operation");
function isBrowser() {
    return typeof window !== "undefined";
}
// see: https://developer.mozilla.org/en-US/docs/Web/API/WebSocket#Ready_state_constants
var ReadyState;
(function (ReadyState) {
    ReadyState[ReadyState["CONNECTING"] = 0] = "CONNECTING";
    ReadyState[ReadyState["OPEN"] = 1] = "OPEN";
    ReadyState[ReadyState["CLOSING"] = 2] = "CLOSING";
    ReadyState[ReadyState["CLOSED"] = 3] = "CLOSED";
})(ReadyState || (ReadyState = {}));
var NoError = 0;
// As a special case, server may send unsolicited replies with the session ID
// and sequence number of 0. They indicate notifications about server events
// not corresponding to any client requests, e.g. a device [dis]connection,
// and for them the result code is replaced with the notification opcode and
// the return value is used to transport the notification payload.
var Notification;
(function (Notification) {
    Notification[Notification["DeviceConnected"] = 1] = "DeviceConnected";
    Notification[Notification["DeviceDisconnected"] = 2] = "DeviceDisconnected";
})(Notification = exports.Notification || (exports.Notification = {}));
/**
 * The WebSockedAsPromised class.
 */
var AsyncWebSocket = /** @class */ (function () {
    /**
     * Constructor. Unlike original WebSocket it does not immediately open connection.
     * Please call [[open]] method to connect.
     *
     * @param {String} url WebSocket URL.
     * @param {boolean} allowSelfSigned Whether the server certificate is not
     *                  verified against the list of supplied CAs. Allow connection
     *                  to servers with self signed certificates.
     */
    function AsyncWebSocket(url, allowSelfSigned) {
        this.url = url;
        this.requests = new Map();
        this.replies = [];
        this.openOperation = null;
        this.closeOperation = null;
        this.replyOperation = null;
        this.ws = null;
        this.disconnecting = false;
        this.allowSelfSigned = allowSelfSigned;
        this.lastError = undefined;
        this.session = 1;
        this.sequenceNumber = 0;
    }
    Object.defineProperty(AsyncWebSocket.prototype, "isOpening", {
        /**
         * Is WebSocket connection in opening state.
         *
         * @returns {boolean}
         */
        get: function () {
            return this.ws !== null && this.ws.readyState === ReadyState.CONNECTING;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AsyncWebSocket.prototype, "isOpened", {
        /**
         * Is WebSocket connection opened.
         *
         * @returns {boolean}
         */
        get: function () {
            return this.ws !== null && this.ws.readyState === ReadyState.OPEN;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AsyncWebSocket.prototype, "isClosing", {
        /**
         * Is WebSocket connection in closing state.
         *
         * @returns {Boolean}
         */
        get: function () {
            return this.ws !== null && this.ws.readyState === ReadyState.CLOSING;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AsyncWebSocket.prototype, "isClosed", {
        /**
         * Is WebSocket connection closed.
         *
         * @returns {boolean}
         */
        get: function () {
            return this.ws === null || this.ws.readyState === ReadyState.CLOSED;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * Opens WebSocket connection.
     *
     * @returns {Promise<void>}
     */
    AsyncWebSocket.prototype.open = function () {
        var _this = this;
        if (this.ws !== null) {
            // TODO: Replace with switch/case. Currently for TS 3.6.4 returning from
            //       a case statement will rise the error: TS7029 Fallthrough case in switch.
            if (this.ws.readyState === ReadyState.OPEN) {
                return Promise.resolve();
            }
            else if (this.ws.readyState === ReadyState.CONNECTING) {
                this._rejectWithError(new error_1.FrontPanelError(error_1.ErrorCode.Failed, 'WebSocket opening already in progress'));
            }
            else if (this.ws.readyState === ReadyState.CLOSING) {
                this._rejectWithError(new error_1.FrontPanelError(error_1.ErrorCode.Failed, 'WebSocket is closing right now'));
            }
        }
        if (this.lastError) {
            return Promise.reject(this.lastError);
        }
        this.openOperation = new operation_1.AsyncOperation(function () {
            _this.disconnecting = false;
            // Allow connection to servers with self-signed certificates for the
            // Node.js implementation. We can't do the same for the browser.
            // User should open https://server/ in a browser by himself and
            // accept the certificate manually (when connecting to wss://server/).
            _this.ws =
                isBrowser() || !_this.allowSelfSigned
                    ? new WebSocket(_this.url)
                    : new WebSocket(_this.url, undefined, {
                        rejectUnauthorized: false
                    });
            // msgpack-lite doesn't seem to work directly with blobs, so
            // we'd have to convert them to arrays on reception otherwise
            // using FileReader and avoiding this makes things simpler
            // (but maybe also slower? to be checked...)
            _this.ws.binaryType = 'arraybuffer';
            _this.ws.onopen = function () { return _this._handleOpen(); };
            _this.ws.onerror = function () { return _this._handleError(); };
            _this.ws.onclose = function (event) {
                return _this._handleClose(event);
            };
            _this.ws.onmessage = function (event) {
                return _this._handleMessage(event);
            };
        });
        return this.openOperation.promise;
    };
    /**
     * Closes WebSocket connection.
     *
     * @returns {Promise<>}
     */
    AsyncWebSocket.prototype.close = function (code) {
        var _this = this;
        if (this.isClosed) {
            Promise.resolve();
        }
        if (!this.isOpened) {
            this._rejectWithError(new error_1.FrontPanelError(error_1.ErrorCode.Failed, 'Failed to close not opened WebSocket'));
        }
        // In case of an error WebSocket.close already was called in
        // _RejectWithError so we can simply reject the promise.
        if (this.lastError) {
            return Promise.reject(this.lastError);
        }
        this.closeOperation = new operation_1.AsyncOperation(function () {
            // The client is started disconnection.
            _this.disconnecting = true;
            _this._getWS().close(code);
        });
        return this.closeOperation.promise;
    };
    /**
     * Returns promised which will be satisfied when the reply is received.
     *
     * @param {*} data The data to send.
     * @returns {Promise}
     */
    AsyncWebSocket.prototype.send = function () {
        var _this = this;
        var data = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            data[_i] = arguments[_i];
        }
        if (!this.isOpened) {
            this._rejectWithError(new error_1.FrontPanelError(error_1.ErrorCode.Failed, 'Failed to send: WebSocket is not opened'));
        }
        if (this.lastError) {
            return Promise.reject(this.lastError);
        }
        this.sequenceNumber++;
        var requestId = this.sequenceNumber;
        var request = new operation_1.AsyncOperation(function () {
            var dataToSend = [_this.session, requestId].concat(data);
            var buf = msgpack_1.encode(dataToSend);
            _this._getWS().send(buf);
        });
        this.requests.set(requestId, request);
        return request.promise;
    };
    /**
     * Waits for reply which is not requested by Send.
     * The replies are filtered by the replyId.
     *
     * @returns {Promise}
     */
    AsyncWebSocket.prototype.waitForServer = function () {
        var _this = this;
        if (!this.isOpened) {
            this._rejectWithError(new error_1.FrontPanelError(error_1.ErrorCode.Failed, 'Failed to wait for reply: WebSocket is not opened'));
        }
        if (this.lastError) {
            return Promise.reject(this.lastError);
        }
        this.replyOperation = new operation_1.AsyncOperation(function () {
            if (_this.replyOperation !== null) {
                // Check for replies.
                var replyOrError = _this.replies.shift();
                if (replyOrError) {
                    if (replyOrError.reply) {
                        _this.replyOperation.resolve(replyOrError.reply);
                    }
                    else {
                        _this.replyOperation.reject(replyOrError.error);
                    }
                    _this.replyOperation = null;
                }
            }
        });
        return this.replyOperation.promise;
    };
    AsyncWebSocket.prototype._handleOpen = function () {
        if (this.openOperation) {
            this.openOperation.resolve();
            this.openOperation = null;
        }
    };
    AsyncWebSocket.prototype._handleError = function () {
        this._rejectWithError(new error_1.FrontPanelError(error_1.ErrorCode.CommunicationError, 'Communication error'));
    };
    AsyncWebSocket.prototype._handleClose = function (event) {
        // Reject all pending operations if any.
        if (this.openOperation !== null ||
            this.replyOperation !== null ||
            this.requests.size !== 0) {
            this._rejectWithError(new error_1.FrontPanelError(this.disconnecting
                ? error_1.ErrorCode.DisconnectByClient
                : error_1.ErrorCode.DisconnectByServer, "WebSocket closed with reason: " + event.reason + " (" + event.code + ")"), true /* Do not reject close */);
        }
        if (this.closeOperation) {
            this.closeOperation.resolve();
            this.closeOperation = null;
            this.ws = null;
        }
    };
    AsyncWebSocket.prototype._handleMessage = function (event) {
        // Do nothing if we already are in error state.
        if (this.lastError) {
            return;
        }
        try {
            var elements = msgpack_1.decode(new Uint8Array(event.data));
            if (!Array.isArray(elements)) {
                throw new error_1.FrontPanelError(error_1.ErrorCode.CommunicationError, 'The reply is unexpectedly not an array');
            }
            if (elements.length < 3) {
                throw new error_1.FrontPanelError(error_1.ErrorCode.CommunicationError, "Unexpectedly few elements in the reply " + elements);
            }
            var session = elements[0];
            elements.shift();
            if (session !== this.session && session !== 0) {
                throw new error_1.FrontPanelError(error_1.ErrorCode.CommunicationError, "Unexpected session ID " + session);
            }
            var replyId = elements[0];
            elements.shift();
            // The error for the current reply. We correctly parse
            // the reply data with the session number and the reply number.
            // So we can reject the single reply instead of failing the whole state.
            var replyError = null;
            // Whether the reply is solicited.
            var notification = void 0;
            if (session === 0 && replyId === 0) {
                notification = elements[0];
            }
            else {
                var errorCode = elements[0];
                if (errorCode !== NoError) {
                    replyError = new error_1.FrontPanelError(errorCode, "Reply #" + replyId + " failed");
                }
            }
            elements.shift();
            if (replyError === null && elements.length > 1) {
                replyError = new error_1.FrontPanelError(error_1.ErrorCode.Failed, 'Unexpected extra elements in the reply: ' +
                    elements.slice(1));
            }
            // Extract the return value, if any: some requests don't return
            // anything.
            // We could return "undefined" from here, but it compares equal to
            // null, which means that an error has occurred, when using "==",
            // so to avoid any misunderstandings, return an empty array instead.
            var data = elements.length === 0 ? [] : elements[0];
            var reply = { replyId: replyId, session: session, data: data, notification: notification };
            var request = this.requests.get(replyId);
            if (request) {
                if (replyError) {
                    request.reject(replyError);
                }
                else {
                    request.resolve(reply);
                }
                this.requests.delete(replyId);
            }
            else {
                if (this.replyOperation) {
                    if (replyError) {
                        this.replyOperation.reject(replyError);
                    }
                    else {
                        this.replyOperation.resolve(reply);
                    }
                    this.replyOperation = null;
                }
                else {
                    if (replyError) {
                        this.replies.push({ error: replyError });
                    }
                    else {
                        this.replies.push({ reply: reply });
                    }
                }
            }
        }
        catch (e) {
            this._rejectWithError(e);
        }
    };
    AsyncWebSocket.prototype._rejectWithError = function (error, doNotRejectClose) {
        this.lastError = error;
        if (this.openOperation !== null) {
            this.openOperation.reject(error);
            this.openOperation = null;
        }
        if (this.closeOperation !== null && !doNotRejectClose) {
            this.closeOperation.reject(error);
            this.closeOperation = null;
        }
        if (this.replyOperation !== null) {
            this.replyOperation.reject(error);
            this.replyOperation = null;
        }
        if (this.requests.size !== 0) {
            this.requests.forEach(function (request) {
                request.reject(error);
            });
            this.requests.clear();
        }
        // Close WebSocket on an error.
        if (this.ws !== null) {
            this.ws.close();
        }
    };
    AsyncWebSocket.prototype._getWS = function () {
        if (this.ws === null) {
            throw new error_1.FrontPanelError(error_1.ErrorCode.Failed, 'WebSocket is unexpectedly null');
        }
        return this.ws;
    };
    return AsyncWebSocket;
}());
exports.AsyncWebSocket = AsyncWebSocket;

},{"./error":3,"./operation":5,"@msgpack/msgpack":7,"isomorphic-ws":8}],7:[function(require,module,exports){
!function(e,t){"object"==typeof exports&&"object"==typeof module?module.exports=t():"function"==typeof define&&define.amd?define([],t):"object"==typeof exports?exports.MessagePack=t():e.MessagePack=t()}(this,function(){return function(e){var t={};function r(n){if(t[n])return t[n].exports;var i=t[n]={i:n,l:!1,exports:{}};return e[n].call(i.exports,i,i.exports,r),i.l=!0,i.exports}return r.m=e,r.c=t,r.d=function(e,t,n){r.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:n})},r.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},r.t=function(e,t){if(1&t&&(e=r(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var n=Object.create(null);if(r.r(n),Object.defineProperty(n,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var i in e)r.d(n,i,function(t){return e[t]}.bind(null,i));return n},r.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return r.d(t,"a",t),t},r.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},r.p="",r(r.s=0)}([function(e,t,r){"use strict";r.r(t);var n=function(e,t){var r="function"==typeof Symbol&&e[Symbol.iterator];if(!r)return e;var n,i,o=r.call(e),s=[];try{for(;(void 0===t||t-- >0)&&!(n=o.next()).done;)s.push(n.value)}catch(e){i={error:e}}finally{try{n&&!n.done&&(r=o.return)&&r.call(o)}finally{if(i)throw i.error}}return s},i=function(){for(var e=[],t=0;t<arguments.length;t++)e=e.concat(n(arguments[t]));return e},o="undefined"!=typeof TextEncoder&&"undefined"!=typeof TextDecoder;function s(e){for(var t=e.length,r=0,n=0;n<t;){var i=e.charCodeAt(n++);if(0!=(4294967168&i))if(0==(4294965248&i))r+=2;else{if(i>=55296&&i<=56319&&n<t){var o=e.charCodeAt(n);56320==(64512&o)&&(++n,i=((1023&i)<<10)+(1023&o)+65536)}r+=0==(4294901760&i)?3:4}else r++}return r}var a=o?new TextEncoder:void 0;var h=a&&a.encodeInto?function(e,t,r){a.encodeInto(e,t.subarray(r))}:function(e,t,r){t.set(a.encode(e),r)},u=4096;function c(e,t,r){for(var n=t,o=n+r,s=[],a="";n<o;){var h=e[n++];if(0==(128&h))s.push(h);else if(192==(224&h)){var c=63&e[n++];s.push((31&h)<<6|c)}else if(224==(240&h)){c=63&e[n++];var f=63&e[n++];s.push((31&h)<<12|c<<6|f)}else if(240==(248&h)){var l=(7&h)<<18|(c=63&e[n++])<<12|(f=63&e[n++])<<6|63&e[n++];l>65535&&(l-=65536,s.push(l>>>10&1023|55296),l=56320|1023&l),s.push(l)}else s.push(h);s.length>=u&&(a+=String.fromCharCode.apply(String,i(s)),s.length=0)}return s.length>0&&(a+=String.fromCharCode.apply(String,i(s))),a}var f=o?new TextDecoder:null;var l=function(e,t){this.type=e,this.data=t};function p(e,t,r){var n=Math.floor(r/4294967296),i=r;e.setUint32(t,n),e.setUint32(t+4,i)}function d(e,t){return 4294967296*e.getInt32(t)+e.getUint32(t+4)}var y=4294967295,w=17179869183;function v(e){var t=e.sec,r=e.nsec;if(t>=0&&r>=0&&t<=w){if(0===r&&t<=y){var n=new Uint8Array(4);return(s=new DataView(n.buffer)).setUint32(0,t),n}var i=t/4294967296,o=4294967295&t;n=new Uint8Array(8);return(s=new DataView(n.buffer)).setUint32(0,r<<2|3&i),s.setUint32(4,o),n}var s;n=new Uint8Array(12);return(s=new DataView(n.buffer)).setUint32(0,r),p(s,4,t),n}function g(e){var t=e.getTime(),r=Math.floor(t/1e3),n=1e6*(t-1e3*r),i=Math.floor(n/1e9);return{sec:r+i,nsec:n-1e9*i}}function b(e){return e instanceof Date?v(g(e)):null}function m(e){var t=new DataView(e.buffer,e.byteOffset,e.byteLength);switch(e.byteLength){case 4:return{sec:t.getUint32(0),nsec:0};case 8:var r=t.getUint32(0);return{sec:4294967296*(3&r)+t.getUint32(4),nsec:r>>>2};case 12:return{sec:d(t,4),nsec:t.getUint32(0)};default:throw new Error("Unrecognized data size for timestamp: "+e.length)}}function U(e){var t=m(e);return new Date(1e3*t.sec+t.nsec/1e6)}var x={type:-1,encode:b,decode:U},S=function(){function e(){this.builtInEncoders=[],this.builtInDecoders=[],this.encoders=[],this.decoders=[],this.register(x)}return e.prototype.register=function(e){var t=e.type,r=e.encode,n=e.decode;if(t>=0)this.encoders[t]=r,this.decoders[t]=n;else{var i=1+t;this.builtInEncoders[i]=r,this.builtInDecoders[i]=n}},e.prototype.tryToEncode=function(e){for(var t=0;t<this.builtInEncoders.length;t++){if(null!=(r=this.builtInEncoders[t]))if(null!=(n=r(e)))return new l(-1-t,n)}for(t=0;t<this.encoders.length;t++){var r,n;if(null!=(r=this.encoders[t]))if(null!=(n=r(e)))return new l(t,n)}return e instanceof l?e:null},e.prototype.decode=function(e,t){var r=t<0?this.builtInDecoders[-1-t]:this.decoders[t];return r?r(e,t):new l(t,e)},e.defaultCodec=new e,e}();function E(e){return e instanceof Uint8Array?e:ArrayBuffer.isView(e)?new Uint8Array(e.buffer,e.byteOffset,e.byteLength):e instanceof ArrayBuffer?new Uint8Array(e):Uint8Array.from(e)}var B=null,A=!!B;function L(e,t,r){var n=e.length,i=2*n,o=B.malloc(i);!function(e,t,r,n){for(var i=new DataView(B.memory.buffer,e,t),o=0;o<n;o++)i.setUint16(2*o,r.charCodeAt(o))}(o,i,e,n);var s=B.malloc(5+4*n);try{var a=B.utf8EncodeUint16Array(s,o,n);return t.set(new Uint8Array(B.memory.buffer,s,a),r),a}finally{B.free(o),B.free(s)}}var T=65536;function I(e,t,r){var n,i,o,s=B.malloc(r),a=B.malloc(2*r);try{n=s,i=e.subarray(t,t+r),o=r,new Uint8Array(B.memory.buffer,n,o).set(i);var h=B.utf8DecodeToUint16Array(a,s,r);return function(e){if(e.length<=T)return String.fromCharCode.apply(String,e);for(var t="",r=0;r<e.length;r++){var n=e.subarray(r*T,(r+1)*T);t+=String.fromCharCode.apply(String,n)}return t}(new Uint16Array(B.memory.buffer,a,h))}finally{B.free(s),B.free(a)}}var k=function(e){var t="function"==typeof Symbol&&Symbol.iterator,r=t&&e[t],n=0;if(r)return r.call(e);if(e&&"number"==typeof e.length)return{next:function(){return e&&n>=e.length&&(e=void 0),{value:e&&e[n++],done:!e}}};throw new TypeError(t?"Object is not iterable.":"Symbol.iterator is not defined.")},M=100,z=2048,C=function(){function e(e,t,r,n,i){void 0===e&&(e=S.defaultCodec),void 0===t&&(t=M),void 0===r&&(r=z),void 0===n&&(n=!1),void 0===i&&(i=!1),this.extensionCodec=e,this.maxDepth=t,this.initialBufferSize=r,this.sortKeys=n,this.forceFloat32=i,this.pos=0,this.view=new DataView(new ArrayBuffer(this.initialBufferSize)),this.bytes=new Uint8Array(this.view.buffer)}return e.prototype.encode=function(e,t){if(t>this.maxDepth)throw new Error("Too deep objects in depth "+t);null==e?this.encodeNil():"boolean"==typeof e?this.encodeBoolean(e):"number"==typeof e?this.encodeNumber(e):"string"==typeof e?this.encodeString(e):this.encodeObject(e,t)},e.prototype.getUint8Array=function(){return this.bytes.subarray(0,this.pos)},e.prototype.ensureBufferSizeToWrite=function(e){var t=this.pos+e;this.view.byteLength<t&&this.resizeBuffer(2*t)},e.prototype.resizeBuffer=function(e){var t=new ArrayBuffer(e),r=new Uint8Array(t),n=new DataView(t);r.set(this.bytes),this.view=n,this.bytes=r},e.prototype.encodeNil=function(){this.writeU8(192)},e.prototype.encodeBoolean=function(e){!1===e?this.writeU8(194):this.writeU8(195)},e.prototype.encodeNumber=function(e){Number.isSafeInteger(e)?e>=0?e<128?this.writeU8(e):e<256?(this.writeU8(204),this.writeU8(e)):e<65536?(this.writeU8(205),this.writeU16(e)):e<4294967296?(this.writeU8(206),this.writeU32(e)):(this.writeU8(207),this.writeU64(e)):e>=-32?this.writeU8(224|e+32):e>=-128?(this.writeU8(208),this.writeI8(e)):e>=-32768?(this.writeU8(209),this.writeI16(e)):e>=-2147483648?(this.writeU8(210),this.writeI32(e)):(this.writeU8(211),this.writeI64(e)):this.forceFloat32?(this.writeU8(202),this.writeF32(e)):(this.writeU8(203),this.writeF64(e))},e.prototype.writeStringHeader=function(e){if(e<32)this.writeU8(160+e);else if(e<256)this.writeU8(217),this.writeU8(e);else if(e<65536)this.writeU8(218),this.writeU16(e);else{if(!(e<4294967296))throw new Error("Too long string: "+e+" bytes in UTF-8");this.writeU8(219),this.writeU32(e)}},e.prototype.encodeString=function(e){var t=e.length;if(o&&t>200){var r=s(e);this.ensureBufferSizeToWrite(5+r),this.writeStringHeader(r),h(e,this.bytes,this.pos),this.pos+=r}else{if(A&&t>1024){var n=5+4*t;this.ensureBufferSizeToWrite(n);var i=L(e,this.bytes,this.pos);return void(this.pos+=i)}r=s(e);this.ensureBufferSizeToWrite(5+r),this.writeStringHeader(r),function(e,t,r){for(var n=e.length,i=r,o=0;o<n;){var s=e.charCodeAt(o++);if(0!=(4294967168&s)){if(0==(4294965248&s))t[i++]=s>>6&31|192;else{if(s>=55296&&s<=56319&&o<n){var a=e.charCodeAt(o);56320==(64512&a)&&(++o,s=((1023&s)<<10)+(1023&a)+65536)}0==(4294901760&s)?(t[i++]=s>>12&15|224,t[i++]=s>>6&63|128):(t[i++]=s>>18&7|240,t[i++]=s>>12&63|128,t[i++]=s>>6&63|128)}t[i++]=63&s|128}else t[i++]=s}}(e,this.bytes,this.pos),this.pos+=r}},e.prototype.encodeObject=function(e,t){var r=this.extensionCodec.tryToEncode(e);if(null!=r)this.encodeExtension(r);else if(Array.isArray(e))this.encodeArray(e,t);else if(ArrayBuffer.isView(e))this.encodeBinary(e);else{if("object"!=typeof e)throw new Error("Unrecognized object: "+Object.prototype.toString.apply(e));this.encodeMap(e,t)}},e.prototype.encodeBinary=function(e){var t=e.byteLength;if(t<256)this.writeU8(196),this.writeU8(t);else if(t<65536)this.writeU8(197),this.writeU16(t);else{if(!(t<4294967296))throw new Error("Too large binary: "+t);this.writeU8(198),this.writeU32(t)}var r=E(e);this.writeU8a(r)},e.prototype.encodeArray=function(e,t){var r,n,i=e.length;if(i<16)this.writeU8(144+i);else if(i<65536)this.writeU8(220),this.writeU16(i);else{if(!(i<4294967296))throw new Error("Too large array: "+i);this.writeU8(221),this.writeU32(i)}try{for(var o=k(e),s=o.next();!s.done;s=o.next()){var a=s.value;this.encode(a,t+1)}}catch(e){r={error:e}}finally{try{s&&!s.done&&(n=o.return)&&n.call(o)}finally{if(r)throw r.error}}},e.prototype.encodeMap=function(e,t){var r=Object.keys(e);this.sortKeys&&r.sort();var n=r.length;if(n<16)this.writeU8(128+n);else if(n<65536)this.writeU8(222),this.writeU16(n);else{if(!(n<4294967296))throw new Error("Too large map object: "+n);this.writeU8(223),this.writeU32(n)}for(var i=0;i<n;i++){var o=r[i];this.encodeString(o),this.encode(e[o],t+1)}},e.prototype.encodeExtension=function(e){var t=e.data.length;if(1===t)this.writeU8(212);else if(2===t)this.writeU8(213);else if(4===t)this.writeU8(214);else if(8===t)this.writeU8(215);else if(16===t)this.writeU8(216);else if(t<256)this.writeU8(199),this.writeU8(t);else if(t<65536)this.writeU8(200),this.writeU16(t);else{if(!(t<4294967296))throw new Error("Too large extension object: "+t);this.writeU8(201),this.writeU32(t)}this.writeI8(e.type),this.writeU8a(e.data)},e.prototype.writeU8=function(e){this.ensureBufferSizeToWrite(1),this.view.setUint8(this.pos,e),this.pos++},e.prototype.writeU8a=function(e){var t=e.length;this.ensureBufferSizeToWrite(t),this.bytes.set(e,this.pos),this.pos+=t},e.prototype.writeI8=function(e){this.ensureBufferSizeToWrite(1),this.view.setInt8(this.pos,e),this.pos++},e.prototype.writeU16=function(e){this.ensureBufferSizeToWrite(2),this.view.setUint16(this.pos,e),this.pos+=2},e.prototype.writeI16=function(e){this.ensureBufferSizeToWrite(2),this.view.setInt16(this.pos,e),this.pos+=2},e.prototype.writeU32=function(e){this.ensureBufferSizeToWrite(4),this.view.setUint32(this.pos,e),this.pos+=4},e.prototype.writeI32=function(e){this.ensureBufferSizeToWrite(4),this.view.setInt32(this.pos,e),this.pos+=4},e.prototype.writeF32=function(e){this.ensureBufferSizeToWrite(4),this.view.setFloat32(this.pos,e),this.pos+=4},e.prototype.writeF64=function(e){this.ensureBufferSizeToWrite(8),this.view.setFloat64(this.pos,e),this.pos+=8},e.prototype.writeU64=function(e){this.ensureBufferSizeToWrite(8),function(e,t,r){var n=r/4294967296,i=r;e.setUint32(t,n),e.setUint32(t+4,i)}(this.view,this.pos,e),this.pos+=8},e.prototype.writeI64=function(e){this.ensureBufferSizeToWrite(8),p(this.view,this.pos,e),this.pos+=8},e}(),D={};function P(e,t){void 0===t&&(t=D);var r=new C(t.extensionCodec,t.maxDepth,t.initialBufferSize,t.sortKeys,t.forceFloat32);return r.encode(e,1),r.getUint8Array()}function j(e){return(e<0?"-":"")+"0x"+Math.abs(e).toString(16).padStart(2,"0")}var F=16,W=16,O=function(){function e(e,t){void 0===e&&(e=F),void 0===t&&(t=W),this.maxKeyLength=e,this.maxLengthPerKey=t,this.caches=[];for(var r=0;r<this.maxKeyLength;r++)this.caches.push([])}return e.prototype.canBeCached=function(e){return e>0&&e<=this.maxKeyLength},e.prototype.get=function(e,t,r){var n=this.caches[r-1],i=n.length;e:for(var o=0;o<i;o++){for(var s=n[o],a=s.bytes,h=0;h<r;h++)if(a[h]!==e[t+h])continue e;return s.value}return null},e.prototype.store=function(e,t){var r=this.caches[e.length-1],n={bytes:e,value:t};r.length>=this.maxLengthPerKey?r[Math.random()*r.length|0]=n:r.push(n)},e.prototype.decode=function(e,t,r){var n=this.get(e,t,r);if(n)return n;var i=c(e,t,r),o=Uint8Array.prototype.slice.call(e,t,t+r);return this.store(o,i),i},e}(),K=function(e,t,r,n){return new(r||(r=Promise))(function(i,o){function s(e){try{h(n.next(e))}catch(e){o(e)}}function a(e){try{h(n.throw(e))}catch(e){o(e)}}function h(e){var t;e.done?i(e.value):(t=e.value,t instanceof r?t:new r(function(e){e(t)})).then(s,a)}h((n=n.apply(e,t||[])).next())})},_=function(e,t){var r,n,i,o,s={label:0,sent:function(){if(1&i[0])throw i[1];return i[1]},trys:[],ops:[]};return o={next:a(0),throw:a(1),return:a(2)},"function"==typeof Symbol&&(o[Symbol.iterator]=function(){return this}),o;function a(o){return function(a){return function(o){if(r)throw new TypeError("Generator is already executing.");for(;s;)try{if(r=1,n&&(i=2&o[0]?n.return:o[0]?n.throw||((i=n.return)&&i.call(n),0):n.next)&&!(i=i.call(n,o[1])).done)return i;switch(n=0,i&&(o=[2&o[0],i.value]),o[0]){case 0:case 1:i=o;break;case 4:return s.label++,{value:o[1],done:!1};case 5:s.label++,n=o[1],o=[0];continue;case 7:o=s.ops.pop(),s.trys.pop();continue;default:if(!(i=(i=s.trys).length>0&&i[i.length-1])&&(6===o[0]||2===o[0])){s=0;continue}if(3===o[0]&&(!i||o[1]>i[0]&&o[1]<i[3])){s.label=o[1];break}if(6===o[0]&&s.label<i[1]){s.label=i[1],i=o;break}if(i&&s.label<i[2]){s.label=i[2],s.ops.push(o);break}i[2]&&s.ops.pop(),s.trys.pop();continue}o=t.call(e,s)}catch(e){o=[6,e],n=0}finally{r=i=0}if(5&o[0])throw o[1];return{value:o[0]?o[1]:void 0,done:!0}}([o,a])}}},V=function(e){if(!Symbol.asyncIterator)throw new TypeError("Symbol.asyncIterator is not defined.");var t,r=e[Symbol.asyncIterator];return r?r.call(e):(e="function"==typeof __values?__values(e):e[Symbol.iterator](),t={},n("next"),n("throw"),n("return"),t[Symbol.asyncIterator]=function(){return this},t);function n(r){t[r]=e[r]&&function(t){return new Promise(function(n,i){(function(e,t,r,n){Promise.resolve(n).then(function(t){e({value:t,done:r})},t)})(n,i,(t=e[r](t)).done,t.value)})}}},N=function(e){return this instanceof N?(this.v=e,this):new N(e)},R=function(e,t,r){if(!Symbol.asyncIterator)throw new TypeError("Symbol.asyncIterator is not defined.");var n,i=r.apply(e,t||[]),o=[];return n={},s("next"),s("throw"),s("return"),n[Symbol.asyncIterator]=function(){return this},n;function s(e){i[e]&&(n[e]=function(t){return new Promise(function(r,n){o.push([e,t,r,n])>1||a(e,t)})})}function a(e,t){try{(r=i[e](t)).value instanceof N?Promise.resolve(r.value.v).then(h,u):c(o[0][2],r)}catch(e){c(o[0][3],e)}var r}function h(e){a("next",e)}function u(e){a("throw",e)}function c(e,t){e(t),o.shift(),o.length&&a(o[0][0],o[0][1])}},H=-1,G=new DataView(new ArrayBuffer(0)),X=new Uint8Array(G.buffer),q=function(){try{G.getInt8(0)}catch(e){return e.constructor}throw new Error("never reached")}(),J=new q("Insufficient data"),Q=4294967295,Y=new O,Z=function(){function e(e,t,r,n,i,o,s){void 0===e&&(e=S.defaultCodec),void 0===t&&(t=Q),void 0===r&&(r=Q),void 0===n&&(n=Q),void 0===i&&(i=Q),void 0===o&&(o=Q),void 0===s&&(s=Y),this.extensionCodec=e,this.maxStrLength=t,this.maxBinLength=r,this.maxArrayLength=n,this.maxMapLength=i,this.maxExtLength=o,this.cachedKeyDecoder=s,this.totalPos=0,this.pos=0,this.view=G,this.bytes=X,this.headByte=H,this.stack=[]}return e.prototype.setBuffer=function(e){this.bytes=E(e),this.view=function(e){if(e instanceof ArrayBuffer)return new DataView(e);var t=E(e);return new DataView(t.buffer,t.byteOffset,t.byteLength)}(this.bytes),this.pos=0},e.prototype.appendBuffer=function(e){if(this.headByte!==H||this.hasRemaining()){var t=this.bytes.subarray(this.pos),r=E(e),n=new Uint8Array(t.length+r.length);n.set(t),n.set(r,t.length),this.setBuffer(n)}else this.setBuffer(e)},e.prototype.hasRemaining=function(e){return void 0===e&&(e=1),this.view.byteLength-this.pos>=e},e.prototype.createNoExtraBytesError=function(e){var t=this.view,r=this.pos;return new RangeError("Extra "+(t.byteLength-r)+" byte(s) found at buffer["+e+"]")},e.prototype.decodeSingleSync=function(){var e=this.decodeSync();if(this.hasRemaining())throw this.createNoExtraBytesError(this.pos);return e},e.prototype.decodeSingleAsync=function(e){var t,r,n,i;return K(this,void 0,void 0,function(){var o,s,a,h,u,c,f,l;return _(this,function(p){switch(p.label){case 0:o=!1,p.label=1;case 1:p.trys.push([1,6,7,12]),t=V(e),p.label=2;case 2:return[4,t.next()];case 3:if((r=p.sent()).done)return[3,5];if(a=r.value,o)throw this.createNoExtraBytesError(this.totalPos);this.appendBuffer(a);try{s=this.decodeSync(),o=!0}catch(e){if(!(e instanceof q))throw e}this.totalPos+=this.pos,p.label=4;case 4:return[3,2];case 5:return[3,12];case 6:return h=p.sent(),n={error:h},[3,12];case 7:return p.trys.push([7,,10,11]),r&&!r.done&&(i=t.return)?[4,i.call(t)]:[3,9];case 8:p.sent(),p.label=9;case 9:return[3,11];case 10:if(n)throw n.error;return[7];case 11:return[7];case 12:if(o){if(this.hasRemaining())throw this.createNoExtraBytesError(this.totalPos);return[2,s]}throw c=(u=this).headByte,f=u.pos,l=u.totalPos,new RangeError("Insufficient data in parcing "+j(c)+" at "+l+" ("+f+" in the current buffer)")}})})},e.prototype.decodeArrayStream=function(e){return this.decodeMultiAsync(e,!0)},e.prototype.decodeStream=function(e){return this.decodeMultiAsync(e,!1)},e.prototype.decodeMultiAsync=function(e,t){return R(this,arguments,function(){var r,n,i,o,s,a,h,u,c;return _(this,function(f){switch(f.label){case 0:r=t,n=-1,f.label=1;case 1:f.trys.push([1,13,14,19]),i=V(e),f.label=2;case 2:return[4,N(i.next())];case 3:if((o=f.sent()).done)return[3,12];if(s=o.value,t&&0===n)throw this.createNoExtraBytesError(this.totalPos);this.appendBuffer(s),r&&(n=this.readArraySize(),r=!1,this.complete()),f.label=4;case 4:f.trys.push([4,9,,10]),f.label=5;case 5:return[4,N(this.decodeSync())];case 6:return[4,f.sent()];case 7:return f.sent(),0==--n?[3,8]:[3,5];case 8:return[3,10];case 9:if(!((a=f.sent())instanceof q))throw a;return[3,10];case 10:this.totalPos+=this.pos,f.label=11;case 11:return[3,2];case 12:return[3,19];case 13:return h=f.sent(),u={error:h},[3,19];case 14:return f.trys.push([14,,17,18]),o&&!o.done&&(c=i.return)?[4,N(c.call(i))]:[3,16];case 15:f.sent(),f.label=16;case 16:return[3,18];case 17:if(u)throw u.error;return[7];case 18:return[7];case 19:return[2]}})})},e.prototype.decodeSync=function(){e:for(;;){var e=this.readHeadByte(),t=void 0;if(e>=224)t=e-256;else if(e<192)if(e<128)t=e;else if(e<144){if(0!==(n=e-128)){this.pushMapState(n),this.complete();continue e}t={}}else if(e<160){if(0!==(n=e-144)){this.pushArrayState(n),this.complete();continue e}t=[]}else{var r=e-160;t=this.decodeUtf8String(r,0)}else if(192===e)t=null;else if(194===e)t=!1;else if(195===e)t=!0;else if(202===e)t=this.readF32();else if(203===e)t=this.readF64();else if(204===e)t=this.readU8();else if(205===e)t=this.readU16();else if(206===e)t=this.readU32();else if(207===e)t=this.readU64();else if(208===e)t=this.readI8();else if(209===e)t=this.readI16();else if(210===e)t=this.readI32();else if(211===e)t=this.readI64();else if(217===e){r=this.lookU8();t=this.decodeUtf8String(r,1)}else if(218===e){r=this.lookU16();t=this.decodeUtf8String(r,2)}else if(219===e){r=this.lookU32();t=this.decodeUtf8String(r,4)}else if(220===e){if(0!==(n=this.readU16())){this.pushArrayState(n),this.complete();continue e}t=[]}else if(221===e){if(0!==(n=this.readU32())){this.pushArrayState(n),this.complete();continue e}t=[]}else if(222===e){if(0!==(n=this.readU16())){this.pushMapState(n),this.complete();continue e}t={}}else if(223===e){if(0!==(n=this.readU32())){this.pushMapState(n),this.complete();continue e}t={}}else if(196===e){var n=this.lookU8();t=this.decodeBinary(n,1)}else if(197===e){n=this.lookU16();t=this.decodeBinary(n,2)}else if(198===e){n=this.lookU32();t=this.decodeBinary(n,4)}else if(212===e)t=this.decodeExtension(1,0);else if(213===e)t=this.decodeExtension(2,0);else if(214===e)t=this.decodeExtension(4,0);else if(215===e)t=this.decodeExtension(8,0);else if(216===e)t=this.decodeExtension(16,0);else if(199===e){n=this.lookU8();t=this.decodeExtension(n,1)}else if(200===e){n=this.lookU16();t=this.decodeExtension(n,2)}else{if(201!==e)throw new Error("Unrecognized type byte: "+j(e));n=this.lookU32();t=this.decodeExtension(n,4)}this.complete();for(var i=this.stack;i.length>0;){var o=i[i.length-1];if(0===o.type){if(o.array[o.position]=t,o.position++,o.position!==o.size)continue e;i.pop(),t=o.array}else{if(1===o.type){if(s=void 0,"string"!==(s=typeof t)&&"number"!==s)throw new Error("The type of key must be string or number but "+typeof t);o.key=t,o.type=2;continue e}if(2===o.type){if(o.map[o.key]=t,o.readCount++,o.readCount!==o.size){o.key=null,o.type=1;continue e}i.pop(),t=o.map}}}return t}var s},e.prototype.readHeadByte=function(){return this.headByte===H&&(this.headByte=this.readU8()),this.headByte},e.prototype.complete=function(){this.headByte=H},e.prototype.readArraySize=function(){var e=this.readHeadByte();switch(e){case 220:return this.readU16();case 221:return this.readU32();default:if(e<160)return e-144;throw new Error("Unrecognized array type byte: "+j(e))}},e.prototype.pushMapState=function(e){if(e>this.maxMapLength)throw new Error("Max length exceeded: map length ("+e+") > maxMapLengthLength ("+this.maxMapLength+")");this.stack.push({type:1,size:e,key:null,readCount:0,map:{}})},e.prototype.pushArrayState=function(e){if(e>this.maxArrayLength)throw new Error("Max length exceeded: array length ("+e+") > maxArrayLength ("+this.maxArrayLength+")");this.stack.push({type:0,size:e,array:new Array(e),position:0})},e.prototype.decodeUtf8String=function(e,t){if(e>this.maxStrLength)throw new Error("Max length exceeded: UTF-8 byte length ("+e+") > maxStrLength ("+this.maxStrLength+")");if(this.bytes.byteLength<this.pos+t+e)throw J;var r,n=this.pos+t;return r=this.cachedKeyDecoder&&this.stateIsMapKey()&&this.cachedKeyDecoder.canBeCached(e)?this.cachedKeyDecoder.decode(this.bytes,n,e):o&&e>200?function(e,t,r){var n=e.subarray(t,t+r);return f.decode(n)}(this.bytes,n,e):A&&e>1024?I(this.bytes,n,e):c(this.bytes,n,e),this.pos+=t+e,r},e.prototype.stateIsMapKey=function(){return this.stack.length>0&&1===this.stack[this.stack.length-1].type},e.prototype.decodeBinary=function(e,t){if(e>this.maxBinLength)throw new Error("Max length exceeded: bin length ("+e+") > maxBinLength ("+this.maxBinLength+")");if(!this.hasRemaining(e+t))throw J;var r=this.pos+t,n=this.bytes.subarray(r,r+e);return this.pos+=t+e,n},e.prototype.decodeExtension=function(e,t){if(e>this.maxExtLength)throw new Error("Max length exceeded: ext length ("+e+") > maxExtLength ("+this.maxExtLength+")");var r=this.view.getInt8(this.pos+t),n=this.decodeBinary(e,t+1);return this.extensionCodec.decode(n,r)},e.prototype.lookU8=function(){return this.view.getUint8(this.pos)},e.prototype.lookU16=function(){return this.view.getUint16(this.pos)},e.prototype.lookU32=function(){return this.view.getUint32(this.pos)},e.prototype.readU8=function(){var e=this.view.getUint8(this.pos);return this.pos++,e},e.prototype.readI8=function(){var e=this.view.getInt8(this.pos);return this.pos++,e},e.prototype.readU16=function(){var e=this.view.getUint16(this.pos);return this.pos+=2,e},e.prototype.readI16=function(){var e=this.view.getInt16(this.pos);return this.pos+=2,e},e.prototype.readU32=function(){var e=this.view.getUint32(this.pos);return this.pos+=4,e},e.prototype.readI32=function(){var e=this.view.getInt32(this.pos);return this.pos+=4,e},e.prototype.readU64=function(){var e,t,r=(e=this.view,t=this.pos,4294967296*e.getUint32(t)+e.getUint32(t+4));return this.pos+=8,r},e.prototype.readI64=function(){var e=d(this.view,this.pos);return this.pos+=8,e},e.prototype.readF32=function(){var e=this.view.getFloat32(this.pos);return this.pos+=4,e},e.prototype.readF64=function(){var e=this.view.getFloat64(this.pos);return this.pos+=8,e},e}(),$={};function ee(e,t){void 0===t&&(t=$);var r=new Z(t.extensionCodec,t.maxStrLength,t.maxBinLength,t.maxArrayLength,t.maxMapLength,t.maxExtLength);return r.setBuffer(e),r.decodeSingleSync()}var te=function(e,t){var r,n,i,o,s={label:0,sent:function(){if(1&i[0])throw i[1];return i[1]},trys:[],ops:[]};return o={next:a(0),throw:a(1),return:a(2)},"function"==typeof Symbol&&(o[Symbol.iterator]=function(){return this}),o;function a(o){return function(a){return function(o){if(r)throw new TypeError("Generator is already executing.");for(;s;)try{if(r=1,n&&(i=2&o[0]?n.return:o[0]?n.throw||((i=n.return)&&i.call(n),0):n.next)&&!(i=i.call(n,o[1])).done)return i;switch(n=0,i&&(o=[2&o[0],i.value]),o[0]){case 0:case 1:i=o;break;case 4:return s.label++,{value:o[1],done:!1};case 5:s.label++,n=o[1],o=[0];continue;case 7:o=s.ops.pop(),s.trys.pop();continue;default:if(!(i=(i=s.trys).length>0&&i[i.length-1])&&(6===o[0]||2===o[0])){s=0;continue}if(3===o[0]&&(!i||o[1]>i[0]&&o[1]<i[3])){s.label=o[1];break}if(6===o[0]&&s.label<i[1]){s.label=i[1],i=o;break}if(i&&s.label<i[2]){s.label=i[2],s.ops.push(o);break}i[2]&&s.ops.pop(),s.trys.pop();continue}o=t.call(e,s)}catch(e){o=[6,e],n=0}finally{r=i=0}if(5&o[0])throw o[1];return{value:o[0]?o[1]:void 0,done:!0}}([o,a])}}},re=function(e){return this instanceof re?(this.v=e,this):new re(e)},ne=function(e,t,r){if(!Symbol.asyncIterator)throw new TypeError("Symbol.asyncIterator is not defined.");var n,i=r.apply(e,t||[]),o=[];return n={},s("next"),s("throw"),s("return"),n[Symbol.asyncIterator]=function(){return this},n;function s(e){i[e]&&(n[e]=function(t){return new Promise(function(r,n){o.push([e,t,r,n])>1||a(e,t)})})}function a(e,t){try{(r=i[e](t)).value instanceof re?Promise.resolve(r.value.v).then(h,u):c(o[0][2],r)}catch(e){c(o[0][3],e)}var r}function h(e){a("next",e)}function u(e){a("throw",e)}function c(e,t){e(t),o.shift(),o.length&&a(o[0][0],o[0][1])}};function ie(e){return null!=e[Symbol.asyncIterator]?e:function(e){return ne(this,arguments,function(){var t,r,n,i;return te(this,function(o){switch(o.label){case 0:t=e.getReader(),o.label=1;case 1:o.trys.push([1,,9,10]),o.label=2;case 2:return[4,re(t.read())];case 3:return r=o.sent(),n=r.done,i=r.value,n?[4,re(void 0)]:[3,5];case 4:return[2,o.sent()];case 5:return[4,re(i)];case 6:return[4,o.sent()];case 7:return o.sent(),[3,2];case 8:return[3,10];case 9:return t.releaseLock(),[7];case 10:return[2]}})})}(e)}var oe=function(e,t,r,n){return new(r||(r=Promise))(function(i,o){function s(e){try{h(n.next(e))}catch(e){o(e)}}function a(e){try{h(n.throw(e))}catch(e){o(e)}}function h(e){var t;e.done?i(e.value):(t=e.value,t instanceof r?t:new r(function(e){e(t)})).then(s,a)}h((n=n.apply(e,t||[])).next())})},se=function(e,t){var r,n,i,o,s={label:0,sent:function(){if(1&i[0])throw i[1];return i[1]},trys:[],ops:[]};return o={next:a(0),throw:a(1),return:a(2)},"function"==typeof Symbol&&(o[Symbol.iterator]=function(){return this}),o;function a(o){return function(a){return function(o){if(r)throw new TypeError("Generator is already executing.");for(;s;)try{if(r=1,n&&(i=2&o[0]?n.return:o[0]?n.throw||((i=n.return)&&i.call(n),0):n.next)&&!(i=i.call(n,o[1])).done)return i;switch(n=0,i&&(o=[2&o[0],i.value]),o[0]){case 0:case 1:i=o;break;case 4:return s.label++,{value:o[1],done:!1};case 5:s.label++,n=o[1],o=[0];continue;case 7:o=s.ops.pop(),s.trys.pop();continue;default:if(!(i=(i=s.trys).length>0&&i[i.length-1])&&(6===o[0]||2===o[0])){s=0;continue}if(3===o[0]&&(!i||o[1]>i[0]&&o[1]<i[3])){s.label=o[1];break}if(6===o[0]&&s.label<i[1]){s.label=i[1],i=o;break}if(i&&s.label<i[2]){s.label=i[2],s.ops.push(o);break}i[2]&&s.ops.pop(),s.trys.pop();continue}o=t.call(e,s)}catch(e){o=[6,e],n=0}finally{r=i=0}if(5&o[0])throw o[1];return{value:o[0]?o[1]:void 0,done:!0}}([o,a])}}};function ae(e,t){return void 0===t&&(t=$),oe(this,void 0,void 0,function(){var r;return se(this,function(n){return r=ie(e),[2,new Z(t.extensionCodec,t.maxStrLength,t.maxBinLength,t.maxArrayLength,t.maxMapLength,t.maxExtLength).decodeSingleAsync(r)]})})}function he(e,t){void 0===t&&(t=$);var r=ie(e);return new Z(t.extensionCodec,t.maxStrLength,t.maxBinLength,t.maxArrayLength,t.maxMapLength,t.maxExtLength).decodeArrayStream(r)}function ue(e,t){void 0===t&&(t=$);var r=ie(e);return new Z(t.extensionCodec,t.maxStrLength,t.maxBinLength,t.maxArrayLength,t.maxMapLength,t.maxExtLength).decodeStream(r)}r.d(t,"encode",function(){return P}),r.d(t,"decode",function(){return ee}),r.d(t,"decodeAsync",function(){return ae}),r.d(t,"decodeArrayStream",function(){return he}),r.d(t,"decodeStream",function(){return ue}),r.d(t,"Decoder",function(){return Z}),r.d(t,"Encoder",function(){return C}),r.d(t,"ExtensionCodec",function(){return S}),r.d(t,"ExtData",function(){return l}),r.d(t,"EXT_TIMESTAMP",function(){return-1}),r.d(t,"encodeDateToTimeSpec",function(){return g}),r.d(t,"encodeTimeSpecToTimestamp",function(){return v}),r.d(t,"decodeTimestampToTimeSpec",function(){return m}),r.d(t,"encodeTimestampExtension",function(){return b}),r.d(t,"decodeTimestampExtension",function(){return U}),r.d(t,"__WASM_AVAILABLE",function(){return A})}])});

},{}],8:[function(require,module,exports){
(function (global){
// https://github.com/maxogden/websocket-stream/blob/48dc3ddf943e5ada668c31ccd94e9186f02fafbd/ws-fallback.js

var ws = null

if (typeof WebSocket !== 'undefined') {
  ws = WebSocket
} else if (typeof MozWebSocket !== 'undefined') {
  ws = MozWebSocket
} else if (typeof global !== 'undefined') {
  ws = global.WebSocket || global.MozWebSocket
} else if (typeof window !== 'undefined') {
  ws = window.WebSocket || window.MozWebSocket
} else if (typeof self !== 'undefined') {
  ws = self.WebSocket || self.MozWebSocket
}

module.exports = ws

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{}]},{},[1])(1)
});
