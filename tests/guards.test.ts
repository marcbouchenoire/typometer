import * as assert from "uvu/assert"
import {
  isArray,
  isCSSStyleDeclaration,
  isFunction,
  isNumber,
  isString,
  isUndefined
} from "../src/guards"
import {
  array,
  boolean,
  fun,
  map,
  number,
  object,
  set,
  string
} from "./constants"

describe("isArray", () => {
  it("should return true for arrays", () => {
    assert.equal(isArray(array), true)
  })

  it("should return false for any other types", () => {
    assert.equal(isArray(boolean), false)
    assert.equal(isArray(fun), false)
    assert.equal(isArray(map), false)
    assert.equal(isArray(number), false)
    assert.equal(isArray(object), false)
    assert.equal(isArray(set), false)
    assert.equal(isArray(string), false)
  })
})

describe("isUndefined", () => {
  it("should return true for undefined", () => {
    assert.equal(isUndefined(undefined), true) // eslint-disable-line unicorn/no-useless-undefined
  })

  it("should return false for any other types", () => {
    assert.equal(isUndefined(array), false)
    assert.equal(isUndefined(boolean), false)
    assert.equal(isUndefined(fun), false)
    assert.equal(isUndefined(map), false)
    assert.equal(isUndefined(number), false)
    assert.equal(isUndefined(object), false)
    assert.equal(isUndefined(set), false)
    assert.equal(isUndefined(string), false)
  })
})

describe("isNumber", () => {
  it("should return true for numbers", () => {
    assert.equal(isNumber(number), true)
  })

  it("should return false for any other types", () => {
    assert.equal(isNumber(array), false)
    assert.equal(isNumber(boolean), false)
    assert.equal(isNumber(fun), false)
    assert.equal(isNumber(map), false)
    assert.equal(isNumber(object), false)
    assert.equal(isNumber(set), false)
    assert.equal(isNumber(string), false)
  })
})

describe("isString", () => {
  it("should return true for numbers", () => {
    assert.equal(isString(string), true)
  })

  it("should return false for any other types", () => {
    assert.equal(isString(array), false)
    assert.equal(isString(boolean), false)
    assert.equal(isString(fun), false)
    assert.equal(isString(map), false)
    assert.equal(isString(number), false)
    assert.equal(isString(object), false)
    assert.equal(isString(set), false)
  })
})

describe("isFunction", () => {
  it("should return true for functions", () => {
    assert.equal(isFunction(fun), true)
  })

  it("should return false for any other types", () => {
    assert.equal(isFunction(array), false)
    assert.equal(isFunction(boolean), false)
    assert.equal(isFunction(map), false)
    assert.equal(isFunction(number), false)
    assert.equal(isFunction(object), false)
    assert.equal(isFunction(set), false)
    assert.equal(isFunction(string), false)
  })
})

describe("isCSSStyleDeclaration", () => {
  const element = document.createElement("div")
  document.body.append(element)

  it("should return true for CSSStyleDeclaration", () => {
    assert.equal(isCSSStyleDeclaration(window.getComputedStyle(element)), true)
  })

  it("should return false for any other types", () => {
    assert.equal(isCSSStyleDeclaration(array), false)
    assert.equal(isCSSStyleDeclaration(boolean), false)
    assert.equal(isCSSStyleDeclaration(fun), false)
    assert.equal(isCSSStyleDeclaration(map), false)
    assert.equal(isCSSStyleDeclaration(number), false)
    assert.equal(isCSSStyleDeclaration(object), false)
    assert.equal(isCSSStyleDeclaration(set), false)
    assert.equal(isCSSStyleDeclaration(string), false)
  })
})
