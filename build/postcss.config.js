module.exports = {
  plugins: [
    require('postcss-import')({filter: url => url !== "../fonts/fonts.css"}),
    require('autoprefixer'),
    require('postcss-preset-env')({stage: 1}),
    require("@hail2u/css-mqpacker"),
  ],
};
