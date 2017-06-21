var gulp = require('gulp');
var postcss = require('gulp-postcss');
var rucksack = require('rucksack-css')
var cssnext = require('postcss-cssnext');
// var autoprefixer = require('autoprefixer');
var mixins = require('postcss-mixins');
var lost = require('lost');
var atImport = require('postcss-import');
var cssnested = require('postcss-nested');
var csswring = require('csswring');
var mqpacker = require('css-mqpacker');
var browserSync = require('browser-sync').create();

// 'autoprefixer' coloca las propiedades de manera que sean compatibles con la mayoria de navegadores configurados
// 'postcss-nested' permite tener una sintaxis parecida a precompiladores sass
// 'cssnext' pack de plugins de postcss

// SERVIDOR DE DESARROLLO
gulp.task('serve', function () {
  browserSync.init({
    server: {
      baseDir: './dist'
    }
  })
})

// TASK PARA PROCESAR CSS

gulp.task('css', function(){

  var processors = [
    atImport(),
    mixins(),
    cssnested,
    lost(),
     rucksack(),
    cssnext({
      browsers: ['> 5%', 'ie 8']
    }),
    mqpacker(),
    csswring()
  ];

  return gulp.src('./src/invie.css')
    .pipe( postcss(processors) )
    // .pipe( rucksack() )
    .pipe( gulp.dest('./dist/css') )
    .pipe( browserSync.stream() )

})

// TASK PARA VIGILAR CAMBIOS

gulp.task('watch', function(){
  gulp.watch('./src/*.css', ['css'])
  gulp.watch('./dist/*.html')
  .on('change', browserSync.reload )
})

gulp.task('default', ['watch', 'serve'])
