import { isUndefined } from "./guards"
import { WorkerMessage } from "./measure-text.worker"
import { Font, SerializedTextMetrics } from "./types"
import { getFont } from "./utils/get-font"
import { normalizeString } from "./utils/normalize-string"
import { sendMessage } from "./utils/send-message"
import { serializeTextMetrics } from "./utils/serialize-text-metrics"
import {
  supportsCanvas,
  supportsOffscreenCanvas
} from "./utils/supports-canvas"

let defaultFont: string
let context: CanvasRenderingContext2D
let worker: Worker

/**
 * Access a 2D rendering context by creating one if it doesn't exist yet.
 */
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

/**
 * Access an offscreen text measuring `Worker` by creating one if it doesn't exist yet.
 */
function getWorker() {
  if (isUndefined(worker)) {
    worker = new Worker(new URL("./measure-text.worker.ts", import.meta.url))
  }

  return worker
}

/**
 * Measure text using an `OffscreenCanvas` or an `HTMLCanvasElement`.
 *
 * @param text - The text to measure.
 * @param [font] - The font properties to set.
 */
export async function measureText(
  text: string,
  font?: Font
): Promise<SerializedTextMetrics> {
  const normalizedText = normalizeString(text)
  const resolvedFont = getFont(font)

  if (supportsOffscreenCanvas()) {
    const worker = getWorker()

    return await sendMessage<SerializedTextMetrics, WorkerMessage>(worker, [
      normalizedText,
      resolvedFont
    ])
  } else if (supportsCanvas()) {
    const context = getContext()
    context.font = resolvedFont ? resolvedFont : defaultFont
    const metrics = context.measureText(normalizedText)

    return serializeTextMetrics(metrics)
  } else {
    throw new Error(
      "The current environment doesn't seem to support the Canvas API."
    )
  }
}
