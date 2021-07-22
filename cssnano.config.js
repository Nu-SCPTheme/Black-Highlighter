const defaultPreset = require("cssnano-preset-default");

module.exports = defaultPreset({
  discardComments: {
    removeAll: true,
  },
  cssDeclarationSorter: {
    order: "smacss",
  },
  normalizeCharset: false,
  reduceIdents: false,
});
