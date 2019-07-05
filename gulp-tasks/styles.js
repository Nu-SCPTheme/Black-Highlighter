// packages
const autoprefixer = require("autoprefixer");
const cssnano = require("cssnano");
const gulp = require("gulp");
const postcss = require("gulp-postcss");
const atImport = require("postcss-import");
const rename = require("gulp-rename");
const map = require('map-stream');

// CSS task
function stylesConcat() {
  return gulp
    .src("./src/css/black-highlighter.css")
    .pipe(postcss([atImport]))
    .pipe(gulp.dest("./dist/css"));
}

function stylesBuild() {
  var plugins = [
    autoprefixer,
    cssnano
  ];
  return gulp
    .src("./dist/css/black-highlighter.css")
    .pipe(rename("./black-highlighter.min.css"))
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
    .pipe(rename("./normalize.min.css"))
    .pipe(postcss(plugins))
    .pipe(map(function(file, cb) {
      var fileContents = file.contents.toString();
      fileContents = fileContents.replace("@charset \"utf-8\";", "@charset \"utf-8\";@supports(--css:variables){");
      fileContents = fileContents + "}";
      file.contents = Buffer.from(fileContents);
      cb(null,file);
    }))
    .pipe(gulp.dest("./dist/css/min"));
}

function addSupports() {
  return gulp
    .src([
      "./dist/css/black-highlighter.css",
      "./dist/css/min/black-highlighter.min.css"], 
      {base: "./dist/css/"})
    .pipe(map(function(file, cb) {
      var fileContents = file.contents.toString();
      fileContents = fileContents.replace("@charset \"utf-8\";", "@charset \"utf-8\";@import url(\"https://fonts.googleapis.com/css?family=Lato:400,900|PT+Mono|Poppins:600,800&display=swap&subset=latin-ext\");@supports(--css:variables){");
      fileContents = fileContents + "}";
      file.contents = Buffer.from(fileContents);
      cb(null,file);
    }))
  .pipe(gulp.dest("./dist/css/"));
}

function moveLegacy() {
  return gulp
    .src("dist/css/min/*.css")
    .pipe(gulp.dest("./stable/styles/"));
}

// exports
module.exports = {
  concat: stylesConcat,
  build: stylesBuild,
  normalize: normalizeFile,
  supports: addSupports,
  legacy: moveLegacy
};
