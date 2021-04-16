const { DB_ID } = require('./paths');
const { readFile, writeFile } = require('fs').promises;

// About Files
async function updateFile(FILEPATH, asyncCallback, ...args) {
  try {
    const data = await readFile(FILEPATH);
    const newData = await asyncCallback(data, ...args);

    await writeFile(FILEPATH, newData);
  } catch (err) {
    throw err;
  }
}

async function updateJSONFile(FILEPATH, asyncCallback, ...args) {
  try {
    const data = await readFile(FILEPATH);
    const newData = await asyncCallback(JSON.parse(data), ...args);

    await writeFile(FILEPATH, JSON.stringify(newData, null, 2));
  } catch (err) {
    throw err;
  }
}

// About ID's
async function getNewID() {
  try {
    const data = await readFile(DB_ID);
    const { ID, ID_TRASH } = JSON.parse(data);

    if (ID_TRASH.length === 0) {
      await incrementID();
      return ID;
    }

    await shiftID_TRASH();
    return ID_TRASH.shift();
  } catch (err) {
    throw err;
  }
}

async function deleteID(ID) {
  try {
    await updateJSONFile(DB_ID, async (data) => {
      data.ID_TRASH.push(ID);
      return data;
    });
  } catch (err) {
    throw err;
  }
}

// Secondary Functions
async function incrementID() {
  try {
    await updateJSONFile(DB_ID, async (data) => {
      data.ID = data.ID + 1;
      return data;
    });
  } catch (err) {
    throw err;
  }
}

async function shiftID_TRASH() {
  try {
    await updateJSONFile(DB_ID, async (data) => {
      data.ID_TRASH.shift();
      return data;
    });
  } catch (err) {
    throw err;
  }
}

module.exports = {
  // About Files
  updateFile: updateFile,
  updateJSONFile: updateJSONFile,

  // About ID's
  getNewID: getNewID,
  deleteID: deleteID,
};
