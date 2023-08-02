import { ClipboardData } from '@prisma/client';
import { ipcRenderer, contextBridge } from 'electron';

declare global {
  interface Window {
    Main: typeof api;
    ipcRenderer: typeof ipcRenderer;
  }
}

type rendererAPI = {
  sendMessage: (message: string) => void;
  Minimize: () => void;
  Maximize: () => void;
  Close: () => void;
  on: (channel: string, callback: (data: any) => void) => void;
  clipboard: () => Promise<any>;
  getClipboardData: () => Promise<any>;
  updateFavorites: (updateData: ClipboardData) => Promise<any>;
};

const api: rendererAPI = {
  sendMessage: (message: string) => {
    ipcRenderer.send('message', message);
  },
  /**
    Here function for AppBar
   */
  Minimize: () => {
    ipcRenderer.send('minimize');
  },
  Maximize: () => {
    ipcRenderer.send('maximize');
  },
  Close: () => {
    ipcRenderer.send('close');
  },
  /**
   * Provide an easier way to listen to events
   */
  on: (channel: string, callback: (data: any) => void) => {
    ipcRenderer.on(channel, (_, data) => callback(data));
  },
  clipboard: () => {
    return ipcRenderer.invoke('readClipboard');
  },
  getClipboardData: () => {
    return ipcRenderer.invoke('get-clipboard-data');
  },
  updateFavorites: (updateData: ClipboardData) => {
    return ipcRenderer.invoke('update-favorite', updateData);
  }
};
contextBridge.exposeInMainWorld('Main', api);
