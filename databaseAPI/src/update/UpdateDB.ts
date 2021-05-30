import Status from '../support/Response';
import AppDB from '../DBState';
import { _UpdateDB } from '../global';

const updateDB: _UpdateDB = async (arg) => {
  try {
    const { type, ID, data } = arg;

    switch (type) {
      case 'skill':
        await AppDB.Skills.put(ID, data);
        break;
      default:
        throw 'Type was not recognized!';
    }

    return Status({
      code: 0,
      message: `Data updated successfully!`,
      result: null,
    });
  } catch (err) {
    return Status({
      code: 1,
      message: `There was an error while updating the database. Please, try again!`,
      result: null,
    });
  }
};

export default updateDB;
