const { app, BrowserWindow, ipcMain } = require('electron');
const path = require('path');
const url = require('url');
const udpSend = require('./udpClient');

let win;

function createWindow () {
  win = new BrowserWindow({width: 800, height: 600});

  win.loadURL(url.format({
    pathname: path.join(__dirname, 'game.html'),
    protocol: 'file:',
    slashes: true
  }));

  win.on('closed', () => {
    win = null
  })
}

app.on('ready', createWindow);

app.on('window-all-closed', () => {
  app.quit()
});

app.on('activate', () => {
  if (win === null) {
    createWindow()
  }
});

ipcMain.on('message', (event, message) => {
  console.log(`Sending ${message} to server `);
  udpSend(message);
});


