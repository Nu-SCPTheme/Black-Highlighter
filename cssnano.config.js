const advancedPreset = require('cssnano-preset-advanced');

module.exports = advancedPreset({
    discardComments: {
        removeAll: true,
    },
    normalizeCharset: false,
});