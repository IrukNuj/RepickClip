// Native
import { join } from 'path';

// Packages
import { BrowserWindow, app, ipcMain, IpcMainEvent, clipboard } from 'electron';
import isDev from 'electron-is-dev';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const height = 600;
const width = 800;

const initialClipboardData = {
  before: '',
  current: ''
};

function createWindow() {
  const window = new BrowserWindow({
    width,
    height,
    frame: false,
    show: true,
    resizable: true,
    fullscreenable: true,
    webPreferences: {
      preload: join(__dirname, 'preload.js')
    }
  });

  const port = process.env.PORT || 3000;
  const url = isDev ? `http://localhost:${port}` : join(__dirname, '../src/out/index.html');

  // and load the index.html of the app.
  if (isDev) {
    window?.loadURL(url);
  } else {
    window?.loadFile(url);
  }
  // Open the DevTools.
  // window.webContents.openDevTools();

  // For AppBar
  ipcMain.on('minimize', () => {
    // eslint-disable-next-line no-unused-expressions
    window.isVisible() ? window.hide() : window.show();
  });
  ipcMain.on('maximize', () => {
    // eslint-disable-next-line no-unused-expressions
    window.isMaximized() ? window.restore() : window.maximize();
  });

  ipcMain.on('close', () => {
    window.close();
  });

  ipcMain.handle('readClipboard', () => {
    // console.log(clipboard.readText('clipboard'));
    return clipboard.readText('clipboard');
  });
}

app.whenReady().then(() => {
  createWindow();

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
  });
});

function saveClipboardData(clipboardData: string) {
  prisma.clipboardData
    .create({
      data: {
        content: clipboardData,
        timestamp: new Date()
      }
    })
    .catch((error: Error) => {
      console.error('Error saving data:', error);
    });
}

app.on('ready', () => {
  const clipboardData = initialClipboardData;
  // 毎秒ごとにクリップボードの内容を監視
  setInterval(() => {
    clipboardData.current = clipboard.readText();
    if (clipboardData.current !== clipboardData.before) {
      console.log('saved!');
      saveClipboardData(clipboardData.current);
    }
    clipboardData.before = clipboardData.current;
  }, 1000);
});

app.on('window-all-closed', () => {
  // windowを閉じてもクリップボードのデータ収集は行ってほしいので
  // if (process.platform !== 'darwin') app.quit();
});

ipcMain.on('message', (event: IpcMainEvent, message: any) => {
  console.log(message);
  setTimeout(() => event.sender.send('message', 'hi from electron'), 500);
});
