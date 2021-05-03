import { normalizeString } from "../../src/utils/normalize-string"

describe("normalizeString", () => {
  const string = `
    lorem
    ipsum
  `

  test("shouldn't start or end with spaces", () => {
    expect(normalizeString(string).startsWith(" ")).toBeFalsy()
    expect(normalizeString(string).endsWith(" ")).toBeFalsy()
  })

  test("shouldn't contain line breaks", () => {
    expect(/\r?\n|\r/.test(normalizeString(string))).toBeFalsy()
  })
})
