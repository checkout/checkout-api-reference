var gulp = require('gulp');
var util = require('gulp-util')
var gulpConnect = require('gulp-connect');
var exec = require('gulp-exec');
var connect = require('connect');
var cors = require('cors');
var portfinder = require('portfinder');
var swaggerRepo = require('swagger-repo');
const { watch } = require('gulp');

var DIST_DIR = 'web_deploy';

gulp.task('build', function () {
    return gulp.src(DIST_DIR).pipe(exec('npm run build'));
});

gulp.task('reload', gulp.series('build', function () {
  return gulp.src(DIST_DIR).pipe(gulpConnect.reload())
}));

gulp.task('watch', function (cb) {
  watch('spec/**/*', gulp.series('reload'));
  watch('web/**/*', gulp.series('reload'));
  cb();
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

gulp.task('start_site', function(cb) {
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
        }, function () { this.server.on('close', cb) })
      })
      .catch((err) => {
        // Could not get a free port, `err` contains the reason.
        console.log(err);
      });
})

gulp.task('serve', gulp.series('build', gulp.parallel('watch', 'edit', 'start_site')));