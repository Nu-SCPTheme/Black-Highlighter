// packages
const imagemin = require("gulp-imagemin");
const gulp = require("gulp");

// optimize images in place
function optimiseImages() {
  return gulp
    .src("./src/img/*", { base: "./src/img" })
    .pipe(
      imagemin([
        imagemin.gifsicle({ interlaced: true }),
        imagemin.jpegtran({ progressive: true }),
        imagemin.optipng({ optimizationLevel: 5 }),
        imagemin.svgo({
          plugins: [{ removeViewBox: false }, { collapseGroups: true }]
        })
      ])
    )
    .pipe(gulp.dest("./src/img/"));
}

// exports (Common JS)
module.exports = {
  optimise: optimiseImages
};
