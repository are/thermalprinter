export function buf(...args: number[]): Uint8Array
export function buf() {
  return new Uint8Array(Array.prototype.slice.call(arguments))
}

export const resetCommand = () => buf(27, 64)
export const setCharsetCommand = (charset: number) => buf(27, 82, charset)
export const setCharCodeTableCommand = (code: number) => buf(27, 116, code)
export const printTestPageCommand = () => buf(18, 84)
export const sendPrintingParamsCommand = (mpd: number, ht: number, hi: number) => buf(27, 55, mpd, ht, hi)
export const lineFeedCommand = (linesToFeed?: number) => (linesToFeed ? buf(27, 100, linesToFeed) : buf(10))
export const printModeCommand = (mode: number) => buf(27, 33, mode)
export const underlineCommand = (dots: number) => buf(27, 45, dots)
export const smallCommand = (onOff: 0 | 1) => buf(27, 33, onOff)
export const upsideDownCommand = (onOff: 0 | 1) => buf(27, 123, onOff)
export const inverseCommand = (onOff: 0 | 1) => buf(29, 66, onOff)
export const alignCommand = (side: 0 | 1 | 2) => buf(27, 97, side)
export const indentCommand = (columns: 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9) => buf(27, 66, columns)
export const setLineSpacingCommand = (lineSpacing: number) => buf(27, 51, lineSpacing)
export const horizontalLineCommand = (length: number) => {
  const args = Array(length).fill(196)

  args.push(length)
  buf.apply(undefined, args)
}
// export const printTextCommand = (text: number[]) => buf(...text)
export const printNewLineCommand = () => buf(10)
