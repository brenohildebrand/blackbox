// Node Modules
const { app, BrowserWindow, ipcMain } = require('electron');
const { readFile, writeFile, mkdir } = require('fs').promises;
const path = require('path');
const FuzzySearch = require('fuzzy-search');

// BlackBox Electron Modules
const { updateJSONFile, getNewID } = require('./support');
const {
  ENTRY_POINT,
  PRELOAD,
  LOADING_ENTRY_POINT,
  DB_TREE,
  DB_DEFAULT_SETTINGS,
  DB_NODES,
  DB_PATHS,
  DB_LIST_OF_ICONS,
} = require('./paths');
const {
  LOAD_ICONS,
  CLOSE_LOAD,

  FETCH_TREE_DATA,
  FETCH_SETTINGS_DATA,

  GET_ID,
  SEARCH_ICONS,
} = require('./channels');

// Classes
const Tree = require('./classes/Tree');
const Node = require('./classes/Node');
const SubNode = require('./classes/SubNode');
const Path = require('./classes/Path');

// Variables and Constants
// Keep a global reference of the window object, if you don't, the window will be closed automatically when the JavaScript object is garbage collected.
let win;
let loadingWin;

let icons;
let searcher;

// Inicialization
function createWindow() {
  win = new BrowserWindow({
    width: 800,
    height: 600,
    show: false,
    frame: false,
    webPreferences: {
      nodeIntegration: false,
      contextIsolation: true,
      enableRemoteModule: false,
      preload: PRELOAD,
    },
  });

  win.loadFile(ENTRY_POINT);
}

function createLoadingWindow() {
  loadingWin = new BrowserWindow({
    width: 400,
    height: 400,
    resizable: false,
    frame: false,
    webPreferences: {
      nodeIntegration: false,
      contextIsolation: true,
      enableRemoteModule: false,
      preload: PRELOAD,
    },
  });

  loadingWin.loadFile(LOADING_ENTRY_POINT);
}

app.whenReady().then(() => {
  createLoadingWindow();
  createWindow();

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow();
    }
  });
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

//! Channel Handling API

//! LOAD
//! LOAD_ICONS
ipcMain.handle(LOAD_ICONS, async (e) => {
  try {
    // Load icons list
    const iconsData = await readFile(DB_LIST_OF_ICONS);
    icons = JSON.parse(iconsData).icons;

    searcher = new FuzzySearch(icons, ['name'], {
      caseSensitive: false,
    });

    return 0;
  } catch (err) {
    throw err;
  }
});

//! CLOSE_LOAD
ipcMain.handle(CLOSE_LOAD, async (e) => {
  try {
    setTimeout(() => {
      // Closing LoadingWindow
      if (loadingWin) loadingWin.close();

      // Showing App
      win.show();

      win.once('ready-to-show', () => {
        console.log('App is ready to show!');
      });
    }, Math.random() * 500 + 1200);

    return 0;
  } catch (err) {
    throw err;
  }
});

//! APP
//! SEARCH_ICONS
//  Parameters:  none
//  Retun Value: data: object
ipcMain.handle(SEARCH_ICONS, async (e, searchText, numberOfResults) => {
  try {
    const searchResult = searcher.search(searchText);

    // Get Icons
    const iconsData = [];
    for (let i = 0; i < searchResult.length && i < numberOfResults; i++) {
      const svgName = searchResult[i].name;
      const iconData = await readFile(path.join(DB_ICONS, svgName + '.svg'));
      const iconString = iconData.toString();
      iconsStrings.push({ name: svgName, string: iconString });
    }

    return iconsData;
  } catch (err) {
    throw err;
  }
});

//! FETCH_TREE_DATA
ipcMain.handle(FETCH_TREE_DATA, async () => {
  try {
    // READ TREE
    const tree = await readFile(path.join(DB_TREE, 'tree.json'));
    const parsedTree = JSON.parse(tree);

    // READ NODES
    let nodes = {};
    for (let i = 0; i < parsedTree.nodes.length; i++) {
      // ID
      const id = String(parsedTree.nodes[i]);

      // DB_NODES + id + .json
      const node = await readFile(path.join(DB_NODES, id, '.json'));
      const parsedNode = JSON.parse(node);

      nodes[id] = parsedNode;
    }

    // READ PATHS
    const paths = {};
    for (let i = 0; i < parsedTree.paths.length; i++) {
      // ID
      const id = String(parsedTree.paths[i]);

      // DB_NODES + id + .json
      const path = await readFile(path.join(DB_PATHS, id, '.json'));
      const parsedPath = JSON.parse(path);

      paths[id] = parsedPath;
    }

    return { nodes, paths };
  } catch (err) {
    throw err;
  }
});

//! FETCH_DEFAULT_SETTINGS
ipcMain.handle(FETCH_SETTINGS_DATA, async (e) => {
  try {
    const settings = await readFile(DB_DEFAULT_SETTINGS);
    const parsedSettings = JSON.parse(settings);

    return parsedSettings;
  } catch (err) {
    throw err;
  }
});

//! GET_ID
ipcMain.handle(GET_ID, async (e) => {
  try {
    const ID = await getNewID();
    return ID;
  } catch (err) {
    throw err;
  }
});

/*
//! SAVE_CHANGES
ipcMain.handle(SAVE_CHANGES, async (e) => {
  try {
    console.log('I am saving the changes');
  } catch (err) {
    throw err;
  }
});
*/

//! IDEA: handleError('mode', ...args)
//! If something bad happened, copy and paste the file from the backup
