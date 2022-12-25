const electron = require("electron");
const path = require("path");
const isDev = require("electron-is-dev");

const createWindow = () => {
  const win = new electron.BrowserWindow({
    width: 800,
    height: 600,
    icon: path.join(__dirname, "/public/favicon.ico"),
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: true,
      preload: path.join(__dirname, "/scripts/preload.js"), // the compiled version of ts
    },
  });

  win.loadURL(
    isDev
      ? "http://localhost:3000"
      : `file://${path.join(__dirname, "./build/index.html")}`
  );

  win.webContents.openDevTools({ mode: "bottom" });
};

electron.app.whenReady().then(() => {
  createWindow();

  electron.app.on("activate", () => {
    if (electron.BrowserWindow.getAllWindows().length === 0) createWindow();
  });
});

electron.app.on("window-all-closed", () => {
  if (process.platform !== "darwin") electron.app.quit();
});
