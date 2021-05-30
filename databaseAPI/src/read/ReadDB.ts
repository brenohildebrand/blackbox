import Status from '../support/Response';
import AppDB from '../DBState';
import { _ReadDB } from '../global';

const readDB: _ReadDB = async (arg) => {
  try {
    const { type, ID } = arg;
    let result = undefined;

    switch (type) {
      case 'database':
        if (ID === 'Settings') result = AppDB.Settings;
        if (ID === 'Skills') result = AppDB.Skills;
        break;
      case 'skill':
        result = await AppDB.Skills.get(ID);
        break;
      default:
        throw 'Type was not recognized!';
    }

    return Status({
      code: 0,
      message: `Data was read successfully!`,
      result,
    });
  } catch (err) {
    return Status({
      code: 1,
      message: `There was an error while reading from database. Please, try again!`,
      result: null,
    });
  }
};

export default readDB;
