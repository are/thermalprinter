import { resetCommand, sendPrintingParamsCommand, setCharsetCommand } from './commands'

export type ThermalPrinterOptions = {
  maxPrintingDots: number
  heatingTime: number
  heatingInterval: number
  commandDelay: number
}

const defaultOptions: ThermalPrinterOptions = {
  maxPrintingDots: 7,
  heatingTime: 80,
  heatingInterval: 2,
  commandDelay: 0,
}

export * from './commands'

export default class ThermalPrinter {
  readonly options: ThermalPrinterOptions

  private serial: any

  constructor(serial: any, options: ThermalPrinterOptions = defaultOptions) {
    this.serial = serial
    this.options = options
  }

  public async start(): Promise<void> {
    // this.queueReset()
    // this.queuePrintingParams()
    // this.queueSetCharset(0)

    this.add(resetCommand())
    this.add(
      sendPrintingParamsCommand(this.options.maxPrintingDots, this.options.heatingTime, this.options.heatingInterval)
    )
    this.add(setCharsetCommand(0))
    await this.send()
  }

  private queue: Array<Uint8Array> = []

  private async sendCommand(command: Uint8Array): Promise<void> {
    await this.serial.write(command)
    await this.serial.drain()
  }

  private async send(): Promise<void> {
    try {
      for (const command of this.queue) {
        if (this.options.commandDelay !== 0) {
          await this.delay(this.options.commandDelay / 1000)
        }

        await this.sendCommand(command)
      }
    } finally {
      this.queue = []
    }
  }

  public add(command: Uint8Array) {
    this.queue.push(command)
  }

  private delay(amount: number): Promise<void> {
    return new Promise((resolve) => setTimeout(resolve, Math.ceil(amount)))
  }
}
