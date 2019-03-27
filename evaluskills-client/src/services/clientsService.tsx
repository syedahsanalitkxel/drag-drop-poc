import { AxiosError, AxiosResponse } from 'axios';

import API from '../API';
import { CLIENTS } from '../API/endpoints';
import ErrorObject from '../API/ErrorObject';
import ClientList from "../interfaces/Client";


const api = new API();

export async function getClients() {
    return api.get(CLIENTS).then(
        (res: AxiosResponse) => {
            return res.data;
        },
        (error: AxiosError) => {
            return new ErrorObject(error);
        },
    );
}
//
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
