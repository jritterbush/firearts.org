'use strict';

const bs       = require('browser-sync').create();
const child    = require('child_process');
const gulp     = require('gulp');
const gutil    = require('gulp-util');
const postcss  = require('gulp-postcss');
const pcColor  = require('postcss-color-function');
const pcImport = require('postcss-import');
const pcNested = require('postcss-nested');
const rename   = require('gulp-rename');
const tailwind = require('tailwindcss');

const siteRoot       = './_site';
const cssRoot        = `${siteRoot}/assets/css/`;
const cssTemp        = './_includes/';
const stylesheet     = './src/styles/styles.scss';
const tailwindConfig = './tailwind.config.js';
const devBuild       = (process.env.NODE_ENV || 'development').trim().toLowerCase() === 'development';

gulp.task('copy', () => {
    gutil.log('Copying normalize to vendor directory');
    return gulp.src('node_modules/normalize.css/normalize.css')
        .pipe(rename('_normalize.scss'))
        .pipe(gulp.dest('./src/styles/vendor/'));
});

gulp.task('styles', () => {
    gutil.log('Building styles');
    return gulp.src(stylesheet)
        .pipe(postcss([
            pcImport(),
            pcNested(),
            tailwind(tailwindConfig),
            pcColor(),
        ]))
        .pipe(rename('styles.css'))
        .pipe(gulp.dest(cssTemp))
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
    gulp.watch(['_includes/**/*.html', '_layouts/**/*.html', 'content/**'], gulp.series(['jekyll']));
    gulp.watch(['tailwind.config.js', 'src/styles/**'], gulp.series(['styles', 'jekyll']));
});

gulp.task('default', gulp.series(['styles', 'jekyll', 'serve']));
gulp.task('build', gulp.series(['styles', 'copy', 'jekyll']));
