(function(f){if(typeof exports==="object"&&typeof module!=="undefined"){module.exports=f()}else if(typeof define==="function"&&define.amd){define([],f)}else{var g;if(typeof window!=="undefined"){g=window}else if(typeof global!=="undefined"){g=global}else if(typeof self!=="undefined"){g=self}else{g=this}g.frontpanelWs = f()}})(function(){var define,module,exports;return (function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __exportStar = (this && this.__exportStar) || function(m, exports) {
    for (var p in m) if (p !== "default" && !exports.hasOwnProperty(p)) __createBinding(exports, m, p);
};
Object.defineProperty(exports, "__esModule", { value: true });
__exportStar(require("./lib/frontpanel"), exports);
__exportStar(require("./lib/device-info"), exports);
var ws_async_1 = require("./lib/ws-async");
Object.defineProperty(exports, "Notification", { enumerable: true, get: function () { return ws_async_1.Notification; } });
var error_1 = require("./lib/error");
Object.defineProperty(exports, "ErrorCode", { enumerable: true, get: function () { return error_1.ErrorCode; } });
Object.defineProperty(exports, "FrontPanelError", { enumerable: true, get: function () { return error_1.FrontPanelError; } });
},{"./lib/device-info":2,"./lib/error":4,"./lib/frontpanel":11,"./lib/ws-async":14}],2:[function(require,module,exports){
"use strict";
/**
 * Describes several attributes of a connected device.
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.FPGAVendor = exports.USBSpeed = exports.DeviceInterface = exports.ProductID = void 0;
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
    ProductID[ProductID["PRODUCT_XEM9025"] = 55] = "PRODUCT_XEM9025";
    ProductID[ProductID["PRODUCT_XEM8320AU25P"] = 56] = "PRODUCT_XEM8320AU25P";
    ProductID[ProductID["PRODUCT_XEM8310AU25P"] = 57] = "PRODUCT_XEM8310AU25P";
    ProductID[ProductID["PRODUCT_FPX9301"] = 58] = "PRODUCT_FPX9301";
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
 * The Device Settings.
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
Object.defineProperty(exports, "__esModule", { value: true });
exports.DeviceSettings = void 0;
var frontpanel_client_1 = require("./frontpanel-client");
var DeviceSettings = /** @class */ (function () {
    function DeviceSettings(client) {
        this.client = client;
    }
    DeviceSettings.prototype.getString = function (name) {
        return __awaiter(this, void 0, void 0, function () {
            var reply;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.client.sendRequest(frontpanel_client_1.RequestCode.DeviceSettingsGetString, name)];
                    case 1:
                        reply = _a.sent();
                        return [2 /*return*/, reply.data];
                }
            });
        });
    };
    DeviceSettings.prototype.getInt = function (name) {
        return __awaiter(this, void 0, void 0, function () {
            var reply;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.client.sendRequest(frontpanel_client_1.RequestCode.DeviceSettingsGetInteger, name)];
                    case 1:
                        reply = _a.sent();
                        return [2 /*return*/, reply.data];
                }
            });
        });
    };
    DeviceSettings.prototype.setString = function (name, value) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.client.sendRequest(frontpanel_client_1.RequestCode.DeviceSettingsSetString, name, value)];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    DeviceSettings.prototype.setInt = function (name, value) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.client.sendRequest(frontpanel_client_1.RequestCode.DeviceSettingsSetInteger, name, value)];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    DeviceSettings.prototype.list = function () {
        return __awaiter(this, void 0, void 0, function () {
            var reply;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.client.sendRequest(frontpanel_client_1.RequestCode.DeviceSettingsList)];
                    case 1:
                        reply = _a.sent();
                        return [2 /*return*/, reply.data];
                }
            });
        });
    };
    DeviceSettings.prototype.delete = function (name) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.client.sendRequest(frontpanel_client_1.RequestCode.DeviceSettingsDelete, name)];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    DeviceSettings.prototype.save = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.client.sendRequest(frontpanel_client_1.RequestCode.DeviceSettingsSave)];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    return DeviceSettings;
}());
exports.DeviceSettings = DeviceSettings;
},{"./frontpanel-client":6}],4:[function(require,module,exports){
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
exports.FrontPanelError = exports.ErrorCode = void 0;
/**
 * FrontPanel API return codes.
 */
var ErrorCode;
(function (ErrorCode) {
    ErrorCode[ErrorCode["NoError"] = 0] = "NoError";
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
},{}],5:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FPGAResetProfile = exports.FPGAConfigurationMethod = void 0;
var frontpanel_wires_1 = require("./frontpanel-wires");
var frontpanel_triggers_1 = require("./frontpanel-triggers");
var frontpanel_registers_1 = require("./frontpanel-registers");
var FPGAConfigurationMethod;
(function (FPGAConfigurationMethod) {
    FPGAConfigurationMethod[FPGAConfigurationMethod["NVRAM"] = 0] = "NVRAM";
    FPGAConfigurationMethod[FPGAConfigurationMethod["JTAG"] = 1] = "JTAG";
})(FPGAConfigurationMethod = exports.FPGAConfigurationMethod || (exports.FPGAConfigurationMethod = {}));
;
var FPGAResetProfile = /** @class */ (function () {
    function FPGAResetProfile() {
        this.magic = 0;
        this.configFileLocation = 0;
        this.configFileLength = 0;
        this.doneWaitUS = 0;
        this.resetWaitUS = 0;
        this.registerWaitUS = 0;
        this._wireInEndpoints = new frontpanel_wires_1.WireEndpointBlock(frontpanel_wires_1.WIREIN_ENDPOINT_BASEADDRESS, FPGAResetProfile.FPGA_RESETPROFILE_WIRECOUNT);
        this._registerEntries = new frontpanel_registers_1.RegisterEntryList(FPGAResetProfile.FPGA_RESETPROFILE_REGISTERCOUNT);
        this._triggerEntries = new frontpanel_triggers_1.TriggerEntryList(frontpanel_triggers_1.TRIGGERIN_ENDPOINT_BASEADDRESS, FPGAResetProfile.FPGA_RESETPROFILE_TRIGGERCOUNT);
    }
    Object.defineProperty(FPGAResetProfile.prototype, "wireInEndpoints", {
        /**
         * Initial values of WireIns.  These are loaded prior to deasserting logic RESET.  (32*4 = 128 bytes)
         */
        get: function () {
            return this._wireInEndpoints;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(FPGAResetProfile.prototype, "registerEntries", {
        /**
         * Initial register loads.  (256*8 = 2048 bytes)
         */
        get: function () {
            return this._registerEntries;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(FPGAResetProfile.prototype, "triggerEntries", {
        /**
         * Initial trigger assertions.  These are performed last. (32*8 = 256 bytes)
         */
        get: function () {
            return this._triggerEntries;
        },
        enumerable: false,
        configurable: true
    });
    FPGAResetProfile.FPGA_RESETPROFILE_MAGIC = 0xBE097C3D;
    FPGAResetProfile.FPGA_RESETPROFILE_WIRECOUNT = 32;
    FPGAResetProfile.FPGA_RESETPROFILE_TRIGGERCOUNT = 32;
    FPGAResetProfile.FPGA_RESETPROFILE_REGISTERCOUNT = 256;
    return FPGAResetProfile;
}());
exports.FPGAResetProfile = FPGAResetProfile;
},{"./frontpanel-registers":8,"./frontpanel-triggers":9,"./frontpanel-wires":10}],6:[function(require,module,exports){
"use strict";
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
Object.defineProperty(exports, "__esModule", { value: true });
exports.RequestCode = exports.FrontPanelClient = void 0;
var error_1 = require("./error");
var PROTOCOL_VERSION = 20;
function makeError(e, msg) {
    var code = e instanceof error_1.FrontPanelError ? e.code : error_1.ErrorCode.Failed;
    var errorMsg = e instanceof error_1.FrontPanelError
        ? e.reason
        : e instanceof Error
            ? e.message
            : e;
    return new error_1.FrontPanelError(code, msg + " with error " + errorMsg);
}
var FrontPanelClient = /** @class */ (function () {
    /**
     * Initializes the object with the asynchronous websocket to use
     * for communicating with the remote server.
     *
     * @param socket Websocket to use for communicating with the FrontPanel
     * over IP Server.
     */
    function FrontPanelClient(socket) {
        this.socket = socket;
    }
    Object.defineProperty(FrontPanelClient.prototype, "isConnected", {
        /**
         * Returns true if the object is connected to the remote server.
         *
         * This value is initially `false` and becomes `true` once [[connect]]
         * completes successfully.
         *
         * No other method of this class other than `connect()` can be used until
         * this property becomes `true`.
         */
        get: function () {
            return this.socket.isOpened;
        },
        enumerable: false,
        configurable: true
    });
    /**
     * Initiates connection to the server.
     *
     * This async function will satisfy its promise when connecting succeeds
     * or break it when it fails.
     *
     * See [[isConnected]].
     */
    FrontPanelClient.prototype.connect = function () {
        return __awaiter(this, void 0, void 0, function () {
            var e_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, this.socket.open()];
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
    /**
     * Initiates disconnection from the server.
     *
     * @param code Optional standard WebSocket close code explaining why the
     * connection is being closed.
     */
    FrontPanelClient.prototype.disconnect = function (code) {
        return __awaiter(this, void 0, void 0, function () {
            var e_2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, this.socket.close(code)];
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
    /**
     * Asynchronously waits for any unsolicited server reply.
     *
     * Unsolicited replies are sent by the server not in reply to a client
     * request but due to an event on the server-side, e.g. new device
     * connection.
     */
    FrontPanelClient.prototype.waitForServer = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                try {
                    return [2 /*return*/, this.socket.waitForServer()];
                }
                catch (e) {
                    throw makeError(e, 'Failed to wait for the server reply');
                }
                return [2 /*return*/];
            });
        });
    };
    /**
     * Initiates login to the server.
     *
     * As the provided credentials are transmitted unencrypted, connection
     * itself must be secure, i.e. use TLS.
     *
     * After successfully logging in, call [[openDevice]] to start working
     * with one of the devices from the list returned by the server.
     *
     * @param username The username to use for authentication.
     * @param password The password to use for authentication.
     * @returns List of available devices in case of successful login.
     */
    FrontPanelClient.prototype.login = function (username, password) {
        return __awaiter(this, void 0, void 0, function () {
            var devices;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.sendRequest(RequestCode.Login, PROTOCOL_VERSION, username, password)];
                    case 1:
                        devices = _a.sent();
                        return [2 /*return*/, devices.data];
                }
            });
        });
    };
    /**
     * Sends a request with a set of arguments to the server and returns
     * the reply received in response to the request.
     *
     * @param req RequestCode specifying the type of request to be sent.
     * @param args Set of arguments that correspond to the request.
     * @returns Reply received from the server in response to the request.
     */
    FrontPanelClient.prototype.sendRequest = function (req) {
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
                        return [4 /*yield*/, (_a = this.socket).send.apply(_a, request)];
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
    return FrontPanelClient;
}());
exports.FrontPanelClient = FrontPanelClient;
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
    RequestCode[RequestCode["ReadRegisters"] = 29] = "ReadRegisters";
    RequestCode[RequestCode["WriteRegisters"] = 30] = "WriteRegisters";
    RequestCode[RequestCode["ClearFPGAConfiguration"] = 31] = "ClearFPGAConfiguration";
    RequestCode[RequestCode["FlashEraseSector"] = 32] = "FlashEraseSector";
    RequestCode[RequestCode["FlashWrite"] = 33] = "FlashWrite";
    RequestCode[RequestCode["FlashRead"] = 34] = "FlashRead";
    RequestCode[RequestCode["DeviceSettingsList"] = 35] = "DeviceSettingsList";
    RequestCode[RequestCode["DeviceSettingsSave"] = 36] = "DeviceSettingsSave";
    RequestCode[RequestCode["DeviceSettingsDelete"] = 37] = "DeviceSettingsDelete";
    RequestCode[RequestCode["DeviceSettingsSetInteger"] = 38] = "DeviceSettingsSetInteger";
    RequestCode[RequestCode["DeviceSettingsSetString"] = 39] = "DeviceSettingsSetString";
    RequestCode[RequestCode["DeviceSettingsGetInteger"] = 40] = "DeviceSettingsGetInteger";
    RequestCode[RequestCode["DeviceSettingsGetString"] = 41] = "DeviceSettingsGetString";
    RequestCode[RequestCode["GetDeviceSensors"] = 42] = "GetDeviceSensors";
    RequestCode[RequestCode["ConfigureFPGAWithReset"] = 43] = "ConfigureFPGAWithReset";
    RequestCode[RequestCode["ConfigureFPGAFromFlash"] = 44] = "ConfigureFPGAFromFlash";
    RequestCode[RequestCode["GetFPGAResetProfile"] = 45] = "GetFPGAResetProfile";
    RequestCode[RequestCode["SetFPGAResetProfile"] = 46] = "SetFPGAResetProfile";
    RequestCode[RequestCode["LoadDefaultPLLConfiguration"] = 47] = "LoadDefaultPLLConfiguration";
    RequestCode[RequestCode["GetPLL22150Configuration"] = 48] = "GetPLL22150Configuration";
    RequestCode[RequestCode["SetPLL22150Configuration"] = 49] = "SetPLL22150Configuration";
    RequestCode[RequestCode["GetEepromPLL22150Configuration"] = 50] = "GetEepromPLL22150Configuration";
    RequestCode[RequestCode["SetEepromPLL22150Configuration"] = 51] = "SetEepromPLL22150Configuration";
    RequestCode[RequestCode["OpenDevice"] = 52] = "OpenDevice";
})(RequestCode = exports.RequestCode || (exports.RequestCode = {}));
},{"./error":4}],7:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FrontPanelCodec = void 0;
var fpga_reset_profile_1 = require("./fpga-reset-profile");
var pll22150_configuration_1 = require("./pll22150-configuration");
var FrontPanelCodec = /** @class */ (function () {
    function FrontPanelCodec() {
    }
    // Encode Methods
    FrontPanelCodec.encodeFPGAResetProfile = function (profile) {
        var parameters = [];
        parameters[0] = profile.magic;
        parameters[1] = profile.configFileLocation;
        parameters[2] = profile.configFileLength;
        parameters[3] = profile.doneWaitUS;
        parameters[4] = profile.resetWaitUS;
        parameters[5] = profile.registerWaitUS;
        parameters[6] = this.encodeWireEndpointBlock(profile.wireInEndpoints);
        parameters[7] = profile.registerEntries.registerEntries.length;
        parameters[8] = this.encodeRegisterEntryList(profile.registerEntries);
        parameters[9] = profile.triggerEntries.triggerEntries.length;
        parameters[10] = this.encodeTriggerEntryList(profile.triggerEntries);
        return parameters;
    };
    FrontPanelCodec.encodeWireEndpointBlock = function (wires) {
        var data = wires.wireValues;
        return data;
    };
    FrontPanelCodec.encodeRegisterEntryList = function (entries) {
        var data = entries.registerEntries;
        for (var entryIndex = data.length; entryIndex < entries.capacity; entryIndex++) {
            var newEntry = [0x00, 0x00];
            data[entryIndex] = newEntry;
        }
        return data;
    };
    FrontPanelCodec.encodeTriggerEntryList = function (entries) {
        var data = entries.triggerEntries;
        for (var entryIndex = data.length; entryIndex < entries.capacity; entryIndex++) {
            var newEntry = [0x00, 0x00];
            data[entryIndex] = newEntry;
        }
        return data;
    };
    FrontPanelCodec.encodePLL22150Configuration = function (configuration) {
        var parameters = [];
        parameters[0] = configuration.reference;
        parameters[1] = configuration.isExternalOscillatorEnabled;
        parameters[2] = configuration.crystalLoad;
        parameters[3] = configuration.vcoP;
        parameters[4] = configuration.vcoQ;
        parameters[5] = configuration.divider1Source;
        parameters[6] = configuration.divider1;
        parameters[7] = configuration.divider2Source;
        parameters[8] = configuration.divider2;
        var outputs = [];
        for (var outputIndex = 0; outputIndex < pll22150_configuration_1.PLL22150Configuration.OUTPUT_COUNT; outputIndex++) {
            var output = [];
            output[0] = configuration.getOutputSource(outputIndex);
            output[1] = configuration.isOutputEnabled(outputIndex);
            outputs[outputIndex] = output;
        }
        parameters[9] = outputs;
        return parameters;
    };
    // Decode Methods
    FrontPanelCodec.decodeDeviceInfoPrivate = function (data) {
        var devInfo = {
            usbVendorID: data[0],
            usbProductID: data[1],
            hasDeviceSettingsSupport: data[2],
            hasDeviceSensorsSupport: data[3]
        };
        return devInfo;
    };
    FrontPanelCodec.decodeFPGAResetProfile = function (data) {
        var profile = new fpga_reset_profile_1.FPGAResetProfile();
        profile.magic = data[0];
        profile.configFileLocation = data[1];
        profile.configFileLength = data[2];
        profile.doneWaitUS = data[3];
        profile.resetWaitUS = data[4];
        profile.registerWaitUS = data[5];
        // Set the WireIn Endpoints
        var wires = data[6];
        for (var wireIndex = 0; wireIndex < wires.length; wireIndex++) {
            profile.wireInEndpoints.setWire(profile.wireInEndpoints.baseAddress + wireIndex, wires[wireIndex]);
        }
        // Set the Register
        var registerCount = data[7];
        var registers = data[8];
        for (var registerIndex = 0; registerIndex < registerCount; registerIndex++) {
            var entry = registers[registerIndex];
            profile.registerEntries.addEntry(entry[0], entry[1]);
        }
        // Set the TrigerIn Endpoints
        var triggerCount = data[9];
        var triggers = data[10];
        for (var triggerIndex = 0; triggerIndex < triggerCount; triggerIndex++) {
            var entry = triggers[triggerIndex];
            profile.triggerEntries.addEntry(entry[0], entry[1]);
        }
        return profile;
    };
    FrontPanelCodec.decodeDeviceSensors = function (data) {
        var sensors = [];
        for (var sensorIndex = 0; sensorIndex < data.length; sensorIndex++) {
            var sensorData = data[sensorIndex];
            sensors[sensorIndex] = {
                id: sensorData[0],
                type: sensorData[1],
                name: sensorData[2],
                description: sensorData[3],
                min: sensorData[4],
                max: sensorData[5],
                step: sensorData[6],
                value: sensorData[7]
            };
        }
        return sensors;
    };
    FrontPanelCodec.decodePLL22150Configuration = function (data) {
        var configuration = new pll22150_configuration_1.PLL22150Configuration();
        configuration.setReference(data[0], data[1]);
        configuration.crystalLoad = data[2];
        configuration.setVCOParameters(data[3], data[4]);
        configuration.setDivider1(data[5], data[6]);
        configuration.setDivider2(data[7], data[8]);
        var outputs = data[9];
        for (var outputIndex = 0; outputIndex < pll22150_configuration_1.PLL22150Configuration.OUTPUT_COUNT; outputIndex++) {
            configuration.setOutputSource(outputIndex, outputs[outputIndex][0]);
            configuration.setOutputEnable(outputIndex, outputs[outputIndex][1]);
        }
        return configuration;
    };
    return FrontPanelCodec;
}());
exports.FrontPanelCodec = FrontPanelCodec;
},{"./fpga-reset-profile":5,"./pll22150-configuration":13}],8:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RegisterEntryList = void 0;
var RegisterEntryList = /** @class */ (function () {
    function RegisterEntryList(registerCount) {
        this._registerCount = registerCount;
        this._registerEntries = [];
    }
    Object.defineProperty(RegisterEntryList.prototype, "capacity", {
        get: function () {
            return this._registerCount;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(RegisterEntryList.prototype, "registerEntries", {
        get: function () {
            return this._registerEntries.slice(0, this._registerEntries.length);
        },
        enumerable: false,
        configurable: true
    });
    RegisterEntryList.prototype.addEntry = function (address, value) {
        var retval;
        if (this._registerEntries.length < this._registerCount) {
            var newEntry = [address, value];
            this._registerEntries.push(newEntry);
            retval = true;
        }
        else {
            retval = false;
        }
        return retval;
    };
    return RegisterEntryList;
}());
exports.RegisterEntryList = RegisterEntryList;
},{}],9:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TriggerEntryList = exports.TRIGGEROUT_ENDPOINT_BASEADDRESS = exports.TRIGGERIN_ENDPOINT_BASEADDRESS = void 0;
exports.TRIGGERIN_ENDPOINT_BASEADDRESS = 0x40;
exports.TRIGGEROUT_ENDPOINT_BASEADDRESS = 0x60;
var TriggerEntryList = /** @class */ (function () {
    function TriggerEntryList(baseAddress, triggerCount) {
        this._baseAddress = baseAddress;
        this._triggerCount = triggerCount;
        this._triggerEntries = [];
    }
    Object.defineProperty(TriggerEntryList.prototype, "baseAddress", {
        get: function () {
            return this._baseAddress;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(TriggerEntryList.prototype, "capacity", {
        get: function () {
            return this._triggerCount;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(TriggerEntryList.prototype, "triggerEntries", {
        get: function () {
            return this._triggerEntries.slice(0, this._triggerEntries.length);
        },
        enumerable: false,
        configurable: true
    });
    TriggerEntryList.prototype.addEntry = function (address, mask) {
        var retval;
        if (this._triggerEntries.length < this._triggerCount) {
            if (address >= this._baseAddress) {
                var wireIndex = (address - this._baseAddress);
                if (wireIndex < this._triggerCount) {
                    var newEntry = [address, mask];
                    this._triggerEntries.push(newEntry);
                    retval = true;
                }
                else {
                    retval = false; // ERROR: Invalid Address
                }
            }
            else {
                retval = false; // ERROR: Invalid Address
            }
        }
        else {
            retval = false; // ERROR: Trigger Entry Capacity Exceeded
        }
        return retval;
    };
    return TriggerEntryList;
}());
exports.TriggerEntryList = TriggerEntryList;
},{}],10:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.WireEndpointBlock = exports.WIREOUT_ENDPOINT_BASEADDRESS = exports.WIREIN_ENDPOINT_BASEADDRESS = void 0;
exports.WIREIN_ENDPOINT_BASEADDRESS = 0x00;
exports.WIREOUT_ENDPOINT_BASEADDRESS = 0x20;
var WireEndpointBlock = /** @class */ (function () {
    function WireEndpointBlock(baseAddress, count) {
        this._baseAddress = baseAddress;
        this._wireValues = [];
        this._wireValues.length = count;
        for (var wireIndex = 0; wireIndex < this._wireValues.length; wireIndex++) {
            this._wireValues[wireIndex] = 0x00000000;
        }
    }
    Object.defineProperty(WireEndpointBlock.prototype, "baseAddress", {
        get: function () {
            return this._baseAddress;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(WireEndpointBlock.prototype, "wireValues", {
        get: function () {
            return this._wireValues.slice(0, this._wireValues.length);
        },
        enumerable: false,
        configurable: true
    });
    WireEndpointBlock.prototype.setWire = function (address, value) {
        var retval;
        if (address >= this._baseAddress) {
            var wireIndex = (address - this._baseAddress);
            if (wireIndex < this._wireValues.length) {
                this._wireValues[wireIndex] = value;
                retval = true;
            }
            else {
                retval = false; // ERROR: Invalid Address
            }
        }
        else {
            retval = false; // ERROR: Invalid Address
        }
        return retval;
    };
    WireEndpointBlock.prototype.getWire = function (address) {
        var retval;
        if (address >= this._baseAddress) {
            var wireIndex = (address - this._baseAddress);
            if (wireIndex < this._wireValues.length) {
                retval = this._wireValues[wireIndex];
            }
            else {
                retval = 0; // ERROR: Invalid Address
            }
        }
        else {
            retval = 0; // ERROR: Invalid Address
        }
        return retval;
    };
    return WireEndpointBlock;
}());
exports.WireEndpointBlock = WireEndpointBlock;
},{}],11:[function(require,module,exports){
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
exports.FrontPanel = exports.LAST_PIPEOUT_ENDPOINT = exports.FIRST_PIPEOUT_ENDPOINT = exports.LAST_PIPEIN_ENDPOINT = exports.FIRST_PIPEIN_ENDPOINT = exports.LAST_TRIGGEROUT_ENDPOINT = exports.FIRST_TRIGGEROUT_ENDPOINT = exports.LAST_TRIGGERIN_ENDPOINT = exports.FIRST_TRIGGERIN_ENDPOINT = exports.LAST_WIREOUT_ENDPOINT = exports.FIRST_WIREOUT_ENDPOINT = exports.LAST_WIREIN_ENDPOINT = exports.FIRST_WIREIN_ENDPOINT = exports.REGISTER_COUNT = exports.MAX_COMPONENTS = exports.MAX_ENDPOINTS = exports.MAX_SECURITY_DATA_LENGTH = exports.MAX_DEVICEID_LENGTH = exports.MAX_SERIALNUMBER_LENGTH = void 0;
var error_1 = require("./error");
var ws_async_1 = require("./ws-async");
var frontpanel_client_1 = require("./frontpanel-client");
var device_settings_1 = require("./device-settings");
var frontpanel_codec_1 = require("./frontpanel-codec");
exports.MAX_SERIALNUMBER_LENGTH = 10;
exports.MAX_DEVICEID_LENGTH = 32;
exports.MAX_SECURITY_DATA_LENGTH = 64;
exports.MAX_ENDPOINTS = 256;
exports.MAX_COMPONENTS = 256;
exports.REGISTER_COUNT = 256;
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
/**
 * This is the class that encapsulates the functionality of the FPGA
 * boards as well as the FrontPanel extensions such as wire and trigger
 * endpoints.
 */
var FrontPanel = /** @class */ (function () {
    /**
     * Initializes the object with the remote server address.
     *
     * The only mandatory parameter is `server` which specifies the remote
     * server, running FPoIP server, to connect to.
     *
     * @param parameters Parameters that must include the server address.
     */
    function FrontPanel(parameters) {
        var socket = new ws_async_1.AsyncWebSocket(parameters.server, parameters.allowSelfSigned === true);
        this.client = new frontpanel_client_1.FrontPanelClient(socket);
        this.deviceInfoPrivate = {
            usbVendorID: 0,
            usbProductID: 0,
            hasDeviceSettingsSupport: false,
            hasDeviceSensorsSupport: false
        };
        this.wireInValues = new Array(exports.LAST_WIREIN_ENDPOINT - exports.FIRST_WIREIN_ENDPOINT + 1);
        this.wireOutValues = new Array(exports.LAST_WIREOUT_ENDPOINT - exports.FIRST_WIREOUT_ENDPOINT + 1);
        this.triggerOutValues = new Array(exports.LAST_TRIGGEROUT_ENDPOINT - exports.FIRST_TRIGGEROUT_ENDPOINT + 1);
        this._resetValues();
    }
    Object.defineProperty(FrontPanel.prototype, "isConnected", {
        /**
         * Returns true if the object is connected to the remote server.
         *
         * This value is initially `false` and becomes `true` once [[connect]]
         * completes successfully.
         *
         * No other method of this class other than `connect()` can be used until
         * this property becomes `true`.
         */
        get: function () {
            return this.client.isConnected;
        },
        enumerable: false,
        configurable: true
    });
    /**
     * Initiates connection to the server.
     *
     * This async function will satisfy its promise when connecting succeeds
     * or break it when it fails.
     *
     * See [[isConnected]].
     */
    FrontPanel.prototype.connect = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, this.client.connect()];
            });
        });
    };
    /**
     * Initiates disconnection from the server.
     *
     * @param code Optional standard WebSocket close code explaining why the
     * connection is being closed.
     */
    FrontPanel.prototype.disconnect = function (code) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, this.client.disconnect(code)];
            });
        });
    };
    /**
     * Asynchronously waits for any unsolicited server reply.
     *
     * Unsolicited replies are sent by the server not in reply to a client
     * request but due to an event on the server-side, e.g. new device
     * connection.
     */
    FrontPanel.prototype.waitForServer = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, this.client.waitForServer()];
            });
        });
    };
    /**
     * Initiates login to the server.
     *
     * As the provided credentials are transmitted unencrypted, connection
     * itself must be secure, i.e. use TLS.
     *
     * After successfully logging in, call [[openDevice]] to start working
     * with one of the devices from the list returned by the server.
     *
     * @param username The username to use for authentication.
     * @param password The password to use for authentication.
     * @returns List of available devices in case of successful login.
     */
    FrontPanel.prototype.login = function (username, password) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, this.client.login(username, password)];
            });
        });
    };
    /**
     * Requests opening the specified device.
     *
     * Opening the device is required before using any functions other than
     * [[connect]], [[login]] and [[disconnect]].
     *
     * @param device One of the devices returned from [[login]].
     */
    FrontPanel.prototype.openDevice = function (device) {
        return __awaiter(this, void 0, void 0, function () {
            var reply;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.client.sendRequest(frontpanel_client_1.RequestCode.OpenDevice, device)];
                    case 1:
                        reply = _a.sent();
                        this.deviceInfoPrivate = frontpanel_codec_1.FrontPanelCodec.decodeDeviceInfoPrivate(reply.data);
                        return [2 /*return*/];
                }
            });
        });
    };
    /**
     * Requests closing the currently opened device.
     *
     * [[openDevice]] can be called again, with the same or different device
     * after calling this function.
     */
    FrontPanel.prototype.closeDevice = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.client.sendRequest(frontpanel_client_1.RequestCode.CloseDevice)];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    /**
     * Requests information about the currently opened device.
     *
     * @returns [[IDeviceInfo]] object containing device characteristics.
     */
    FrontPanel.prototype.getDeviceInfo = function () {
        return __awaiter(this, void 0, void 0, function () {
            var info, result;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.client.sendRequest(frontpanel_client_1.RequestCode.GetDeviceInfo)];
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
     * Indicates whether Device Settings are supported.
     *
     * @returns true if Device Settings are supported.
     */
    FrontPanel.prototype.hasDeviceSettingsSupport = function () {
        return this.deviceInfoPrivate.hasDeviceSettingsSupport;
    };
    /**
     * Creates an object providing an interface to Device Settings.
     *
     * @returns [[DeviceSettings]] object providing access to Device Settings.
     */
    FrontPanel.prototype.getDeviceSettings = function () {
        var deviceSettings = new device_settings_1.DeviceSettings(this.client);
        return deviceSettings;
    };
    /**
     * Indicates whether Device Sensors are supported.
     *
     * @returns true if Device Sensors are supported.
     */
    FrontPanel.prototype.hasDeviceSensorsSupport = function () {
        return this.deviceInfoPrivate.hasDeviceSensorsSupport;
    };
    /**
     * Retrieves the list of Device Sensors.
     *
     * @returns [[IDeviceSensors[]]] list of Device Sensors.
     */
    FrontPanel.prototype.getDeviceSensors = function () {
        return __awaiter(this, void 0, void 0, function () {
            var reply, deviceSensors;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.client.sendRequest(frontpanel_client_1.RequestCode.GetDeviceSensors)];
                    case 1:
                        reply = _a.sent();
                        deviceSensors = frontpanel_codec_1.FrontPanelCodec.decodeDeviceSensors(reply.data);
                        return [2 /*return*/, deviceSensors];
                }
            });
        });
    };
    /**
     * Sets the default configuration for the device PLL.
     */
    FrontPanel.prototype.loadDefaultPLLConfiguration = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.client.sendRequest(frontpanel_client_1.RequestCode.LoadDefaultPLLConfiguration)];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    /**
     * Sets the configuration for the device PLL22150.
     *
     * @param configuration PLL22150 configuration.
     */
    FrontPanel.prototype.setPLL22150Configuration = function (configuration) {
        return __awaiter(this, void 0, void 0, function () {
            var parameters;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        parameters = frontpanel_codec_1.FrontPanelCodec.encodePLL22150Configuration(configuration);
                        return [4 /*yield*/, this.client.sendRequest(frontpanel_client_1.RequestCode.SetPLL22150Configuration, parameters)];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    /**
     * Retrieves the configuration for the device PLL22150.
     *
     * @returns [[IPLL22150Configuration]] PLL configuration.
     */
    FrontPanel.prototype.getPLL22150Configuration = function () {
        return __awaiter(this, void 0, void 0, function () {
            var reply;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.client.sendRequest(frontpanel_client_1.RequestCode.GetPLL22150Configuration)];
                    case 1:
                        reply = _a.sent();
                        return [2 /*return*/, frontpanel_codec_1.FrontPanelCodec.decodePLL22150Configuration(reply.data)];
                }
            });
        });
    };
    /**
     * Sets the eeprom configuration for the device PLL22150.
     *
     * @param configuration PLL22150 configuration.
     */
    FrontPanel.prototype.setEepromPLL22150Configuration = function (configuration) {
        return __awaiter(this, void 0, void 0, function () {
            var parameters;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        parameters = frontpanel_codec_1.FrontPanelCodec.encodePLL22150Configuration(configuration);
                        return [4 /*yield*/, this.client.sendRequest(frontpanel_client_1.RequestCode.SetEepromPLL22150Configuration, parameters)];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    /**
     * Retrieves the eeprom configuration for the device PLL22150.
     *
     * @returns [[IPLL22150Configuration]] PLL configuration.
     */
    FrontPanel.prototype.getEepromPLL22150Configuration = function () {
        return __awaiter(this, void 0, void 0, function () {
            var reply;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.client.sendRequest(frontpanel_client_1.RequestCode.GetEepromPLL22150Configuration)];
                    case 1:
                        reply = _a.sent();
                        return [2 /*return*/, frontpanel_codec_1.FrontPanelCodec.decodePLL22150Configuration(reply.data)];
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
                    case 0: return [4 /*yield*/, this.client.sendRequest(frontpanel_client_1.RequestCode.IsFrontPanel3Supported)];
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
                    case 0: return [4 /*yield*/, this.client.sendRequest(frontpanel_client_1.RequestCode.SetBTPipePollingInterval, interval)];
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
                    case 0: return [4 /*yield*/, this.client.sendRequest(frontpanel_client_1.RequestCode.SetDeviceID, str)];
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
                    case 0: return [4 /*yield*/, this.client.sendRequest(frontpanel_client_1.RequestCode.SetTimeout, timeout)];
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
                    case 0: return [4 /*yield*/, this.client.sendRequest(frontpanel_client_1.RequestCode.GetLastTransferLength)];
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
                    case 0: return [4 /*yield*/, this.client.sendRequest(frontpanel_client_1.RequestCode.ResetFPGA)];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    /**
     * Configures the device with the given firmware data.
     *
     * @param buf Contains firmware data.
     */
    FrontPanel.prototype.configureFPGA = function (buf) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        // (Re)configuring the devices resets all wire/trigger values.
                        this._resetValues();
                        return [4 /*yield*/, this.client.sendRequest(frontpanel_client_1.RequestCode.ConfigureFPGA, buf)];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    /**
     * Configures the device with the given firmware data and reset profile.
     *
     * @param buf Contains firmware data.
     * @param reset Indicates which reset profile should be set.
     */
    FrontPanel.prototype.configureFPGAWithReset = function (buf, reset) {
        return __awaiter(this, void 0, void 0, function () {
            var parameters;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        // (Re)configuring the devices resets all wire/trigger values.
                        this._resetValues();
                        parameters = frontpanel_codec_1.FrontPanelCodec.encodeFPGAResetProfile(reset);
                        return [4 /*yield*/, this.client.sendRequest(frontpanel_client_1.RequestCode.ConfigureFPGAWithReset, buf, parameters)];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    /**
     * Configures the device with data stored in flash memory.
     *
     * @param configIndex Reserved for future use.
     */
    FrontPanel.prototype.configureFPGAFromFlash = function (configIndex) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        // (Re)configuring the devices resets all wire/trigger values.
                        this._resetValues();
                        return [4 /*yield*/, this.client.sendRequest(frontpanel_client_1.RequestCode.ConfigureFPGAFromFlash, configIndex)];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    /**
     * Clears the FPGA configuration.
     */
    FrontPanel.prototype.clearFPGAConfiguration = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.client.sendRequest(frontpanel_client_1.RequestCode.ClearFPGAConfiguration)];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    /**
     * Retrieves the FPGA reset profile.
     *
     * @param method Indicates which reset profile should be retrieved.
     */
    FrontPanel.prototype.getFPGAResetProfile = function (method) {
        return __awaiter(this, void 0, void 0, function () {
            var reply;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.client.sendRequest(frontpanel_client_1.RequestCode.GetFPGAResetProfile, method)];
                    case 1:
                        reply = _a.sent();
                        return [2 /*return*/, frontpanel_codec_1.FrontPanelCodec.decodeFPGAResetProfile(reply.data)];
                }
            });
        });
    };
    /**
     * Sets the FPGA reset profile.
     *
     * @param method Indicates which reset profile should be set.
     */
    FrontPanel.prototype.setFPGAResetProfile = function (method, profile) {
        return __awaiter(this, void 0, void 0, function () {
            var parameters;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        parameters = frontpanel_codec_1.FrontPanelCodec.encodeFPGAResetProfile(profile);
                        return [4 /*yield*/, this.client.sendRequest(frontpanel_client_1.RequestCode.SetFPGAResetProfile, method, parameters)];
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
                    case 0: return [4 /*yield*/, this.client.sendRequest(frontpanel_client_1.RequestCode.ActivateTriggerIn, epAddr, bit)];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    /**
     * Reads a string of bytes from the target Flash Memory address.
     *
     * @param addr Flash memory address.
     * @param length Length of data (in bytes).
     */
    FrontPanel.prototype.flashRead = function (addr, length) {
        return __awaiter(this, void 0, void 0, function () {
            var result;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.client.sendRequest(frontpanel_client_1.RequestCode.FlashRead, addr, length)];
                    case 1:
                        result = _a.sent();
                        return [2 /*return*/, result.data];
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
                    case 0: return [4 /*yield*/, this.client.sendRequest(frontpanel_client_1.RequestCode.ReadI2C, addr, length)];
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
                    case 0: return [4 /*yield*/, this.client.sendRequest(frontpanel_client_1.RequestCode.ReadFromBlockPipeOut, epAddr, blockSize, length)];
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
                    case 0: return [4 /*yield*/, this.client.sendRequest(frontpanel_client_1.RequestCode.ReadFromPipeOut, epAddr, length)];
                    case 1:
                        result = _a.sent();
                        return [2 /*return*/, result.data];
                }
            });
        });
    };
    /**
     * Reads a set of registers.
     *
     * @param addresses Set of register addresses for the registers to be read.
     * @returns Set of register address and value entries.
     */
    FrontPanel.prototype.readRegisters = function (addresses) {
        return __awaiter(this, void 0, void 0, function () {
            var result, registers, addressIndex;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.client.sendRequest(frontpanel_client_1.RequestCode.ReadRegisters, addresses)];
                    case 1:
                        result = _a.sent();
                        registers = [];
                        for (addressIndex = 0; addressIndex < addresses.length; addressIndex++) {
                            registers[addressIndex] = [addresses[addressIndex], result.data[addressIndex]];
                        }
                        return [2 /*return*/, registers];
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
                    case 0: return [4 /*yield*/, this.client.sendRequest(frontpanel_client_1.RequestCode.LoadScript, engine, name, code)];
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
                    case 0: return [4 /*yield*/, this.client.sendRequest(frontpanel_client_1.RequestCode.RunScriptFunction, engine, name, __spreadArrays(args))];
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
                    case 0: return [4 /*yield*/, this.client.sendRequest(frontpanel_client_1.RequestCode.DestroyScriptEngine, engine)];
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
                    case 0: return [4 /*yield*/, this.client.sendRequest(frontpanel_client_1.RequestCode.IsFrontPanelEnabled)];
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
                    case 0: return [4 /*yield*/, this.client.sendRequest(frontpanel_client_1.RequestCode.UpdateWireIns, this.wireInValues)];
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
                        return [4 /*yield*/, this.client.sendRequest(frontpanel_client_1.RequestCode.UpdateAllOuts)];
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
     * Erases a flash memory sector at the specified address.
     *
     * @param addr Flash memory address.
     */
    FrontPanel.prototype.flashEraseSector = function (addr) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.client.sendRequest(frontpanel_client_1.RequestCode.FlashEraseSector, addr)];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    /**
     * Writes a string of bytes to the target Flash memory address.
     *
     * @param addr Flash memory address.
     * @param buf Data to be written.
     */
    FrontPanel.prototype.flashWrite = function (addr, buf) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.client.sendRequest(frontpanel_client_1.RequestCode.FlashWrite, addr, buf)];
                    case 1:
                        _a.sent();
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
                    case 0: return [4 /*yield*/, this.client.sendRequest(frontpanel_client_1.RequestCode.WriteI2C, addr, buf)];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    /**
     * Writes a set of registers.
     *
     * @param registers Set of register address and value entries.
     */
    FrontPanel.prototype.writeRegisters = function (entries) {
        return __awaiter(this, void 0, void 0, function () {
            var addresses, values, entryIndex;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        addresses = [];
                        values = [];
                        for (entryIndex = 0; entryIndex < entries.length; entryIndex++) {
                            addresses[entryIndex] = entries[entryIndex][0];
                            values[entryIndex] = entries[entryIndex][1];
                        }
                        return [4 /*yield*/, this.client.sendRequest(frontpanel_client_1.RequestCode.WriteRegisters, addresses, values)];
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
                    case 0: return [4 /*yield*/, this.client.sendRequest(frontpanel_client_1.RequestCode.WriteToBlockPipeIn, epAddr, blockSize, buf)];
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
                    case 0: return [4 /*yield*/, this.client.sendRequest(frontpanel_client_1.RequestCode.WriteToPipeIn, epAddr, buf)];
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
                        return [4 /*yield*/, this.client.sendRequest(frontpanel_client_1.RequestCode.UpdateWireOuts)];
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
                        return [4 /*yield*/, this.client.sendRequest(frontpanel_client_1.RequestCode.UpdateTriggerOuts)];
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
    return FrontPanel;
}());
exports.FrontPanel = FrontPanel;
},{"./device-settings":3,"./error":4,"./frontpanel-client":6,"./frontpanel-codec":7,"./ws-async":14}],12:[function(require,module,exports){
"use strict";
/**
 * The async operations.
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.AsyncOperation = void 0;
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
},{}],13:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PLL22150Configuration = exports.DividerSource = exports.ClockSource = void 0;
var ClockSource;
(function (ClockSource) {
    ClockSource[ClockSource["ClkSrc_Ref"] = 0] = "ClkSrc_Ref";
    ClockSource[ClockSource["ClkSrc_Div1ByN"] = 1] = "ClkSrc_Div1ByN";
    ClockSource[ClockSource["ClkSrc_Div1By2"] = 2] = "ClkSrc_Div1By2";
    ClockSource[ClockSource["ClkSrc_Div1By3"] = 3] = "ClkSrc_Div1By3";
    ClockSource[ClockSource["ClkSrc_Div2ByN"] = 4] = "ClkSrc_Div2ByN";
    ClockSource[ClockSource["ClkSrc_Div2By2"] = 5] = "ClkSrc_Div2By2";
    ClockSource[ClockSource["ClkSrc_Div2By4"] = 6] = "ClkSrc_Div2By4";
})(ClockSource = exports.ClockSource || (exports.ClockSource = {}));
;
var DividerSource;
(function (DividerSource) {
    DividerSource[DividerSource["DivSrc_Ref"] = 0] = "DivSrc_Ref";
    DividerSource[DividerSource["DivSrc_VCO"] = 1] = "DivSrc_VCO";
})(DividerSource = exports.DividerSource || (exports.DividerSource = {}));
;
var PLL22150Configuration = /** @class */ (function () {
    function PLL22150Configuration() {
        this._pllReference = 10.0;
        this._capLoad = 22;
        // Set defaults to minimum values.
        this.setVCOParameters(8, 2);
        // Set default dividers.
        this._pllDividerSource1 = DividerSource.DivSrc_VCO;
        this._pllDivider1N = 4;
        this._pllDividerSource2 = DividerSource.DivSrc_VCO;
        this._pllDivider2N = 4;
        // Turn off and disable all outputs.
        this._pllClockSource = [];
        this._pllEnable = [];
        for (var index = 0; index < PLL22150Configuration.OUTPUT_COUNT; index++) {
            this._pllClockSource[index] = ClockSource.ClkSrc_Ref;
            this._pllEnable[index] = false;
        }
        this._pllExternalOscillatorEnabled = false;
    }
    Object.defineProperty(PLL22150Configuration.prototype, "crystalLoad", {
        get: function () {
            return this._capLoad;
        },
        set: function (capload) {
            this._capLoad = capload;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(PLL22150Configuration.prototype, "reference", {
        get: function () {
            return this._pllReference;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(PLL22150Configuration.prototype, "vcoP", {
        get: function () {
            return this._pllPTotal;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(PLL22150Configuration.prototype, "vcoQ", {
        get: function () {
            return (this._pllQ + 2);
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(PLL22150Configuration.prototype, "vcoFrequency", {
        get: function () {
            var frequency = this._pllReference / (this.vcoQ * this._pllPTotal);
            return frequency;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(PLL22150Configuration.prototype, "divider1Source", {
        get: function () {
            return this._pllDividerSource1;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(PLL22150Configuration.prototype, "divider2Source", {
        get: function () {
            return this._pllDividerSource2;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(PLL22150Configuration.prototype, "divider1", {
        get: function () {
            return this._pllDivider1N;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(PLL22150Configuration.prototype, "divider2", {
        get: function () {
            return this._pllDivider2N;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(PLL22150Configuration.prototype, "isExternalOscillatorEnabled", {
        get: function () {
            return this._pllExternalOscillatorEnabled;
        },
        enumerable: false,
        configurable: true
    });
    PLL22150Configuration.prototype.getOutputFrequency = function (output) {
        var frequency;
        if ((output < this._pllClockSource.length) && (output >= 0)) {
            var vco = this._pllReference / (this.vcoQ * this._pllPTotal);
            var frequency1 = (this._pllDividerSource1 == DividerSource.DivSrc_Ref) ? this._pllReference : vco;
            var frequency2 = (this._pllDividerSource2 == DividerSource.DivSrc_Ref) ? this._pllReference : vco;
            switch (this._pllClockSource[output]) {
                case ClockSource.ClkSrc_Ref:
                    frequency = this._pllReference;
                    break;
                case ClockSource.ClkSrc_Div1ByN:
                    frequency = frequency1 / this._pllDivider1N;
                    break;
                case ClockSource.ClkSrc_Div1By2:
                    frequency = frequency1 / 2.0;
                    break;
                case ClockSource.ClkSrc_Div1By3:
                    frequency = frequency1 / 3.0;
                    break;
                case ClockSource.ClkSrc_Div2ByN:
                    frequency = frequency2 / this._pllDivider2N;
                    break;
                case ClockSource.ClkSrc_Div2By2:
                    frequency = frequency2 / 2.0;
                    break;
                case ClockSource.ClkSrc_Div2By4:
                    frequency = frequency2 / 4.0;
                    break;
                default:
                    frequency = 0.0;
                    break;
            }
        }
        else {
            frequency = 0.0;
        }
        return frequency;
    };
    PLL22150Configuration.prototype.getOutputSource = function (output) {
        var source;
        if ((output < this._pllClockSource.length) && (output >= 0)) {
            source = this._pllClockSource[output];
        }
        else {
            source = ClockSource.ClkSrc_Ref;
        }
        return source;
    };
    PLL22150Configuration.prototype.isOutputEnabled = function (output) {
        var retval;
        if ((output < this._pllEnable.length) && (output >= 0)) {
            retval = this._pllEnable[output];
        }
        else {
            retval = false;
        }
        return retval;
    };
    PLL22150Configuration.prototype.setReference = function (frequency, externalOscillatorEnable) {
        this._pllReference = frequency;
        this._pllExternalOscillatorEnabled = externalOscillatorEnable;
    };
    PLL22150Configuration.prototype.setVCOParameters = function (p, q) {
        var retval = ((p >= PLL22150Configuration.MIN_P_VALUE) &&
            (p <= PLL22150Configuration.MAX_P_VALUE) &&
            (q >= PLL22150Configuration.MIN_Q_VALUE) &&
            (q <= PLL22150Configuration.MAX_Q_VALUE));
        if (retval) {
            this._pllQ = q - 2;
            this._pllPO = p % 2;
            this._pllPB = (p - this._pllPO) / 2 - 4;
            this._pllPTotal = 2 * (this._pllPB + 4) + this._pllPO;
        }
        return retval;
    };
    PLL22150Configuration.prototype.setDivider1 = function (source, n) {
        if ((n >= PLL22150Configuration.MIN_DIVIDER_N_VALUE) && (n <= PLL22150Configuration.MAX_DIVIDER_N_VALUE)) {
            this._pllDividerSource1 = source;
            this._pllDivider1N = n;
        }
    };
    PLL22150Configuration.prototype.setDivider2 = function (source, n) {
        if ((n >= PLL22150Configuration.MIN_DIVIDER_N_VALUE) && (n <= PLL22150Configuration.MAX_DIVIDER_N_VALUE)) {
            this._pllDividerSource2 = source;
            this._pllDivider2N = n;
        }
    };
    PLL22150Configuration.prototype.setOutputSource = function (output, source) {
        if ((output >= 0) && (output < this._pllClockSource.length)) {
            this._pllClockSource[output] = source;
        }
    };
    PLL22150Configuration.prototype.setOutputEnable = function (output, enable) {
        if ((output >= 0) && (output < this._pllClockSource.length)) {
            this._pllEnable[output] = enable;
        }
    };
    PLL22150Configuration.prototype.computeCapLoad = function () {
        var capload = (this._capLoad - 2 - 6) / 0.09375;
        if (capload < 0) {
            capload = 0;
        }
        else if (capload > 255) {
            capload = 255;
        }
        return capload;
    };
    PLL22150Configuration.OUTPUT_COUNT = 6;
    PLL22150Configuration.MIN_DIVIDER_N_VALUE = 4;
    PLL22150Configuration.MAX_DIVIDER_N_VALUE = 127;
    PLL22150Configuration.MIN_P_VALUE = 8;
    PLL22150Configuration.MAX_P_VALUE = 2055;
    PLL22150Configuration.MIN_Q_VALUE = 2;
    PLL22150Configuration.MAX_Q_VALUE = 129;
    return PLL22150Configuration;
}());
exports.PLL22150Configuration = PLL22150Configuration;
},{}],14:[function(require,module,exports){
"use strict";
/**
 * Implement promise-based WebSocket API, in order to keep dependencies
 * of this module minimal.
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.AsyncWebSocket = exports.Notification = void 0;
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
;
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
        enumerable: false,
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
        enumerable: false,
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
        enumerable: false,
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
        enumerable: false,
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
                if (errorCode !== error_1.ErrorCode.NoError) {
                    var errorMessage = "Reply #" + replyId + " failed";
                    // Append the error description, if it isn't an empty string.
                    var errorDescription = elements[1];
                    if (errorDescription) {
                        errorMessage += ": '" + errorDescription + "'";
                    }
                    replyError = new error_1.FrontPanelError(errorCode, errorMessage);
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
            if (e instanceof error_1.FrontPanelError) {
                this._rejectWithError(e);
            }
            else {
                this._rejectWithError(new error_1.FrontPanelError(error_1.ErrorCode.Failed, e.message));
            }
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
},{"./error":4,"./operation":12,"@msgpack/msgpack":15,"isomorphic-ws":16}],15:[function(require,module,exports){
(function (process){(function (){
!function(e,t){"object"==typeof exports&&"object"==typeof module?module.exports=t():"function"==typeof define&&define.amd?define([],t):"object"==typeof exports?exports.MessagePack=t():e.MessagePack=t()}(this,(function(){return function(e){var t={};function r(n){if(t[n])return t[n].exports;var i=t[n]={i:n,l:!1,exports:{}};return e[n].call(i.exports,i,i.exports,r),i.l=!0,i.exports}return r.m=e,r.c=t,r.d=function(e,t,n){r.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:n})},r.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},r.t=function(e,t){if(1&t&&(e=r(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var n=Object.create(null);if(r.r(n),Object.defineProperty(n,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var i in e)r.d(n,i,function(t){return e[t]}.bind(null,i));return n},r.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return r.d(t,"a",t),t},r.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},r.p="",r(r.s=0)}([function(e,t,r){"use strict";r.r(t),r.d(t,"encode",(function(){return I})),r.d(t,"decode",(function(){return N})),r.d(t,"decodeAsync",(function(){return Y})),r.d(t,"decodeArrayStream",(function(){return Z})),r.d(t,"decodeStream",(function(){return $})),r.d(t,"Decoder",(function(){return V})),r.d(t,"Encoder",(function(){return L})),r.d(t,"ExtensionCodec",(function(){return S})),r.d(t,"ExtData",(function(){return p})),r.d(t,"EXT_TIMESTAMP",(function(){return w})),r.d(t,"encodeDateToTimeSpec",(function(){return g})),r.d(t,"encodeTimeSpecToTimestamp",(function(){return v})),r.d(t,"decodeTimestampToTimeSpec",(function(){return x})),r.d(t,"encodeTimestampExtension",(function(){return b})),r.d(t,"decodeTimestampExtension",(function(){return U}));var n=function(e,t){var r="function"==typeof Symbol&&e[Symbol.iterator];if(!r)return e;var n,i,o=r.call(e),s=[];try{for(;(void 0===t||t-- >0)&&!(n=o.next()).done;)s.push(n.value)}catch(e){i={error:e}}finally{try{n&&!n.done&&(r=o.return)&&r.call(o)}finally{if(i)throw i.error}}return s},i=function(){for(var e=[],t=0;t<arguments.length;t++)e=e.concat(n(arguments[t]));return e},o="undefined"!=typeof process&&"undefined"!=typeof TextEncoder&&"undefined"!=typeof TextDecoder;function s(e){for(var t=e.length,r=0,n=0;n<t;){var i=e.charCodeAt(n++);if(0!=(4294967168&i))if(0==(4294965248&i))r+=2;else{if(i>=55296&&i<=56319&&n<t){var o=e.charCodeAt(n);56320==(64512&o)&&(++n,i=((1023&i)<<10)+(1023&o)+65536)}r+=0==(4294901760&i)?3:4}else r++}return r}var a=o?new TextEncoder:void 0,h="undefined"!=typeof process?200:0;var u=(null==a?void 0:a.encodeInto)?function(e,t,r){a.encodeInto(e,t.subarray(r))}:function(e,t,r){t.set(a.encode(e),r)};function c(e,t,r){for(var n=t,o=n+r,s=[],a="";n<o;){var h=e[n++];if(0==(128&h))s.push(h);else if(192==(224&h)){var u=63&e[n++];s.push((31&h)<<6|u)}else if(224==(240&h)){u=63&e[n++];var c=63&e[n++];s.push((31&h)<<12|u<<6|c)}else if(240==(248&h)){var f=(7&h)<<18|(u=63&e[n++])<<12|(c=63&e[n++])<<6|63&e[n++];f>65535&&(f-=65536,s.push(f>>>10&1023|55296),f=56320|1023&f),s.push(f)}else s.push(h);s.length>=4096&&(a+=String.fromCharCode.apply(String,i(s)),s.length=0)}return s.length>0&&(a+=String.fromCharCode.apply(String,i(s))),a}var f=o?new TextDecoder:null,l="undefined"!=typeof process?200:0;var p=function(e,t){this.type=e,this.data=t};function d(e,t,r){var n=Math.floor(r/4294967296),i=r;e.setUint32(t,n),e.setUint32(t+4,i)}function y(e,t){return 4294967296*e.getInt32(t)+e.getUint32(t+4)}var w=-1;function v(e){var t=e.sec,r=e.nsec;if(t>=0&&r>=0&&t<=17179869183){if(0===r&&t<=4294967295){var n=new Uint8Array(4);return(s=new DataView(n.buffer)).setUint32(0,t),n}var i=t/4294967296,o=4294967295&t;n=new Uint8Array(8);return(s=new DataView(n.buffer)).setUint32(0,r<<2|3&i),s.setUint32(4,o),n}var s;n=new Uint8Array(12);return(s=new DataView(n.buffer)).setUint32(0,r),d(s,4,t),n}function g(e){var t=e.getTime(),r=Math.floor(t/1e3),n=1e6*(t-1e3*r),i=Math.floor(n/1e9);return{sec:r+i,nsec:n-1e9*i}}function b(e){return e instanceof Date?v(g(e)):null}function x(e){var t=new DataView(e.buffer,e.byteOffset,e.byteLength);switch(e.byteLength){case 4:return{sec:t.getUint32(0),nsec:0};case 8:var r=t.getUint32(0);return{sec:4294967296*(3&r)+t.getUint32(4),nsec:r>>>2};case 12:return{sec:y(t,4),nsec:t.getUint32(0)};default:throw new Error("Unrecognized data size for timestamp: "+e.length)}}function U(e){var t=x(e);return new Date(1e3*t.sec+t.nsec/1e6)}var m={type:w,encode:b,decode:U},S=function(){function e(){this.builtInEncoders=[],this.builtInDecoders=[],this.encoders=[],this.decoders=[],this.register(m)}return e.prototype.register=function(e){var t=e.type,r=e.encode,n=e.decode;if(t>=0)this.encoders[t]=r,this.decoders[t]=n;else{var i=1+t;this.builtInEncoders[i]=r,this.builtInDecoders[i]=n}},e.prototype.tryToEncode=function(e,t){for(var r=0;r<this.builtInEncoders.length;r++){if(null!=(n=this.builtInEncoders[r]))if(null!=(i=n(e,t)))return new p(-1-r,i)}for(r=0;r<this.encoders.length;r++){var n,i;if(null!=(n=this.encoders[r]))if(null!=(i=n(e,t)))return new p(r,i)}return e instanceof p?e:null},e.prototype.decode=function(e,t,r){var n=t<0?this.builtInDecoders[-1-t]:this.decoders[t];return n?n(e,t,r):new p(t,e)},e.defaultCodec=new e,e}();function E(e){return e instanceof Uint8Array?e:ArrayBuffer.isView(e)?new Uint8Array(e.buffer,e.byteOffset,e.byteLength):e instanceof ArrayBuffer?new Uint8Array(e):Uint8Array.from(e)}var B=function(e){var t="function"==typeof Symbol&&Symbol.iterator,r=t&&e[t],n=0;if(r)return r.call(e);if(e&&"number"==typeof e.length)return{next:function(){return e&&n>=e.length&&(e=void 0),{value:e&&e[n++],done:!e}}};throw new TypeError(t?"Object is not iterable.":"Symbol.iterator is not defined.")},L=function(){function e(e,t,r,n,i,o,s){void 0===e&&(e=S.defaultCodec),void 0===r&&(r=100),void 0===n&&(n=2048),void 0===i&&(i=!1),void 0===o&&(o=!1),void 0===s&&(s=!1),this.extensionCodec=e,this.context=t,this.maxDepth=r,this.initialBufferSize=n,this.sortKeys=i,this.forceFloat32=o,this.ignoreUndefined=s,this.pos=0,this.view=new DataView(new ArrayBuffer(this.initialBufferSize)),this.bytes=new Uint8Array(this.view.buffer)}return e.prototype.encode=function(e,t){if(t>this.maxDepth)throw new Error("Too deep objects in depth "+t);null==e?this.encodeNil():"boolean"==typeof e?this.encodeBoolean(e):"number"==typeof e?this.encodeNumber(e):"string"==typeof e?this.encodeString(e):this.encodeObject(e,t)},e.prototype.getUint8Array=function(){return this.bytes.subarray(0,this.pos)},e.prototype.ensureBufferSizeToWrite=function(e){var t=this.pos+e;this.view.byteLength<t&&this.resizeBuffer(2*t)},e.prototype.resizeBuffer=function(e){var t=new ArrayBuffer(e),r=new Uint8Array(t),n=new DataView(t);r.set(this.bytes),this.view=n,this.bytes=r},e.prototype.encodeNil=function(){this.writeU8(192)},e.prototype.encodeBoolean=function(e){!1===e?this.writeU8(194):this.writeU8(195)},e.prototype.encodeNumber=function(e){Number.isSafeInteger(e)?e>=0?e<128?this.writeU8(e):e<256?(this.writeU8(204),this.writeU8(e)):e<65536?(this.writeU8(205),this.writeU16(e)):e<4294967296?(this.writeU8(206),this.writeU32(e)):(this.writeU8(207),this.writeU64(e)):e>=-32?this.writeU8(224|e+32):e>=-128?(this.writeU8(208),this.writeI8(e)):e>=-32768?(this.writeU8(209),this.writeI16(e)):e>=-2147483648?(this.writeU8(210),this.writeI32(e)):(this.writeU8(211),this.writeI64(e)):this.forceFloat32?(this.writeU8(202),this.writeF32(e)):(this.writeU8(203),this.writeF64(e))},e.prototype.writeStringHeader=function(e){if(e<32)this.writeU8(160+e);else if(e<256)this.writeU8(217),this.writeU8(e);else if(e<65536)this.writeU8(218),this.writeU16(e);else{if(!(e<4294967296))throw new Error("Too long string: "+e+" bytes in UTF-8");this.writeU8(219),this.writeU32(e)}},e.prototype.encodeString=function(e){var t=e.length;if(o&&t>h){var r=s(e);this.ensureBufferSizeToWrite(5+r),this.writeStringHeader(r),u(e,this.bytes,this.pos),this.pos+=r}else{r=s(e);this.ensureBufferSizeToWrite(5+r),this.writeStringHeader(r),function(e,t,r){for(var n=e.length,i=r,o=0;o<n;){var s=e.charCodeAt(o++);if(0!=(4294967168&s)){if(0==(4294965248&s))t[i++]=s>>6&31|192;else{if(s>=55296&&s<=56319&&o<n){var a=e.charCodeAt(o);56320==(64512&a)&&(++o,s=((1023&s)<<10)+(1023&a)+65536)}0==(4294901760&s)?(t[i++]=s>>12&15|224,t[i++]=s>>6&63|128):(t[i++]=s>>18&7|240,t[i++]=s>>12&63|128,t[i++]=s>>6&63|128)}t[i++]=63&s|128}else t[i++]=s}}(e,this.bytes,this.pos),this.pos+=r}},e.prototype.encodeObject=function(e,t){var r=this.extensionCodec.tryToEncode(e,this.context);if(null!=r)this.encodeExtension(r);else if(Array.isArray(e))this.encodeArray(e,t);else if(ArrayBuffer.isView(e))this.encodeBinary(e);else{if("object"!=typeof e)throw new Error("Unrecognized object: "+Object.prototype.toString.apply(e));this.encodeMap(e,t)}},e.prototype.encodeBinary=function(e){var t=e.byteLength;if(t<256)this.writeU8(196),this.writeU8(t);else if(t<65536)this.writeU8(197),this.writeU16(t);else{if(!(t<4294967296))throw new Error("Too large binary: "+t);this.writeU8(198),this.writeU32(t)}var r=E(e);this.writeU8a(r)},e.prototype.encodeArray=function(e,t){var r,n,i=e.length;if(i<16)this.writeU8(144+i);else if(i<65536)this.writeU8(220),this.writeU16(i);else{if(!(i<4294967296))throw new Error("Too large array: "+i);this.writeU8(221),this.writeU32(i)}try{for(var o=B(e),s=o.next();!s.done;s=o.next()){var a=s.value;this.encode(a,t+1)}}catch(e){r={error:e}}finally{try{s&&!s.done&&(n=o.return)&&n.call(o)}finally{if(r)throw r.error}}},e.prototype.countWithoutUndefined=function(e,t){var r,n,i=0;try{for(var o=B(t),s=o.next();!s.done;s=o.next()){void 0!==e[s.value]&&i++}}catch(e){r={error:e}}finally{try{s&&!s.done&&(n=o.return)&&n.call(o)}finally{if(r)throw r.error}}return i},e.prototype.encodeMap=function(e,t){var r,n,i=Object.keys(e);this.sortKeys&&i.sort();var o=this.ignoreUndefined?this.countWithoutUndefined(e,i):i.length;if(o<16)this.writeU8(128+o);else if(o<65536)this.writeU8(222),this.writeU16(o);else{if(!(o<4294967296))throw new Error("Too large map object: "+o);this.writeU8(223),this.writeU32(o)}try{for(var s=B(i),a=s.next();!a.done;a=s.next()){var h=a.value,u=e[h];this.ignoreUndefined&&void 0===u||(this.encodeString(h),this.encode(u,t+1))}}catch(e){r={error:e}}finally{try{a&&!a.done&&(n=s.return)&&n.call(s)}finally{if(r)throw r.error}}},e.prototype.encodeExtension=function(e){var t=e.data.length;if(1===t)this.writeU8(212);else if(2===t)this.writeU8(213);else if(4===t)this.writeU8(214);else if(8===t)this.writeU8(215);else if(16===t)this.writeU8(216);else if(t<256)this.writeU8(199),this.writeU8(t);else if(t<65536)this.writeU8(200),this.writeU16(t);else{if(!(t<4294967296))throw new Error("Too large extension object: "+t);this.writeU8(201),this.writeU32(t)}this.writeI8(e.type),this.writeU8a(e.data)},e.prototype.writeU8=function(e){this.ensureBufferSizeToWrite(1),this.view.setUint8(this.pos,e),this.pos++},e.prototype.writeU8a=function(e){var t=e.length;this.ensureBufferSizeToWrite(t),this.bytes.set(e,this.pos),this.pos+=t},e.prototype.writeI8=function(e){this.ensureBufferSizeToWrite(1),this.view.setInt8(this.pos,e),this.pos++},e.prototype.writeU16=function(e){this.ensureBufferSizeToWrite(2),this.view.setUint16(this.pos,e),this.pos+=2},e.prototype.writeI16=function(e){this.ensureBufferSizeToWrite(2),this.view.setInt16(this.pos,e),this.pos+=2},e.prototype.writeU32=function(e){this.ensureBufferSizeToWrite(4),this.view.setUint32(this.pos,e),this.pos+=4},e.prototype.writeI32=function(e){this.ensureBufferSizeToWrite(4),this.view.setInt32(this.pos,e),this.pos+=4},e.prototype.writeF32=function(e){this.ensureBufferSizeToWrite(4),this.view.setFloat32(this.pos,e),this.pos+=4},e.prototype.writeF64=function(e){this.ensureBufferSizeToWrite(8),this.view.setFloat64(this.pos,e),this.pos+=8},e.prototype.writeU64=function(e){this.ensureBufferSizeToWrite(8),function(e,t,r){var n=r/4294967296,i=r;e.setUint32(t,n),e.setUint32(t+4,i)}(this.view,this.pos,e),this.pos+=8},e.prototype.writeI64=function(e){this.ensureBufferSizeToWrite(8),d(this.view,this.pos,e),this.pos+=8},e}(),A={};function I(e,t){void 0===t&&(t=A);var r=new L(t.extensionCodec,t.context,t.maxDepth,t.initialBufferSize,t.sortKeys,t.forceFloat32,t.ignoreUndefined);return r.encode(e,1),r.getUint8Array()}function T(e){return(e<0?"-":"")+"0x"+Math.abs(e).toString(16).padStart(2,"0")}var k=function(){function e(e,t){void 0===e&&(e=16),void 0===t&&(t=16),this.maxKeyLength=e,this.maxLengthPerKey=t,this.caches=[];for(var r=0;r<this.maxKeyLength;r++)this.caches.push([])}return e.prototype.canBeCached=function(e){return e>0&&e<=this.maxKeyLength},e.prototype.get=function(e,t,r){var n=this.caches[r-1],i=n.length;e:for(var o=0;o<i;o++){for(var s=n[o],a=s.bytes,h=0;h<r;h++)if(a[h]!==e[t+h])continue e;return s.value}return null},e.prototype.store=function(e,t){var r=this.caches[e.length-1],n={bytes:e,value:t};r.length>=this.maxLengthPerKey?r[Math.random()*r.length|0]=n:r.push(n)},e.prototype.decode=function(e,t,r){var n=this.get(e,t,r);if(null!=n)return n;var i=c(e,t,r),o=Uint8Array.prototype.slice.call(e,t,t+r);return this.store(o,i),i},e}(),M=function(e,t,r,n){return new(r||(r=Promise))((function(i,o){function s(e){try{h(n.next(e))}catch(e){o(e)}}function a(e){try{h(n.throw(e))}catch(e){o(e)}}function h(e){var t;e.done?i(e.value):(t=e.value,t instanceof r?t:new r((function(e){e(t)}))).then(s,a)}h((n=n.apply(e,t||[])).next())}))},z=function(e,t){var r,n,i,o,s={label:0,sent:function(){if(1&i[0])throw i[1];return i[1]},trys:[],ops:[]};return o={next:a(0),throw:a(1),return:a(2)},"function"==typeof Symbol&&(o[Symbol.iterator]=function(){return this}),o;function a(o){return function(a){return function(o){if(r)throw new TypeError("Generator is already executing.");for(;s;)try{if(r=1,n&&(i=2&o[0]?n.return:o[0]?n.throw||((i=n.return)&&i.call(n),0):n.next)&&!(i=i.call(n,o[1])).done)return i;switch(n=0,i&&(o=[2&o[0],i.value]),o[0]){case 0:case 1:i=o;break;case 4:return s.label++,{value:o[1],done:!1};case 5:s.label++,n=o[1],o=[0];continue;case 7:o=s.ops.pop(),s.trys.pop();continue;default:if(!(i=s.trys,(i=i.length>0&&i[i.length-1])||6!==o[0]&&2!==o[0])){s=0;continue}if(3===o[0]&&(!i||o[1]>i[0]&&o[1]<i[3])){s.label=o[1];break}if(6===o[0]&&s.label<i[1]){s.label=i[1],i=o;break}if(i&&s.label<i[2]){s.label=i[2],s.ops.push(o);break}i[2]&&s.ops.pop(),s.trys.pop();continue}o=t.call(e,s)}catch(e){o=[6,e],n=0}finally{r=i=0}if(5&o[0])throw o[1];return{value:o[0]?o[1]:void 0,done:!0}}([o,a])}}},C=function(e){if(!Symbol.asyncIterator)throw new TypeError("Symbol.asyncIterator is not defined.");var t,r=e[Symbol.asyncIterator];return r?r.call(e):(e="function"==typeof __values?__values(e):e[Symbol.iterator](),t={},n("next"),n("throw"),n("return"),t[Symbol.asyncIterator]=function(){return this},t);function n(r){t[r]=e[r]&&function(t){return new Promise((function(n,i){(function(e,t,r,n){Promise.resolve(n).then((function(t){e({value:t,done:r})}),t)})(n,i,(t=e[r](t)).done,t.value)}))}}},D=function(e){return this instanceof D?(this.v=e,this):new D(e)},P=function(e,t,r){if(!Symbol.asyncIterator)throw new TypeError("Symbol.asyncIterator is not defined.");var n,i=r.apply(e,t||[]),o=[];return n={},s("next"),s("throw"),s("return"),n[Symbol.asyncIterator]=function(){return this},n;function s(e){i[e]&&(n[e]=function(t){return new Promise((function(r,n){o.push([e,t,r,n])>1||a(e,t)}))})}function a(e,t){try{(r=i[e](t)).value instanceof D?Promise.resolve(r.value.v).then(h,u):c(o[0][2],r)}catch(e){c(o[0][3],e)}var r}function h(e){a("next",e)}function u(e){a("throw",e)}function c(e,t){e(t),o.shift(),o.length&&a(o[0][0],o[0][1])}},j=new DataView(new ArrayBuffer(0)),F=new Uint8Array(j.buffer),W=function(){try{j.getInt8(0)}catch(e){return e.constructor}throw new Error("never reached")}(),O=new W("Insufficient data"),K=new k,V=function(){function e(e,t,r,n,i,o,s,a){void 0===e&&(e=S.defaultCodec),void 0===r&&(r=4294967295),void 0===n&&(n=4294967295),void 0===i&&(i=4294967295),void 0===o&&(o=4294967295),void 0===s&&(s=4294967295),void 0===a&&(a=K),this.extensionCodec=e,this.context=t,this.maxStrLength=r,this.maxBinLength=n,this.maxArrayLength=i,this.maxMapLength=o,this.maxExtLength=s,this.cachedKeyDecoder=a,this.totalPos=0,this.pos=0,this.view=j,this.bytes=F,this.headByte=-1,this.stack=[]}return e.prototype.setBuffer=function(e){this.bytes=E(e),this.view=function(e){if(e instanceof ArrayBuffer)return new DataView(e);var t=E(e);return new DataView(t.buffer,t.byteOffset,t.byteLength)}(this.bytes),this.pos=0},e.prototype.appendBuffer=function(e){if(-1!==this.headByte||this.hasRemaining()){var t=this.bytes.subarray(this.pos),r=E(e),n=new Uint8Array(t.length+r.length);n.set(t),n.set(r,t.length),this.setBuffer(n)}else this.setBuffer(e)},e.prototype.hasRemaining=function(e){return void 0===e&&(e=1),this.view.byteLength-this.pos>=e},e.prototype.createNoExtraBytesError=function(e){var t=this.view,r=this.pos;return new RangeError("Extra "+(t.byteLength-r)+" byte(s) found at buffer["+e+"]")},e.prototype.decodeSingleSync=function(){var e=this.decodeSync();if(this.hasRemaining())throw this.createNoExtraBytesError(this.pos);return e},e.prototype.decodeSingleAsync=function(e){var t,r,n,i;return M(this,void 0,void 0,(function(){var o,s,a,h,u,c,f,l;return z(this,(function(p){switch(p.label){case 0:o=!1,p.label=1;case 1:p.trys.push([1,6,7,12]),t=C(e),p.label=2;case 2:return[4,t.next()];case 3:if((r=p.sent()).done)return[3,5];if(a=r.value,o)throw this.createNoExtraBytesError(this.totalPos);this.appendBuffer(a);try{s=this.decodeSync(),o=!0}catch(e){if(!(e instanceof W))throw e}this.totalPos+=this.pos,p.label=4;case 4:return[3,2];case 5:return[3,12];case 6:return h=p.sent(),n={error:h},[3,12];case 7:return p.trys.push([7,,10,11]),r&&!r.done&&(i=t.return)?[4,i.call(t)]:[3,9];case 8:p.sent(),p.label=9;case 9:return[3,11];case 10:if(n)throw n.error;return[7];case 11:return[7];case 12:if(o){if(this.hasRemaining())throw this.createNoExtraBytesError(this.totalPos);return[2,s]}throw c=(u=this).headByte,f=u.pos,l=u.totalPos,new RangeError("Insufficient data in parcing "+T(c)+" at "+l+" ("+f+" in the current buffer)")}}))}))},e.prototype.decodeArrayStream=function(e){return this.decodeMultiAsync(e,!0)},e.prototype.decodeStream=function(e){return this.decodeMultiAsync(e,!1)},e.prototype.decodeMultiAsync=function(e,t){return P(this,arguments,(function(){var r,n,i,o,s,a,h,u,c;return z(this,(function(f){switch(f.label){case 0:r=t,n=-1,f.label=1;case 1:f.trys.push([1,13,14,19]),i=C(e),f.label=2;case 2:return[4,D(i.next())];case 3:if((o=f.sent()).done)return[3,12];if(s=o.value,t&&0===n)throw this.createNoExtraBytesError(this.totalPos);this.appendBuffer(s),r&&(n=this.readArraySize(),r=!1,this.complete()),f.label=4;case 4:f.trys.push([4,9,,10]),f.label=5;case 5:return[4,D(this.decodeSync())];case 6:return[4,f.sent()];case 7:return f.sent(),0==--n?[3,8]:[3,5];case 8:return[3,10];case 9:if(!((a=f.sent())instanceof W))throw a;return[3,10];case 10:this.totalPos+=this.pos,f.label=11;case 11:return[3,2];case 12:return[3,19];case 13:return h=f.sent(),u={error:h},[3,19];case 14:return f.trys.push([14,,17,18]),o&&!o.done&&(c=i.return)?[4,D(c.call(i))]:[3,16];case 15:f.sent(),f.label=16;case 16:return[3,18];case 17:if(u)throw u.error;return[7];case 18:return[7];case 19:return[2]}}))}))},e.prototype.decodeSync=function(){e:for(;;){var e=this.readHeadByte(),t=void 0;if(e>=224)t=e-256;else if(e<192)if(e<128)t=e;else if(e<144){if(0!==(n=e-128)){this.pushMapState(n),this.complete();continue e}t={}}else if(e<160){if(0!==(n=e-144)){this.pushArrayState(n),this.complete();continue e}t=[]}else{var r=e-160;t=this.decodeUtf8String(r,0)}else if(192===e)t=null;else if(194===e)t=!1;else if(195===e)t=!0;else if(202===e)t=this.readF32();else if(203===e)t=this.readF64();else if(204===e)t=this.readU8();else if(205===e)t=this.readU16();else if(206===e)t=this.readU32();else if(207===e)t=this.readU64();else if(208===e)t=this.readI8();else if(209===e)t=this.readI16();else if(210===e)t=this.readI32();else if(211===e)t=this.readI64();else if(217===e){r=this.lookU8();t=this.decodeUtf8String(r,1)}else if(218===e){r=this.lookU16();t=this.decodeUtf8String(r,2)}else if(219===e){r=this.lookU32();t=this.decodeUtf8String(r,4)}else if(220===e){if(0!==(n=this.readU16())){this.pushArrayState(n),this.complete();continue e}t=[]}else if(221===e){if(0!==(n=this.readU32())){this.pushArrayState(n),this.complete();continue e}t=[]}else if(222===e){if(0!==(n=this.readU16())){this.pushMapState(n),this.complete();continue e}t={}}else if(223===e){if(0!==(n=this.readU32())){this.pushMapState(n),this.complete();continue e}t={}}else if(196===e){var n=this.lookU8();t=this.decodeBinary(n,1)}else if(197===e){n=this.lookU16();t=this.decodeBinary(n,2)}else if(198===e){n=this.lookU32();t=this.decodeBinary(n,4)}else if(212===e)t=this.decodeExtension(1,0);else if(213===e)t=this.decodeExtension(2,0);else if(214===e)t=this.decodeExtension(4,0);else if(215===e)t=this.decodeExtension(8,0);else if(216===e)t=this.decodeExtension(16,0);else if(199===e){n=this.lookU8();t=this.decodeExtension(n,1)}else if(200===e){n=this.lookU16();t=this.decodeExtension(n,2)}else{if(201!==e)throw new Error("Unrecognized type byte: "+T(e));n=this.lookU32();t=this.decodeExtension(n,4)}this.complete();for(var i=this.stack;i.length>0;){var o=i[i.length-1];if(0===o.type){if(o.array[o.position]=t,o.position++,o.position!==o.size)continue e;i.pop(),t=o.array}else{if(1===o.type){if(s=void 0,"string"!==(s=typeof t)&&"number"!==s)throw new Error("The type of key must be string or number but "+typeof t);o.key=t,o.type=2;continue e}if(o.map[o.key]=t,o.readCount++,o.readCount!==o.size){o.key=null,o.type=1;continue e}i.pop(),t=o.map}}return t}var s},e.prototype.readHeadByte=function(){return-1===this.headByte&&(this.headByte=this.readU8()),this.headByte},e.prototype.complete=function(){this.headByte=-1},e.prototype.readArraySize=function(){var e=this.readHeadByte();switch(e){case 220:return this.readU16();case 221:return this.readU32();default:if(e<160)return e-144;throw new Error("Unrecognized array type byte: "+T(e))}},e.prototype.pushMapState=function(e){if(e>this.maxMapLength)throw new Error("Max length exceeded: map length ("+e+") > maxMapLengthLength ("+this.maxMapLength+")");this.stack.push({type:1,size:e,key:null,readCount:0,map:{}})},e.prototype.pushArrayState=function(e){if(e>this.maxArrayLength)throw new Error("Max length exceeded: array length ("+e+") > maxArrayLength ("+this.maxArrayLength+")");this.stack.push({type:0,size:e,array:new Array(e),position:0})},e.prototype.decodeUtf8String=function(e,t){var r;if(e>this.maxStrLength)throw new Error("Max length exceeded: UTF-8 byte length ("+e+") > maxStrLength ("+this.maxStrLength+")");if(this.bytes.byteLength<this.pos+t+e)throw O;var n,i=this.pos+t;return n=this.stateIsMapKey()&&(null===(r=this.cachedKeyDecoder)||void 0===r?void 0:r.canBeCached(e))?this.cachedKeyDecoder.decode(this.bytes,i,e):o&&e>l?function(e,t,r){var n=e.subarray(t,t+r);return f.decode(n)}(this.bytes,i,e):c(this.bytes,i,e),this.pos+=t+e,n},e.prototype.stateIsMapKey=function(){return this.stack.length>0&&1===this.stack[this.stack.length-1].type},e.prototype.decodeBinary=function(e,t){if(e>this.maxBinLength)throw new Error("Max length exceeded: bin length ("+e+") > maxBinLength ("+this.maxBinLength+")");if(!this.hasRemaining(e+t))throw O;var r=this.pos+t,n=this.bytes.subarray(r,r+e);return this.pos+=t+e,n},e.prototype.decodeExtension=function(e,t){if(e>this.maxExtLength)throw new Error("Max length exceeded: ext length ("+e+") > maxExtLength ("+this.maxExtLength+")");var r=this.view.getInt8(this.pos+t),n=this.decodeBinary(e,t+1);return this.extensionCodec.decode(n,r,this.context)},e.prototype.lookU8=function(){return this.view.getUint8(this.pos)},e.prototype.lookU16=function(){return this.view.getUint16(this.pos)},e.prototype.lookU32=function(){return this.view.getUint32(this.pos)},e.prototype.readU8=function(){var e=this.view.getUint8(this.pos);return this.pos++,e},e.prototype.readI8=function(){var e=this.view.getInt8(this.pos);return this.pos++,e},e.prototype.readU16=function(){var e=this.view.getUint16(this.pos);return this.pos+=2,e},e.prototype.readI16=function(){var e=this.view.getInt16(this.pos);return this.pos+=2,e},e.prototype.readU32=function(){var e=this.view.getUint32(this.pos);return this.pos+=4,e},e.prototype.readI32=function(){var e=this.view.getInt32(this.pos);return this.pos+=4,e},e.prototype.readU64=function(){var e,t,r=(e=this.view,t=this.pos,4294967296*e.getUint32(t)+e.getUint32(t+4));return this.pos+=8,r},e.prototype.readI64=function(){var e=y(this.view,this.pos);return this.pos+=8,e},e.prototype.readF32=function(){var e=this.view.getFloat32(this.pos);return this.pos+=4,e},e.prototype.readF64=function(){var e=this.view.getFloat64(this.pos);return this.pos+=8,e},e}(),_={};function N(e,t){void 0===t&&(t=_);var r=new V(t.extensionCodec,t.context,t.maxStrLength,t.maxBinLength,t.maxArrayLength,t.maxMapLength,t.maxExtLength);return r.setBuffer(e),r.decodeSingleSync()}var R=function(e,t){var r,n,i,o,s={label:0,sent:function(){if(1&i[0])throw i[1];return i[1]},trys:[],ops:[]};return o={next:a(0),throw:a(1),return:a(2)},"function"==typeof Symbol&&(o[Symbol.iterator]=function(){return this}),o;function a(o){return function(a){return function(o){if(r)throw new TypeError("Generator is already executing.");for(;s;)try{if(r=1,n&&(i=2&o[0]?n.return:o[0]?n.throw||((i=n.return)&&i.call(n),0):n.next)&&!(i=i.call(n,o[1])).done)return i;switch(n=0,i&&(o=[2&o[0],i.value]),o[0]){case 0:case 1:i=o;break;case 4:return s.label++,{value:o[1],done:!1};case 5:s.label++,n=o[1],o=[0];continue;case 7:o=s.ops.pop(),s.trys.pop();continue;default:if(!(i=s.trys,(i=i.length>0&&i[i.length-1])||6!==o[0]&&2!==o[0])){s=0;continue}if(3===o[0]&&(!i||o[1]>i[0]&&o[1]<i[3])){s.label=o[1];break}if(6===o[0]&&s.label<i[1]){s.label=i[1],i=o;break}if(i&&s.label<i[2]){s.label=i[2],s.ops.push(o);break}i[2]&&s.ops.pop(),s.trys.pop();continue}o=t.call(e,s)}catch(e){o=[6,e],n=0}finally{r=i=0}if(5&o[0])throw o[1];return{value:o[0]?o[1]:void 0,done:!0}}([o,a])}}},H=function(e){return this instanceof H?(this.v=e,this):new H(e)},G=function(e,t,r){if(!Symbol.asyncIterator)throw new TypeError("Symbol.asyncIterator is not defined.");var n,i=r.apply(e,t||[]),o=[];return n={},s("next"),s("throw"),s("return"),n[Symbol.asyncIterator]=function(){return this},n;function s(e){i[e]&&(n[e]=function(t){return new Promise((function(r,n){o.push([e,t,r,n])>1||a(e,t)}))})}function a(e,t){try{(r=i[e](t)).value instanceof H?Promise.resolve(r.value.v).then(h,u):c(o[0][2],r)}catch(e){c(o[0][3],e)}var r}function h(e){a("next",e)}function u(e){a("throw",e)}function c(e,t){e(t),o.shift(),o.length&&a(o[0][0],o[0][1])}};function X(e){if(null==e)throw new Error("Assertion Failure: value must not be null nor undefined")}function q(e){return null!=e[Symbol.asyncIterator]?e:function(e){return G(this,arguments,(function(){var t,r,n,i;return R(this,(function(o){switch(o.label){case 0:t=e.getReader(),o.label=1;case 1:o.trys.push([1,,9,10]),o.label=2;case 2:return[4,H(t.read())];case 3:return r=o.sent(),n=r.done,i=r.value,n?[4,H(void 0)]:[3,5];case 4:return[2,o.sent()];case 5:return X(i),[4,H(i)];case 6:return[4,o.sent()];case 7:return o.sent(),[3,2];case 8:return[3,10];case 9:return t.releaseLock(),[7];case 10:return[2]}}))}))}(e)}var J=function(e,t,r,n){return new(r||(r=Promise))((function(i,o){function s(e){try{h(n.next(e))}catch(e){o(e)}}function a(e){try{h(n.throw(e))}catch(e){o(e)}}function h(e){var t;e.done?i(e.value):(t=e.value,t instanceof r?t:new r((function(e){e(t)}))).then(s,a)}h((n=n.apply(e,t||[])).next())}))},Q=function(e,t){var r,n,i,o,s={label:0,sent:function(){if(1&i[0])throw i[1];return i[1]},trys:[],ops:[]};return o={next:a(0),throw:a(1),return:a(2)},"function"==typeof Symbol&&(o[Symbol.iterator]=function(){return this}),o;function a(o){return function(a){return function(o){if(r)throw new TypeError("Generator is already executing.");for(;s;)try{if(r=1,n&&(i=2&o[0]?n.return:o[0]?n.throw||((i=n.return)&&i.call(n),0):n.next)&&!(i=i.call(n,o[1])).done)return i;switch(n=0,i&&(o=[2&o[0],i.value]),o[0]){case 0:case 1:i=o;break;case 4:return s.label++,{value:o[1],done:!1};case 5:s.label++,n=o[1],o=[0];continue;case 7:o=s.ops.pop(),s.trys.pop();continue;default:if(!(i=s.trys,(i=i.length>0&&i[i.length-1])||6!==o[0]&&2!==o[0])){s=0;continue}if(3===o[0]&&(!i||o[1]>i[0]&&o[1]<i[3])){s.label=o[1];break}if(6===o[0]&&s.label<i[1]){s.label=i[1],i=o;break}if(i&&s.label<i[2]){s.label=i[2],s.ops.push(o);break}i[2]&&s.ops.pop(),s.trys.pop();continue}o=t.call(e,s)}catch(e){o=[6,e],n=0}finally{r=i=0}if(5&o[0])throw o[1];return{value:o[0]?o[1]:void 0,done:!0}}([o,a])}}};function Y(e,t){return void 0===t&&(t=_),J(this,void 0,void 0,(function(){var r;return Q(this,(function(n){return r=q(e),[2,new V(t.extensionCodec,t.context,t.maxStrLength,t.maxBinLength,t.maxArrayLength,t.maxMapLength,t.maxExtLength).decodeSingleAsync(r)]}))}))}function Z(e,t){void 0===t&&(t=_);var r=q(e);return new V(t.extensionCodec,t.context,t.maxStrLength,t.maxBinLength,t.maxArrayLength,t.maxMapLength,t.maxExtLength).decodeArrayStream(r)}function $(e,t){void 0===t&&(t=_);var r=q(e);return new V(t.extensionCodec,t.context,t.maxStrLength,t.maxBinLength,t.maxArrayLength,t.maxMapLength,t.maxExtLength).decodeStream(r)}}])}));

}).call(this)}).call(this,require('_process'))
},{"_process":17}],16:[function(require,module,exports){
(function (global){(function (){
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

}).call(this)}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{}],17:[function(require,module,exports){
// shim for using process in browser
var process = module.exports = {};

// cached from whatever global is present so that test runners that stub it
// don't break things.  But we need to wrap it in a try catch in case it is
// wrapped in strict mode code which doesn't define any globals.  It's inside a
// function because try/catches deoptimize in certain engines.

var cachedSetTimeout;
var cachedClearTimeout;

function defaultSetTimout() {
    throw new Error('setTimeout has not been defined');
}
function defaultClearTimeout () {
    throw new Error('clearTimeout has not been defined');
}
(function () {
    try {
        if (typeof setTimeout === 'function') {
            cachedSetTimeout = setTimeout;
        } else {
            cachedSetTimeout = defaultSetTimout;
        }
    } catch (e) {
        cachedSetTimeout = defaultSetTimout;
    }
    try {
        if (typeof clearTimeout === 'function') {
            cachedClearTimeout = clearTimeout;
        } else {
            cachedClearTimeout = defaultClearTimeout;
        }
    } catch (e) {
        cachedClearTimeout = defaultClearTimeout;
    }
} ())
function runTimeout(fun) {
    if (cachedSetTimeout === setTimeout) {
        //normal enviroments in sane situations
        return setTimeout(fun, 0);
    }
    // if setTimeout wasn't available but was latter defined
    if ((cachedSetTimeout === defaultSetTimout || !cachedSetTimeout) && setTimeout) {
        cachedSetTimeout = setTimeout;
        return setTimeout(fun, 0);
    }
    try {
        // when when somebody has screwed with setTimeout but no I.E. maddness
        return cachedSetTimeout(fun, 0);
    } catch(e){
        try {
            // When we are in I.E. but the script has been evaled so I.E. doesn't trust the global object when called normally
            return cachedSetTimeout.call(null, fun, 0);
        } catch(e){
            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error
            return cachedSetTimeout.call(this, fun, 0);
        }
    }


}
function runClearTimeout(marker) {
    if (cachedClearTimeout === clearTimeout) {
        //normal enviroments in sane situations
        return clearTimeout(marker);
    }
    // if clearTimeout wasn't available but was latter defined
    if ((cachedClearTimeout === defaultClearTimeout || !cachedClearTimeout) && clearTimeout) {
        cachedClearTimeout = clearTimeout;
        return clearTimeout(marker);
    }
    try {
        // when when somebody has screwed with setTimeout but no I.E. maddness
        return cachedClearTimeout(marker);
    } catch (e){
        try {
            // When we are in I.E. but the script has been evaled so I.E. doesn't  trust the global object when called normally
            return cachedClearTimeout.call(null, marker);
        } catch (e){
            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error.
            // Some versions of I.E. have different rules for clearTimeout vs setTimeout
            return cachedClearTimeout.call(this, marker);
        }
    }



}
var queue = [];
var draining = false;
var currentQueue;
var queueIndex = -1;

function cleanUpNextTick() {
    if (!draining || !currentQueue) {
        return;
    }
    draining = false;
    if (currentQueue.length) {
        queue = currentQueue.concat(queue);
    } else {
        queueIndex = -1;
    }
    if (queue.length) {
        drainQueue();
    }
}

function drainQueue() {
    if (draining) {
        return;
    }
    var timeout = runTimeout(cleanUpNextTick);
    draining = true;

    var len = queue.length;
    while(len) {
        currentQueue = queue;
        queue = [];
        while (++queueIndex < len) {
            if (currentQueue) {
                currentQueue[queueIndex].run();
            }
        }
        queueIndex = -1;
        len = queue.length;
    }
    currentQueue = null;
    draining = false;
    runClearTimeout(timeout);
}

process.nextTick = function (fun) {
    var args = new Array(arguments.length - 1);
    if (arguments.length > 1) {
        for (var i = 1; i < arguments.length; i++) {
            args[i - 1] = arguments[i];
        }
    }
    queue.push(new Item(fun, args));
    if (queue.length === 1 && !draining) {
        runTimeout(drainQueue);
    }
};

// v8 likes predictible objects
function Item(fun, array) {
    this.fun = fun;
    this.array = array;
}
Item.prototype.run = function () {
    this.fun.apply(null, this.array);
};
process.title = 'browser';
process.browser = true;
process.env = {};
process.argv = [];
process.version = ''; // empty string to avoid regexp issues
process.versions = {};

function noop() {}

process.on = noop;
process.addListener = noop;
process.once = noop;
process.off = noop;
process.removeListener = noop;
process.removeAllListeners = noop;
process.emit = noop;
process.prependListener = noop;
process.prependOnceListener = noop;

process.listeners = function (name) { return [] }

process.binding = function (name) {
    throw new Error('process.binding is not supported');
};

process.cwd = function () { return '/' };
process.chdir = function (dir) {
    throw new Error('process.chdir is not supported');
};
process.umask = function() { return 0; };

},{}]},{},[1])(1)
});
