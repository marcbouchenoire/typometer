import * as assert from "uvu/assert"
import { measure } from "../src"
import { FontProperties } from "../src/types"
import { string } from "./constants"
import { almost, getTextWidth } from "./helpers"

describe("measure", () => {
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
    const { width } = await measure(string, properties)

    assert.equal(
      almost(width, getTextWidth(string, properties), tolerance),
      true
    )
  })

  it("should measure an array of text", async () => {
    const letters = [...string]
    const metrics = await measure(letters, properties)

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
    const { width } = await measure(string, font)

    assert.equal(
      almost(width, getTextWidth(string, properties), tolerance),
      true
    )
  })

  it("should measure text given a CSSStyleDeclaration", async () => {
    const element = document.createElement("span")
    element.style.setProperty("font", font)
    document.body.append(element)

    const { width } = await measure(string, window.getComputedStyle(element))

    assert.equal(
      almost(width, getTextWidth(string, properties), tolerance),
      true
    )
  })
})
