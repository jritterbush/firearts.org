'use strict';

import gulp from 'gulp'
import config from '../config';
import del from 'del';

gulp.task('clean', () => {
    return del([config.destDev, config.destProd]);
});
