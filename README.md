# postcss-asset-webpack-plugin

Run `postcss` on CSS assets after compilation.

###### Why

`CSS-loader` only runs `postcss` on individual chunks. When using `ExtractTextPlugin` you want to run `postcss` on the whole, concatenated chunks.

For example, in order to dedupe your CSS you want to run postcss / CSSnano across the concatenated chunks of CSS.

## Installation

```bash
npm install --save postcss-asset-webpack-plugin
```

## Usage

```js
const PostcssAssetWebpackPlugin = require('postcss-asset-webpack-plugin');
const CSSnano = require('CSSnano');

module.exports = {
  plugins: {
    new PostcssAssetWebpackPlugin({postcss: [CSSnano()]})
  }
}
```
