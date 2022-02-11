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

const buf = (...args) => new Uint8Array(args);
const resetCommand = () => buf(27, 64);
const setCharsetCommand = (charset) => buf(27, 82, charset);
const setCharCodeTableCommand = (code) => buf(27, 116, code);
const printTestPageCommand = () => buf(18, 84);
const sendPrintingParamsCommand = (mpd, ht, hi) => buf(27, 55, mpd, ht, hi);
const lineFeedCommand = (linesToFeed) => (linesToFeed ? buf(27, 100, linesToFeed) : buf(10));
const printModeCommand = (mode) => buf(27, 33, mode);
const underlineCommand = (dots) => buf(27, 45, dots);
const smallCommand = (onOff) => buf(27, 33, onOff);
const upsideDownCommand = (onOff) => buf(27, 123, onOff);
const inverseCommand = (onOff) => buf(29, 66, onOff);
const alignCommand = (side) => buf(27, 97, side);
const indentCommand = (columns) => buf(27, 66, columns);
const setLineSpacingCommand = (lineSpacing) => buf(27, 51, lineSpacing);
const horizontalLineCommand = (length) => buf(...Array(length).fill(196), 10);
const printTextCommand = (text) => buf(...text);
const printNewLineCommand = () => buf(10);

const defaultOptions = {
    maxPrintingDots: 7,
    heatingTime: 80,
    heatingInterval: 2,
    commandDelay: 0,
};
class ThermalPrinter {
    constructor(serial, options = defaultOptions) {
        this.queue = [];
        this.serial = serial;
        this.options = options;
    }
    start() {
        return __awaiter(this, void 0, void 0, function* () {
            // this.queueReset()
            // this.queuePrintingParams()
            // this.queueSetCharset(0)
            this.add(resetCommand());
            this.add(sendPrintingParamsCommand(this.options.maxPrintingDots, this.options.heatingTime, this.options.heatingInterval));
            this.add(setCharsetCommand(0));
            yield this.send();
        });
    }
    sendCommand(command) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.serial.write(command);
            yield this.serial.drain();
        });
    }
    send() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                for (const command of this.queue) {
                    if (this.options.commandDelay !== 0) {
                        yield this.delay(this.options.commandDelay / 1000);
                    }
                    yield this.sendCommand(command);
                }
            }
            finally {
                this.queue = [];
            }
        });
    }
    add(command) {
        this.queue.push(command);
    }
    delay(amount) {
        return new Promise((resolve) => setTimeout(resolve, Math.ceil(amount)));
    }
}

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
