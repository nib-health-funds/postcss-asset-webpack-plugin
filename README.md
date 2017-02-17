# postcss-asset-webpack-plugin

Run `postcss` on CSS assets after compilation.

##### Why

`css-loader` runs `postcss` on individual files. If you use `extract-text-webpack-plugin` you may want `postcss` to run after `extract-text-webpack-plugin` has concatenated files into a single CSS asset.

We had duplicate styles across multiple files because of nested `@import`s. `css-loader` wasn't removing the duplicate styles, because, when `css-loader` runs it doesn't know that the file being processed will be concatenated with other files, resulting in duplicated styles. This plugin allows us to run `cssnano` after the files have been concatenated and the duplicate styles are evident.

## Installation

```bash
npm install --save postcss-asset-webpack-plugin
```

## Usage

```js
const PostcssAssetWebpackPlugin = require('postcss-asset-webpack-plugin');
const cssnano = require('cssnano');

module.exports = {
  plugins: {
    new PostcssAssetWebpackPlugin({postcss: [cssnano()]})
  }
}
```
