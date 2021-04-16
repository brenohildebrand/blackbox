// Node Modules
const { app, BrowserWindow, ipcMain } = require('electron');
const { readFile, writeFile, rm } = require('fs').promises;
const { copy } = require('fs-extra');
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

  DB_ICONS,
  DB_LIST_OF_ICONS,
  DB_CONTROL,

  DB_USER_BACKUP,
} = require('./paths');
const {
  LOAD_ICONS,
  CLOSE_LOAD,

  FETCH_TREE_DATA,
  FETCH_SETTINGS_DATA,

  GET_ID,
  SEARCH_ICONS,

  SAVE_CHANGES,
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
    const iconsStrings = [];
    for (let i = 0; i < searchResult.length && i < numberOfResults; i++) {
      const svgName = searchResult[i].name;
      const iconData = await readFile(path.join(DB_ICONS, svgName + '.svg'));
      const iconString = iconData.toString();
      iconsStrings.push(iconString);
    }

    return iconsStrings;
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
      const node = await readFile(path.join(DB_NODES, id + '.json'));
      const parsedNode = JSON.parse(node);

      nodes[id] = parsedNode;
    }

    // READ PATHS
    const paths = {};
    for (let i = 0; i < parsedTree.paths.length; i++) {
      // ID
      const id = String(parsedTree.paths[i]);

      // DB_NODES + id + .json
      const path = await readFile(path.join(DB_PATHS, id + '.json'));
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

//! SAVE_CHANGES
ipcMain.handle(SAVE_CHANGES, async (e, data) => {
  try {
    // Write that we are saving files
    const control = await readFile(DB_CONTROL);
    let parsedControl = JSON.parse(control);

    parsedControl.isUpdatingTree = true;
    await writeFile(DB_CONTROL, JSON.stringify(parsedControl, null, 2));

    // Update ID's on tree.json
    const tree = await readFile(path.join(DB_TREE, 'tree.json'));
    const parsedTree = JSON.parse(tree);

    // Update position with delta
    Object.keys(data.treeData.nodes).map((nodeID) => {
      if (data.treeData.nodes[nodeID] === undefined) return;
      if (data.treeData.nodes[nodeID].delta === undefined) return;

      data.treeData.nodes[nodeID].position.x +=
        data.treeData.nodes[nodeID].delta.x;
      data.treeData.nodes[nodeID].position.y +=
        data.treeData.nodes[nodeID].delta.y;
      delete data.treeData.nodes[nodeID].delta;

      Object.keys(data.treeData.nodes[nodeID].subNodes).map((subNodeID) => {
        if (data.treeData.nodes[nodeID].subNodes[subNodeID] === undefined)
          return;
        if (data.treeData.nodes[nodeID].subNodes[subNodeID].delta === undefined)
          return;

        data.treeData.nodes[nodeID].subNodes[subNodeID].position.x +=
          data.treeData.nodes[nodeID].subNodes[subNodeID].delta.x;
        data.treeData.nodes[nodeID].subNodes[subNodeID].position.y +=
          data.treeData.nodes[nodeID].subNodes[subNodeID].delta.y;
        delete data.treeData.nodes[nodeID].subNodes[subNodeID].delta;
      });
    });

    // What changed?
    let deletedNodesIDs = [];
    let deletedPathsIDs = [];

    // Deleted Nodes IDs
    Object.keys(parsedTree.nodes).map((nodeID) => {
      if (data.treeData.nodes[nodeID] === undefined)
        deletedNodesIDs.push(nodeID);
    });

    // Deleted Paths IDs
    Object.keys(parsedTree.paths).map((pathID) => {
      if (data.treeData.paths[pathID] === undefined)
        deletedPathsIDs.push(pathID);
    });

    // Update tree and save new values
    let updatedTree = parsedTree;
    updatedTree.nodes = Object.keys(data.treeData.nodes);
    updatedTree.paths = Object.keys(data.treeData.paths);

    await writeFile(
      path.join(DB_TREE, 'tree.json'),
      JSON.stringify(updatedTree, null, 2),
    );

    // Update nodes files
    // Delete what should be deleted
    for (let i = 0; i < deletedNodesIDs.length; i++) {
      const nodeID = deletedNodesIDs[i];
      console.log('rm:', rm);
      await rm(path.join(DB_NODES, String(nodeID) + '.json'));
    }

    // For each nodeID on data
    const nodesIDs = Object.keys(data.treeData.nodes);
    for (let i = 0; i < nodesIDs.length; i++) {
      const nodeID = nodesIDs[i];

      await writeFile(
        path.join(DB_NODES, String(nodeID) + '.json'),
        JSON.stringify(data.treeData.nodes[nodeID], null, 2),
      );
    }

    // Update paths files
    // Delete what should be deleted
    for (let i = 0; i < deletedPathsIDs.length; i++) {
      const pathID = deletedPathsIDs[i];
      await rm(path.join(DB_PATHS, String(pathID) + '.json'));
    }

    // For each pathID on data
    const pathsIDs = Object.keys(data.treeData.paths);
    for (let i = 0; i < pathsIDs.length; i++) {
      const pathID = pathsIDs[i];

      await writeFile(
        path.join(DB_PATHS, String(pathID) + '.json'),
        JSON.stringify(data.treeData.paths[pathID], null, 2),
      );
    }

    // Write that files were saved and that backup is starting
    parsedControl.isUpdatingTree = false;
    parsedControl.isOnBackup = true;
    await writeFile(DB_CONTROL, JSON.stringify(parsedControl, null, 2));

    // Backup
    // Copy files
    await copy(DB_TREE, path.join(DB_USER_BACKUP, 'Tree'));
  } catch (err) {
    throw err;
  }
});

//! IDEA: handleError('mode', ...args)
//! If something bad happened, copy and paste the file from the backup
