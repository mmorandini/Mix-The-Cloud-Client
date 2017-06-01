const gulp             = require('gulp');
const notify           = require('gulp-notify');
const plumber          = require('gulp-plumber');

const onError = function(err) {
  notify.onError({
    title: 'Something went wrong!',
    subtitle: 'Plugin: <%= error.plugin %>',
    message: 'Error: <%= error.message %>',
    sound: 'Beep'
  })(err);
  this.emit('end');
};

const gulpSrc = gulp.src;

gulp.src = function() {
  return gulpSrc.apply(gulp, arguments)
    .pipe(plumber({ errorHandler: onError })
  );
};
