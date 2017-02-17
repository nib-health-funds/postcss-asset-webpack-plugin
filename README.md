# postcss-asset-webpack-plugin

Run `postcss` on CSS assets after compilation.

##### Why

`css-loader` runs `postcss` on individual files. If you use `extract-text-webpack-plugin` you may want `postcss` to run after `extract-text-webpack-plugin` has concatenated files into a single CSS asset.

We had duplicate styles across multiple files because of nested `@import`s. The duplicate styles weren't being removed by `css-loader`, because, when `css-loader` runs it doesn't know that the file being processed will be concatenated with other files that contain the same styles and will result in duplicated styles. This plugin allows us to run `cssnano` after the files have been concatenated and the duplicate styles can be found and removed.

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
