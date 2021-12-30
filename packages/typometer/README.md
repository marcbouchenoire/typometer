# <a href="https://typometer.marcbouchenoire.com"><img src="https://raw.githubusercontent.com/marcbouchenoire/typometer/main/packages/site/public/logo.svg" width="259" height="50" alt="Typometer" /></a>

🖊️ Measure text asynchronously.

[![build](https://img.shields.io/github/workflow/status/marcbouchenoire/typometer/CI?color=%230cd)](https://github.com/marcbouchenoire/typometer/actions/workflows/ci.yml)
[![npm](https://img.shields.io/npm/v/typometer?color=%230cd)](https://www.npmjs.com/package/typometer)
[![size](https://img.shields.io/bundlephobia/minzip/typometer?label=size&color=%230cd)](https://bundlephobia.com/package/typometer)
[![coverage](https://img.shields.io/codecov/c/github/marcbouchenoire/typometer?color=%230cd)](https://codecov.io/gh/marcbouchenoire/typometer)
[![license](https://img.shields.io/github/license/marcbouchenoire/typometer?color=%230cd)](https://github.com/marcbouchenoire/typometer/blob/main/LICENSE)

- 🗜️ **Small**: Just around **1 kB** on modern platforms
- ⚡️ **Multi-threaded**: Run from a [Worker](https://developer.mozilla.org/en-US/docs/Web/API/Worker/Worker) when [OffscreenCanvas](https://developer.mozilla.org/en-US/docs/Web/API/OffscreenCanvas) is supported
- 🧪 **Reliable**: Fully tested with [100% code coverage](https://codecov.io/gh/marcbouchenoire/typometer)
- 📦 **Typed**: Written in [TypeScript](https://www.typescriptlang.org/) and includes definitions out-of-the-box
- 💨 **Zero dependencies**

## Introduction

Measuring text performantly in the browser isn't as straightforward as one would think—the recommended way is to leverage the [Canvas API](https://developer.mozilla.org/en-US/docs/Web/API/Canvas_API) (and its [`measureText`](https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/measureText) method) instead of relying on the DOM directly. Typometer embraces this way into a single function and attempts to smooth out the differences between the DOM and the Canvas API.

When supported, Typometer will leverage an [OffscreenCanvas](https://developer.mozilla.org/en-US/docs/Web/API/OffscreenCanvas) from a [Worker](https://developer.mozilla.org/en-US/docs/Web/API/Worker/Worker) to measure in a background thread.

#### Name

Typometer is named after [a physical ruler](https://en.wikipedia.org/wiki/Typometer) used to measure in typographic points.

## Installation

#### Skypack

```javascript
import { typometer } from "https://cdn.skypack.dev/typometer"
```

#### Yarn

```bash
yarn add typometer
```

#### npm

```bash
npm install typometer
```

## Usage

Import `typometer`.

```typescript
import { typometer } from "typometer"
```

Invoke it asynchronously with a string and access serialized [`TextMetrics`](https://developer.mozilla.org/en-US/docs/Web/API/TextMetrics) in return.

```typescript
const metrics = await typometer("With impressions chosen from another time.")

// metrics: {
//   actualBoundingBoxAscent: 8,
//   actualBoundingBoxDescent: 3,
//   actualBoundingBoxLeft: 0,
//   actualBoundingBoxRight: 195.0732421875,
//   alphabeticBaseline: 0,
//   emHeightAscent: 10,
//   emHeightDescent: 2,
//   fontBoundingBoxAscent: 10,
//   fontBoundingBoxDescent: 2,
//   hangingBaseline: 10,
//   ideographicBaseline: -2,
//   width: 195.0732421875
// }
```

Given an array of strings instead, `typometer` will return an array of serialized [`TextMetrics`](https://developer.mozilla.org/en-US/docs/Web/API/TextMetrics).

```typescript
const metrics = await typometer([
  "With impressions chosen from another time.",
  "Underneath a sky that's ever falling down."
])

// metrics: [TextMetrics, TextMetrics]
```

## Options

### Font

A secondary argument can be set to specify a font appearance—from [properties](#properties), a [`font`](#string) string, or a [`CSSStyleDeclaration`](#CSSStyleDeclaration).

#### Properties

Specify individual font properties as an object with [`fontFamily`](https://developer.mozilla.org/en-US/docs/Web/CSS/font-family), [`fontSize`](https://developer.mozilla.org/en-US/docs/Web/CSS/font-size), [`fontStretch`](https://developer.mozilla.org/en-US/docs/Web/CSS/font-stretch), [`fontStyle`](https://developer.mozilla.org/en-US/docs/Web/CSS/font-style), [`fontVariant`](https://developer.mozilla.org/en-US/docs/Web/CSS/font-variant), [`fontWeight`](https://developer.mozilla.org/en-US/docs/Web/CSS/font-weight), and [`lineHeight`](https://developer.mozilla.org/en-US/docs/Web/CSS/line-height).

```typescript
const metrics = await typometer("", {
  fontFamily: "cursive",
  fontSize: 16,
  fontStyle: "italic",
  fontWeight: 500,
  fontVariant: "small-caps",
  lineHeight: 2
})
```

##### `string`

Specify all font properties as a [`font`](https://developer.mozilla.org/en-US/docs/Web/CSS/font) shorthand string.

```typescript
const metrics = await typometer("", "italic small-caps 500 16px/2 cursive")
```

##### `CSSStyleDeclaration`

Specify a [`CSSStyleDeclaration`](https://developer.mozilla.org/en-US/docs/Web/API/CSSStyleDeclaration) from which to extract font properties.

```typescript
const paragraph = document.querySelector("p")
const metrics = await typometer("", window.getComputedStyle(paragraph))
```
