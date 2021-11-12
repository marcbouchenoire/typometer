# typometer

🖊️ Measure text using the Canvas API.

[![build](https://github.com/bouchenoiremarc/typometer/actions/workflows/ci.yml/badge.svg?branch=main)](https://github.com/bouchenoiremarc/typometer/actions/workflows/ci.yml) [![npm](https://img.shields.io/npm/v/typometer?color=%230cf)](https://www.npmjs.com/package/typometer) [![gzipped](https://img.shields.io/bundlephobia/minzip/typometer?label=gzipped&color=%2385f)](https://www.npmjs.com/package/typometer) [![license](https://img.shields.io/github/license/bouchenoiremarc/typometer?color=%23e4b)](https://github.com/bouchenoiremarc/typometer/blob/main/LICENSE)

## Introduction

Measuring text performantly in the browser isn't as straightforward as one would think—the recommended way is to leverage the [Canvas API](https://developer.mozilla.org/en-US/docs/Web/API/Canvas_API) (and its [`measureText`](https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/measureText) method) instead of relying on the DOM directly. Typometer embraces this way into a single function and attempts to smooth out the differences between the DOM and the Canvas API.

When supported, Typometer will leverage an [OffscreenCanvas](https://developer.mozilla.org/en-US/docs/Web/API/OffscreenCanvas) from a [Worker](https://developer.mozilla.org/en-US/docs/Web/API/Worker/Worker) to measure in a background thread.

#### Name

Typometer is named after [a physical ruler](https://en.wikipedia.org/wiki/Typometer) used to measure in typographic points.

## Installation

#### Skypack

```javascript
import { measure } from "https://cdn.skypack.dev/typometer"
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

Import `measure`.

```typescript
import { measure } from "typometer"
```

Invoke it asynchronously with a string and access [`TextMetrics`](https://developer.mozilla.org/en-US/docs/Web/API/TextMetrics) in return.

```typescript
const metrics = await measure("With impressions chosen from another time.")

// metrics: TextMetrics
```

Given an array of strings instead, `measure` will return an array of [`TextMetrics`](https://developer.mozilla.org/en-US/docs/Web/API/TextMetrics).

```typescript
const metrics = await measure([
  "With impressions chosen from another time.",
  "Underneath a sky that's ever falling down."
])

// metrics: [TextMetrics, TextMetrics]
```

## Options

#### Font

A secondary argument can be set to specify a font appearance—from [properties](#properties), a [`font`](#string) string, or a [`CSSStyleDeclaration`](#CSSStyleDeclaration).

##### Properties

Specify individual font properties as an object with [`fontFamily`](https://developer.mozilla.org/en-US/docs/Web/CSS/font-family), [`fontSize`](https://developer.mozilla.org/en-US/docs/Web/CSS/font-size), [`fontStretch`](https://developer.mozilla.org/en-US/docs/Web/CSS/font-stretch), [`fontStyle`](https://developer.mozilla.org/en-US/docs/Web/CSS/font-style), [`fontVariant`](https://developer.mozilla.org/en-US/docs/Web/CSS/font-variant), [`fontWeight`](https://developer.mozilla.org/en-US/docs/Web/CSS/font-weight), and [`lineHeight`](https://developer.mozilla.org/en-US/docs/Web/CSS/line-height).

```typescript
const metrics = await measure("", {
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
const metrics = await measure("", "italic small-caps 500 16px/2 cursive")
```

##### `CSSStyleDeclaration`

Specify a [`CSSStyleDeclaration`](https://developer.mozilla.org/en-US/docs/Web/API/CSSStyleDeclaration) from which to extract font properties.

```typescript
const paragraph = document.querySelector("p")
const metrics = await measure("", window.getComputedStyle(paragraph))
```
