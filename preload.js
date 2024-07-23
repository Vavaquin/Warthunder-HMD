const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('electronAPI', {
  onToggleOverlay: (callback) => ipcRenderer.on('toggle-overlay', callback)
});