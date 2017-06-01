const gulp             = require('gulp');
const clean            = require('gulp-clean');
const eventStream      = require('event-stream');
const imagemin         = require('gulp-imagemin');
const browserSync      = require('browser-sync');
const config           = require('../package').gulp;

const cleanImages = () => {
  return gulp.src(config.dest.images, { read: false })
    .pipe(clean());
};

const copyImages = () => {
  return gulp.src(`${config.src.images}${config.selectors.images}`)
    .pipe(imagemin({
      optimizationLevel: 3,
      progressive: true,
      interlaced: true
    }))
    .pipe(gulp.dest(config.dest.images));
};

const buildImages = () => {
  return eventStream.merge(
    cleanImages(),
    copyImages()
  )
  .pipe(browserSync.stream());
};

gulp.task('build-images', buildImages);
module.exports = buildImages;
