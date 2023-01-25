const defaultPreset = 
  require("cssnano-preset-default")
  ({
    autoprefixer: true,
    calc: false,
    colormin: false,
    cssDeclarationSorter: false,
    discardComments: {
      removeAll: true,
    },
    normalizeWhitespace: false,
    mergeRules: false,
    reduceIdents: true,
  });

module.exports = defaultPreset;
