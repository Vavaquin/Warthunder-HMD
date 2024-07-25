const { app, BrowserWindow, globalShortcut, screen } = require('electron');
const path = require('path');

let mainWindow;
let isOverlay = false;

function createWindow() {
  const { width, height } = screen.getPrimaryDisplay().workAreaSize; // Obtenha as dimensões da tela

  mainWindow = new BrowserWindow({
    width: width,
    height: height,
    x: 0,
    y: 0,
    frame: false,
    transparent: true,
    alwaysOnTop: true,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js')
    }
  });

  mainWindow.loadFile('index.html');

  mainWindow.on('closed', () => {
    mainWindow = null;
  });

  isOverlay = !isOverlay;
  mainWindow.setIgnoreMouseEvents(isOverlay);
  mainWindow.setAlwaysOnTop(isOverlay);
  mainWindow.setResizable(!isOverlay);
  mainWindow.setMovable(!isOverlay);
  // mainWindow.setFocusable(!isOverlay);
  mainWindow.webContents.send('toggle-overlay', isOverlay);
  

  globalShortcut.register('F9', () => {
    isOverlay = !isOverlay;
    mainWindow.setIgnoreMouseEvents(isOverlay);
    mainWindow.setAlwaysOnTop(isOverlay);
    mainWindow.setResizable(!isOverlay);
    mainWindow.setMovable(!isOverlay);
    // mainWindow.setFocusable(!isOverlay);
    mainWindow.webContents.send('toggle-overlay', isOverlay);
  });
}

app.on('ready', createWindow);

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});



app.on('activate', () => {
  if (mainWindow === null) {
    createWindow();
  }
});

app.on('will-quit', () => {
  globalShortcut.unregisterAll();
});
