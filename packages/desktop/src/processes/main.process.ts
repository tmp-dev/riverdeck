import { App, Menu, Tray } from 'electron';
import { applicationGuid, applicationName } from '@riverdeck/common';
import logoImage from '../images/logo.image';

export default class MainProcess {
  public app: App;
  public contextMenu: Menu;
  public tray: Tray;

  constructor(app: App) {
    this.app = app;
    this.contextMenu = this.setupContextMenu();
    this.tray = this.setupTray();
  }

  private setupTray(): Tray {
    const tray = new Tray(logoImage, applicationGuid);
    tray.setToolTip(applicationName);
    tray.setContextMenu(this.contextMenu);
    return tray;
  }

  private setupContextMenu(): Menu {
    return Menu.buildFromTemplate([]);
  }
}
