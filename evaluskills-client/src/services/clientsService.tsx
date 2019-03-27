import { AxiosError, AxiosResponse } from 'axios';

import API from '../api';
import { CLIENTS } from '../api/endpoints';
import errorObject from '../api/ErrorObject';
import ClientList from '../interfaces/Client';

const api = new API();

export async function getClients() {
  return api.get(CLIENTS).then(
    (res: AxiosResponse) => {
      return res.data;
    },
    (error: AxiosError) => {
      return errorObject(error);
    }
  );
}

// export async function addClient(client: ClientList) {
//     return api.post(CLIENTS, client).then(
//         (res: AxiosResponse) => {
//             return res.data;
//         },
//         (error: AxiosError) => {
//             return new ErrorObject(error);
//         }
//     );
// }
