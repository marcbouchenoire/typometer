import * as assert from "uvu/assert"
import { typometer } from "../src"
import { FontProperties } from "../src/types"
import { string } from "./constants"
import { almost, getTextWidth, mock } from "./helpers"

describe("typometer", () => {
  const tolerance = 0.05
  const font = "italic small-caps 500 16px/2 cursive"
  const properties: FontProperties = {
    fontFamily: "cursive",
    fontSize: 16,
    fontStyle: "italic",
    fontVariant: "small-caps",
    fontWeight: 500,
    lineHeight: 2
  }

  it("should measure text", async () => {
    const { width } = await typometer(string, properties)

    assert.equal(
      almost(width, getTextWidth(string, properties), tolerance),
      true
    )
  })

  it("should measure text with an HTMLCanvasElement when OffscreenCanvas isn't supported", async () => {
    const restoreOffscreenCanvas = mock(window, "OffscreenCanvas")

    const { width } = await typometer(string, properties)

    assert.equal(
      almost(width, getTextWidth(string, properties), tolerance),
      true
    )

    restoreOffscreenCanvas()
  })

  it("shouldn't override the default font", async () => {
    const canvas = document.createElement("canvas")
    const context = canvas.getContext("2d")
    const defaultFont = context?.font ?? ""

    const restoreOffscreenCanvas = mock(window, "OffscreenCanvas")

    const { width } = await typometer(string)

    restoreOffscreenCanvas()

    const { width: widthOffscreen } = await typometer(string)

    assert.equal(
      almost(width, getTextWidth(string, defaultFont), tolerance),
      true
    )
    assert.equal(
      almost(widthOffscreen, getTextWidth(string, defaultFont), tolerance),
      true
    )
  })

  it("should throw when HTMLCanvasElement or OffscreenCanvas aren't supported", async () => {
    const restoreHTMLCanvasElement = mock(window, "HTMLCanvasElement")
    const restoreOffscreenCanvas = mock(window, "OffscreenCanvas")

    try {
      await typometer(string, properties)
      assert.unreachable()
    } catch (error) {
      assert.instance(error, Error)
    }

    restoreHTMLCanvasElement()
    restoreOffscreenCanvas()
  })

  it("should measure an array of text", async () => {
    const letters = [...string]
    const metrics = await typometer(letters, properties)

    letters.map((letter, index) => {
      assert.equal(
        almost(
          metrics[index].width,
          getTextWidth(letter, properties),
          tolerance
        ),
        true
      )
    })
  })

  it("should measure text given a font string", async () => {
    const { width } = await typometer(string, font)

    assert.equal(
      almost(width, getTextWidth(string, properties), tolerance),
      true
    )
  })

  it("should measure text given a CSSStyleDeclaration", async () => {
    const element = document.createElement("span")
    element.style.setProperty("font", font)
    document.body.append(element)

    const { width } = await typometer(string, window.getComputedStyle(element))

    assert.equal(
      almost(width, getTextWidth(string, properties), tolerance),
      true
    )
  })
})
