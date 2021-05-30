import { _ResponseFunction } from '../global';

const Response: _ResponseFunction = (args) => {
  const { code, message, result } = args;

  return {
    code,
    message,
    result: result,
  };
};

export default Response;
