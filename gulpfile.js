(() => {

  const gulp = require('gulp');
  const karma = require('karma');
  const $ = require('gulp-load-plugins')();
  const runSequence = require('run-sequence');
  const root = __dirname;
  const glob = require('glob');
  const del = require('del');
  const fs = require('fs');
  const join = require('path').join;
  const semver = require('semver-regex');
  const distFolder = join(root, '/lib');

  const getAssets = () =>
    new Promise((resolve, reject) => {
      const assets = {};
      const patterns = {
        js: 'src/**/!(*.spec).js',
        spec: 'src/**/*.spec.js'
      };

      Object.keys(patterns).forEach((type) => {
        glob(patterns[type], (err, files) => {
          if (err) {
            return reject(err);
          }

          assets[type] = files;
          if (Object.keys(assets).length === Object.keys(patterns).length) {
            resolve(assets);
          }
        });
      });
    });

  let version;
  const getVersion = () =>
    new Promise((resolve, reject) => {
      if (version) {
        return resolve(version);
      }

      try {
        const rl = require('readline').createInterface({
          input: fs.createReadStream('CHANGELOG.md')
        });

        rl.on('line', (line) => {
          if (!version) {
            version = line.match(semver()).pop();
            rl.close();
          }
        });

        rl.on('close', () => {
          if (!version) {
            version = '1.0.0';
          }

          resolve(version);
        });
      } catch (e) {
        reject(e);
      }
    });

  const startKarma = (config, done) => {
    if (!config.files) {
      throw new Error('No files specified!');
    }

    new karma.Server({
      configFile: `${root}/karma.conf.js`,
      singleRun: (typeof config.singleRun === 'boolean' ? config.singleRun : true),
      autoWatch: (typeof config.autoWatch === 'boolean' ? config.autoWatch : false),
      files: config.files
    }, (karmaResult) => {
      if (karmaResult) {
        done(`Karma: tests failed with code ${karmaResult}`);
      } else {
        done();
      }
    }).start();
  };

  gulp.task('lint', () =>
    gulp.src('src/**/*.js')
      .pipe($.eslint())
      .pipe($.eslint.format())
      .pipe($.eslint.failAfterError()));

  gulp.task('default', ['tdd']);

  gulp.task('test', (done) => {
    getAssets()
      .then((assets) => {
        startKarma({
          singleRun: true,
          autoWatch: false,
          files: assets.js.concat(assets.spec)
        }, done);
      });
  });

  gulp.task('tdd', (done) => {
    getAssets()
      .then((assets) => {
        startKarma({
          singleRun: false,
          autoWatch: true,
          files: assets.js.concat(assets.spec)
        }, done);
      });
  });

  gulp.task('clean', () =>
    del([`${distFolder}/*`], {
      force: true
    }));

  gulp.task('dist', () => {
    if (!(fs.existsSync(distFolder)
      && fs.statSync(distFolder).isDirectory())) {
      fs.mkdirSync(distFolder);
    }

    return getAssets()
      .then((assets) =>
        gulp.src(assets.js)
          .pipe($.uglify())
          .pipe($.rename((path) => {
            path.basename += '.min';
            return path;
          }))
          .pipe(gulp.dest(distFolder)));
  });

  gulp.task('updateVersion', (done) => {
    getVersion()
      .then((ver) => {
        gulp.src('package.json')
          .pipe($.bump({
            version: ver
          }))
          .pipe(gulp.dest(root));
        done();
      });
  });

  gulp.task('build', (done) => {
    runSequence('test', 'lint', 'updateVersion', 'clean', 'dist', done);
  });
})();
