// packages
const imagemin = require("gulp-imagemin");
const gulp = require("gulp");

// optimize images in place
function optimiseImages() {
  return gulp
    .src("./src/img/*")
    .pipe(
      imagemin([
        imagemin.gifsicle({ interlaced: true }),
        imagemin.optipng({ optimizationLevel: 5 }),
        imagemin.svgo({plugins: [
          { removeDoctype: false },
          { removeViewBox: false },
          { removeXMLProcInst: false },
          { collapseGroups: true },
          { convertPathData: true },
          { removeUselessStrokeAndFill: true },
          { cleanupNumericValues: { floatPrecision: 2 } },
          { mergePaths: true },
          { sortAttrs: true },
          { convertShapeToPath: true },
          { js2svg: { pretty: true } },
        ]})
      ])
    )
    .pipe(gulp.dest("./dist/img/"));
}

// exports (Common JS)
module.exports = {
  optimise: optimiseImages,
};
