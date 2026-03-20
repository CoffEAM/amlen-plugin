var gulp         = require( 'gulp' );

// CSS related plugins
var sass = require('gulp-sass')(require('sass'));
var postcss      = require( 'gulp-postcss' );
var autoprefixer = require( 'autoprefixer' );
var minifycss    = require( 'gulp-uglifycss' );

// JS related plugins
var concat       = require( 'gulp-concat' );
var uglify       = require( 'gulp-uglify' );
var babelify     = require( 'babelify' );
var browserify   = require( 'browserify' );
var source       = require( 'vinyl-source-stream' );
var buffer       = require( 'vinyl-buffer' );
var stripDebug   = require( 'gulp-strip-debug' ).default;

// Utility plugins
var rename       = require( 'gulp-rename' );
var sourcemaps   = require( 'gulp-sourcemaps' );
var notify       = require( 'gulp-notify' );
var plumber      = require( 'gulp-plumber' );
var options      = require( 'gulp-options' );
var gulpif       = require( 'gulp-if' );

// Browers related plugins
var browserSync  = require( 'browser-sync' ).create();
var reload       = browserSync.reload;

// Project related variables
var projectURL = 'http://wppractise.local';

var styleSRC     = './src/scss/mystyle.scss';
var styleURL     = './assets/';
var mapURL       = './';

var jsSRC        = './src/js/myscript.js';
var jsURL        = './assets/';

var styleWatch   = './src/scss/**/*.scss';
var jsWatch      = './src/js/**/*.js';
var phpWatch     = './**/*.php';

// Tasks
gulp.task( 'browser-sync', function() {
	browserSync.init({
		proxy: projectURL,
		injectChanges: true,
		open: false
	});
});

gulp.task( 'styles', function() {
	return gulp.src( styleSRC )
		.pipe( sourcemaps.init() )
		.pipe( sass({
			errLogToConsole: true,
			outputStyle: 'compressed'
		}) )
		.on( 'error', console.error.bind( console ) )
		// ИЗМЕНЕНИЯ ЗДЕСЬ:
		.pipe( postcss([ autoprefixer({
			overrideBrowserslist: ['last 2 versions', '> 5%', 'Firefox ESR'],
			cascade: false
		}) ]) )
		.pipe( sourcemaps.write( mapURL ) )
		.pipe( gulp.dest( styleURL ) )
		.pipe( browserSync.stream() );
});

gulp.task( 'js', function() {
	return browserify({
		entries: [jsSRC]
	})
	.transform(babelify, { presets: ['@babel/preset-env'] })
	.bundle()
	.pipe( source( 'myscript.min.js' ) )
	.pipe( buffer() )
	.pipe( gulpif( options.has( 'production' ), stripDebug() ) )
	.pipe( sourcemaps.init({ loadMaps: true }) )
	.pipe( uglify() )
	.pipe( sourcemaps.write( '.' ) )
	.pipe( gulp.dest( jsURL ) )
	.pipe( browserSync.stream() );
 });

function triggerPlumber( src, url ) {
	return gulp.src( src )
	.pipe( plumber() )
	.pipe( gulp.dest( url ) );
}

gulp.task('default', gulp.series('styles', 'js', function(done) {
	gulp.src(jsURL + 'myscript.min.js')
		.pipe(notify({ message: 'Assets Compiled!' }));
	done();
}));

gulp.task('watch', gulp.series('default', 'browser-sync', function() {
	gulp.watch(phpWatch, reload);
	gulp.watch(styleWatch, gulp.series('styles'));
	gulp.watch(jsWatch, gulp.series('js', reload));

	gulp.src(jsURL + 'myscript.min.js')
		.pipe(notify({ message: 'Gulp is Watching, Happy Coding!' }));
}));
