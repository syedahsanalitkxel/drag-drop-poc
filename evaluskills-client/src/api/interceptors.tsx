import { AxiosError, AxiosResponse } from 'axios';
import { get } from 'lodash-es';
import errorObject from './ErrorObject';
import ResponseInterface from './ResponseInterface';

export const errorResponseHandler = (error: AxiosError) => {
  if (
    error &&
    (get(error, 'status') === 401 || get(error, 'status') === 403 || get(error, 'response.status') === 403)
  ) {
    error.message = "You're UnAuthorized, check login or user privileges";
  }

  if (error && (get(error, 'status') === 404 || get(error, 'response.status') === 404)) {
    error.message = 'Not Found';
  }

  if (error && (get(error, 'status') === 503 || get(error, 'response.status')) === 503) {
    error.message = 'Internal Server Error';
  }

  if (error) {
    throw errorObject(error);
  }
};

export function successResponseHandler(response: AxiosResponse): ResponseInterface {
  const pageDetails = response.headers['x-pagination'] ? JSON.parse(response.headers['x-pagination']) : undefined;

  return {
    ...response,
    data: response.data,
    pageDetails,
  };
}
