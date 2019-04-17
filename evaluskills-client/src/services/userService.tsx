import { AxiosError, AxiosResponse } from 'axios';
import { CLIENTS, LOOK_UPS, USERS } from '../api/endpoints';

import API from '../api';
import UserList from '../interfaces/UserList';
import AddUserInterface from '../interfaces/User';
import UserFilterInterface from '../interfaces/UserFilter';
import { PageDetailsInterface } from '../api/ResponseInterface';
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

export async function getFilteredUser(
  filters?: UserFilterInterface
): Promise<{ data: any; pageDetails?: PageDetailsInterface }> {
  return api.get(USERS, undefined, filters).then(
    (res: AxiosResponse) => {
      return res.data;
    },
    (error: AxiosError) => {
      return error;
    }
  );
}

export async function addUser(user: any) {
  return api.post(USERS, user).then(
    (res: AxiosResponse) => {
      return res.data;
    },
    (error: AxiosError) => {
      return error;
    }
  );
}

export async function editUser(user: any, id: any) {
  return api.put(USERS, user, id).then(
    (res: AxiosResponse) => {
      return res.data;
    },
    (error: AxiosError) => {
      return error;
    }
  );
}

export async function clientLookUps() {
  let url: any = CLIENTS;
  url += `/Lookup`;
  return api.get(url).then(
    (res: AxiosResponse) => {
      return res.data;
    },
    (error: AxiosError) => {
      return error;
    }
  );
}
