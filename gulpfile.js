const gulp = require('gulp');
const sourcemaps = require('gulp-sourcemaps');
const autoprefixer = require('gulp-autoprefixer');

gulp.task('default', () =>
	gulp.src('styles/*.css')
		.pipe(sourcemaps.init())
			.pipe(autoprefixer({
                browsers: ['last 50 versions'],
                cascade: true
            }))
		.pipe(sourcemaps.write('dist/'))
		.pipe(gulp.dest('styles/'))
);