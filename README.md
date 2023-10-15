# badge-up2


[![Build](https://github.com/stevenhair/badge-up2/actions/workflows/test.yml/badge.svg)](https://github.com/stevenhair/badge-up2/actions/workflows/test.yml)
[![codecov](https://codecov.io/gh/stevenhair/badge-up2/graph/badge.svg?token=TJ5H79MK4E)](https://codecov.io/gh/stevenhair/badge-up2)
[![npm](https://img.shields.io/npm/v/badge-up2.svg?maxAge=2592000)](https://www.npmjs.com/package/badge-up2)
[![downloads](https://img.shields.io/npm/dt/badge-up2.svg?maxAge=2592000)](https://www.npmjs.com/package/badge-up2)

This is a simple library that generates SVG badges, based on [badge-up](https://www.npmjs.com/package/badge-up).


## Install

`npm install badge-up2`


## Basic Usage

```js
const { basic, basicColors } = require('badge-up2');
const svg = basic('batman', 'component', basicColors.green);
```

![example](https://raw.githubusercontent.com/stevenhair/badge-up2/master/src/test-data/basic.svg)

The color argument can be a CSS color, or one of the specially named colors
found in `basicColors`.

## Advanced Usage

With this API you can create arbitrary badges with an arbitrary number of sections.

Each section is either a string or a hash.
The hash should have the following properties:
* `text`: The text to display in the section
* `color` (optional): The background color of the section. This can be either a six-character hex code or a css color name.
* `strokeColor` (optional): The color of the section border

If `color` is not provided, then a default is used.
The default color for the first section is `#696969` and `#d3d3d3` for subsequent sections.
Passing a string rather than a hash is equivalent to passing a hash with only the `text` property.

```js
const { badge } = require('badge-up2');
const sections = [
    'foo/far;fun',
    { text: 'bar\nbaz', color: 'orange'},
    { text: 'mork "mindy"', color: 'olive', strokeColor: 'white'},
    { text: '<∀>', color: 'moccasin'},
];
const svg = badge(sections);
```

![example](https://raw.githubusercontent.com/stevenhair/badge-up2/master/src/test-data/example.svg)
