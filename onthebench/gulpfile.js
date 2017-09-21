var gulp = require('gulp');
var less = require('gulp-less');
var browserSync = require('browser-sync').create();
var reload = browserSync.reload;

// compile less
gulp.task('compile-less', function() {
  gulp.src('./app/styles/style.less')
    .pipe(less())
    .pipe(gulp.dest('./app/public/css/'));
});

// watch for changes
gulp.task('watch-less', function() {
  gulp.watch('./app/styles/*.less', ['compile-less']);
});

// serve gulp
gulp.task('serve', function() {
  browserSync.init({
    port:3001,
    notify: false,
    proxy: {
      target: "localhost:3000",
      ws: true
    }
  });
  gulp.watch("./app/styles/*.less").on("change", reload);
  gulp.watch("./app/views/*.ejs").on("change", reload);
});

// default command
gulp.task('default', ['watch-less', 'serve']);
