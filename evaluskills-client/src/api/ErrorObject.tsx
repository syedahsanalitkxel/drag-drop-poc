import { AxiosError } from 'axios';
import { get } from 'lodash-es';
import ErrorObjectInterface from '../interfaces/ErrorObject';

const errorObject = (error: AxiosError) => {
  const message = error.message;

  const concludedError: ErrorObjectInterface = {
    error,
    fail: true,
    message,
    statusCode: error.code || get(error, 'response.status'),
  };

  return concludedError;
};

export default errorObject;
