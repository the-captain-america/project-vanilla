const path        = require('path');
const del         = require('del');
const gulp        = require('gulp');
const sass        = require('gulp-sass');
const minifyCss   = require('gulp-minify-css');
const plumber     = require('gulp-plumber');
const inject      = require('gulp-inject');
const uglify      = require('gulp-uglify');
const connect     = require('gulp-connect');
const webpack     = require('webpack-stream');
const named       = require('vinyl-named');
const browserSync = require('browser-sync').create();

gulp.task('webpack', function() {
  const scripts = './app/js/main.js';
  return gulp.src(scripts)
    .pipe(named())
    .pipe(webpack({
        watch: true,
        module: {
          loaders: [
            { test: /\.js$/,
              loader: 'babel-loader',
              query: {
                presets: ['env', 'stage-2']
              }
            }
          ],
        },
    }))
    .pipe(gulp.dest('dist/js'));
});

const port = 3000;
const app = 'app/';
const dist = 'dist/';

const autoprefixerBrowsers = [
  'ie >= 9',
  'ie_mob >= 10',
  'ff >= 30',
  'chrome >= 34',
  'safari >= 6',
  'opera >= 23',
  'ios >= 6',
];

gulp.task('scripts', function() {
  return gulp.src(app + 'js/main.js')
    .pipe(gulp.dest(dist + 'js/'))
});

// copy html from app to dist
gulp.task('html', function() {
  return gulp.src(app + 'index.html')
    .pipe(gulp.dest(dist))
});

gulp.task('styles', function() {
  gulp.src(app + 'styles/_base/*.scss')
    .pipe(plumber())
    .pipe(sass().on('error', sass.logError))
    .pipe(minifyCss({compatibility: autoprefixerBrowsers}))
    .pipe(gulp.dest(dist + 'css'))
});

// add livereload on the given port
gulp.task('connect', function() {
  connect.server({
    root: dist,
    port: port
  });
});

// Static server
gulp.task('browser-sync', function() {
  browserSync.init({
    server: dist,
    port: port
  });
});

// copy images
gulp.task('images', function(cb) {
  return gulp.src(app + 'images/**/*.{png,jpg,jpeg,gif}')
    .pipe(gulp.dest(dist + 'images/'));
});

// copy fonts
gulp.task('fonts', function(cb) {
  return gulp.src(app + 'assets/fonts/*.{otf,ttf,woff,woff2,eot}')
    .pipe(gulp.dest(dist + '/assets/' + 'fonts/'));
});

// copy icons
gulp.task('icons', function(cb) {
  return gulp.src(app + 'assets/icons/*.svg')
    .pipe(gulp.dest(dist + '/assets/' + 'icons/'));
});

// copy vendors
gulp.task('vendors', function(cb) {
  return gulp.src(app + 'assets/vendors/*.{otf,ttf,woff,woff2,eot}')
    .pipe(gulp.dest(dist + '/assets/' + 'vendors/'));
});

// watch changes
gulp.task('watch', function() {
  gulp.watch(app + 'styles/**/*.scss', ['styles']);
  gulp.watch(app + 'js/*.js', ['scripts']);
  gulp.watch(app + 'index.html', ['html']);
});

// remove bundle
gulp.task('clean', function(cb) {
  return del([dist], cb);
});

// by default build project and then watch files in order to trigger livereload
gulp.task('default', ['webpack', 'fonts', 'icons', 'vendors', 'html', 'styles', 'watch', 'browser-sync']);

// waits until clean is finished then builds the project
gulp.task('build', ['clean'], function() {
  gulp.start('default');
});

// removed: ['fonts', 'icons', 'vendors', 'html','scripts','styles', 'connect', 'watch']