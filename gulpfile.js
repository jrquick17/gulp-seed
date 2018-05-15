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

gulp.task('embed', function () {
    gulp.src('./src/[TEMPLATE]/*.js')
        .pipe(embedTemplates())
        .on('error', errorWarning)
        .pipe(gulp.dest('./src'));
});

gulp.task('sass', function() {
    return gulp.src('./sass/*')
        .pipe(sass())
        .pipe(gulp.dest('./dist/css'));
});

gulp.task('lint', function() {
    return gulp.src('./src/**/*.js')
        .pipe(jshint())
        .on('error', errorWarning)
        .pipe(jshint.reporter('default'));
});

gulp.task('scripts', function() {
    return gulp.src([
            './src/*.js',
            '!./src/index.js'
        ])
        .pipe(concat('[TEMPLATE].js'))
        .pipe(gulp.dest('./dist'))
        .pipe(rename('[TEMPLATE].min.js'))
        .pipe(uglify())
        .on('error', errorWarning)
        .pipe(gulp.dest('./dist'));
});

gulp.task('browserify', function() {
    runSequence = require('run-sequence').use(gulp);

    runSequence(
        'scripts',
        'browserify-concat',
        'browserify-task'
    );
});

gulp.task('browserify-concat', function() {
    return gulp.src([
            './src/index.js',
            './dist/[TEMPLATE].js'
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

gulp.task('watch', function() {
    gulp.watch('./src/*', ['build']);
    gulp.watch('./src/[TEMPLATE]/*', ['embed']);
    gulp.watch('./src/index.js', ['browserify']);
    gulp.watch('./dist/[TEMPLATE].js', ['browserify']);
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