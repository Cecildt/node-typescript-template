'use strict';

var gulp       = require('gulp'),
    debug      = require('gulp-debug'),
    inject     = require('gulp-inject'),
    tsc        = require('gulp-typescript'),
    tslint     = require('gulp-tslint'),
    sourcemaps = require('gulp-sourcemaps'),
    del        = require('del'),
    vinylPaths = require('vinyl-paths'),
    nodemon    = require('gulp-nodemon'),
    eslint     = require('gulp-eslint'),
    copy       = require('gulp-copy'),
    uglify     = require('gulp-uglify'),
    concat     = require('gulp-concat'),
    cssmin     = require('gulp-cssmin'),
    Config     = require('./gulpfile.config');

var config = new Config();

/**
 * Lint all custom JavaScript files.
 */
gulp.task('lint-js', function() {  
  return gulp.src(config.output)
    .pipe(eslint())
    .pipe(eslint.format());
});

/**
 * Combine and minify all custom JavaScript and CSS files.
 */
gulp.task('compress', function(){
  
  var cssStream = gulp.src([config.mainCss])
  .pipe(concat('main.min.css'))
  .pipe(cssmin())
  .pipe(gulp.dest(config.mainCssDest));
  
  var appStream = gulp.src([config.appJS])
  .pipe(concat('app.min.js'))
  .pipe(uglify())
  .pipe(gulp.dest(config.appJSDest));
  
  return gulp.src([config.mainJS])
    .pipe(concat('main.min.js'))
    .pipe(uglify())
    .pipe(gulp.dest(config.mainJSDest));
});

/**
 * Lint all custom TypeScript files.
 */
gulp.task('lint-ts', function () {
  return gulp.src(config.allTypeScript)
      .pipe(tslint())
      .pipe(tslint.report('prose'));
});

/**
 * Compile TypeScript and include references tsd.d.ts library and server.d.ts files.
 */
gulp.task('compile-ts', function () {
  var tsProject = tsc.createProject('tsconfig.json');
  
  var tsResult = tsProject.src().pipe(tsc(tsProject));
  tsResult.js.pipe(gulp.dest('build'));
  
  gulp.src(config.views)
  .pipe(copy(config.output, {prefix: 1}));
  
  gulp.src(config.css)
  .pipe(copy(config.output, {prefix: 1}));
  
  gulp.src(config.images)
  .pipe(copy(config.output, {prefix: 1}));

});

/**
 * Remove all generated JavaScript files from TypeScript compilation.
 */
gulp.task('clean-build', function () {
  var typeScriptGenFiles = [
    config.output + '**/*.js',    // path to all JS files auto gen'd by editor
    config.output + '**/*.js.map' // path to all sourcemap files auto gen'd by editor
  ];

  // delete the files
  return gulp.src(typeScriptGenFiles, {read: false})
      .pipe(vinylPaths(del));
});

/**
 * Watch for changes in TypeScript, linting, updating references & recompiling code.
 */
gulp.task('watch', function () {
  gulp.watch([config.allTypeScript], ['lint-ts',  'compile-ts', 'lint-js', 'compress']);
});

/**
 * Watches all server side file changes (TypeScript & Handlebars views) for changes.
 * When detected, lints, generates TypeScript references in *.d.ts files & compiles
 * all TypeScript to JavaScript, then restarts the Node.js server.
 */
gulp.task('watch-nodemon', function () {
  // start nodemon
  nodemon({
    script : 'build/server/server.js',
    ext    : 'html js',
    execMap: {
      'js': 'node --debug'
    },
    tasks  : ['lint-ts', 'compile-ts', 'lint-js', 'compress']
  }).on('message', function (event) {
    if (event.type === 'start') {
      console.log('>>>>>>>>>>>>> STARTED NODE.JS WEBSERVER <<<<<<<<<<<<<');
    } else if (event.type === 'restart') {
      console.log('>>>>>>>>>>>>> RESTARTED NODE.JS WEBSERVER <<<<<<<<<<<<<');
    } else if (event.type === 'crash') {
      console.log('!!!!!!!!!!!!! NODE.JS SERVER CRASHED FOR SOME REASON !!!!!!!!!!!!!');
    }
  });
});

/* default gulp task */
gulp.task('default', ['lint-ts', 'compile-ts', 'lint-js', 'compress']);
