var gulp = require('gulp'),
    concat = require('gulp-concat'),
    rename = require('gulp-rename'),
    uglify = require('gulp-uglify'),
    //imagemin = require('gulp-imagemin'),
    jsHint = require('gulp-jshint'),
    prettify = require('gulp-jsbeautifier');

var del = require('del');

var src = {
    js: './src'
};

var dest = './dist';

gulp.task('jshint', function() {
    return gulp.src(src.js + "/**/*.js")
        .pipe(jsHint())
        .pipe(jsHint.reporter('default'));
});

gulp.task('verify-js', function() {
    return gulp.src(src.js + "/**/*.js")
        .pipe(prettify({
            config: '.jsbeautifyrc',
            mode: 'VERIFY_ONLY'
        }));
});

gulp.task('format-js', function() {
    return gulp.src(src.js + "/**/*.js")
        .pipe(prettify({
            config: '.jsbeautifyrc',
            mode: 'VERIFY_AND_WRITE'
        }))
        .pipe(gulp.dest(src.js));
});

gulp.task('js', function() {
    return gulp.src(src.js + "/**/*.js")
    .pipe(concat("au-template.js"))
        .pipe(uglify({
            mangle: true
        }))
        .pipe(gulp.dest(dest));
});

//执行压缩前，先删除文件夹里的内容
gulp.task('clear', function() {
    del([dest + '/*'], function(err, deletedFiles) {});
});

gulp.task('default', ['clear', 'format-js', 'js']);