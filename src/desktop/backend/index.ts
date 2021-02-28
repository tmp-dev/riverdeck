import { app, App, BrowserWindow } from "electron";
import MainProcess from "./processes/main.process";
import isDev from "./utilities/isDev";

const Boostrap = async () => {
  app.on("ready", () => {
    const main = new MainProcess(app);

    const window = new BrowserWindow();
    if (isDev) {
      window.loadURL("https://duckduckgo.com");
    } else {
      window.loadURL("https://google.com");
    }

    console.log("Done!~", isDev);
  });
};
Boostrap();
