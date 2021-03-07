import { DEFAULT_PORT } from '@riverdeck/common/src';
import { BrowserWindow } from 'electron';
import isDev from '../utilities/isDev.utility';
import installExtention, { REACT_DEVELOPER_TOOLS } from 'electron-devtools-installer';
import { resolve } from 'path';

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
      width: 800,
      height: 500,
      webPreferences: {
        nodeIntegration: true
      }
    });
  }

  private async startCommon(): Promise<void> {}

  private async startDev(): Promise<void> {
    await this.window.loadURL(`https://0.0.0.0:${DEFAULT_PORT}/setup`);
    await installExtention(REACT_DEVELOPER_TOOLS);
    this.window.webContents.openDevTools();
  }

  private async startProd(): Promise<void> {
    await this.window.loadURL(`file://${resolve(__dirname, 'ui', 'index.html')}/setup`);
  }
}
