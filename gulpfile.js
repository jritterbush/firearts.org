var gulp        = require('gulp'),
    browserSync = require('browser-sync'),
    sass        = require('gulp-sass'),
    autoprefix  = require('gulp-autoprefixer'),
    del         = require('del'),
    runSequence = require('run-sequence'),
    sourcemaps  = require('gulp-sourcemaps'),
    ghPages     = require('gulp-gh-pages'),
    extname     = require('gulp-extname'),
    assemble    = require('assemble');

var src          = 'src',
    destDev      = 'build/dev',
    destProd     = 'build/prod',
    nodeModules  = 'node_modules',
    data         = 'src/data',
    content      = 'src/content';

var app = assemble();


gulp.task('test', function() {
    runSequence(
        'clean',
        'assemble:build'
    );
});

gulp.task('assemble:load', function() { 
    app.partials('src/templates/partials/*.hbs');
    app.layouts('src/templates/layouts/*.hbs');
    app.data('src/data/**/*.{json,yml}');
});


gulp.task('assemble:build', ['assemble:load'],function() {
    app.src('src/templates/home.hbs', {layout: 'docs'})
        .pipe(app.renderFile())
        .pipe(extname())
        .pipe(app.dest(destDev));
});

// gulp.task('load', function() { 
//     app.partials(src + '/templates/partials/**/*.hbs');
//     app.layouts(src + '/templates/layouts/');
//     app.data([data + '/**/*.json']);
// });

// gulp.task('assemble', ['load'], function() {
//     return app.src(data + '/**/*.yml')
//         .pipe(app.renderFile())
//         .pipe(extname())
//         .pipe(gulp.dest(destDev))
//         .pipe(browserSync.stream());
// });

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
        'copy:images'
    );
})

gulp.task('build', function() {
    runSequence(
        'clean',
        'copy',
        'sass',
        'assemble'
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
