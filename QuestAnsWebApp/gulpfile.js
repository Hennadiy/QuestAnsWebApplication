var gulp = require('gulp');
var connect = require('gulp-connect');
var open = require('gulp-open');
var concat = require('gulp-concat');
//var uglify = require('gulp-uglify');
var less = require('gulp-less');
var browserify = require('browserify');
var source = require('vinyl-source-stream');
var tsProject = require("gulp-typescript").createProject("tsconfig.json");

var config = {
    serverConfig: {
        port: 8787,
        devBaseUrl: 'http://localhost'
    },
    paths: {
        temp: 'temp',
        homepage: 'build/index.html',
        dist: {
            html: 'build',
            js: 'build/js',
            css: 'build/css',
            images: 'build/content'
        },
        src: {
            html: 'views/*.html',
            images: [
                'Content/*.*',
                'Content/*-*.*'
            ],
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
            mainJs: 'temp/reactScripts/routes.jsx',
            ts: [
                'scripts/*.ts',
                'scripts/*/*.ts',
                'reactScripts/*.tsx',
                'reactScripts/*/*.tsx'
            ]
        }
    },
};

gulp.task('js', function () {
    return tsProject.src()
        .pipe(tsProject())
        .on('error', console.error.bind(console))
        .js.pipe(gulp.dest(config.paths.temp))
        .pipe(connect.reload());
});

gulp.task('bundle', ['js'], function () {
    return browserify({
            entries: [config.paths.src.mainJs],
            extensions: [".js", ".jsx"],
            transform: ['reactify'],
            debug: true,
            fullPaths: true,
            cache: {}, // <---- here is important things for optimization 
            packageCache: {} // <----  and here
        })
        .bundle()
        .pipe(source('all.js'))
        .pipe(gulp.dest(config.paths.dist.js));
});

gulp.task('css', function () {

    gulp.src(config.paths.src.copyCssFiles)
        .pipe(gulp.dest(config.paths.dist.css))

    return gulp.src(config.paths.src.css)
        //.pipe(uglify())
        .pipe(concat('all.css'))
        .pipe(less())
        .pipe(gulp.dest(config.paths.dist.css))
        .pipe(connect.reload());
});

gulp.task('images', function () {
    gulp.src(config.paths.src.images)
        .pipe(gulp.dest(config.paths.dist.images));
});

gulp.task('watch', function () {
    gulp.watch(config.paths.src.html, ['html']);
    gulp.watch(config.paths.src.css, ['css']);
    gulp.watch(config.paths.src.ts, ['bundle']);
});

gulp.task('html', ['bundle', 'css', 'images'], function () {
    gulp.src(config.paths.src.html)
        .pipe(gulp.dest(config.paths.dist.html))
        .pipe(connect.reload());
});

gulp.task('connect', ['html'], function () {
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
        .pipe(open({
            uri: config.serverConfig.devBaseUrl + ':' + config.serverConfig.port + '/'
        }));
});

gulp.task('default', ['open', 'watch']);