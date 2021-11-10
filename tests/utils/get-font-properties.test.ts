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
  test("should combine font properties into a font string", () => {
    const font = getFontProperties({
      fontFamily: family,
      fontSize: size,
      fontStretch: stretch,
      fontStyle: style,
      fontVariant: variant,
      fontWeight: weight,
      lineHeight: line
    })

    const paragraph = document.createElement("p")
    const styles = window.getComputedStyle(paragraph)
    document.body.append(paragraph)

    if (font) {
      paragraph.style.font = font
    }

    expect(styles.getPropertyValue("font-family")).toBe(family)
    expect(styles.getPropertyValue("font-size")).toBe(`${size}px`)
    expect(styles.getPropertyValue("font-stretch")).toBe("75%")
    expect(styles.getPropertyValue("font-style")).toBe(style)
    expect(styles.getPropertyValue("font-variant")).toBe(variant)
    expect(styles.getPropertyValue("font-weight")).toBe(`${weight}`)
    expect(styles.getPropertyValue("line-height")).toBe(`${size * line}px`)
  })
})
