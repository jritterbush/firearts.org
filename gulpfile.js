var gulp        = require('gulp'),
    browserSync = require('browser-sync'),
    sass        = require('gulp-sass'),
    autoprefix  = require('gulp-autoprefixer'),
    del         = require('del'),
    runSequence = require('run-sequence'),
    sourcemaps  = require('gulp-sourcemaps'),
    ghPages     = require('gulp-gh-pages'),
    extname     = require('gulp-extname'),
    yaml        = require('gulp-yaml'),
    assemble    = require('assemble');

var src          = 'src',
    destDev      = 'build/dev',
    destProd     = 'build/prod',
    nodeModules  = 'node_modules',
    data         = 'src/data',
    content      = 'src/content';

var app = assemble();

// gulp.task('yaml', function() {
//     return gulp.src('src/data/*.yml')
//         .pipe(yaml())
//         .pipe(gulp.dest('./.tmp/json'));
// });

gulp.task('assemble:load', function() {
    app.partials('src/templates/partials/*.hbs');
    app.layouts('src/templates/layouts/*.hbs');
    app.data('src/data/**/*.json');
});

gulp.task('assemble', ['assemble:load'],function() {
    return app.src('src/content/pages/**/*.{md,hbs,yml}')
        .pipe(app.renderFile())
        .pipe(extname())
        .pipe(app.dest(destDev))
        .pipe(browserSync.stream());
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

gulp.task('copy:fonts', function() {
    return gulp.src(nodeModules + '/font-awesome/fonts/*')
        .pipe(gulp.dest(destDev + '/fonts'));
});

gulp.task('sass', function() {
    return gulp.src(src + '/scss/main.scss')
        .pipe(sourcemaps.init())
        .pipe(sass({
            includePaths: [
                src + '/scss/_partials',
                nodeModules + '/font-awesome/scss'
            ]
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
    return runSequence(
        'copy:normalize',
        'copy:images',
        'copy:fonts'
    );
})

gulp.task('build', function() {
    return runSequence(
        'clean',
        'copy',
        'sass',
        'assemble'
    );
});

gulp.task('deploy:dev', function() {
    return gulp.src(destDev + '/**/*')
        .pipe(ghPages());
});

gulp.task('default', ['build'], function() {
    console.log("Built dev site");
});

gulp.task('watch', function() {
    gulp.watch(src + '/scss/**/*.scss', ['sass']);
    gulp.watch([
        src + '/templates/**/*.hbs',
        src + '/content/**/*.{hbs,md}'
    ], ['assemble']);
});
