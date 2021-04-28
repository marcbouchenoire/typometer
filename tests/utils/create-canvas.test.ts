import { isCanvas } from "../../src/guards"
import { createCanvas } from "../../src/utils/create-canvas"

describe("createCanvas", () => {
  test("should return an HTMLCanvasElement or OffscreenCanvas", () => {
    const canvas = createCanvas()

    expect(isCanvas(canvas)).toBeTruthy()
  })
})
