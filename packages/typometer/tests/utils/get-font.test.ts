import * as assert from "uvu/assert"
import type { FontProperties } from "../../src"
import { getFontProperties } from "../../src/utils/get-font-properties"
import {
  family,
  line,
  size,
  stretch,
  style,
  variant,
  weight
} from "../constants"
import { getComputedFont } from "../helpers"

describe("getFont", () => {
  it("should return the same font appearance from properties, an existing font string or a CSSStyleDeclaration", () => {
    const properties: FontProperties = {
      fontFamily: family,
      fontSize: size,
      fontStretch: stretch,
      fontStyle: style,
      fontVariant: variant,
      fontWeight: weight,
      lineHeight: line
    }

    const string = getFontProperties(properties)
    const empty = undefined

    const paragraph = document.createElement("p")
    document.body.append(paragraph)
    paragraph.style.font = string as string
    const styles = window.getComputedStyle(paragraph)

    assert.equal(getComputedFont(properties), getComputedFont(string))
    assert.equal(getComputedFont(string), getComputedFont(styles))
    assert.equal(getComputedFont(styles), getComputedFont(properties))
    assert.equal(getComputedFont(empty), getComputedFont())
  })
})
