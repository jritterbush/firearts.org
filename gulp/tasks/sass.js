'use strict';

import gulp from 'gulp'
import config from '../config';
import browserSync from 'browser-sync';
import sass from 'gulp-sass';
import autoprefix from 'gulp-autoprefixer';
import sourcemaps from 'gulp-sourcemaps';

gulp.task('sass', () => {
    return gulp.src(config.src + '/scss/main.scss')
        .pipe(sourcemaps.init())
        .pipe(sass({
            includePaths: [
                config.node + '/bootstrap/scss',
                config.node + '/font-awesome/scss',
                config.node + '/normalize.css',
                config.src + '/scss/_partials'
            ]
        }).on('error', sass.logError))
        .pipe(autoprefix({
            browsers: ['last 2 versions']
        }))
        // .pipe(uncss({
        //     html: ['dist/**/*.html']    
        // })) // move to production build
        // .pipe(cleanCSS()) // move to production build
        .pipe(sourcemaps.write())
        .pipe(gulp.dest(config.destDev + '/css'))
        .pipe(browserSync.stream());
});
