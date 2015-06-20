'use strict';
require('babel/register');

var gulp        = require('gulp');
var browserSync = require('browser-sync').create();
var server      = require('./server');

const PORT  = 3000;

gulp.task('serve', function (done) {

  server.listen(PORT, function () {
    done();
  });

});

gulp.task('browserSync', ['serve'], function () {
  const OPTS = {
    proxy: 'http://localhost:' + PORT
  };

  browserSync.init(OPTS);
});

gulp.task('watch', function () {
  gulp.watch(['shared/**', 'client/**'], browserSync.reload);
});

gulp.task('default', ['serve', 'browserSync', 'watch']);
