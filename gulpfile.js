/* Gulp Build Script */

// Dependencies.
var gulp    = require('gulp');
var del     = require('del');
var pug     = require('gulp-pug');
var less    = require('gulp-less');
var coffee  = require('gulp-coffee');
var rename  = require('gulp-rename');
var nodemon = require('gulp-nodemon');

// Source directories.
var src = {
  root: 'src/',
  pages: ['src/**/*.pug', '!src/_templates/**'],
  lib: ['assets/lib/**/*'],
  less: ['assets/css/stylesheet.less'],
  coffee: ['assets/js/**/*.coffee'],
  img: ['assets/img/**/*'],
};

// Destination directories.
var dest = {
  root: 'htdocs/',
  lib: 'assets/lib/',
  less: 'assets/css/',
  coffee: 'assets/js/',
  img: 'assets/img/',
};

// Copy libraries to destination.
gulp.task('lib', ['clean'], function() {
  console.log('Copying libraries...');
  return gulp.src(src.root + src.lib)
         .pipe(gulp.dest(dest.root + dest.lib));
});

// Build Webpages as PHP files.
gulp.task('pages', ['clean'] ,function() {
  console.log('Saving webpages...');
  return gulp.src(src.pages)
         .pipe(pug({ }))
         .pipe(gulp.dest(dest.root));
});

// Build stylesheets (less).
gulp.task('css', ['clean'], function() {
  console.log('Building stylesheets...');
  return gulp.src(src.root + src.less)
         .pipe(less())
         .pipe(gulp.dest(dest.root + dest.less));
});

// Build JavaScript (coffeescript)
gulp.task('js', ['clean'], function() {
  console.log('Brewing javascript...');
  return gulp.src(src.root + src.coffee)
         .pipe(coffee({ bare: true }))
         .pipe(gulp.dest(dest.root + dest.coffee));
});

// Copy images to destination.
gulp.task('img', ['clean'], function() {
  console.log('Copying images...');
  return gulp.src(src.root + src.img)
         .pipe(gulp.dest(dest.root + dest.img));
});

// Clean the build directory.
gulp.task('clean', function() {
  return del(dest.root);
});

// Watch for changes.
gulp.task('watch', ['css', 'img', 'js', 'lib', 'clean', 'pages'], function() {
  console.log('Watching for changes...');
  gulp.watch(src.root + '**/*', ['rebuild']);
});

// Rebuild task (sans watch)
gulp.task('rebuild', ['clean', 'img', 'lib' , 'js', 'css' ,'pages'], function() {
  console.log('Rebuild complete.\n');
});

// Run Express (local webhost)
gulp.task('serve', function() {
  //nodemon({script: 'server.js', ext: 'html'})
  var server = require('./server');
  server();
});

// Entry-point default task.
gulp.task('default', function() {
  console.log('\nSite builder script\nPowered by Gulp and Node.js\n\nOptions:\n');
  console.log('[1] gulp dev - Use when developing the site (runs a local webhost and watches the source dir.)');
  console.log('[2] gulp build - Only builds the source files for production.\n');
});

// Development script
gulp.task('dev', ['clean', 'img', 'lib' , 'js', 'css' ,'pages', 'watch'],function() {
  gulp.start('serve');
  console.log('Project is on development mode.')
});

// Compile script
gulp.task('build', ['clean', 'img', 'lib' , 'js', 'css' ,'pages'], function() {
  console.log('Build complete.')
});
