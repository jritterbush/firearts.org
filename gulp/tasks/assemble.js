'use strict'

import gulp from 'gulp'
import assemble from 'assemble';
import config from '../config';
import extname from 'gulp-extname';
import rename from 'gulp-rename';
import helpers from 'handlebars-helpers';
import browserSync from 'browser-sync';

const app = assemble();

helpers();

gulp.task('load', (callback) => {
    app.layouts('src/templates/layouts/**/*.hbs');
    app.partials('src/templates/partials/**/*.hbs');
    app.pages([
        'src/content/pages/**/*.{md,hbs}',
        'src/content/class/**/*.{md,hbs}'
    ]);
    app.data('src/data/**/*.json');
    callback();
});

gulp.task('assemble', ['load'], () => {
    return app.toStream('pages')
        .pipe(app.renderFile())
        .pipe(rename(function(path) {
            // cache these path values to reuse later
            const dirname = path.dirname;
            const basename = path.basename;
            if (basename !== 'index') {
                path.dirname = basename;
            }
            if (dirname.indexOf('class') !== -1) {
                path.dirname = 'class/' + basename;
            }
            path.basename = 'index';
            path.extname = '.html';
        }))
        .pipe(app.dest(config.destDev))
        .pipe(browserSync.stream());
});

