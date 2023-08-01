// Native
import { join } from 'path';

// Packages
import { BrowserWindow, app, ipcMain, clipboard, nativeTheme } from 'electron';
import isDev from 'electron-is-dev';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const height = 1800;
const width = 2400;

const initialClipboardData = {
  before: '',
  current: ''
};

nativeTheme.themeSource = 'dark';

function createWindow() {
  const window = new BrowserWindow({
    width,
    height,
    roundedCorners: true,
    frame: false,
    show: true,
    resizable: true,
    fullscreenable: true,
    webPreferences: {
      // nodeIntegration: true,
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
  window.webContents.openDevTools();

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
        favorite: false,
        count: 0,
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
      saveClipboardData(clipboardData.current);
    }
    clipboardData.before = clipboardData.current;
  }, 1000);
});

app.on('window-all-closed', () => {
  // windowを閉じてもクリップボードのデータ収集は行ってほしいので
  // if (process.platform !== 'darwin') app.quit();
});

ipcMain.handle('get-clipboard-data', async () => {
  try {
    const clipboardDataList = await prisma.clipboardData.findMany({
      orderBy: {
        timestamp: 'desc'
      }
    });
    return clipboardDataList;
  } catch (error) {
    console.error('Error retrieving data from database:', error);
    return [];
  }
});
