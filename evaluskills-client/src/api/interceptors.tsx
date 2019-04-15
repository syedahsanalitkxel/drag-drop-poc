import { AxiosError, AxiosResponse } from 'axios';
import { get } from 'lodash-es';
import errorObject from './ErrorObject';
import ResponseInterface from './ResponseInterface';

export const errorResponseHandler = (error: AxiosError) => {
  if (
    error &&
    (get(error, 'status') === 401 ||
      get(error, 'status') === 403 ||
      get(error, 'response.status') === 403)
  ) {
    // Logout
  }

  if (error) {
    throw errorObject(error);
  }
};

export function successResponseHandler(response: AxiosResponse): ResponseInterface {
  const pageDetails = response.headers['x-pagination']
    ? JSON.parse(response.headers['x-pagination'])
    : undefined;

  return {
    ...response,
    data: response.data,
    pageDetails,
  };
}
