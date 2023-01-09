/* eslint-disable @typescript-eslint/ban-ts-comment */

import * as assert from "uvu/assert"
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

describe("getFontProperties", () => {
  it("should combine font properties into a font string", () => {
    const font = getFontProperties({
      fontFamily: family,
      fontSize: size,
      fontStretch: stretch,
      fontStyle: style,
      fontVariant: variant,
      fontWeight: weight
    })

    const paragraph = document.createElement("p")
    const styles = window.getComputedStyle(paragraph)
    document.body.append(paragraph)

    if (font) {
      paragraph.style.font = font
    }

    assert.equal(styles.getPropertyValue("font-family"), family)
    assert.equal(styles.getPropertyValue("font-size"), `${size}px`)
    assert.equal(styles.getPropertyValue("font-stretch"), "75%")
    assert.equal(styles.getPropertyValue("font-style"), style)
    assert.equal(styles.getPropertyValue("font-variant"), variant)
    assert.equal(styles.getPropertyValue("font-weight"), `${weight}`)
  })

  it("should correctly combine a given font size and line height", () => {
    const font = getFontProperties({
      fontFamily: family,
      fontSize: size,
      lineHeight: line
    })

    const paragraph = document.createElement("p")
    const styles = window.getComputedStyle(paragraph)
    document.body.append(paragraph)

    if (font) {
      paragraph.style.font = font
    }

    assert.equal(styles.getPropertyValue("line-height"), `${size * line}px`)
  })

  it("should return undefined if font family and/or font size aren't provided", () => {
    // @ts-ignore
    const fontFamily = getFontProperties({
      fontFamily: family
    })
    // @ts-ignore
    const fontSize = getFontProperties({
      fontSize: size
    })
    // @ts-ignore
    const neither = getFontProperties({ fontStyle: style })

    assert.equal(fontFamily, undefined)
    assert.equal(fontSize, undefined)
    assert.equal(neither, undefined)
  })
})
