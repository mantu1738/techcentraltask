const { src, dest, watch, series } = require('gulp');
const sass = require('gulp-sass')(require('sass'));
const rename = require('gulp-rename');
const browserSync = require('browser-sync').create();

// Compile SASS to CSS
function compileSass() {
    return src('src/assets/scss/main.scss')
        .pipe(sass({ outputStyle: 'compressed' }).on('error', sass.logError))
        .pipe(rename('styles.min.css'))
        .pipe(dest('src/css'))
        .pipe(browserSync.stream());
}

// Watch for changes and reload browser
function watchFiles() {
    browserSync.init({
        server: {
            baseDir: './src',
        },
    });

    watch('src/assets/scss/**/*.scss', compileSass);
    watch('src/*.html').on('change', browserSync.reload);
}

exports.default = series(compileSass, watchFiles);
