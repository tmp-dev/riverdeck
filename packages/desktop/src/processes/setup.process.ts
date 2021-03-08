import { DEV_FRONTEND_PORT } from '@riverdeck/common';
import { BrowserWindow } from 'electron';
import isDev from '../components/isDev.component';
import installExtention, { REACT_DEVELOPER_TOOLS } from 'electron-devtools-installer';
import { resolve } from 'path';
import { takeHeapSnapshot } from 'process';

export default class SetupProcess {
  private static instance: SetupProcess;

  public static async getInstance(): Promise<SetupProcess> {
    if (!this.instance) {
      this.instance = new SetupProcess();
      await this.instance.start();
    }

    return this.instance;
  }

  private window: BrowserWindow;

  constructor() {
    this.window = this.getWindow();
  }

  async start(): Promise<void> {
    this.startCommon();
    if (isDev) {
      this.startDev();
    } else {
      this.startProd();
    }
  }

  private getWindow(): BrowserWindow {
    return new BrowserWindow({
      width: isDev ? 1200 : 800,
      height: 750,
      webPreferences: {
        nodeIntegration: true
      }
    });
  }

  private async startCommon(): Promise<void> {
    this.window.setBackgroundColor('white');
  }

  private async startDev(): Promise<void> {
    await this.window.loadURL(`http://0.0.0.0:${DEV_FRONTEND_PORT}/setup`);
    this.window.webContents.openDevTools();
    await installExtention(REACT_DEVELOPER_TOOLS);
  }

  private async startProd(): Promise<void> {
    await this.window.loadURL(`file://${resolve(__dirname, 'ui', 'index.html')}/setup`);
  }
}
