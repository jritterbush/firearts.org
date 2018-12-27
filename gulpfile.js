'use strict';

const bs     = require('browser-sync').create();
const child  = require('child_process');
const gulp   = require('gulp');
const gutil  = require('gulp-util');
const rename = require('gulp-rename');

const siteRoot = './_site';

gulp.task('copy', () => {
    gutil.log('Copying normalize to vendor directory');
    return gulp.src('node_modules/normalize.css/normalize.css')
        .pipe(rename('_normalize.scss'))
        .pipe(gulp.dest('./_sass/vendor/'));
});

gulp.task('jekyll', (cb) => {
    gutil.log('Running jekyll build');
    const jekyll = child.spawn('jekyll', ['build']);
    const jekyllLogger = (buffer) => {
        buffer.toString()
            .split(/\n/)
            .forEach((message) => gutil.log('Jekyll: ' + message));
    };

    jekyll.stdout.on('data', jekyllLogger);
    jekyll.stderr.on('data', jekyllLogger);
    jekyll.on('exit', (code) => {
        cb(code === 0 ? null : 'ERROR: Jekyll process exited with code: ' + code);
    });
});

gulp.task('serve', () => {
    bs.init({
        files: [siteRoot + '/**'],
        port: 4000,
        server: {
            baseDir: siteRoot
        }
    });
    gulp.watch('content/**', gulp.series(['jekyll']));
});

gulp.task('default', gulp.series(['copy', 'jekyll', 'serve']));
gulp.task('build', gulp.series(['copy', 'jekyll']));
