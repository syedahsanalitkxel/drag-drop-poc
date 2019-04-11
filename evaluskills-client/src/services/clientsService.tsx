import { AxiosError, AxiosResponse } from 'axios';
import { CLIENTS } from '../api/endpoints';

import API from '../api';
import ClientInterface from '../interfaces/Client';
import AddClientInterface from '../interfaces/AddEditClient';
import { contentType } from '../enums';
const api = new API();

export async function getClients(): Promise<ClientInterface[]> {
  return api.get(CLIENTS).then(
    (res: AxiosResponse) => {
      return res.data;
    },
    (error: AxiosError) => {
      return error;
    }
  );
}

export async function getClientById(id: string): Promise<AddClientInterface> {
  return api.get(CLIENTS, id).then(
    (res: AxiosResponse) => {
      return res.data;
    },
    (error: AxiosError) => {
      return error;
    }
  );
}

export async function getFilteredClient(params: any): Promise<AddClientInterface> {
  return api.get(CLIENTS, undefined, params).then(
    (res: AxiosResponse) => {
      return res.data;
    },
    (error: AxiosError) => {
      return error;
    }
  );
}

export async function addClient(client: FormData) {
  const headers = { contentType: contentType.multipart };
  const multipartApi = new API({ headers });

  return multipartApi.post(CLIENTS, client).then(
    (res: AxiosResponse) => {
      return res.data;
    },
    (error: AxiosError) => {
      return error;
    }
  );
}

export async function editClient(client: FormData, id: any) {
  const headers = { contentType: contentType.multipart };
  const multipartApi = new API({ headers });

  return multipartApi.put(CLIENTS, client, id).then(
    (res: AxiosResponse) => {
      return res.data;
    },
    (error: AxiosError) => {
      return error;
    }
  );
}
