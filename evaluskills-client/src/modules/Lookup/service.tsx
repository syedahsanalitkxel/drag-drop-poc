import { AxiosError, AxiosResponse } from 'axios';
import API from '../../api';
import { LOOK_UPS } from '../../api/endpoints';
import { LookupInterface } from './interface';

const api = new API();

export async function getLookups(): Promise<LookupInterface> {
  return api.get(LOOK_UPS).then(
    (res: AxiosResponse) => {
      return res.data;
    },
    (error: AxiosError) => {
      throw error;
    }
  );
}