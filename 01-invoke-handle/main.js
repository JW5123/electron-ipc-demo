const { app, BrowserWindow, ipcMain } = require('electron');
const path = require('path');
const os = require('os');

function createWindow() {
    const win = new BrowserWindow({
        width: 800,
        height: 500,
        webPreferences: {
            preload: path.join(__dirname, 'preload.js'),
            contextIsolation: true,
            nodeIntegration: false,
        }
    });

    win.loadFile('index.html');
    win.webContents.openDevTools();
}

ipcMain.handle('app:get-info', () => {
    console.log('[Main] received get-info request');
    return {
        appName: app.getName(),
        appVersion: app.getVersion(),
        platform: os.platform(),
        arch: os.arch(),
        node: process.versions.node,
        electron: process.versions.electron,
        now: new Date().toISOString()
    };
});

ipcMain.handle('app:echo', (_event, msg) => {
    console.log('[Main] received echo request:', msg);
    return { 
        received: msg, 
        at: new Date().toISOString() 
    };
});

app.whenReady().then(createWindow);
app.on('window-all-closed', () => { 
    if (process.platform !== 'darwin') 
        app.quit(); 
});