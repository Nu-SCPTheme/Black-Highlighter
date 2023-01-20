const { url } = require('inspector');

module.exports = {
  plugins: [
    require('postcss-import')({filter: url => url !== "../fonts/fonts.css"}),
    require('autoprefixer'),
  ],
};
