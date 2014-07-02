/* jslint node: true */
"use strict";

var fs = require('fs');

var gulp = require('gulp'),
    autoprefixer = require('gulp-autoprefixer'),
    compass = require('gulp-compass'),
    handlebars = require('gulp-compile-handlebars'),
    modernizr = require('gulp-modernizr'),
    rename = require('gulp-rename'),
    rev = require('gulp-rev'),
    stripJsonComments = require('strip-json-comments'),
    list = require('gulp-task-listing'),
    uglify = require('gulp-uglify');

var env;

// Paths
var path = {
  src: {
    bower: "app/bower_components",
    fonts: "app/fonts",
    images: "app/img",
    js: "app/js",
    sass: "app/sass"
  },
  dest: {
    css: "dist/css",
    fonts: "dist/fonts",
    images: "dist/img",
    js: "dist/js"
  }
};

// Modernizr Customizr Options
var customizrFile = __dirname + '/' + path.src.js + '/customizr.json';

// // create a handlebars helper to look up
// // fingerprinted asset by non-fingerprinted name
// var handlebarOpts = {
//     helpers: {
//         assetPath: function (path, context){
//             return ['/assets', context.data.root[path]].join('/');
//         }
//     }
// };

// Compile Modernizr
gulp.task( 'compile-modernizr', function() {

  var customizrOptions = null;

  if ( fs.existsSync( customizrFile ) ) {
    customizrOptions = JSON.parse( stripJsonComments(
      fs.readFileSync( customizrFile, 'utf8', function (err, data) {
        if ( err ) {
          console.log('Error: ' + err);
          return;
        }
        return JSON.parse(data);
      })
    ));
  }

  return gulp.src( [ path.src.js + '/**/*.js', path.src.sass + '/**/*.scss', ] )
    .pipe( modernizr( customizrOptions ) )
    .pipe( uglify( { preserveComments:'some' } ) )
    .pipe( gulp.dest( path.dest.js ) );
});

// Compile html
gulp.task( 'compile-html', function () {
  // read in our manifest file
  var manifest = require( 'path/to/rev-manifest' );

  // read in our handlebars template, compile it using
  // our manifest, and output it to index.html
  return gulp.src('index.hbs')
    .pipe( handlebars(manifest, handlebarOpts) )
    .pipe( rename('index.html') )
    .pipe( gulp.dest('public') );
});

// Compile Sass
gulp.task( 'compile-sass', function() {
  return gulp.src( path.src.sass + '/*.scss' )
    .pipe( compass({
      config_file: 'config.rb',
      sass: path.src.sass,
      css: path.dest.css
    }))
    .on( 'error', function(error) {
      console.log(error.message);
    })
    .pipe( prefix("last 1 version", "> 1%", "ie 8") )
    .pipe( gulp.dest(path.dest.css) );
});

// gulp.task('default', function () {
//     return gulp.src('src/*.css')
//         .pipe(rev())
//         .pipe(gulp.dest('dist'));
// });

// gulp.task('default', function () {
//     // by default, gulp would pick `assets/css` as the base,
//     // so we need to set it explicitly:
//     return gulp.src(['assets/css/*.css', 'assets/js/*.js'], {base: 'assets'})
//         .pipe(gulp.dest('build/assets'))  // copy original assets to build dir
//         .pipe(rev())
//         .pipe(gulp.dest('build/assets'))  // write rev'd assets to build dir
//         .pipe(rev.manifest())
//         .pipe(gulp.dest('build/assets')); // write manifest to build dir
// });


// var gulp   = require('gulp');
// var concat = require('gulp-concat');

// // Package information, including version
// var pkg = require('./package.json');

// var info = {};

// info.src = {
//     js : 'src/js/**/*.js',
// };

// info.dest = {
//     js : 'build',
// };

// // Build JS files
// gulp.task('js', function () {
//     return gulp.src(info.src.js)
//         .pipe(concat('all-' + pkg.version + '.js'))
//         .pipe(gulp.dest(info.dest.js));
// });

// Gulp help output
gulp.task( 'default', list );
