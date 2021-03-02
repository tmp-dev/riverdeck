import { app, BrowserWindow } from 'electron';
import MainProcess from './processes/main.process';
import WindowProcess from './processes/window.process';

let window: WindowProcess | null = null;

const openWindow = () => {
  if (window === null) {
    window = new WindowProcess();
  }
};

app.whenReady().then(() => {
  const main = new MainProcess(app);

  openWindow();
});

// Prevent the app from closing once all windows are closed.
app.on('window-all-closed', () => {});
