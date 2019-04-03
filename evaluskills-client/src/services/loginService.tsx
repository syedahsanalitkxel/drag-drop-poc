import { AxiosError, AxiosResponse } from 'axios';

import API from '../api';
import { LOGIN } from '../api/endpoints';
import errorObject from '../api/ErrorObject';
import LoginInterface from '../interfaces/Login';

const api = new API();

export async function login(loginValues: LoginInterface) {
  console.log('got login values ', loginValues);
  return api.post(LOGIN, loginValues).then(
    (res: AxiosResponse) => {
      return res.data;
    },
    (error: AxiosError) => {
      return errorObject(error);
    }
  );
}
