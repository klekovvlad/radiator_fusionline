import dartSass from 'sass';
import gulpSass from 'gulp-sass';
import rename from 'gulp-rename';

import GulpCleanCss from 'gulp-clean-css';
import webpcss from 'gulp-webpcss';
import autoPrefixer from 'gulp-autoprefixer';
import gulpGroupCssMediaQueries from 'gulp-group-css-media-queries';

const sass = gulpSass(dartSass);

export const scss = () => {
    return app.gulp.src(app.path.src.scss, { soursemaps: app.isDev }) 
    .pipe(app.plugins.plumber(
        app.plugins.notify.onError({
            title: 'SCSS',
            message: 'Error: <%= error.message %>'
        })
    ))
    .pipe(app.plugins.replace(/@img\//g, '../img/'))
    .pipe(sass({
        outputStyle: 'expanded'
    }))
    .pipe(
        app.plugins.if(
            app.isBuild,
            gulpGroupCssMediaQueries()
        )
    )
    // .pipe(
    //     app.plugins.if(
    //         app.isBuild,
    //         webpcss({
    //             webpClass: ".webp",
    //             noWebpClass: ".no-webp"
    //         })
    //     ))
    .pipe(
        app.plugins.if(
            app.isBuild,
            autoPrefixer({
                grid: true,
                overrideBrowserslint: ['last 3 versions'],
                cascade: true
            }))
       )
    .pipe(app.gulp.dest(app.path.build.css))
    .pipe(
        app.plugins.if(
            app.isBuild,
            GulpCleanCss())
        )
    .pipe(rename({
        extname: '.min.css'
    }))
    .pipe(app.gulp.dest(app.path.build.css))
    .pipe(app.plugins.browserSync.stream());
}