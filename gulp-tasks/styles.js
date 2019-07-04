// packages
const autoprefixer = require("autoprefixer");
const cssnano = require("cssnano");
const gulp = require("gulp");
const postcss = require("gulp-postcss");
const rename = require("gulp-rename");

// CSS task
function stylesBuild() {
  return gulp
    .src("./src/assets/scss/**/*.css")
    .pipe(gulp.dest("./dist/css/"))
    .pipe(rename({ suffix: ".min" }))
    .pipe(postcss([autoprefixer(), cssnano()]))
    .pipe(gulp.dest("./dist/css/"));
}

// exports
module.exports = {
  build: stylesBuild
};