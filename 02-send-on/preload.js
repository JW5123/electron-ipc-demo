const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('bus', {

    // Send frontend messages from here to the main process (backend)
    sendPing: (msg) => ipcRenderer.send('ping', msg),

    // Receives 'pong' message returned by the main process
    onPong: (callback) => {
        const listener = (_event, msg) => callback(msg);
        ipcRenderer.on('pong', listener);
        return () => ipcRenderer.removeListener('pong', listener);
    }
});