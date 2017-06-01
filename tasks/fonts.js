const gulp             = require('gulp');
const clean            = require('gulp-clean');
const eventStream      = require('event-stream');
const browserSync      = require('browser-sync');
const bowerFiles       = require('main-bower-files');
const config           = require('../package').gulp;

const localFonts = () => {
  return gulp.src(`${config.src.fonts}${config.selectors.fonts}`);
};

const vendorFonts = () => {
  return gulp.src(bowerFiles(config.selectors.fonts));
};

const cleanFonts = () => {
  return gulp.src(config.dest.fonts, { read: false })
    .pipe(clean());
};

const copyFonts = () => {
  return eventStream.merge(
    localFonts(),
    vendorFonts()
  )
  .pipe(gulp.dest(config.dest.fonts));
};

const buildFonts = () => {
  return eventStream.merge(
    cleanFonts(),
    copyFonts()
  )
  .pipe(browserSync.stream());
};

gulp.task('build-fonts', buildFonts);
module.exports = buildFonts;
