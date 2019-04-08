import { AxiosError } from 'axios';

export default interface ErrorObjectInterface {
  error?: AxiosError;
  fail: boolean;
  message: string;
  data?: any;
  statusCode: string;
}
