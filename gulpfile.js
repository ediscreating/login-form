const gulp = require('gulp');
const sass = require('gulp-sass');
const svgstore = require('gulp-svgstore');
const babel = require("gulp-babel");
const browserSync = require('browser-sync').create();
const inject = require('gulp-inject');
const useref = require('gulp-useref');
const gulpif = require('gulp-if');

gulp.task('sass', () => {
  return gulp.src('src/sass/**/*.scss')
             .pipe(sass().on('error', sass.logError))
             .pipe(gulp.dest('dist/css'));
});

gulp.task('html', () => {
  const svgs = gulp
               .src('src/svg/**/*.svg')
               .pipe(svgstore({ inlineSvg: true }));

  function fileContents(filePath, file) {
    return file.contents.toString();
  }

  return gulp
        .src('src/index.html')
        .pipe(useref())
        .pipe(gulpif('*.js', babel()))
        .pipe(inject(svgs, { transform: fileContents }))
        .pipe(gulp.dest('dist'));
});

gulp.task('default', ['sass', 'html'], () => {
  browserSync.init({
    server: "./dist"
  });

  gulp.watch('src/**/*.scss', ['sass']).on('change', browserSync.reload);
  gulp.watch('src/**/*.+(svg|html|js)', ['html']).on('change', browserSync.reload);
});
