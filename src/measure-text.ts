import { isUndefined } from "./guards"
import { WorkerMessage } from "./measure-text.worker"
import { Font } from "./types"
import { getFont } from "./utils/get-font"
import { normalizeString } from "./utils/normalize-string"
import { sendMessage } from "./utils/send-message"
import {
  supportsCanvas,
  supportsOffscreenCanvas
} from "./utils/supports-canvas"

let context: CanvasRenderingContext2D
let defaultFont: string
let worker: Worker

function getContext() {
  if (isUndefined(context)) {
    const canvas = document.createElement("canvas")

    canvas.width = 1
    canvas.height = 1

    context = canvas.getContext("2d") as CanvasRenderingContext2D
    defaultFont = context.font
  }

  return context
}

function getWorker() {
  if (isUndefined(worker)) {
    worker = new Worker(new URL("./measure-text.worker.ts", import.meta.url))
  }

  return worker
}

/**.
 * Measure text using the Canvas API.
 *
 * @param text - The text to measure.
 * @param [font] - The font properties to set.
 */
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
  } else if (supportsCanvas()) {
    const context = getContext()
    context.font = resolvedFont ? resolvedFont : defaultFont

    return context.measureText(normalizedText)
  } else {
    throw new Error(
      "The current environment doesn't seem to support the Canvas API."
    )
  }
}
