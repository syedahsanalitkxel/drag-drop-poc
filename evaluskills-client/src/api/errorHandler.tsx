import { AxiosError, AxiosResponse } from 'axios';
import { get } from 'lodash-es';
import errorObject from './ErrorObject';

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

export function successResponseHandler(response: AxiosResponse) {
  console.log(response);
  return response;
}
