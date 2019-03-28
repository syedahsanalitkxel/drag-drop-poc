import { AxiosError } from 'axios';

export interface ErrorObjectInterface {
  error?: AxiosError;
  fail: boolean;
  message: string;
  statusCode: string;
}
