'use strict';

var gulp = require('gulp');
var gutil = require('gulp-util');
var rename = require('gulp-rename');
var browserify = require('browserify');
var watchify = require('watchify');
var babelify = require('babelify');
var source = require('vinyl-source-stream');
var buffer = require('vinyl-buffer');
var es = require('event-stream');
var sourcemaps = require('gulp-sourcemaps');

var requireFiles = './node_modules/react/react.js';

function compileScripts(reload) {
    gutil.log('Starting browserify');
    var browserifyer = browserify({
    	cache: {},
      packageCache: {},
      fullPaths: true,
    	entries: ['./src/js/main.js'],
    	extensions: ['.js'],
    	debug:reload
    }).transform(babelify, {presets: ["es2015", "react"]});

    var bundler = watchify(browserifyer);

    function rebundle() {
    	bundler.bundle()
        .on('error', function(err) {
          console.error(err);
          this.emit('end');
        })
        .pipe(source('./src/js/main.js'))
        .pipe(buffer())
        .pipe(sourcemaps.init({
          loadMaps: true
        })) // loads map from browserify file
        .pipe(sourcemaps.write()) // writes .map file
        .pipe(rename({
          dirname:'./',
          basename:'app',
          extname: '.min.js'
        }))
        .pipe(gulp.dest('./web/assets/scripts'));
    }

    if (reload) {
    	bundler.on('update', function() {
    		console.log('-> bundling...');
    		rebundle();
            console.log('-> ...done');
    	});
    }
    rebundle();
}

gulp.task('dev', function () {
	compileScripts(true);
});
