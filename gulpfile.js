var gulp = require('gulp'), // Подключаем Gulp
    sass = require('gulp-sass'), //Подключаем Sass пакет,
    uglify = require('gulp-uglify'),
    browserSync = require('browser-sync'),
    imagemin = require('gulp-imagemin'),
    autoprefixer = require('gulp-autoprefixer');// Подключаем библиотеку для автоматического добавления префиксов

gulp.task('sass', function(){ // Создаем таск Sass
    return gulp.src('src/scss/**/*.scss') // Берем источник
        .pipe(sass({outputStyle: 'compressed'})) // Преобразуем Sass в CSS посредством gulp-sass
        .pipe(gulp.dest('build/css')) // Выгружаем результата в папку build/css
        .pipe(browserSync.reload({stream: true})) // Обновляем CSS на странице при изменении
});

gulp.task('browser-sync', function() {
    browserSync.init({
        server: {
            baseDir: ["./", "./src"] 
        }
    });
});
gulp.task('gulp-uglify', function(){
   gulp.src('src/js/*.js')
  .pipe(uglify())
  .pipe(gulp.dest('build/js/'))
});

gulp.task('default', () =>
   gulp.src('src/img/*')
        .pipe(imagemin())
        .pipe(gulp.dest('build/img'))
);

gulp.task('watch', ['browser-sync'], function() {
    gulp.watch('src/scss/**/*.scss',['sass']);
    gulp.watch('src/js/*.js',['gulp-uglify']); 
});