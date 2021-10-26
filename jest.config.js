module.exports = {
  transform: {
    "^.+\\.(t|j)sx?$": "./jest.transform.js"
  },
  runner: "jest-electron/runner",
  testEnvironment: "jest-electron/environment"
}
