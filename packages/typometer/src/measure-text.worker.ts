import { serializeTextMetrics } from "./utils/serialize-text-metrics"

export type WorkerMessage = [string, string | undefined]

const canvas = new OffscreenCanvas(1, 1)
const context = canvas.getContext("2d") as OffscreenCanvasRenderingContext2D
const defaultFont = context.font

addEventListener(
  "message",
  ({ data: [text, font], ports: [port] }: MessageEvent<WorkerMessage>) => {
    context.font = font ?? defaultFont
    const metrics = context.measureText(text)

    port.postMessage(serializeTextMetrics(metrics))
  },
  false
)
