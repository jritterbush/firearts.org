import gulp from 'gulp'
import browserSync from 'browser-sync';
import sass from 'gulp-sass';
import autoprefix from 'gulp-autoprefixer';
import del from 'del';
import runSequence from 'run-sequence';
import sourcemaps from 'gulp-sourcemaps';
import ghPages from 'gulp-gh-pages';
import extname from 'gulp-extname';
import yaml from 'gulp-yaml';
import assemble from 'assemble';

const src          = 'src';
const destDev      = 'build/dev';
const destProd     = 'build/prod';
const nodeModules  = 'node_modules';
const data         = 'src/data';
const content      = 'src/content';

let app = assemble();

// gulp.task('yaml', function() {
//     return gulp.src('src/data/*.yml')
//         .pipe(yaml())
//         .pipe(gulp.dest('./.tmp/json'));
// });

gulp.task('assemble:load', () => {
    app.partials('src/templates/partials/**/*.hbs');
    app.layouts('src/templates/layouts/**/*.hbs');
    app.data('src/data/**/*.json');
});

gulp.task('assemble', ['assemble:load'], () => {
    return app.src('src/content/pages/**/*.{md,hbs,yml}')
        .pipe(app.renderFile())
        .pipe(extname())
        .pipe(app.dest(destDev))
        .pipe(browserSync.stream());
});

gulp.task('serve', ['build', 'watch'], () => {
    browserSync.init({
        server: {
            baseDir: destDev
        }
    });
});

gulp.task('copy:normalize', () => {
    return gulp.src(nodeModules + '/normalize.css/normalize.css')
        .pipe(gulp.dest(destDev + '/css/vendors'));
});

gulp.task('copy:static', () => {
    return gulp.src(src + '/static/**')
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

gulp.task('clean', () => {
    return del([destDev, destProd]);
});

gulp.task('copy', () => {
    return runSequence(
        'copy:normalize',
        'copy:images',
        'copy:fonts'
    );
})

gulp.task('build', () => {
    return runSequence(
        'clean',
        'copy',
        'sass',
        'assemble'
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
    gulp.watch([
        src + '/templates/**/*.hbs',
        src + '/content/**/*.{hbs,md}'
    ], ['assemble']);
});
