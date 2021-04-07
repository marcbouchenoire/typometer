import { getTextMetrics } from "../src"
import { FontProperties } from "../src/types"
import { string } from "./constants"
import { getTextWidth } from "./helpers"

describe("getTextMetrics", () => {
  const options: FontProperties = {
    fontFamily: "sans-serif",
    fontSize: 12
  }

  test("should measure text reliably", async () => {
    const { width } = await getTextMetrics(string, options)

    expect(width).toBeCloseTo(getTextWidth(string, options), 1)
  })

  test("should measure an array of text reliably", async () => {
    const letters = string.split("")
    const metrics = await getTextMetrics(letters, options)

    letters.map((letter, index) => {
      expect(metrics[index].width).toBeCloseTo(getTextWidth(letter, options), 1)
    })
  })
})
