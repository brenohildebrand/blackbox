const { contextBridge, ipcRenderer } = require('electron');
const channels = require('./channels');

contextBridge.exposeInMainWorld('api', {
  invoke: (channel, ...args) => {
    // Whitelist Channels
    let validChannels = [...Object.values(channels)];

    if (validChannels.includes(channel)) {
      return ipcRenderer.invoke(channel, ...args); // We need to return so that a promise is returned
    }
  },
});
