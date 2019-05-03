import { AxiosError, AxiosResponse } from 'axios';
import { ASSESSMENTITEMS, EVALUATIONS, INSTRUMENTS } from '../api/endpoints';

import API from '../api';
import { ClientInstruments } from '../interfaces/Instruments';
import InstrumentFiltersInterface from '../interfaces/InstrumentFilters';
import ResponseInterface from '../api/ResponseInterface';
import { values } from 'lodash-es';
import { contentType } from '../enums';
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
  const headers = { contentType: contentType.json };
  const multipartApi = new API({ headers });
  return multipartApi.get(INSTRUMENTS, id).then(
    (res: AxiosResponse) => {
      return res.data;
    },
    (error: AxiosError) => {
      return error;
    }
  );
}

export async function getFilteredInstruments(filters?: InstrumentFiltersInterface) {
  const headers = { contentType: contentType.json };
  const multipartApi = new API({ headers });
  return multipartApi.get(INSTRUMENTS, undefined, filters).then(
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

export async function removeEvaluator(token: any) {
  let url: any = EVALUATIONS;
  url += `/${token}`;
  return api.deleteByToken(url).then(
    (res: AxiosResponse) => {
      return res.data;
    },
    (error: AxiosError) => {
      return error;
    }
  );
}

export async function sendInstrument(id: string) {
  let url: any = INSTRUMENTS;
  url += `/${id}/SendInstrument`;
  return api.putByid(url).then(
    (res: AxiosResponse) => {
      return res.data;
    },
    (error: AxiosError) => {
      return error;
    }
  );
}

export async function updateInstrument(id: string, data: any) {
  let url: any = INSTRUMENTS;
  url += `/${id}/Details`;
  return api.put(url, data).then(
    (res: AxiosResponse) => {
      return res.data;
    },
    (error: AxiosError) => {
      return error;
    }
  );
}

export async function updateInstrumentAssessments(assessmentValues: any, id: string) {
  let url: any = INSTRUMENTS;
  url += `/${id}/AssessmentItems`;
  return api.putByid(url, assessmentValues).then(
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

export async function deleteInstrument(id: any) {
  return api.delete(INSTRUMENTS, id).then(
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
