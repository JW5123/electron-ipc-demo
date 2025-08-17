const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('bus', {
    onPushMessage: (callback) => {
        const listener = (_event, msg) => callback(msg);
        ipcRenderer.on('push-message', listener);
        return () => ipcRenderer.removeListener('push-message', listener);
    }
});