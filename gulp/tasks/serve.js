'use strict';

import gulp from 'gulp'
import config from '../config';
import browserSync from 'browser-sync';

gulp.task('serve', ['build', 'watch'], () => {
    browserSync.init({
        server: {
            baseDir: config.destDev
        }
    });
});

