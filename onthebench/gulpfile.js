var gulp = require('gulp');
var less = require('gulp-less');
var browserSync = require('browser-sync').create();
var reload = browserSync.reload;

// compile less
gulp.task('compile-less', function() {
  gulp.src('./styles/style.less')
    .pipe(less())
    .pipe(gulp.dest('./public/css/'));
});

// watch for changes
gulp.task('watch-less', function() {
  gulp.watch('./styles/*.less', ['compile-less']);
});

// serve gulp
gulp.task('serve', function() {
  browserSync.init({
    port:3001,
    proxy: {
      target: "localhost:3000",
      ws: true
    }
  });
  gulp.watch("./styles/*.less").on("change", reload);
  gulp.watch("./views/*.ejs").on("change", reload);
});

// default command
gulp.task('default', ['watch-less', 'serve']);
