import {
  isUndefined,
  isFunction,
  isNumber,
  isArray,
  isString,
  isCSSStyleDeclaration
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
  test("should return true for arrays", () => {
    expect(isArray(array)).toBeTruthy()
  })

  test("should return false for any other types", () => {
    expect(isArray(boolean)).toBeFalsy()
    expect(isArray(fun)).toBeFalsy()
    expect(isArray(map)).toBeFalsy()
    expect(isArray(number)).toBeFalsy()
    expect(isArray(object)).toBeFalsy()
    expect(isArray(set)).toBeFalsy()
    expect(isArray(string)).toBeFalsy()
  })
})

describe("isUndefined", () => {
  test("should return true for undefined", () => {
    expect(isUndefined(undefined)).toBeTruthy()
  })

  test("should return false for any other types", () => {
    expect(isUndefined(array)).toBeFalsy()
    expect(isUndefined(boolean)).toBeFalsy()
    expect(isUndefined(fun)).toBeFalsy()
    expect(isUndefined(map)).toBeFalsy()
    expect(isUndefined(number)).toBeFalsy()
    expect(isUndefined(object)).toBeFalsy()
    expect(isUndefined(set)).toBeFalsy()
    expect(isUndefined(string)).toBeFalsy()
  })
})

describe("isNumber", () => {
  test("should return true for numbers", () => {
    expect(isNumber(number)).toBeTruthy()
  })

  test("should return false for any other types", () => {
    expect(isNumber(array)).toBeFalsy()
    expect(isNumber(boolean)).toBeFalsy()
    expect(isNumber(fun)).toBeFalsy()
    expect(isNumber(map)).toBeFalsy()
    expect(isNumber(object)).toBeFalsy()
    expect(isNumber(set)).toBeFalsy()
    expect(isNumber(string)).toBeFalsy()
  })
})

describe("isString", () => {
  test("should return true for numbers", () => {
    expect(isString(string)).toBeTruthy()
  })

  test("should return false for any other types", () => {
    expect(isString(array)).toBeFalsy()
    expect(isString(boolean)).toBeFalsy()
    expect(isString(fun)).toBeFalsy()
    expect(isString(map)).toBeFalsy()
    expect(isString(number)).toBeFalsy()
    expect(isString(object)).toBeFalsy()
    expect(isString(set)).toBeFalsy()
  })
})

describe("isFunction", () => {
  test("should return true for functions", () => {
    expect(isFunction(fun)).toBeTruthy()
  })

  test("should return false for any other types", () => {
    expect(isFunction(array)).toBeFalsy()
    expect(isFunction(boolean)).toBeFalsy()
    expect(isFunction(map)).toBeFalsy()
    expect(isFunction(number)).toBeFalsy()
    expect(isFunction(object)).toBeFalsy()
    expect(isFunction(set)).toBeFalsy()
    expect(isFunction(string)).toBeFalsy()
  })
})

describe("isCSSStyleDeclaration", () => {
  const element = document.createElement("div")
  document.body.appendChild(element)

  test("should return true for CSSStyleDeclaration", () => {
    expect(isCSSStyleDeclaration(window.getComputedStyle(element))).toBeTruthy()
  })

  test("should return false for any other types", () => {
    expect(isCSSStyleDeclaration(array)).toBeFalsy()
    expect(isCSSStyleDeclaration(boolean)).toBeFalsy()
    expect(isCSSStyleDeclaration(fun)).toBeFalsy()
    expect(isCSSStyleDeclaration(map)).toBeFalsy()
    expect(isCSSStyleDeclaration(number)).toBeFalsy()
    expect(isCSSStyleDeclaration(object)).toBeFalsy()
    expect(isCSSStyleDeclaration(set)).toBeFalsy()
    expect(isCSSStyleDeclaration(string)).toBeFalsy()
  })
})
