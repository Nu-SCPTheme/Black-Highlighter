module.exports = {
  plugins: [
    require('postcss-import'),
    require('postcss-path-replace')
    (
      {
        publicPath: "../fonts/",
        matched: "./",
        mode: "replace"
      }
    ),
    require('autoprefixer'),
    require('postcss-preset-env')({stage: 1}),
    require("@hail2u/css-mqpacker"),
  ],
};
