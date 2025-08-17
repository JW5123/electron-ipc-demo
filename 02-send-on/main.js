const { app, BrowserWindow, ipcMain } = require('electron');
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
}

ipcMain.on('ping', (event, msg) => { // Send messages from the front end via IPC
    console.log('[Main] received ping:', msg);
    event.sender.send('pong', `Pong! received: ${msg}`); // Notify it that I have received the message
});

app.whenReady().then(createWindow);
app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit();
    }
});