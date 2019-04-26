import { AxiosError, AxiosResponse } from 'axios';
import { CLIENTS, STATE_LOOK_UPS } from '../../api/endpoints';

import API from '../../api';
import ClientInterface from './clientListInterface';
import AddClientInterface from './addClientInterface';
import { contentType } from '../../enums';
import ResponseInterface, { PageDetailsInterface } from '../../api/ResponseInterface';
import { ClientFilters } from './clientFilterInterface';
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

export async function getFilteredClient(filters?: ClientFilters) {
  return api.get(CLIENTS, undefined, filters).then(
    (res: ResponseInterface) => {
      return {
        clientsData: res.data,
        pageDetails: res.pageDetails,
      };
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

export async function deleteClient(id: any) {
  return api.delete(CLIENTS, id).then(
    (res: AxiosResponse) => {
      return res.data;
    },
    (error: AxiosError) => {
      return error;
    }
  );
}
export async function getStates(id: any) {
  return api.get(STATE_LOOK_UPS, undefined, { countryId: id }).then(
    (res: AxiosResponse) => {
      return res.data;
    },
    (error: AxiosError) => {
      return error;
    }
  );
}
