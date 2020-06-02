var gulp = require('gulp');
var util = require('gulp-util')
var gulpConnect = require('gulp-connect');
var connect = require('connect');
var cors = require('cors');
var path = require('path');
var exec = require('child_process').exec;
var portfinder = require('portfinder');
var swaggerRepo = require('swagger-repo');

var DIST_DIR = 'web_deploy';

gulp.task('build', function (cb) {
  return exec('npm run build', function (err, stdout, stderr) {
    console.log(stderr);
    cb(err);
  });
});

gulp.task('reload', gulp.series('build', function () {
  return gulp.src(DIST_DIR).pipe(gulpConnect.reload())
}));

gulp.task('watch', function () {
  return gulp.watch(['spec/**/*', 'web/**/*'], gulp.series('reload'));
});


gulp.task('edit', function () {
  return portfinder.getPortPromise({port: 5000})
      .then((port) => {
        var app = connect();
        app.use(swaggerRepo.swaggerEditorMiddleware());
        app.listen(port);
        util.log(util.colors.green('swagger-editor started http://localhost:' + port));
      })
      .catch((err) => {
        // Could not get a free port, `err` contains the reason.
        console.log(err);
      });
});

gulp.task('start_site', function() {
  return portfinder.getPortPromise({port: 3000})
      .then((port) => {
        // `port` is guaranteed to be a free port in this scope.
        gulpConnect.server({
          root: [DIST_DIR],
          livereload: true,
          port: port,
          middleware: function (gulpConnect, opt) {
            return [
              cors()
            ]
          }
        });
      })
      .catch((err) => {
        // Could not get a free port, `err` contains the reason.
        console.log(err);
      });
})

gulp.task('serve', gulp.series('build', gulp.parallel('watch', 'edit', 'start_site')));