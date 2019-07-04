// packages
const autoprefixer = require("autoprefixer");
const cssnano = require("cssnano");
const gulp = require("gulp");
const postcss = require("gulp-postcss");
const atImport = require("postcss-import");
const rename = require("gulp-rename");

// CSS task
function stylesBuild() {
  return gulp
    .src("./src/css/*.css")
    .pipe(postcss(
      [atImport(
      { root: "./src/css/black-highlighter.css" }
      )]
    ))
    .pipe(gulp.dest("./dist/css/"))
    .pipe(rename({ suffix: ".min" }))
    .pipe(postcss([autoprefixer(), cssnano()]))
    .pipe(gulp.dest("./dist/css/min"));
}

// exports
module.exports = {
  build: stylesBuild
};
