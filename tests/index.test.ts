import { getTextMetrics } from "../src"
import { string } from "./constants"

describe("getTextMetrics", () => {
  test("should measure text reliably", async () => {
    const { width } = await getTextMetrics(string)
    const { width: doubleWidth } = await getTextMetrics(`${string}${string}`)

    expect(doubleWidth / 2).toBeCloseTo(width, 2)
  })

  test("should measure an array of text reliably", async () => {
    const [{ width }, { width: doubleWidth }] = await getTextMetrics([
      string,
      `${string}${string}`
    ])

    expect(doubleWidth / 2).toBeCloseTo(width, 2)
  })
})
