const gulp = require('gulp');
const sourcemaps = require('gulp-sourcemaps');
const autoprefixer = require('gulp-autoprefixer');
const postcss = require('gulp-postcss');
const cssvariables = require('postcss-css-variables');
const unprefix = require("postcss-unprefix");
const mergerules = require("postcss-merge-rules");
const stylefmt = require('gulp-stylefmt');
const stylelint = require("stylelint");

gulp.task('default', () =>
	gulp.src('themes/fallbacks/*.css')
		.pipe(sourcemaps.init())
			.pipe(autoprefixer({
                browsers: ['last 50 versions'],
                cascade: true
            }))
		.pipe(gulp.dest('themes/fallbacks'))
);


gulp.task('css', () => 
	gulp.src('themes/dustjacket-theme.css').pipe(
		postcss([
			cssvariables({
				preserve: true
			})
		])
	).pipe(
	gulp.dest('themes/fallbacks')
));

gulp.task('rmv', () => 
	gulp.src('themes/*.css').pipe(
		postcss([
			unprefix()
		])
	).pipe(
	gulp.dest('themes/fallbacks')
));


gulp.task('merge', () => 
	gulp.src('themes/fallbacks/*.css').pipe(
		postcss([
			mergerules()
		])
	).pipe(
	gulp.dest('themes/fallbacks')
));

gulp.task('stylefmt', () => 
	gulp.src('styles/*.css').pipe(
		stylefmt())
    .pipe(gulp.dest('styles')
));

gulp.task('stylefmt-themes', () => 
	gulp.src('themes/*.css').pipe(
		stylefmt())
    .pipe(gulp.dest('themes')
));