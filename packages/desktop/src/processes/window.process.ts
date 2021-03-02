import { BrowserWindow } from 'electron';
import { BrowserWindowConstructorOptions } from 'electron/main';
import isDev from '../utilities/isDev.utility';

export default class WindowProcess {
  window: BrowserWindow;

  windowOptions: BrowserWindowConstructorOptions = {
    width: 800,
    height: 500,
    webPreferences: {
      nodeIntegration: true
    }
  };

  constructor() {
    this.window = this.setupWindow();
  }

  private setupWindow(): BrowserWindow {
    const window = new BrowserWindow(this.windowOptions);

    if (isDev) {
      window.loadURL('http://localhost:3000');
    } else {
      window.loadFile('./ui/index.html');
    }

    return window;
  }
}
