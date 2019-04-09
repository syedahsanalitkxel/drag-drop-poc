import axios from 'axios';
import { get } from 'lodash-es';
import errorObject from './ErrorObject';

const errorResponseHandler = (error: any) => {
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

// apply interceptor on response
axios.interceptors.response.use(response => response, errorResponseHandler);

export default errorResponseHandler;
