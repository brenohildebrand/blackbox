import Status from '../support/Response';
import AppDB from '../DBState';
import { v4 as newID } from 'uuid';
import { _CreateDB } from '../global';

const createDB: _CreateDB = async (arg) => {
  try {
    const { type, data } = arg;

    switch (type) {
      case 'skill':
        await AppDB.Skills.put(newID(), data);
        break;
      default:
        throw 'Type was not recognized!';
    }

    return Status({
      code: 0,
      message: `Data created successfully!`,
      result: null,
    });
  } catch (err) {
    return Status({
      code: 1,
      message: `There was an error while creating on the database. Please, try again!`,
      result: null,
    });
  }
};

export default createDB;
