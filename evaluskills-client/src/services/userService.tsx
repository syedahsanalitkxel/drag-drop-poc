import { AxiosError, AxiosResponse } from 'axios';
import { USERS } from '../api/endpoints';

import API from '../api';
import UserList from '../interfaces/UserList';
import AddUserInterface from '../interfaces/User';
import {
  InstrumentTemplateFilterInterface,
  InstrumentTemplateInterface,
} from '../modules/InstrumentTemplate/interface';
const api = new API();

export async function getUsers(): Promise<UserList[]> {
  return api.get(USERS).then(
    (res: AxiosResponse) => {
      return res.data;
    },
    (error: AxiosError) => {
      return error;
    }
  );
}

export async function getUserById(id: string): Promise<UserList> {
  return api.get(USERS, id).then(
    (res: AxiosResponse) => {
      return res.data;
    },
    (error: AxiosError) => {
      return error;
    }
  );
}

export async function getFilteredUser(params: any): Promise<UserList[]> {
  return api.get(USERS, undefined, params).then(
    (res: AxiosResponse) => {
      return res.data;
    },
    (error: AxiosError) => {
      return error;
    }
  );
}

export async function addUser(client: FormData) {
  return api.post(USERS, client).then(
    (res: AxiosResponse) => {
      return res.data;
    },
    (error: AxiosError) => {
      return error;
    }
  );
}
