export default {
  log: (...args) => {
    const message = args;
    window.ipcRenderer?.invoke('kiosk-logs', 'log', message[0], message[1]).then().catch(e => {});
  },
  error: (...args) => {
    const message = args;
    window.ipcRenderer?.invoke('kiosk-logs', 'error', message[0], message[1]).then().catch(e => {});
  },
  info: (...args) => {
    const message = args;
    window.ipcRenderer?.invoke('kiosk-logs', 'info', message[0], message[1]).then().catch(e => {});
  }
}
