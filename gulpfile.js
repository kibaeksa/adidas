// for gulp
var gulp = require('gulp');
var connect = require('gulp-connect');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var rename = require('gulp-rename');
var minifyCshtml  = require('gulp-minify-cshtml');
var sass = require('gulp-sass');
var gulpif = require('gulp-if');

// for parameter from CLI
var args = require('yargs').argv;

// General variable
var rootArray = ['./web','./mobile'];
var adiProjectCtgr = args.ctgr == 'adidas' ? 'adidas' : 'reebok';
var staticPath = '';


// Task for compress code in js file
gulp.task('compressjs',function(){;;
    gulp.src('./app/js/*.js')
        .pipe(uglify())
        .pipe(rename({ suffix : '.min'}))
        .pipe(gulp.dest('./app/js/dist/'));
});


// Task for compress code in prx.js 
gulp.task('compressjsAdidas',function(){;
    gulp.src(rootArray[0] + args.jsInput)
        .pipe(uglify())
        .pipe(rename({ suffix : '.min'}))
        .pipe(gulp.dest(rootArray[0] + args.jsOutput));
});

gulp.task('defaultServer',function(){
    connect.server({
        port : 3000,
        root : './app/',
        livereload : true
    });
});

gulp.task('adidasProjectWeb',function(){
    staticPath = rootArray[0];
    connect.server({
        root : rootArray[0],
        port : 2000,
        livereload : true
    });
});

gulp.task('adidasProjectMobile',function(){
    staticPath = rootArray[1];
    connect.server({
        root : rootArray[1],
        port : 2001,
        livereload : true
    });
});

gulp.task('sass',function(){
    // return gulp.src(staticPath + args.sassInput)
    return gulp.src(staticPath + '/css/reebok/scss/*.scss')
    .pipe(sass({outputStyle : 'compressed'}).on('error', sass.logError))
    .pipe(gulp.dest(staticPath + args.sassOutput));
});

gulp.task('minify',function(){
    gulp.src(staticPath + '/html/adidas/event/customise/index.html')
    .pipe(uglify())
    .pipe(rename({ suffix : '.min'}))
    .pipe(gulp.dest(staticPath + '/html/adidas/event/customise/'))
});

gulp.task('watch',function(){
    gulp.watch(rootArray[0] + '/js/prx.js',['compressjsAdidas']);
    // gulp.watch(rootArray[0] + '/html/adidas/event/customise/index.html',['minify']);
});

/*
    Watch
 */
gulp.task('adidasProjectWeb-watch',function(){
    if(args.jsInput !== undefined){
        gulp.watch(staticPath + args.jsInput,['compressjsAdidas']);    
    }

    console.log('adidasProjectWeb-watch');
    // if(args.sassInput !== undefined){
        // console.log(11);
        gulp.watch(staticPath + '/css/reebok/scss/*.scss',['sass']);    
    // }

});

gulp.task('adidasProjectMobile-watch',function(){
   if(args.jsInput !== undefined){
        gulp.watch(staticPath + args.jsInput,['compressjsAdidas']);    
    }

    // if(args.sassInput !== undefined){
        // console.log(args.sassInput);
        gulp.watch(staticPath + '/css/reebok/scss/*.scss',['sass']);    
    // }
});

gulp.task('adidasProject-watch',['adidasProjectWeb-watch','adidasProjectMobile-watch']);

/*
    Run
 */
// Run server for all server
gulp.task('default',['defaultServer','adidasProjectWeb','adidasProjectMobile','watch']);
// Run server for Adidas Web / Mobile with watch task
gulp.task('runAdidas',['adidasProjectWeb',,'adidasProject-watch']);
// Run server only for  Mobile
gulp.task('mobile',['adidasProjectMobile','adidasProjectMobile-watch']);
// Run server only for Web 
gulp.task('web',['adidasProjectWeb','adidasProjectWeb-watch']);
