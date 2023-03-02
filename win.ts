import { IpcRenderer } from 'electron';

declare global {
  // eslint-disable-next-line no-unused-vars
  interface Window {
    ipcRenderer: IpcRenderer;
  }
}

// eslint-disable-next-line import/prefer-default-export
export const { ipcRenderer } = window;
