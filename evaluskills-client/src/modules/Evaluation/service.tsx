import { AxiosError, AxiosResponse } from 'axios';

import API from '../../api';
import { INSTRUMENT_TEMPLATES, START_EVALUATION } from '../../api/endpoints';
import ResponseInterface, { PageDetailsInterface } from '../../api/ResponseInterface';
//import { InstrumentTemplateFilterInterface, InstrumentTemplateInterface } from './interface';

const api = new API();

export async function getInstrumentTemplates(
  filters?: any
): Promise<{ data: any[]; pageDetails?: PageDetailsInterface }> {
  return api.get(INSTRUMENT_TEMPLATES, undefined, filters).then(
    (res: ResponseInterface) => {
      return {
        data: res.data,
        pageDetails: res.pageDetails,
      };
    },
    (error: AxiosError) => {
      throw error;
    }
  );
}
export async function getStartEvaluation(filters?: any): Promise<{ data: any[]; pageDetails?: PageDetailsInterface }> {
  return api
    .get(
      START_EVALUATION(
        'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1bmlxdWVfbmFtZSI6ImluZm9AZXZhbHVza2lsbHMuY29tIiwiaWQiOiIxIiwiZW1haWwiOiJpbmZvQGV2YWx1c2tpbGxzLmNvbSIsImFjdGl2ZV9jbGllbnRfaWQiOiIiLCJyb2xlIjpbIlN1cGVyQWRtaW4iLCJTdXBlckFkbWluIl0sIm5iZiI6MTU1NTU4ODI5NiwiZXhwIjoxNTU2MTkzMDk2LCJpYXQiOjE1NTU1ODgyOTZ9.kG1O4LzvcazJI2EZpu1ruApxkO7v-jJnKKPagrVtxEo'
      ),
      undefined,
      filters
    )
    .then(
      (res: ResponseInterface) => {
        return {
          data: res.data,
          pageDetails: res.pageDetails,
        };
      },
      (error: AxiosError) => {
        throw error;
      }
    );
}

export async function getInstrumentTemplateById(id: string): Promise<any> {
  return api.get(INSTRUMENT_TEMPLATES, id).then(
    (res: AxiosResponse) => res.data,
    (error: AxiosError) => {
      throw error;
    }
  );
}

export async function deleteInstrumentTemplate(id: string): Promise<any> {
  return api.delete(INSTRUMENT_TEMPLATES, id).then(
    (res: AxiosResponse) => res.data,
    (error: AxiosError) => {
      throw error;
    }
  );
}

export async function addInstrumentTemplates(instruments: any) {
  return api.post(INSTRUMENT_TEMPLATES, instruments).then(
    (res: AxiosResponse) => {
      return res.data;
    },
    (error: AxiosError) => {
      throw error;
    }
  );
}

export async function updateInstrumentTemplates(instrument: any, id: number) {
  return api.put(INSTRUMENT_TEMPLATES + '/' + id, instrument).then(
    (res: AxiosResponse) => res.data,
    (error: AxiosError) => {
      throw error;
    }
  );
}
