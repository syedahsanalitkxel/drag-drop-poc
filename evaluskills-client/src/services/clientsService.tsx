import { AxiosError, AxiosResponse } from 'axios';
import { CLIENTS } from '../api/endpoints';

import API from '../api';
import AddClient from '../interfaces/AddEditClient';
import ClientInterface from '../interfaces/Client';
import AddClientInterface from '../interfaces/AddEditClient';
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

export async function addClient(client: AddClient) {
  return api.post(CLIENTS, client).then(
    (res: AxiosResponse) => {
      return res.data;
    },
    (error: AxiosError) => {
      return error;
    }
  );
}
