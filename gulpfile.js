(function() {
  'use strict';

  var gulp = require('gulp');
  var karma = require('karma');
  var $ = require('gulp-load-plugins')();
  var runSequence = require('run-sequence');
  var VERSION;

  var startKarma = function(done) {
    new karma.Server({
      configFile: __dirname + '/karma.conf.js'
    }, done).start();
  };

  gulp.task('default', ['tdd']);

  gulp.task('test', function(done) {
    startKarma(done);
  });

  gulp.task('tdd', function(done) {
    gulp.watch('**/*.js', ['test']);
  });

  gulp.task('jscs', function(done) {
    return gulp.src(['lib/*.js', 'spec/*.js'])
      .pipe($.jscs({ fix: true }))
      .pipe($.jscs.reporter())
      .pipe($.jscs.reporter('fail'))
      .pipe($.size());
  });

  gulp.task('clean', function() {
    return require('del')('dist');
  });

  gulp.task('distribute', function(done) {
    return gulp.src('lib/*.js')
      .pipe($.uglify())
      .pipe($.rename(function(path) {
        path.basename += '.min';
      }))
      .pipe(gulp.dest('dist'))
      .pipe($.size());
  });

  var getVersion = function(callback) {
    if (VERSION) {
      callback(VERSION);
    } else {
      var rl = require('readline').createInterface({
        input: require('fs').createReadStream('CHANGELOG.md')
      });
      rl.on('line', function(line) {
        if (!VERSION) {
          VERSION = line.trim();
          rl.close();
        }
      });

      rl.on('close', function() {
        if (!VERSION) {
          VERSION = '1.0.0';
        }

        callback(VERSION);
      });
    }
  };

  gulp.task('updateVersion', function(done) {
    getVersion(function(version) {
      gulp.src('package.json')
        .pipe($.bump({
          version: version
        }))
        .pipe(gulp.dest('./'));
      done();
    });
  });

  gulp.task('dist', function() {
    runSequence('jscs', 'clean', 'updateVersion', 'distribute');
  });
})();
