import { AxiosError, AxiosResponse } from 'axios';

import API from '../api';
import { CONFIRM_EMAIL, LOGIN, RESET_PASSWORD } from '../api/endpoints';
import LoginInterface, { ResetPasswordInterface } from '../interfaces/Login';

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

export async function changePassword(details: ResetPasswordInterface) {
  return api.post(RESET_PASSWORD, details);
}

export async function resetPassword(email: string) {
  return api.get(RESET_PASSWORD, undefined, { email });
}
export async function verifyUserAPi(userId: string, code: string, password: string) {
  return api.post(CONFIRM_EMAIL, { userId, code, password });
}
