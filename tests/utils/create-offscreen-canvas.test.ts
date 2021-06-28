import { isFunction, isString } from "../../src/guards"
import { createOffscreenCanvas } from "../../src/utils/create-offscreen-canvas"

function isPromise<T>(value: Promise<T> | unknown): value is Promise<T> {
  return value instanceof Promise
}

describe("createOffscreenCanvas", () => {
  const getOffscreenCanvasFont = createOffscreenCanvas(
    async (context: OffscreenCanvasRenderingContext2D) => context.font
  )

  test("should return an async function", () => {
    expect(isFunction(getOffscreenCanvasFont)).toBeTruthy()
    expect(isPromise(getOffscreenCanvasFont())).toBeTruthy()
  })

  test("should execute and return from its worker", async () => {
    const font = await getOffscreenCanvasFont()

    expect(isString(font)).toBeTruthy()
  })
})
