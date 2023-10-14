# badge-up2

[![npm](https://img.shields.io/npm/v/badge-up2.svg?maxAge=2592000)](https://www.npmjs.com/package/badge-up2)
[![downloads](https://img.shields.io/npm/dt/badge-up2.svg?maxAge=2592000)](https://www.npmjs.com/package/badge-up2)

This is a simple library that generates SVG badges, based on [badge-up](https://www.npmjs.com/package/badge-up).


## Install

`npm install badge-up2`


## V1 Usage

```js
const badge = require('badge-up2');
badge('batman', 'component', badge.colors.green, function (error, svg) {
    // some callback
});
```

Produces: ![example](https://cdn.rawgit.com/yahoo/badge-up/master/test/testData/good.svg)

The color argument can be a CSS color, or one of the specially named colors
found in `badge.colors`.

You can alternatively use the returned `Promise`:

```js
const badge = require('badge-up2');
(async () => {
try {
    const svg = await badge('batman', 'component', badge.colors.green);
} catch (error) {
    //
}
}());
```

## V2 Usage

With this API you can create arbitrary badges with an arbitrary number of sections.

Each section is an array. The first element is the text to show, and the rest
of the (optional) elements are attributes to apply to the text. If there are no
attributes then a single string (instead of an array of one element) can be
passed instead.

The following attributes are supported:

* `{hex}{hex}{hex}{hex}{hex}{hex}` six hexadecimal characters or `{css-color-name}` a named CSS color,
    either of which is used to color the section
* `s{{hex}{hex}{hex}{hex}{hex}{hex}}` six hexadecimal characters or `s{css-color-name}` a named CSS color,
    either of which is used to color stroke the section, e.g. `s{d3d3d3}`

The default color for the first section is `696969` and `d3d3d3` for subsequent sections.

Any section can have multiple lines by putting newlines in its text.

```js
const badge = require('badge-up2');
const sections = [
    'foo/far;fun',
    [ 'bar\nbaz', 'orange'],
    [ 'mork "mindy"', 'olive', 's{white}'],
    [ '<∀>', 'moccasin']
];
badge.v2(sections, function (error, svg) {
    // some callback
});
```

Produces: ![example](https://cdn.rawgit.com/yahoo/badge-up/master/test/testData/v2-example.svg)

You can also use the returned `Promise`:

```js
const badge = require('badge-up2');
const sections = [
    'foo/far;fun',
    [ 'bar\nbaz', 'orange'],
    [ 'mork "mindy"', 'olive', 's{white}'],
    [ '<∀>', 'moccasin']
];

(async () => {
try {
    const svg = await badge.v2(sections);
} catch (error) {
  //
}
}());
```
