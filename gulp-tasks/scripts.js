const gulp = require("gulp");

// packages
const eslint = require("gulp-eslint");
const webpack = require("webpack");
const webpackconfig = require("../webpack.config");
const webpackstream = require("webpack-stream");

// Lint scripts
function scriptsLint() {
  return gulp
    .src(
        [
        "./src/js/modules/*",
        "./gulpfile.js"
        ])
    .pipe(eslint())
    .pipe(eslint.format());
}

// Transpile, concatenate and minify scripts
function scriptsBuild() {
  return (
    gulp
      .src(
        ["./src/js/main.js"],
        { allowEmpty: true }
          )
      .pipe(webpackstream(webpackconfig, webpack))
      // folder only, filename is specified in webpack
      .pipe(gulp.dest("./dist/js/"))
  );
}

// exports (Common JS)
module.exports = {
  lint: scriptsLint,
  build: scriptsBuild
};
