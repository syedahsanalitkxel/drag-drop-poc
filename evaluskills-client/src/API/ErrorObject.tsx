import { AxiosError } from 'axios';
import { get } from 'lodash-es';

export default class ErrorObject {
  constructor(error: AxiosError) {
    const message = error.message;

    return {
      error,
      fail: true,
      message,
      statusCode: error.code || get(error, 'response.status'),
    };
  }
}
