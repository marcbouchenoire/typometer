import { FontProperties } from "../../src"
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
  test("should return the same font appearance from properties, an existing font string or a CSSStyleDeclaration", () => {
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

    const paragraph = document.createElement("p")
    document.body.append(paragraph)
    paragraph.style.font = string as string
    const styles = window.getComputedStyle(paragraph)

    expect(getComputedFont(properties)).toEqual(getComputedFont(string))
    expect(getComputedFont(string)).toEqual(getComputedFont(styles))
    expect(getComputedFont(styles)).toEqual(getComputedFont(properties))
  })
})
