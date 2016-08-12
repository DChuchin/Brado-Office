var
    gulp         = require('gulp'),
    del          = require('del'),
    sourcemaps   = require('gulp-sourcemaps'),
    jade         = require('gulp-jade'),
    postcss      = require('gulp-postcss'),
    cssnext      = require('postcss-cssnext'),
    pxtorem      = require('postcss-pxtorem'),
    postcssExtends = require('postcss-extend'),
    cssimport    = require('postcss-import'),
    sprites      = require('postcss-sprites').default,
    plumber      = require('gulp-plumber'),
    imageMin     = require('gulp-imagemin'),
    pngquant     = require('imagemin-pngquant'),
    stylefmt     = require('stylefmt'),
    concat       = require('gulp-concat'),
    rename       = require('gulp-rename'),
    browserSync  = require('browser-sync').create();

/*------------------------ paths --------------------------*/

var
    paths = {
        jade : {
            location    : 'src/markups/**/*.jade',
            compiled    : 'src/markups/_pages/*.jade',
            destination : 'websitestructure/'
        },

        css : {
            location    : 'src/style/**/*.css',
            compiled    : 'src/style/main.css',
            destination : 'websitestructure/commons/css/'
        },

        img : {
            location    : 'src/img/**/*',
            stylesheet  : 'websitestructure/commons/css/',
            images      : 'src/img/images/*.jpg',
            logos       : 'src/img/logos/*.png',
            sprites     : 'src/img/sprite/*.png',
            destination : 'websitestructure/commons/images/'
        },

        js : {
            location    : 'src/script/*.js',
            destination : 'websitestructure/commons/js/',
            plugins     : 'src/script/vendor/**/*.js',
            pluginsDest : 'websitestructure/commons/js/vendor/'
        },

        browserSync : {
            baseDir    : './websitestructure/',
            watchPaths : ['./websitestructure/*.html', './websitestructure/commons/css/*.css', './websitestructure/commons/js/*.js' ]
        }
    }
/*-------------------------- jade ------------------------------*/

gulp.task('jade', function() {
    gulp.src(paths.jade.compiled)
        .pipe(plumber())
        .pipe(jade({
            pretty: '\t',
        }))
        .pipe(gulp.dest(paths.jade.destination));
});


/*-------------------- browser-sync ----------------------*/

gulp.task('sync', function () {
    browserSync.init({
        server: {
            baseDir: paths.browserSync.baseDir
        }
    });
});

/*---------------------- style -------------------------*/
gulp.task('style', function () {
    var processors = [
            cssimport,
            // sprites({
            //     stylesheetPath : paths.img.stylesheet,
            //     spritePath: paths.img.destination
            // }),
            cssnext({ browsers: ['last 2 versions', '> 1%', 'iOS > 7', 'Firefox ESR', 'Opera 12.1', 'ie >= 7'] }),
            postcssExtends,
            pxtorem({
              rootValue: 14,
              unitPrecision: 5,
              propWhiteList: [
                'font', 'font-size', 'line-height', 'letter-spacing',
                'padding', 'padding-top', 'padding-bottom', 'padding-left', 'padding-right',
                'margin', 'margin-top', 'margin-bottom', 'margin-left', 'margin-right',
                'border-radius', 'width', 'height'
              ],
              selectorBlackList: [/^html$/],
              replace: true,
              mediaQuery: false,
              minPixelValue: 0
            }),
            stylefmt,
    ];
    gulp.src(paths.css.compiled)
        .pipe(plumber())
        .pipe(sourcemaps.init())
        .pipe(postcss(processors))
        .pipe(sourcemaps.write())
        .pipe(gulp.dest(paths.css.destination));
});


/*---------------------- images ---------------------------*/

gulp.task('img-min', function() {
    gulp.src([paths.img.logos, paths.img.images] )
        .pipe(imageMin({
            use:[pngquant({quality: '65-80'})]
        }))
        .pipe(gulp.dest(paths.img.destination));
});

/*-------------------- js --------------------*/

gulp.task('js', function() {
    gulp.src(paths.js.location)
        .pipe(plumber())
        .pipe(concat('main.js'))
        .pipe(gulp.dest(paths.js.destination));
});

/*------------------- plugins -----------------------------*/
gulp.task('plugins', function () {
    gulp.src(paths.js.plugins)
        .pipe(gulp.dest(paths.js.pluginsDest));
});

/*---------------- clean ------------*/

gulp.task('clean', function () {
    del(paths.img.destination);
});


/*------------------ build ------------------------*/

// gulp.tast('build', function() {
//      var processors = [
//             precss(),
//             sprites({
//                 stylesheetPath : paths.img.stylesheet,
//                 spritePath: paths.img.destination
//             }),
//             autoprefixer({browsers : [ '> 1%', 'last 2 versions', 'ie >= 7']}),
//             stylefmt()
//     ];
//     gulp.src(paths.css.compiled)
//         .pipe(plumber())
//         .pipe(postcss(processors))
//         .pipe(gulp.dest(paths.css.destination))
// })

/*----------------------- watch ---------------------------*/

gulp.task('watch', function() {
    gulp.watch(paths.css.location, ['style']);
    gulp.watch(paths.jade.location, ['jade']);
    gulp.watch(paths.js.location, ['js']);
    gulp.watch(paths.img.location, ['clean', 'img-min']);
    gulp.watch(paths.browserSync.watchPaths).on('change', browserSync.reload);
});

gulp.task('default', ['jade', 'style', 'js', 'plugins', 'img-min', 'watch', 'sync']);
