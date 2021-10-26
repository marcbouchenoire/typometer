import { isUndefined } from "./guards"
import { WorkerMessage } from "./measure-text.worker"
import { Font } from "./types"
import { getFont } from "./utils/get-font"
import { normalizeString } from "./utils/normalize-string"
import { sendMessage } from "./utils/send-message"
import { supportsOffscreenCanvas } from "./utils/supports-offscreen-canvas"

let canvas: HTMLCanvasElement
let worker: Worker

function getCanvas() {
  if (isUndefined(canvas)) {
    canvas = document.createElement("canvas")

    canvas.width = 1
    canvas.height = 1
  }

  return canvas
}

function getWorker() {
  if (isUndefined(worker)) {
    worker = new Worker(new URL("./measure-text.worker.ts", import.meta.url))
  }

  return worker
}

export async function measureText(
  text: string,
  font?: Font
): Promise<TextMetrics> {
  const normalizedText = normalizeString(text)
  const resolvedFont = getFont(font)

  if (supportsOffscreenCanvas()) {
    const worker = getWorker()

    return await sendMessage<TextMetrics, WorkerMessage>(worker, [
      normalizedText,
      resolvedFont
    ])
  } else {
    const canvas = getCanvas()
    const context = canvas.getContext("2d") as
      | CanvasRenderingContext2D
      | OffscreenCanvasRenderingContext2D
    context.font = resolvedFont ?? context.font

    return context.measureText(normalizedText)
  }
}
