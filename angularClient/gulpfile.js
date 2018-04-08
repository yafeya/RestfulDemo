var gulp = require('gulp');
var shell = require('gulp-shell');
var sequence = require('run-sequence');
var packager = require("electron-packager");
var package = require("./package.json");
var del = require('del');
var path = require('path');
var packagesFolder = 'build';
var dist = 'dist';

gulp.task('electron-start', () => {
    return gulp.src('/').pipe(shell('electron ./dist/electron.js'));
});
gulp.task('cli-build', () => {
    return gulp.src('/').pipe(shell('ng build --base-href .'));
});
gulp.task('start', () => {
    return sequence('cli-build', 'electron-start');
});
gulp.task('run', () => {
    return sequence('electron-start');
});

gulp.task('electron-start-arg',()=>{
    return gulp.src('/').pipe(shell('electron ./dist/electron.js abc.txt'));
});

gulp.task('pack-linux', (cb) => {
    let opts = {
        name: 'InteractiveIo',
        dir: './',  
        arch: 'x64',
        platform: ['linux'],
        overwrite: true,
        out: './' + packagesFolder,
        asar: true,
        ignore: '^/.vscode',
        appCopyright: "(C) Keysight Technologies 1984-2017",
        appVersion: "18.0.0.0",
        icon: "src/assets/images/App.ico",
        win32metadata: {
            CompanyName: "Keysight Technologies",
            FileDescription: "Interactive Io",
            OriginalFilename: "InteractiveIo.exe",
            ProductName: "Keysight IO Libraries",
            LegalCopyright: "(C) Keysight Technologies 1984-2017"
        }
    }
    return packager(opts, (err, appPath) => {
        if (err) {
            console.log(`Meet error in the package process: ${err}`);
        }
    })
});

gulp.task('pack-win', (cb) => {
    let opts = {
        name: 'InteractiveIo',
        dir: './',  
        arch: 'x64',
        platform: ['win32'],
        overwrite: true,
        out: './' + packagesFolder,
        asar: true,
        ignore: '^/.vscode',
        appCopyright: "(C) Keysight Technologies 1984-2017",
        appVersion: "18.0.0.0",
        icon: "src/assets/images/App.ico",
        win32metadata: {
            CompanyName: "Keysight Technologies",
            FileDescription: "Interactive Io",
            OriginalFilename: "InteractiveIo.exe",
            ProductName: "Keysight IO Libraries",
            LegalCopyright: "(C) Keysight Technologies 1984-2017"
        }
    }
    return packager(opts, (err, appPath) => {
        if (err) {
            console.log(`Meet error in the package process: ${err}`);
        }
    })
});

gulp.task('delete-result', () => {
    return del(['dist/**/*', 'built/**/*', 'dist/', 'built']);
});

gulp.task('electron-build', () => {
    return gulp.src('/').pipe(shell('ng build --prod'));
});

gulp.task('deploy-win', () => {
    return sequence('delete-result', 'cli-build', 'pack-win');
});

gulp.task('deploy-linux', () => {
    return sequence('delete-result', 'cli-build', 'pack-linux');
});