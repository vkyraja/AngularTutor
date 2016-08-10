var bowerFiles = require('main-bower-files'),
    bowerFiles = bowerFiles(),
    gulp = require('gulp'),
    file = require('gulp-file'),
    inject = require('gulp-inject'),
    concat = require('gulp-concat'),
    uglify = require('gulp-uglifyjs'),
    browserSync = require('browser-sync').create(),
    //watch = require('gulp-watch'),
    stylus = require('gulp-stylus');


var bowerScriptFiles = [],
    bowerStyleFiles = [];
    for(var i = 0; i < bowerFiles.length; i++) {
      if(bowerFiles[i].lastIndexOf('.css') > -1)
        bowerStyleFiles.push(bowerFiles[i]);
      else
        bowerScriptFiles.push(bowerFiles[i]);
    }

    gulp.task('concatVendorScripts', function(){
        return gulp.src(bowerScriptFiles)
          .pipe(concat('angular.js'))
          .pipe(uglify())
          .pipe(gulp.dest('dist'));
    });

    gulp.task('concatAppScripts', function(){
        return gulp.src(['./app/js/app.js', './app/js/controllers/*.js', './app/js/directives/*.js'])
          .pipe(concat('app.js'))
          .pipe(gulp.dest('dist'));
    });

    gulp.task('concatStyles', function(){
        return gulp.src(bowerStyleFiles)
          .pipe(concat('angular.css'))
          .pipe(gulp.dest('dist'));
    });

    gulp.task('concatAppStyles', function(){
        return gulp.src(['./app/css/*.css'])
          .pipe(concat('app.css'))
          .pipe(gulp.dest('dist'));
    });

    gulp.task('concatViews', function(){
        return gulp.src(['./app/views/*.html'])
          .pipe(gulp.dest('dist/views'))
    });

    gulp.task('build', ['concatVendorScripts', 'concatAppScripts', 'concatStyles', 'concatAppStyles', 'concatViews', 'default'], function() {
        gulp.src('./app/index.html')
        .pipe(inject(gulp.src(['dist/*.js'], {read: false}), {ignorePath: 'dist'}))
        .pipe(inject(gulp.src(['dist/*.css'], {read: false}), {ignorePath: 'dist'}))
        .pipe(gulp.dest('dist'));

        browserSync.reload();
    });

    gulp.task('serve', ['build'], function(){
        browserSync.init({
            server: "./dist"
        });
        /*gulp.watch([
          'app/js/*.js',
          'app/css/*.css',
          'app/*.html'
        ]).on('change', browserSync.reload);*/
    });

    gulp.watch([
      'app/js/*.js',
      'app/js/*/*.js',
      'app/css/*.css',
      'app/*.html'
    ], ['build']);

    gulp.task('default', function(){});
