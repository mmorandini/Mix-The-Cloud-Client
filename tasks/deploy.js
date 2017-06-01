const gulp             = require('gulp');

gulp.task('deploy', () => {
  global.production = true;
  return gulp.start(['build-app']);
});
