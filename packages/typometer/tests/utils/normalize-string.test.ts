import * as assert from "uvu/assert"
import { normalizeString } from "../../src/utils/normalize-string"

describe("normalizeString", () => {
  const string = `
    lorem
    ipsum
  `

  it("shouldn't start or end with spaces", () => {
    assert.equal(normalizeString(string).startsWith(" "), false)
    assert.equal(normalizeString(string).endsWith(" "), false)
  })

  it("shouldn't contain line breaks", () => {
    assert.not.match(normalizeString(string), /\r?\n|\r/)
  })
})
