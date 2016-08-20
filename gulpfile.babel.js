'use strict'

import gulp from 'gulp'
import browserSync from 'browser-sync';
import sass from 'gulp-sass';
import autoprefix from 'gulp-autoprefixer';
import del from 'del';
import runSequence from 'run-sequence';
import sourcemaps from 'gulp-sourcemaps';
import ghPages from 'gulp-gh-pages';
import extname from 'gulp-extname';
import rename from 'gulp-rename';
import yaml from 'gulp-yaml';
// import assemble from 'assemble';
import uncss from 'gulp-uncss';
import cleanCSS from 'gulp-clean-css';

const src          = 'src';
const destDev      = 'dist/dev';
const destProd     = 'dist/prod';
const nodeModules  = 'node_modules';
const data         = 'src/data';
const content      = 'src/content';

// let app = assemble();

// gulp.task('yaml', function() {
//     return gulp.src('src/data/*.yml')
//         .pipe(yaml())
//         .pipe(gulp.dest('./.tmp/json'));
// });

// gulp.task('assemble:load', () => {
//     app.partials('src/templates/partials/**/*.hbs');
//     app.layouts('src/templates/layouts/**/*.hbs');
//     app.data('src/data/**/*.json');
// });

// gulp.task('assemble', ['assemble:load'], () => {
//     return app.src('src/content/pages/**/*.{md,hbs,yml}', {
//             options: {
//                 helpers: ['src/helpers/**/*.js']
//             }
//         })
//         .pipe(app.renderFile())
//         .pipe(extname())
//         .pipe(app.dest(destDev))
//         .pipe(browserSync.stream());
// });

gulp.task('serve', ['build', 'watch'], () => {
    browserSync.init({
        server: {
            baseDir: destDev
        }
    });
});

gulp.task('copy:static', () => {
    return gulp.src(src + '/static**/*')
        .pipe(rename({dirname:''}))
        .pipe(gulp.dest(destDev));
});

gulp.task('copy:images', () => {
    return gulp.src(src + '/images/*')
        .pipe(gulp.dest(destDev + '/images'));
});

gulp.task('copy:fonts', () => {
    return gulp.src(nodeModules + '/font-awesome/fonts/*')
        .pipe(gulp.dest(destDev + '/fonts'));
});

gulp.task('sass', () => {
    return gulp.src(src + '/scss/main.scss')
        .pipe(sourcemaps.init())
        .pipe(sass({
            includePaths: [
                nodeModules + '/bootstrap/scss',
                nodeModules + '/font-awesome/scss',
                nodeModules + '/normalize.css',
                src + '/scss/_partials'
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
        .pipe(gulp.dest(destDev + '/css'))
        .pipe(browserSync.stream());
});

gulp.task('clean', () => {
    return del([destDev, destProd]);
});

gulp.task('copy', () => {
    return runSequence(
        'copy:static',
        'copy:images',
        'copy:fonts'
    );
})

gulp.task('build', () => {
    return runSequence(
        'clean',
        // 'assemble',
        'sass',
        'copy'
    );
});

gulp.task('deploy:dev', () => {
    return gulp.src(destDev + '/**/*')
        .pipe(ghPages());
});

gulp.task('default', ['build'], () => {
    console.log("Built dev site");
});

gulp.task('watch', () => {
    gulp.watch(src + '/scss/**/*.scss', ['sass']);
    // gulp.watch([
    //     src + '/templates/**/*.hbs',
    //     src + '/content/**/*.{hbs,md}'
    // ], ['assemble']);
});
