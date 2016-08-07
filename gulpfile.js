'use strict'

var gulp        = require('gulp'),
    browserSync = require('browser-sync'),
    sass        = require('gulp-sass'),
    autoprefix  = require('gulp-autoprefixer'),
    del         = require('del'),
    runSequence = require('run-sequence'),
    sourcemaps  = require('gulp-sourcemaps'),
    ghPages     = require('gulp-gh-pages'),
    extname     = require('gulp-extname'),
    assemble    = require('assemble'),
    app         = assemble();

var src          = 'src',
    destDev      = 'build/dev',
    destProd     = 'build/prod',
    nodeModules  = 'node_modules',
    data         = 'src/data';

gulp.task('load', function(callback) { 
    app.option('layout', 'page');
    app.partials(src + '/templates/partials/**/*.hbs');
    app.layouts(src + '/templates/layouts/');
    app.data([data + '/_pages/**/*.{json,yml}']);
    callback();
});

gulp.task('assemble', ['load'], function() {
    return gulp.src(data + '/_pages/**/*.yml', { layout: 'base' })
        .pipe(extname())
        .pipe(gulp.dest(destDev));
});

gulp.task('serve', ['build', 'watch'], function() {
    browserSync.init({
        server: {
            baseDir: destDev
        }
    });
});

gulp.task('copy:normalize', function() {
    return gulp.src(nodeModules + '/normalize.css/normalize.css')
        .pipe(gulp.dest(destDev + '/css/vendors'));
});

gulp.task('copy:static', function() {
    return gulp.src(src + '/static/**')
        .pipe(gulp.dest(destDev));
});

gulp.task('copy:images', function() {
    return gulp.src(src + '/images/*')
        .pipe(gulp.dest(destDev + '/images'));
});

gulp.task('tmp:copyIndex', function() {
    return gulp.src(src + '/templates/index.html')
        .pipe(gulp.dest(destDev));
});

gulp.task('sass', function() {
    return gulp.src(src + '/scss/main.scss')    
        .pipe(sourcemaps.init())
        .pipe(sass({
            includePaths: src + '/scss/_partials'
        }).on('error', sass.logError))
        .pipe(autoprefix({
            browsers: ['last 2 versions']
        }))
        .pipe(sourcemaps.write())
        .pipe(gulp.dest(destDev + '/css'))
        .pipe(browserSync.stream());
});

gulp.task('clean', function() {
   return del([destDev, destProd]);
});

gulp.task('copy', function() {
    runSequence(
        'copy:normalize',
        'copy:images',
        'tmp:copyIndex'
    );
})

gulp.task('build', function() {
    runSequence(
        'clean',
        'copy',
        'sass'
    );
});

gulp.task('deploy:dev', ['build'], function() {
    return gulp.src(destDev + '/**/*')
        .pipe(ghPages());
});

gulp.task('default', ['build'], function() {
    console.log("Built dev site");
});

gulp.task('watch', function() {
    gulp.watch(src + '/scss/**/*.scss', ['sass']);
    gulp.watch(src + '/templates/index.html', ['tmp:copyIndex']);
});
