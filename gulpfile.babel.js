'use strict';

import gulp from 'gulp';
import requireDir from 'require-dir';
import runSequence from 'run-sequence';

requireDir('./gulp/tasks', { recurse: true });

gulp.task('build', ['clean'], () => {
    return runSequence(
        'sass',
        'copy',
        'assemble'
    );
});
