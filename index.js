const { app, BrowserWindow } = require('electron');
const path = require("path")

function createWindow() {
    const win = new BrowserWindow({
        height: 1080,
        width: 1920,
        webPreferences: {
            nodeIntegration: true,
            enableRemoteModule: true
        },
        darkTheme: true,
        icon: path.join(__dirname, 'assets', 'img', 'icon.png'),
        title: 'My App',
    });
    win.setAspectRatio(16 / 9)
    win.setTitle('My App');
    win.loadFile('./public/index.html');
    win.webContents.openDevTools();
}

app.whenReady().then(createWindow);

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit();
    }
});

app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
        createWindow();
    }
});