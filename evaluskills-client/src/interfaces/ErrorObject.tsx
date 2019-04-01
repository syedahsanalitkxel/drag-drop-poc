import { AxiosError } from 'axios';

export default interface ErrorObjectInterface {
  error?: AxiosError;
  fail: boolean;
  message: string;
  statusCode: string;
}
