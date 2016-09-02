var gulp = require('gulp');
var connect = require('gulp-connect');
var open = require('gulp-open');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var less = require('gulp-less');
var browserify = require('browserify');
var reactify = require('reactify');
var source = require('vinyl-source-stream');
var del = require('del');

var config = {
    serverConfig: {
        port: 8787,
        devBaseUrl: 'http://localhost'
    },
    paths: {
        homepage: 'build/index.html',
        dist: {
            html: 'build',
            js: 'build/js',
            css: 'build/css'
        },
        src: {
            html: 'views/*.html',
            copyCssFiles: [
                'node_modules/bootstrap/dist/css/bootstrap.css.map'
            ],
            css: [
                'node_modules/bootstrap/dist/css/bootstrap.css',
                'node_modules/toastr/build/toastr.css',
                'node_modules/react-datepicker/dist/react-datepicker.css',
                'CSS/*.less',
                'CSS/*.css'
            ],
            mainJs: 'reactScripts/routes.jsx',
            js: [
                'scripts/*/*.js',
                'scripts/*.js',

                'reactScripts/*/*.jsx',
                'reactScripts/*.jsx'
            ]
        }
    },
};

gulp.task('js', function () {
    browserify(config.paths.src.mainJs)
        .transform(reactify)
        .bundle()
        .on('error', console.error.bind(console))
        .pipe(source('all.js'))
        .pipe(gulp.dest(config.paths.dist.js))
        .pipe(connect.reload());
});

gulp.task('css', function () {

    var copyFiles = config.paths.src.copyCssFiles;
    for (var i = 0; i < copyFiles.length; i++) {
        gulp.src(copyFiles[i])
            .pipe(gulp.dest(config.paths.dist.css))
    }

    return gulp.src(config.paths.src.css)
        //.pipe(uglify())
        .pipe(concat('all.css'))
        .pipe(less())
        .pipe(gulp.dest(config.paths.dist.css))
        .pipe(connect.reload());
});

gulp.task('watch', function () {
    gulp.watch(config.paths.src.html, ['html'])
    gulp.watch(config.paths.src.css, ['css'])
    gulp.watch(config.paths.src.js, ['js'])
});

gulp.task('connect', function () {
    connect.server({
        root: ['build'],
        port: config.serverConfig.port,
        base: config.serverConfig.devBaseUrl,
        livereload: true,
        fallback: 'build/index.html'
    });
});

gulp.task('open', ['connect'], function () {
    gulp.src(config.paths.homepage)
        .pipe(open({ uri: config.serverConfig.devBaseUrl + ':' + config.serverConfig.port + '/' }));
});

gulp.task('html', ['js', 'css'], function () {
    gulp.src(config.paths.src.html)
        .pipe(gulp.dest(config.paths.dist.html))
        .pipe(connect.reload());
});

gulp.task('default', ['html', 'open', 'watch']);

gulp.run();