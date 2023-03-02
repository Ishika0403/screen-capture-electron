// / eslint global-require: off, no-console: off, promise/always-return: off /

/**
 * This module executes inside of electron's main process. You can start
 * electron renderer process from here and communicate with the other processes
 * through IPC.
 *
 * When running `npm run build` or `npm run build:main`, this file is compiled to
 * `./src/main.js` using webpack. This gives us some performance wins.
 */
import path from 'path';
import { app, BrowserWindow, shell, ipcMain, protocol, desktopCapturer, Notification } from 'electron';
import { autoUpdater } from 'electron-updater';
import log from 'electron-log';
import MenuBuilder from './menu';
import { resolveHtmlPath } from './util';

const { exec } = require('child_process');

class AppUpdater {
  constructor() {
    log.transports.file.level = 'info';
    autoUpdater.logger = log;
    autoUpdater.checkForUpdatesAndNotify();
  }
}

let mainWindow: BrowserWindow | null = null;


ipcMain.on('ipc-example', async (event, arg) => {
  const msgTemplate = (pingPong: string) => `IPC test: ${pingPong}`;
  console.log(msgTemplate(arg));
  event.reply('ipc-example', msgTemplate('pong'));
});


ipcMain.on('get-screenshot', async (event, _arg: any) => {
  desktopCapturer
    .getSources({ types: ['window', 'screen'] })
    .then(async (sources) => {
      const source1 = sources[0];
      event.reply('get-screenshot', source1.thumbnail.toDataURL());
      // eslint-disable-next-line no-restricted-syntax
      for (const source of sources) {
        if (source.name === 'Electron') {
          // mainWindow.webContents.send('SET_SOURCE', source.id)
          return;
        }
      }
    })
    .catch((err) => {
      console.log('err', err);
    });
});

if (process.env.NODE_ENV === 'production') {
  const sourceMapSupport = require('source-map-support');
  sourceMapSupport.install();
}

const isDebug =
  process.env.NODE_ENV === 'development' || process.env.DEBUG_PROD === 'true';

if (isDebug) {
  require('electron-debug')();
}

const installExtensions = async () => {
  const installer = require('electron-devtools-installer');
  const forceDownload = !!process.env.UPGRADE_EXTENSIONS;
  const extensions = ['REACT_DEVELOPER_TOOLS'];

  return installer
    .default(
      extensions.map((name) => installer[name]),
      forceDownload
    )
    .catch(console.log);
};

// Set the myapp protocol as the default protocol
app.setAsDefaultProtocolClient('myapp');

app.on('open-url', (event, url) => {
  // Extract the token and project from the URL
  const [token, project] = url.split('/');

  // Open the app window with the token and project
  const appPath = app.getAppPath();
  const appUrl = `file://${appPath}/index.html?token=${token}&project=${project}`;

  // Determine the command to open the app based on the platform
  let command;
  if (process.platform === 'win32') {
    command = `start "" "${appUrl}"`;
  } else if (process.platform === 'darwin') {
    command = `open -a "${appPath}" "${appUrl}"`;
  } else {
    console.error(`Unsupported platform: ${process.platform}`);
    return;
  }

  // Execute the command to open the app
  exec(command, (error: any) => {
    if (error) {
      console.error(`Error opening app: ${error}`);
      return;
    }
    console.log('App opened successfully');
  });
});

const createWindow = async () => {
  if (isDebug) {
    await installExtensions();
  }

  const RESOURCES_PATH = app.isPackaged
    ? path.join(process.resourcesPath, 'assets')
    : path.join(__dirname, '../../assets');

  const getAssetPath = (...paths: string[]): string => {
    return path.join(RESOURCES_PATH, ...paths);
  };

  const notification = new Notification({
    title: 'Start Electron App!',
    body: 'This is a notification.',
    icon: '/path/to/icon.png',
    // image: '/path/to/image.png',
    silent: true
  });

  const expireNotification = new Notification({
    title: 'Expire Electron App!',
    // body: 'This is a notification.',
    icon: '/path/to/icon.png',
    // image: '/path/to/image.png',
    silent: false
  });

  notification.show();

  const windows = new Map(); // Map of tokens to window objects

  ipcMain.on('timer-ended', (event, token, elapsedTime) => {
    console.log(`Timer ended for token ${token}, elapsed time: ${elapsedTime}ms`);
    // console.log(windows.get(token),"ww")
    const window = windows.get(token);
    if (!window) {
      expireNotification.show()  
      // window.close();
      // windows.delete(token);
    }
  });
  

  // Auto-hide the notification after 5 seconds
  setTimeout(() => {
    expireNotification.close();
    notification.close();
  }, 5000);

  mainWindow = new BrowserWindow({
    show: false,
    width: 1024,
    height: 728,
    icon: getAssetPath('icon.png'),
    webPreferences: {
      preload: app.isPackaged
        ? path.join(__dirname, 'preload.js')
        : path.join(__dirname, '../../.erb/dll/preload.js'),
    },
  });

  mainWindow.loadURL(resolveHtmlPath('index.html'));

  mainWindow.on('ready-to-show', () => {
    // Check if the myapp protocol is associated with this app in the registry
    if (!app.isDefaultProtocolClient('myapp')) {
      // If not, ask the user if they want to associate it
      app.setAsDefaultProtocolClient('myapp');
    }
    if (!mainWindow) {
      throw new Error('"mainWindow" is not defined');
    }
    if (process.env.START_MINIMIZED) {
      mainWindow.minimize();
    } else {
      mainWindow.show();
    }
  });

  mainWindow.on('closed', () => {
    mainWindow = null;
  });

  const menuBuilder = new MenuBuilder(mainWindow);
  menuBuilder.buildMenu();

  // Open urls in the user's browser
  mainWindow.webContents.setWindowOpenHandler((edata) => {
    shell.openExternal(edata.url);
    return { action: 'deny' };
  });

  // Remove this if your app does not use auto updates
  // eslint-disable-next-line
  new AppUpdater();
};

/**
 * Add event listeners...
 */

app.on('window-all-closed', () => {
  // Respect the OSX convention of having the application in memory even
  // after all windows have been closed
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app
  .whenReady()
  .then(() => {
    createWindow();
    app.on('activate', () => {
      // On macOS it's common to re-create a window in the app when the
      // dock icon is clicked and there are no other windows open.
      if (mainWindow === null) createWindow();
    });
  })
  .catch(console.log);
