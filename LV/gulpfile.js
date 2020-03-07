"use strict";

var gulp = require("gulp");
var sass = require("gulp-sass");

sass.compiler = require("node-sass");

gulp.task("sass", function () {
    return gulp
        .src("./scss/**/*.scss")
        .pipe(sass().on("error", sass.logError))
        .pipe(gulp.dest("./css"));
});

gulp.task("sass:watch", function () {
    gulp.watch("./scss/**/*.scss", ["sass"]);
});



//获取模块
var uglify = require('gulp-uglify');


gulp.task('uglify', function () { //定义文任务

    gulp.src('./css/*.css') //获取lib下的js文件
        .pipe(uglify()) //压缩
        .pipe(gulp.dest('dist/css')) //放入到dist目录下面

});




const babel = require("gulp-babel");
gulp.task("babel", () =>
    gulp
    .src("./js/*.js")
    .pipe(
        babel({
            presets: ["@babel/env"]
        })
    )
    .pipe(uglify())
    .pipe(gulp.dest("dist/js"))
);


//gulp-htmlmin  压缩html
var htmlmin = require('gulp-htmlmin');
gulp.task('htmlmin', function () {
    return gulp.src('./html/*.html')
        .pipe(htmlmin({
            collapseWhitespace: true
        }))
        .pipe(gulp.dest('dist/html'));
})

//压缩图片
let imagemin = require("gulp-imagemin");
gulp.task("imagemin", function () {
    gulp
        .src("./images/*")
        .pipe(
            imagemin({
                interlaced: true,
                progressive: true,
                optimizationLevel: 1,
                svgoPlugins: [{
                    removeViewBox: true
                }]
            })
        )
        .pipe(gulp.dest("dist/images"));
});