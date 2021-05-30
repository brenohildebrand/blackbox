import Response from './support/Response';
import AppDB from './DBState';
import { _OpenDB } from './global';

const openDB: _OpenDB = async () => {
  try {
    const err = await AppDB.init();
    if (err) throw 'error';

    return Response({
      code: 0,
      message: `The Database was initialized successfully!`,
      result: null,
    });
  } catch (err) {
    return Response({
      code: 1,
      message: `There was an error while opening the database. Please, try again!`,
      result: null,
    });
  }
};

export default openDB;
