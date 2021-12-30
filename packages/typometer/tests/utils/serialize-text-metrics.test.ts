import * as assert from "uvu/assert"
import { serializeTextMetrics } from "../../src/utils/serialize-text-metrics"

describe("serializeTextMetrics", () => {
  const canvas = document.createElement("canvas")
  const context = canvas.getContext("2d")
  const metrics = context?.measureText("")
  const serializedMetrics = serializeTextMetrics(metrics as TextMetrics)

  it("should convert a TextMetrics instance into a plain object", () => {
    assert.instance(serializedMetrics, Object)
    assert.not.instance(serializedMetrics, TextMetrics)
    assert.equal(serializedMetrics?.width, metrics?.width)
  })
})
