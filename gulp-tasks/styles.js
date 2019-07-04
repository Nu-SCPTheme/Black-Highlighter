// packages
const autoprefixer = require("autoprefixer");
const cssnano = require("cssnano");
const gulp = require("gulp");
const postcss = require("gulp-postcss");
const atImport = require("postcss-import");
const rename = require("gulp-rename");

// CSS task
function stylesConcat() {
  var plugins = [
    atImport
  ];
  return gulp
    .src("./src/css/black-highlighter.css")
    .pipe(postcss(plugins))
    .pipe(gulp.dest("./dist/css"));
}

function stylesBuild() {
  var plugins = [
    autoprefixer,
    cssnano
  ];
  return gulp
    .src("./dist/css/*.css")
    .pipe(rename({ suffix: ".min" }))
    .pipe(postcss(plugins))
    .pipe(gulp.dest("./dist/css/min"));
}

function normalizeFile() {
  var plugins = [
    autoprefixer,
    cssnano
  ];
  return gulp
    .src("./src/css/normalize.css")
    .pipe(rename({ suffix: ".min" }))
    .pipe(postcss(plugins))
    .pipe(gulp.dest("./dist/css/min"));
}

// exports
module.exports = {
  concat: stylesConcat,
  build: stylesBuild,
  normalize: normalizeFile
};
