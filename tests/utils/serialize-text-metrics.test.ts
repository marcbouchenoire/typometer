import { serializeTextMetrics } from "../../src/utils/serialize-text-metrics"

describe("serializeTextMetrics", () => {
  const canvas = document.createElement("canvas")
  const context = canvas.getContext("2d")
  const metrics = context?.measureText("")
  const serializedMetrics = serializeTextMetrics(metrics as TextMetrics)

  test("should convert a TextMetrics instance into a plain object", () => {
    expect(serializedMetrics).toBeInstanceOf(Object)
    expect(serializedMetrics).not.toBeInstanceOf(TextMetrics)
    expect(serializedMetrics.width).toBe(metrics?.width)
  })
})
