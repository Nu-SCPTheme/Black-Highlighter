const defaultPreset = require('cssnano-preset-default');

module.exports = defaultPreset({
  discardComments: {
    removeAll: true,
  },
  cssDeclarationSorter: {
    order: 'concentric-css',
  },
  normalizeCharset: false,
  reduceIdents: false,
});
