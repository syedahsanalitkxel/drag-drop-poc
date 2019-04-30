import { AxiosError, AxiosResponse } from 'axios';
import { ASSESSMENTITEMS, INSTRUMENTS } from '../api/endpoints';

import API from '../api';
import { ClientInstruments } from '../interfaces/Instruments';
import InstrumentFiltersInterface from '../interfaces/InstrumentFilters';
import ResponseInterface from '../api/ResponseInterface';
const api = new API();

export async function getInstruments(): Promise<ClientInstruments[]> {
  return api.get(INSTRUMENTS).then(
    (res: AxiosResponse) => {
      return res.data;
    },
    (error: AxiosError) => {
      return error;
    }
  );
}

export async function getInstrumentById(id: string): Promise<ClientInstruments> {
  return api.get(INSTRUMENTS, id).then(
    (res: AxiosResponse) => {
      return res.data;
    },
    (error: AxiosError) => {
      return error;
    }
  );
}

export async function getFilteredInstruments(filters?: InstrumentFiltersInterface) {
  return api.get(INSTRUMENTS, undefined, filters).then(
    (res: ResponseInterface) => {
      return {
        instrumentData: res.data,
        pageDetails: res.pageDetails,
      };
    },
    (error: AxiosError) => {
      return error;
    }
  );
}

export async function addEvaluator(user: any, token: any) {
  let url: any = ASSESSMENTITEMS;
  url += `/${token}/AddEvaluator`;
  return api.put(url, user).then(
    (res: AxiosResponse) => {
      return res.data;
    },
    (error: AxiosError) => {
      return error;
    }
  );
}

export async function editInstrument(user: any, id: any) {
  return api.put(INSTRUMENTS, user, id).then(
    (res: AxiosResponse) => {
      return res.data;
    },
    (error: AxiosError) => {
      return error;
    }
  );
}

export async function InstrumentLookUps() {
  let url: any = INSTRUMENTS;
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
