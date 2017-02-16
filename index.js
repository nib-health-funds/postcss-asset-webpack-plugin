'use strict';

const path = require('path');
const SourceMapSource = require('webpack-sources').SourceMapSource;
const postcss = require('postcss');

class PostcssAssetWebpackPlugin {

  constructor(options) {
    this.postcssOptions = options && options.postcss || [];
  }

  apply(compiler) {
    compiler.plugin('emit', (stats, callback) => {

      const promises = Object.keys(stats.assets).filter(name => path.extname(name) === '.css').map(name => {
        const css = stats.assets[name].source();
        const map = stats.assets[name].map();

        return postcss(this.postcssOptions)
          .process(css, {from: name, to: name, map: {prev: map}})
          .then(result => {
            stats.assets[name] = new SourceMapSource(result.css, name, result.map)
          })

      });

      Promise.all(promises).then(() => callback(null), callback);

    });
  }
}

module.exports = PostcssAssetWebpackPlugin;
