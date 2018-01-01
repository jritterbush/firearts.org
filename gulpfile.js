'use strict';

const gulp = require('gulp');
const rename = require('gulp-rename');

gulp.task('copy', () => {
    gulp.src('node_modules/normalize.css/normalize.css')
        .pipe(rename('_normalize.scss'))
        .pipe(gulp.dest('./src/_sass/vendor/'));
});
