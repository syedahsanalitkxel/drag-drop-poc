import { AxiosError } from 'axios';
import { get } from 'lodash-es';
import ErrorObjectInterface from '../interfaces/ErrorObject';

const errorObject = (error: AxiosError) => {
  let errorResponse: any;
  let errorCode: any;
  let message = error.message;

  if (error.response && error.response.data) {
    errorResponse = error.response.data;
    if (errorResponse.code) {
      errorCode = errorResponse.code;
    }

    if (errorResponse.errors && errorResponse.errors.length) {
      const { title, description } = errorResponse.errors[0];
      message = `${title}: ${description}`;
    }
  }

  const concludedError: ErrorObjectInterface = {
    data: errorResponse && errorResponse.errors ? errorResponse.errors : errorResponse,
    error,
    fail: true,
    message,
    statusCode: error.code || errorCode || get(error, 'response.status'),
  };

  return concludedError;
};

export default errorObject;
