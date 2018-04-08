const electron = require('electron');
const ChildProcess = require('child_process');
const app = electron.app;
const BrowserWindow = electron.BrowserWindow;
const glob = require('glob')
const path = require('path')
const os = require('os');
const ipc = electron.ipcMain;
const Menu = electron.Menu;
//const localshortcut = require('electron-localshortcut');
const settings = require('electron-settings');

var mainWindow;
var debug = false;
var quitApp = true;

if (process.mas || os.platform() == "darwin")
    app.setName('Keysight Connection Expert');

function initialize() {

    function createWindow() {

        console.time('init')

        console.info(`DirName = ${__dirname}`);

        const winSetting = settings.get('main-window');

        mainWindow = new BrowserWindow({
            width: 1280,
            height: 800,
            minWidth: 860,
            name: 'mainWindow',
            backgroundColor: '#eceff4',
            icon: `${__dirname}/dist/favicon.ico`,
            title: 'Keysight IO Monitor',
            webPreferences: { nodeIntegration: false }  // this is a magic switch t avoid jQuery loading issue. 
        });

        if (winSetting) {
            // console.log('set windows bounds');
            // console.log(winSetting);
            mainWindow.setBounds(winSetting);
        }

        let url = `file://${__dirname}/dist/index.html`;
        console.info(`Going to load index.html from ${url}`);
        mainWindow.loadURL(url, { userAgent: 'Keysight IO Monitor/1.0' })

        let contents = mainWindow.webContents;

        mainWindow.on('close', (e) => {
            var bounds = mainWindow.getBounds();
            settings.set('main-window', bounds);

            if (quitApp) {

                mainWindow = null;
            } else {
                e.preventDefault();
                contents.send('mw:command', 'Exit');
                mainWindow.hide();
            }
        });

        mainWindow.once('ready-to-show', () => {
            // console.timeEnd('init')
            // localshortcut.unregisterAll(mainWindow);
        });

        if (debug) {
            contents.openDevTools();
        }
        // hide main menu
        Menu.setApplicationMenu(null);
    }

    app.on('ready', createWindow);

    app.on('window-all-closed', function () {
        if (process.platform != 'darwin') {
            app.quit();
        }
    });

    app.on('activate', function () {
        if (mainWindow == null) {
            createWindow();
        }
    });

    app.on('before-quit', function (e) {
        quitApp = true;
    });
}


// Handle Squirrel on Windows startup events
switch (process.argv[1]) {
    case '--squirrel-install':
        app.quit()
        break
    case '--squirrel-uninstall':
        app.quit()
        break
    case '--squirrel-obsolete':
    case '--squirrel-updated':
        app.quit()
        break
    default:
        initialize()
}