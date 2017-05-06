'use strict';

const path = require('path');
const SourceMapSource = require('webpack-sources').SourceMapSource;
const RawSource = require('webpack-sources').RawSource;
const postcss = require('postcss');

class PostcssAssetWebpackPlugin {

  constructor(options) {
    this.postcssOptions = options && options.postcss || [];
  }

  apply(compiler) {
    compiler.plugin('emit', (stats, callback) => {

      const promises = Object.keys(stats.assets).filter(name => path.extname(name) === '.css').map(name => {
        const css = stats.assets[name].source();

        // Find source map if exists - could be separate asset or inline
        const mapName = css.match(/\/\*# sourceMappingURL=(.+)\*\/|$/)[1];
        const mapInline = mapName ? mapName.search(/^data:/) === 0 : false;
        const mapAsset = mapName && !mapInline ? stats.assets[mapName] : null;

        const map = mapAsset ? mapAsset.source()
          : mapInline ? undefined // Postcss can read inlined sourcemap automatically
          : stats.assets[name].map();

        return postcss(this.postcssOptions)
          .process(css, {from: name, to: name, map: { inline: mapInline, sourcesContent: true, prev: map }})
          .then(result => {
            stats.assets[name] = new SourceMapSource(result.css, name, result.map)
            if (mapAsset) {
              stats.assets[mapName] = new RawSource(JSON.stringify(result.map));
            }
          })

      });

      Promise.all(promises).then(() => callback(null), callback);

    });
  }
}

module.exports = PostcssAssetWebpackPlugin;
