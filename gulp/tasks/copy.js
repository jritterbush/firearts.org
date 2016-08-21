'use strict';

import gulp from 'gulp'
import config from '../config';
import rename from 'gulp-rename';

gulp.task('copy:static', () => {
    return gulp.src(config.src + '/static**/*')
        .pipe(rename({dirname:''}))
        .pipe(gulp.dest(config.destDev));
});

gulp.task('copy:images', () => {
    return gulp.src(config.src + '/images/*')
        .pipe(gulp.dest(config.destDev + '/images'));
});

gulp.task('copy:fonts', () => {
    return gulp.src(config.nodeModules + '/font-awesome/fonts/*')
        .pipe(gulp.dest(config.destDev + '/fonts'));
});

gulp.task('copy', ['copy:static', 'copy:images', 'copy:fonts']);
