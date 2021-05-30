import Status from '../support/Response';
import AppDB from '../DBState';
import { _DeleteDB } from '../global';

const deleteDB: _DeleteDB = async (arg) => {
  try {
    const { type, ID } = arg;

    switch (type) {
      case 'skill':
        await AppDB.Skills.del(ID);
        break;
      default:
        throw 'Type was not recognized!';
    }

    return Status({
      code: 0,
      message: `Data deleted successfully!`,
      result: null,
    });
  } catch (err) {
    return Status({
      code: 1,
      message: `There was an error while deleting on the database. Please, try again!`,
      result: null,
    });
  }
};

export default deleteDB;
