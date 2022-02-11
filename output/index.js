'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

/*! *****************************************************************************
Copyright (c) Microsoft Corporation.

Permission to use, copy, modify, and/or distribute this software for any
purpose with or without fee is hereby granted.

THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
PERFORMANCE OF THIS SOFTWARE.
***************************************************************************** */

function __awaiter(thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
}

function __generator(thisArg, body) {
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
}

function __spreadArray(to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
}

var buf = function () {
    var args = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        args[_i] = arguments[_i];
    }
    return new Uint8Array(args);
};
var resetCommand = function () { return buf(27, 64); };
var setCharsetCommand = function (charset) { return buf(27, 82, charset); };
var setCharCodeTableCommand = function (code) { return buf(27, 116, code); };
var printTestPageCommand = function () { return buf(18, 84); };
var sendPrintingParamsCommand = function (mpd, ht, hi) { return buf(27, 55, mpd, ht, hi); };
var lineFeedCommand = function (linesToFeed) { return (linesToFeed ? buf(27, 100, linesToFeed) : buf(10)); };
var printModeCommand = function (mode) { return buf(27, 33, mode); };
var underlineCommand = function (dots) { return buf(27, 45, dots); };
var smallCommand = function (onOff) { return buf(27, 33, onOff); };
var upsideDownCommand = function (onOff) { return buf(27, 123, onOff); };
var inverseCommand = function (onOff) { return buf(29, 66, onOff); };
var alignCommand = function (side) { return buf(27, 97, side); };
var indentCommand = function (columns) { return buf(27, 66, columns); };
var setLineSpacingCommand = function (lineSpacing) { return buf(27, 51, lineSpacing); };
var horizontalLineCommand = function (length) { return buf.apply(void 0, __spreadArray(__spreadArray([], Array(length).fill(196), false), [10], false)); };
var printTextCommand = function (text) { return buf.apply(void 0, text); };
var printNewLineCommand = function () { return buf(10); };

var defaultOptions = {
    maxPrintingDots: 7,
    heatingTime: 80,
    heatingInterval: 2,
    commandDelay: 0,
};
var ThermalPrinter = /** @class */ (function () {
    function ThermalPrinter(serial, options) {
        if (options === void 0) { options = defaultOptions; }
        this.queue = [];
        this.serial = serial;
        this.options = options;
    }
    ThermalPrinter.prototype.start = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        // this.queueReset()
                        // this.queuePrintingParams()
                        // this.queueSetCharset(0)
                        this.add(resetCommand());
                        this.add(sendPrintingParamsCommand(this.options.maxPrintingDots, this.options.heatingTime, this.options.heatingInterval));
                        this.add(setCharsetCommand(0));
                        return [4 /*yield*/, this.send()];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    ThermalPrinter.prototype.sendCommand = function (command) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.serial.write(command)];
                    case 1:
                        _a.sent();
                        return [4 /*yield*/, this.serial.drain()];
                    case 2:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    ThermalPrinter.prototype.send = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _i, _a, command;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _b.trys.push([0, , 7, 8]);
                        _i = 0, _a = this.queue;
                        _b.label = 1;
                    case 1:
                        if (!(_i < _a.length)) return [3 /*break*/, 6];
                        command = _a[_i];
                        if (!(this.options.commandDelay !== 0)) return [3 /*break*/, 3];
                        return [4 /*yield*/, this.delay(this.options.commandDelay / 1000)];
                    case 2:
                        _b.sent();
                        _b.label = 3;
                    case 3: return [4 /*yield*/, this.sendCommand(command)];
                    case 4:
                        _b.sent();
                        _b.label = 5;
                    case 5:
                        _i++;
                        return [3 /*break*/, 1];
                    case 6: return [3 /*break*/, 8];
                    case 7:
                        this.queue = [];
                        return [7 /*endfinally*/];
                    case 8: return [2 /*return*/];
                }
            });
        });
    };
    ThermalPrinter.prototype.add = function (command) {
        this.queue.push(command);
    };
    ThermalPrinter.prototype.delay = function (amount) {
        return new Promise(function (resolve) { return setTimeout(resolve, Math.ceil(amount)); });
    };
    return ThermalPrinter;
}());

exports.alignCommand = alignCommand;
exports["default"] = ThermalPrinter;
exports.horizontalLineCommand = horizontalLineCommand;
exports.indentCommand = indentCommand;
exports.inverseCommand = inverseCommand;
exports.lineFeedCommand = lineFeedCommand;
exports.printModeCommand = printModeCommand;
exports.printNewLineCommand = printNewLineCommand;
exports.printTestPageCommand = printTestPageCommand;
exports.printTextCommand = printTextCommand;
exports.resetCommand = resetCommand;
exports.sendPrintingParamsCommand = sendPrintingParamsCommand;
exports.setCharCodeTableCommand = setCharCodeTableCommand;
exports.setCharsetCommand = setCharsetCommand;
exports.setLineSpacingCommand = setLineSpacingCommand;
exports.smallCommand = smallCommand;
exports.underlineCommand = underlineCommand;
exports.upsideDownCommand = upsideDownCommand;
