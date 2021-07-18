const { series, parallel, src, dest, watch } = require('gulp');

const scss 					= require('gulp-sass')(require('sass'));
const uglify 				= require("gulp-uglify-es").default;
const concat 				= require('gulp-concat');
const autoprefixer 	= require('gulp-autoprefixer');
const imagemin 			= require('gulp-imagemin');
const browserSync 	= require('browser-sync').create();
const del 					= require('del');

// delete dist folder
function cleanDist () {
	return del(['dist', 'index.html']);
}

function html () {
	return src('src/html/**/*.html')
		.pipe(dest('.'))
}

// scss-transform, minify style-files
function styles () {
	return src(['node_modules/normalize.css/normalize.css', 'src/style/style.scss'])
		.pipe(concat('style.min.css'))								// files concatinating
		.pipe(scss({outputStyle: 'compressed'}))			// compressed version
		// .pipe(scss({ outputStyle: "expanded" }))   // readable version
		.pipe(autoprefixer({
			overrideBrowserslist: ['last 10 versions']
		}))
		.pipe(dest('dist/style/'))
		.pipe(browserSync.stream())
}

// minify js-files
function scripts () {
	return src('src/script/**/*.js')
		.pipe(concat('main.min.js'))
		.pipe(uglify())
		.pipe(dest('dist/script/'))
		.pipe(browserSync.stream())
}

// pictures optimization
function images () {
	return src('src/images/**/*')
		.pipe(
			imagemin([
				imagemin.gifsicle({ interlaced: true }),
				imagemin.mozjpeg({ quality: 75, progressive: true }),
				imagemin.optipng({ optimizationLevel: 5 }),
				imagemin.svgo({
					plugins: [
						{ cleanupIDs: false },
						{ removeViewBox: false },
						{ removeDimensions: true }
					],
				}),
			])
		)
		.pipe(dest('dist/images'));
}

function plugins () {
	return src(['src/plugins/**/*.css', 'src/plugins/**/*.js'])
		.pipe(dest('dist/plugins/'))
}

// watch for src-files
function watching () {
	watch('src/html/index.html', html); 									// watch for src index.html
	watch('src/style/**/*.scss', styles);									// watch for all .scss files
	watch('src/script/**/*.js', scripts); 								// watch for all .js files
	watch('index.html').on('change', browserSync.reload)	// watch for dist index.html
}

function fonts () {
	return src('src/fonts/**/*.ttf')
		.pipe(dest('dist/fonts/'))
}

// update browser page
function browsersync () {
	browserSync.init({
		server: {
			baseDir: '.'
		}
	})
}

// default task
exports.default = parallel(html, styles, scripts,	watching,	browsersync);

// build task
exports.build = series (
	cleanDist,
	parallel(images, fonts, plugins),
	parallel(html, styles, scripts)
);
