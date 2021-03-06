import { isCanvas } from "../../src/guards"
import { createCanvas } from "../../src/utils/create-canvas"

describe("createCanvas", () => {
  test("should return an HTMLCanvasElement or OffscreenCanvas", () => {
    const canvas = createCanvas()

    expect(isCanvas(canvas)).toBeTruthy()
  })

  test("should apply given width and height", () => {
    const canvas = createCanvas(1, 1)

    expect(canvas?.width).toEqual(1)
    expect(canvas?.height).toEqual(1)
  })
})
