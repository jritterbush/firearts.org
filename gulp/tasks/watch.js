'use strict';

import gulp from 'gulp'
import config from '../config';

gulp.task('watch', () => {
    gulp.watch(config.src + '/scss/**/*.scss', ['sass']);
    gulp.watch([
        config.src + '/templates/**/*.hbs',
        config.src + '/content/**/*.{hbs,md}'
    ], ['assemble']);
});
