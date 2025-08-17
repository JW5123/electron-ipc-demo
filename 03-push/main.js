const { app, BrowserWindow } = require('electron');
const path = require('path');

function createWindow() {
    const win = new BrowserWindow({
        width: 800,
        height: 500,
        webPreferences: {
            preload: path.join(__dirname, 'preload.js'),
            contextIsolation: true,
            enableRemoteModule: false
        }
    });

    win.loadFile('index.html');
    win.webContents.openDevTools();

    let count = 1;
    const inervalID = setInterval(() => {
        if(win && !win.isDestroyed()) {
            const msg = `Hello World! ${count++}`;
            console.log('[Main] push message:', msg);
            win.webContents.send('push-message', msg);
            
            if(count > 5) {
                clearInterval(inervalID);
                console.log('[Main] Stopped pushing messages');
                win.webContents.send('push-message', 'Push stopped');
            }
        }
    }, 2000);
}

app.whenReady().then(createWindow);
app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit();
    }
});