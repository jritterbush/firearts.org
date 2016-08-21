'use strict';

import gulp from 'gulp'
import config from '../config';
import ghPages from 'gulp-gh-pages';

gulp.task('deploy:dev', () => {
    return gulp.src(config.destDev + '/**/*')
        .pipe(ghPages());
});
