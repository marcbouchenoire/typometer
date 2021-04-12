import { getTextMetrics } from "../src"
import { FontProperties } from "../src/types"
import { string } from "./constants"
import { getTextWidth } from "./helpers"

describe("getTextMetrics", () => {
  const shorthand = "12px sans-serif"
  const properties: FontProperties = {
    fontFamily: "sans-serif",
    fontSize: 12
  }

  test("should measure text reliably", async () => {
    const { width } = await getTextMetrics(string, properties)

    expect(width).toBeCloseTo(getTextWidth(string, properties), 1)
  })

  test("should measure an array of text reliably", async () => {
    const letters = string.split("")
    const metrics = await getTextMetrics(letters, properties)

    letters.map((letter, index) => {
      expect(metrics[index].width).toBeCloseTo(
        getTextWidth(letter, properties),
        1
      )
    })
  })

  test("should measure text given an existing font shorthand", async () => {
    const { width } = await getTextMetrics(string, { font: shorthand })

    expect(width).toBeCloseTo(getTextWidth(string, properties), 1)
  })
})
