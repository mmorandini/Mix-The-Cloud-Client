const gulp             = require('gulp');
const eventStream      = require('event-stream');
const buildIndex       = require('./index');
const buildPartials    = require('./partials');
const buildImages      = require('./images');
const buildFonts       = require('./fonts');

const buildApp = function() {
  return eventStream.merge(
    buildIndex(),
    buildPartials(),
    buildImages(),
    buildFonts()
  );
};

gulp.task('build-app', ['clean'], buildApp);
module.exports = buildApp;
