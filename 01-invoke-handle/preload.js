const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('api', {
    getAppInfo: () => ipcRenderer.invoke('app:get-info'),
    echo: (msg) => ipcRenderer.invoke('app:echo', msg),
});
