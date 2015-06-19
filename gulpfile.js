var gulp         = require('gulp');
var sass         = require('gulp-sass');
var autoprefixer = require('gulp-autoprefixer');
var notify       = require('gulp-notify');
var jshint       = require('gulp-jshint');
var uglify       = require('gulp-uglify');
var rename       = require('gulp-rename');
var sourcemaps   = require('gulp-sourcemaps');

// compile sass
gulp.task('sass', function() {
	return gulp.src('./www/scss/styles.scss')
		.pipe(sourcemaps.init())
			.pipe(sass({outputStyle: 'compressed'}).on('error', sass.logError))
			.pipe(
				autoprefixer(
					'last 2 version',
					'safari 5',
					'ie 8',
					'ie 9',
					'opera 12.1',
					'ios 6',
					'android 4'
				)
			)
		.pipe(rename({suffix: '.min'}))
		.pipe(sourcemaps.write('.'))
	.pipe(gulp.dest('./www/css'))
	.pipe(notify({message: 'Sass has been compiled'}));
});

// compile js
gulp.task('js', function() {
	return;
});

// watch sass and compile
gulp.task('sass-watch', function() {
	gulp.watch('./www/scss/*.scss', ['sass']);
});

// watch js and compile
gulp.task('js-watch', function() {

});

// Default task, just runs dev
gulp.task('default', function() {
	gulp.start([]);
});
