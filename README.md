# get-text-metrics

🖊️ Measure text using the Canvas API.

[![build](https://github.com/bouchenoiremarc/get-text-metrics/actions/workflows/ci.yml/badge.svg?branch=main)](https://github.com/bouchenoiremarc/get-text-metrics/actions/workflows/ci.yml) [![npm](https://img.shields.io/npm/v/get-text-metrics?color=%230cf)](https://www.npmjs.com/package/get-text-metrics) [![gzipped](https://img.shields.io/bundlephobia/minzip/get-text-metrics?label=gzipped&color=%2385f)](https://www.npmjs.com/package/get-text-metrics) [![license](https://img.shields.io/github/license/bouchenoiremarc/get-text-metrics?color=%23e4b)](https://github.com/bouchenoiremarc/get-text-metrics/blob/main/LICENSE)

## Installation

#### Skypack

```html
<script type="module">
  import { getTextMetrics } from "https://cdn.skypack.dev/get-text-metrics"
</script>
```

#### Yarn

```sh
yarn add get-text-metrics
```

#### npm

```sh
npm install get-text-metrics
```

## Usage

Import `getTextMetrics`.

```tsx
import { getTextMetrics } from "create-canvas-context"
```

Invoke it asynchronously with a string and access its [`TextMetrics`](https://developer.mozilla.org/en-US/docs/Web/API/TextMetrics) in return.

```tsx
const metrics = await getTextMetrics(
  "With impressions chosen from another time."
)

// metrics: TextMetrics
```

Given an array of strings instead, `getTextMetrics` will return an array of [`TextMetrics`](https://developer.mozilla.org/en-US/docs/Web/API/TextMetrics).

```tsx
const metrics = await getTextMetrics([
  "With impressions chosen from another time.",
  "Underneath a sky that's ever falling down."
])

// metrics: [TextMetrics, TextMetrics]
```

### Font

A secondary argument can be set to specify a font appearance—from [properties](#properties), a [`font` string](#string), or a [`CSSStyleDeclaration`](#CSSStyleDeclaration).

#### Properties

Specify individual font properties as an object with [`fontFamily`](https://developer.mozilla.org/en-US/docs/Web/CSS/font-family), [`fontSize`](https://developer.mozilla.org/en-US/docs/Web/CSS/font-size), [`fontStretch`](https://developer.mozilla.org/en-US/docs/Web/CSS/font-stretch), [`fontStyle`](https://developer.mozilla.org/en-US/docs/Web/CSS/font-style), [`fontVariant`](https://developer.mozilla.org/en-US/docs/Web/CSS/font-variant), [`fontWeight`](https://developer.mozilla.org/en-US/docs/Web/CSS/font-weight), and [`lineHeight`](https://developer.mozilla.org/en-US/docs/Web/CSS/line-height).

```tsx
const metrics = await getTextMetrics("", {
  fontFamily: "cursive",
  fontSize: 16,
  fontStyle: "italic",
  fontWeight: 500,
  fontVariant: "small-caps",
  lineHeight: 2
})
```

#### `string`

Specify all font properties as a [`font` shorthand](https://developer.mozilla.org/en-US/docs/Web/CSS/font) string.

```tsx
const metrics = await getTextMetrics("", "italic small-caps 500 16px/2 cursive")
```

#### `CSSStyleDeclaration`

Specify a [`CSSStyleDeclaration`](https://developer.mozilla.org/en-US/docs/Web/API/CSSStyleDeclaration) from which to extract font properties.

```tsx
const paragraph = document.querySelector("p")
const metrics = await getTextMetrics("", window.getComputedStyle(paragraph))
```
