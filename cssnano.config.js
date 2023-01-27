const defaultPreset = 
  require("cssnano-preset-default")
  ({
    autoprefixer: true,
    calc: false,
    colormin: false,
    cssDeclarationSorter: true,
    discardComments: {
      removeAll: true,
    },
    normalizeWhitespace: true,
    mergeRules: false,
  });

module.exports = defaultPreset;
