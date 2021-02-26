"use strict";
exports.__esModule = true;
var electron_1 = require("electron");
var index_1 = require("./backend/index");
index_1["default"].main(electron_1.app, electron_1.BrowserWindow);
