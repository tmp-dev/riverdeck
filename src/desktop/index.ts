import { app, BrowserWindow } from 'electron';
import Main from './backend/index';

Main.main(app, BrowserWindow);