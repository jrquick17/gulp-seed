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

gulp.task('embed-[DIRECTIVE]', function () {
    gulp.src('./www/js/[DIRECTIVE]/directive/*.js')
        .pipe(embedTemplates())
        .on('error', errorWarning)
        .pipe(gulp.dest('./www/js/[DIRECTIVE]'));
});

gulp.task('embed', [
    'embed-[DIRECTIVE]'
]);

gulp.task('sass', function() {
    return gulp.src('./sass/*')
        .pipe(sass())
        .pipe(gulp.dest('./dist/css'));
});

gulp.task('lint', function() {
    return gulp.src([
            './www/js/*.js',
            './www/js/*/*.js'
        ])
        .pipe(jshint())
        .on('error', errorWarning)
        .pipe(jshint.reporter('default'));
});

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

gulp.task('watch', function() {
    gulp.watch('./www/js/*', ['build']);
    gulp.watch('./www/js/**/*', ['build']);
    gulp.watch('./www/js/**/directive/*', ['embed']);
    gulp.watch('./www/js/index.js', ['browserify']);
    gulp.watch('./dist/[TEMPLATE].full.js', ['browserify']);
    gulp.watch('./package.json', ['browserify']);
    gulp.watch('./sass/*', ['sass']);
});

gulp.task('browser-serve', function() {
    browserSync.init({
        server: {
            baseDir: './',
            index:   './example/index.html'
        }
    });

    gulp.watch('./dist/[TEMPLATE].bundle.js').on('change', browserSync.reload);
});

gulp.task('browser-proxy', function() {
    browserSync.init({
        proxy: {
            target: "http://localhost:8888/[TEMPLATE]/example/index.html",
            ws: true
        }
    });

    gulp.watch('./dist/[TEMPLATE].bundle.js').on('change', browserSync.reload);
});

gulp.task('build', [
    'embed',
    'sass',
    'lint',
    'browserify'
]);

gulp.task('default', [
    'build',
    'watch'
]);

gulp.task('serve', [
    'default',
    'browser-serve'
]);

gulp.task('proxy', [
    'default',
    'browser-proxy'
]);

function errorWarning(error) {
    console.log(error.toString());
}