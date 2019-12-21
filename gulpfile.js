
const gulp = require('gulp');
const plugins = require('gulp-load-plugins')();
const path = require('path');
const del  = require('del');
const runSequence = require('run-sequence');

const paths = {
 js: ['./src/**/*.js', './updater/**/*.js', '!dist/**', '!node_modules/**']
};

gulp.task('lint', () =>
 // ESLint ignores files with "node_modules" paths.
 // So, it's best to have gulp ignore the directory as well.
 // Also, Be sure to return the stream from the task;
 // Otherwise, the task may end before the stream has finished.
 gulp
   .src(paths.js)
   // eslint() attaches the lint output to the "eslint" property
   // of the file object so it can be used by other modules.
   .pipe(plugins.eslint())
   // eslint.format() outputs the lint results to the console.
   // Alternatively use eslint.formatEach() (see Docs).
   .pipe(plugins.eslint.format())
   // To have the process exit with an error code (1) on
   // lint error, return the stream and pipe to failAfterError last.
   .pipe(plugins.eslint.failAfterError())
);

// Note about lint task:
// if it fails on application startup, it kills the application;
// however if it fails during nodemon watch, it just prints the error
// and the application stays alive.

// Start server with restart on file changes
gulp.task('nodemon', () =>
 plugins.nodemon({
   script: path.join('src', 'index.js'),
   ext: 'js json mjml',
   ignore: ['gulpfile.js', 'node_modules/**/*.js', 'dist/**/*.js', 'dist/**/*.json'],
   tasks: ['lint'],
   delay: 500
 })
);

// gulp serve for development
gulp.task('serve', ['lint'], () => runSequence('nodemon'));

// default task: clean dist, compile js files and copy non-js files.
gulp.task('default', ['lint'], () => {
 runSequence(['serve']);
});
