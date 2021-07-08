const { series, parallel, src, dest, watch } = require('gulp');
const scss = require('gulp-sass')(require('sass'));
const uglify = require("gulp-uglify-es").default;
const concat = require('gulp-concat');
const del = require('del');

function clean() {
	return del("dist")
}

function watching () {
	watch(['src/style/**/*.scss'], styles);					// Watch for all .scss files
	watch(["src/script/**/*.js"], scripts); 			// Watch for all .js files
}

function styles () {
	return src('src/style/style.scss')
		.pipe(scss({outputStyle: 'compressed'}))			// compressed version
		// .pipe(scss({ outputStyle: "expanded" }))   // readable version
		.pipe(concat('style.min.css'))								// files concatinating
		.pipe(dest('dist/style/'))
}

function scripts() {
  return src("src/script/main.js")
		.pipe(uglify())
    .pipe(concat("main.min.js"))
    .pipe(dest("dist/script/"))
}

exports.default = series(
	clean,
	parallel(
		watching,
		styles,
		scripts
	)
);
