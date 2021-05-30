import Response from './support/Response';
import AppDB from './DBState';
import { _CloseDB } from './global';

const closeDB: _CloseDB = async () => {
  try {
    const err = await AppDB.terminate();
    if (err) throw 'error';

    return Response({
      code: 0,
      message: `The Database was terminated successfully!`,
      result: null,
    });
  } catch (err) {
    return Response({
      code: 1,
      message: `There was an error while terminating the database. Please, try again!`,
      result: null,
    });
  }
};

export default closeDB;
