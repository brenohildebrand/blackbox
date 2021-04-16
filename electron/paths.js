const path = require('path');
const rootPath = path.join(__dirname);

module.exports = {
  //! Main
  ENTRY_POINT: path.join(rootPath, '../build/index.html'),
  PRELOAD: path.join(rootPath, 'preload.js'),

  LOADING_ENTRY_POINT: path.join(rootPath, 'loadingWin/loadingWin.html'),

  //! Database
  DB_TREE: path.join(rootPath, 'database/User/Tree'),
  DB_DEFAULT_SETTINGS: path.join(rootPath, 'database/App/defaultSettings.json'),

  DB_NODES: path.join(rootPath, 'database/User/Tree/Nodes'),
  DB_PATHS: path.join(rootPath, 'database/User/Tree/Paths'),

  DB_ICONS: path.join(rootPath, 'database/User/Icons'),

  DB_CONTROL: path.join(rootPath, 'database/User/App/control.json'),

  DB_ID: path.join(rootPath, 'database/User/App/ID.json'),

  DB_LIST_OF_ICONS: path.join(rootPath, 'database/User/listOfIcons.json'),

  DB_USER_BACKUP: path.join(rootPath, 'database/User/Backup'),
};
