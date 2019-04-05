import { AxiosError, AxiosResponse } from 'axios';

import API from '../api';
import { LOGIN } from '../api/endpoints';
import LoginInterface from '../interfaces/Login';

const api = new API();

export async function login(loginValues: LoginInterface) {
  return api.post(LOGIN, loginValues).then(
    (res: AxiosResponse) => {
      return res.data;
    },
    (error: AxiosError) => {
      throw error;
    }
  );
}
