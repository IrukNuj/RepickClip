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
};

const api: rendererAPI = {
  /**
   * Here you can expose functions to the renderer process
   * so they can interact with the main (electron) side
   * without security problems.
   *
   * The function below can accessed using `window.Main.sayHello`
   */
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
  }
};
contextBridge.exposeInMainWorld('Main', api);
/**
 * Using the ipcRenderer directly in the browser through the contextBridge ist not really secure.
 * I advise using the Main/api way !!
 */
contextBridge.exposeInMainWorld('ipcRenderer', ipcRenderer);
