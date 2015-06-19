'use strict';

var gulp        = require('gulp');
var browserSync = require('browser-sync').create();
var server      = require('./index');

const PORT  = 3000;
const PATHS = ['shared/**', 'client/**'];

gulp.task('serve', function (done) {

  server.listen(PORT, function () {
    done();
  });

});

gulp.task('browserSync', ['serve'], function () {
  const opts = {
    proxy: 'http://localhost:' + PORT
  };

  browserSync.init(opts);
});

gulp.task('watch', function () {
  gulp.watch(PATHS, browserSync.reload);
});

gulp.task('default', ['serve', 'browserSync', 'watch']);
