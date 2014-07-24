// Node modules
var fs = require('fs'), vm = require('vm'), chalk = require('chalk'), es = require('event-stream'), cs = require('combined-stream');

// Gulp and plugins
var gulp = require('gulp'), rjs = require('gulp-requirejs-bundler'), concat = require('gulp-concat'), clean = require('gulp-clean'),
    replace = require('gulp-replace'), uglify = require('gulp-uglify'), htmlreplace = require('gulp-html-replace'),
    templateCache = require('gulp-angular-templatecache'), minifyCSS = require('gulp-minify-css'), minifyHTML = require('gulp-minify-html');

// Package up some of the partial pages into a single initial download
var packagedPartials = [ "home-page", "investment-filter", "nav-bar", "*-component" ];
gulp.task('package-partials', function () {
    var partials = packagedPartials.map(function (p) { return "./app/partials/" + p + ".html"; });

    return gulp.src(partials)
        .pipe(minifyHTML({ empty: true, quotes: true }))
        .pipe(templateCache('templates.js', { root: "partials/", module: "testSPA" }))
        .pipe(gulp.dest('./tmp/'));
});

gulp.task('js', ['package-partials'], function () {
    var jsStream = cs.create();

    // Libraries are order dependent
    var libs = [
            "angular/angular.js",
            "angular-route/angular-route.js",
            "jquery/dist/jquery.js",
            "bootstrap/dist/js/bootstrap.min.js",
            "globalize/lib/globalize.js",
            "globalize/lib/cultures/globalize.culture.en-GB.js",
            "d3/d3.min.js",
            "jquery-mockjax/jquery.mockjax.js"
    ];
    for (var i = 0; i < libs.length; i++) {
        jsStream.append(gulp.src("app/bower_components/" + libs[i]));
    }

    // Add the application javascript and include the packaged templates
    jsStream.append(gulp.src(['app/js/*.js', './tmp/templates.js', 'app/charts/*.js', 'app/mock_server/*.js']));

    return jsStream
        .pipe(concat('scripts.js'))
        .pipe(uglify({ preserveComments: 'some' }))
        .pipe(gulp.dest('./dist/'));
});

// Concatenates CSS files, rewrites relative paths to Bootstrap fonts, copies Bootstrap fonts
gulp.task('css', function () {
    var bowerCss = gulp.src('app/bower_components/bootstrap/dist/css/bootstrap.min.css')
            .pipe(replace(/url\((')?\.\.\/fonts\//g, 'url($1fonts/')),
        appCss = gulp.src('app/css/*.css').pipe(minifyCSS()),
        combinedStream = cs.create(),
        fontFiles = gulp.src('./app/bower_components/bootstrap/fonts/*', { base: './app/bower_components/bootstrap/' });

    combinedStream.append(bowerCss);
    combinedStream.append(appCss);
    combinedCss = combinedStream.pipe(concat('css.css'));

    return es.concat(combinedCss, fontFiles)
        .pipe(gulp.dest('./dist/'));
});

// Copies index.html, replacing <script> and <link> tags to reference production URLs
gulp.task('html', function () {
    return gulp.src('./app/index.html')
        .pipe(htmlreplace({
            'css': 'css.css',
            'js': 'scripts.js'
        }))
        .pipe(minifyHTML({ comments: true, empty: true, quotes: true }))
        .pipe(gulp.dest('./dist/'));
});

// Copies the partial pages
gulp.task('partials', function () {
    var partials = packagedPartials.map(function (p) { return "!./app/partials/" + p + ".html"; });
    partials.splice(0, 0, './app/partials/*.html');

    return gulp.src(partials)
        .pipe(minifyHTML({ empty: true, quotes: true }))
        .pipe(gulp.dest('./dist/partials/'));
});

// Removes all files from ./dist/
gulp.task('clean', function () {
    return gulp.src('./dist/**/*', { read: false })
        .pipe(clean());
});

gulp.task('default', ['html', 'partials', 'js', 'css'], function (callback) {
    callback();
    console.log('\nPlaced optimized files in ' + chalk.magenta('dist/\n'));
});
