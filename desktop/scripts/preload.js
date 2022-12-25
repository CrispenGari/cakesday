const os = require("os");
const electron = require("electron");

electron.contextBridge.exposeInMainWorld("api", {
  threads: os.cpus().length,
});
