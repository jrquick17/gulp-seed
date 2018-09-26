/**
 * @description A seed start to a gulp project supporting SASS/SCSS compilation, linting, embedding angular directives, javascript minification, bundling, and launching servers and proxies right out of the box.
 *
 * @source https://github.com/jrquick17/gulp-seed
 * @author Jeremy Quick <me@jrquick.com>
 * @website http://jrquick.com
 * @license unlicense
 */
var gulp = require('gulp');

var babel = require('babelify');
var browserify = require('browserify');
var browserSync = require('browser-sync').create();
var buffer = require('vinyl-buffer');
var concat = require('gulp-concat');
var embedTemplates = require('gulp-angular-embed-templates');
var jshint = require('gulp-jshint');
var rename = require('gulp-rename');
var resolutions = require('browserify-resolutions');
var runSequence = require('run-sequence');
var sass = require('gulp-sass');
var source = require('vinyl-source-stream');
var sourcemaps = require('gulp-sourcemaps');
var uglify = require('gulp-uglify');

/**
 * Angular directive that requires embedding
 */
gulp.task('embed-[DIRECTIVE]', function () {
    gulp.src('./www/js/[DIRECTIVE]/directive/*.js')
        .pipe(embedTemplates())
        .on('error', errorWarning)
        .pipe(gulp.dest('./www/js/[DIRECTIVE]'));
});

/**
 * List of individual angular directives from above
 */
gulp.task('embed', [
    'embed-[DIRECTIVE]'
]);

/**
 * Compile SASS
 *
 * Change sass() to scss() for SCSS
 */
gulp.task('sass', function() {
    return gulp.src('./sass/*')
        .pipe(sass())
        .pipe(gulp.dest('./dist/css'));
});

/**
 * Checks for potential JavaScript issues
 */
gulp.task('lint', function() {
    return gulp.src([
            './www/js/*.js',
            './www/js/*/*.js'
        ])
        .pipe(jshint())
        .on('error', errorWarning)
        .pipe(jshint.reporter('default'));
});

/**
 * Compiles, bundles, and minifies the JavaScript files
 */
gulp.task('scripts', function() {
    return gulp.src([
            './www/js/*.js',
            './www/js/*/*.js',
            '!./www/js/index.js'
        ])
        .pipe(concat('[TEMPLATE].full.js'))
        .pipe(gulp.dest('./dist'))
        .pipe(sourcemaps.init())
        .pipe(rename('[TEMPLATE].min.js'))
        .pipe(uglify())
        .on('error', errorWarning)
        .pipe(sourcemaps.write('./'))
        .pipe(gulp.dest('./dist'));
});

gulp.task('browserify-concat', function() {
    return gulp.src([
            './www/js/index.js',
            './dist/[TEMPLATE].full.js'
        ])
        .pipe(concat('index.js'))
        .pipe(gulp.dest('./dist'))
});

gulp.task('browserify-task', function() {
    return browserify('./dist/index.js')
        .transform(babel)
        .plugin(resolutions, '*')
        .bundle()
        .on('error', errorWarning)
        .pipe(source('[TEMPLATE].bundle.js'))
        .pipe(buffer())
        .pipe(sourcemaps.init({ loadMaps: true }))
        .pipe(sourcemaps.write('./'))
        .pipe(gulp.dest('./dist'))
});

gulp.task('browserify', function() {
    runSequence = require('run-sequence').use(gulp);

    runSequence(
        'scripts',
        'browserify-concat',
        'browserify-task'
    );
});

/**
 * Watch for changes and run the necessary tasks
 */
gulp.task('watch', function() {
    gulp.watch('./www/js/*', ['build']);
    gulp.watch('./www/js/**/*', ['build']);
    gulp.watch('./www/js/**/directive/*', ['embed']);
    gulp.watch('./www/js/index.js', ['browserify']);
    gulp.watch('./dist/[TEMPLATE].full.js', ['browserify']);
    gulp.watch('./package.json', ['browserify']);
    gulp.watch('./sass/*', ['sass']);
});

/**
 * Create server
 */
gulp.task('browser-serve', function() {
    browserSync.init({
        server: {
            baseDir: './',
            index:   './example/index.html'
        }
    });

    gulp.watch('./dist/[TEMPLATE].bundle.js').on('change', browserSync.reload);
});

/**
 * Create proxy server
 */
gulp.task('browser-proxy', function() {
    browserSync.init({
        proxy: {
            target: "http://localhost:8888/[TEMPLATE]/example/index.html",
            ws: true
        }
    });

    gulp.watch('./dist/[TEMPLATE].bundle.js').on('change', browserSync.reload);
});

/**
 * Define build task
 */
gulp.task('build', [
    'embed',
    'sass',
    'lint',
    'browserify'
]);

/**
 * Define default task
 */
gulp.task('default', [
    'build',
    'watch'
]);

/**
 * Define serve task
 */
gulp.task('serve', [
    'default',
    'browser-serve'
]);

/**
 * Define proxy server task
 */
gulp.task('proxy', [
    'default',
    'browser-proxy'
]);

/**
 * Output error
 *
 * @param error
 */
function errorWarning(error) {
    console.log(error.toString());
}