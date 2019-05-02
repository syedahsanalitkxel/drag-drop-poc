import { AxiosError, AxiosResponse } from 'axios';

import API from '../../api';
import { INSTRUMENT_TEMPLATES } from '../../api/endpoints';
import ResponseInterface, { PageDetailsInterface } from '../../api/ResponseInterface';
import { InstrumentTemplateFilterInterface, InstrumentTemplateInterface } from './interface';

const api = new API();

export async function getInstrumentTemplates(
  filters?: InstrumentTemplateFilterInterface
): Promise<{ data: InstrumentTemplateInterface[]; pageDetails?: PageDetailsInterface }> {
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

export async function getInstrumentTemplateById(id: string): Promise<InstrumentTemplateInterface> {
  return api.get(INSTRUMENT_TEMPLATES, id).then(
    (res: AxiosResponse) => res.data,
    (error: AxiosError) => {
      throw error;
    }
  );
}

export async function deleteInstrumentTemplate(id: string): Promise<InstrumentTemplateInterface> {
  return api.delete(INSTRUMENT_TEMPLATES, id).then(
    (res: AxiosResponse) => res.data,
    (error: AxiosError) => {
      throw error;
    }
  );
}

export async function addInstrumentTemplates(instruments: InstrumentTemplateInterface) {
  return api.post(INSTRUMENT_TEMPLATES, instruments).then(
    (res: AxiosResponse) => {
      return res.data;
    },
    (error: AxiosError) => {
      throw error;
    }
  );
}

export async function updateInstrumentTemplates(instrument: InstrumentTemplateInterface, id: number) {
  return api.put(INSTRUMENT_TEMPLATES + '/' + id, instrument).then(
    (res: AxiosResponse) => res.data,
    (error: AxiosError) => {
      throw error;
    }
  );
}
export async function AddInstrument(instrument: any) {
  return api.post('Instruments', instrument).then(
    (res: AxiosResponse) => res.data,
    (error: AxiosError) => {
      throw error;
    }
  );
}
export async function instructionLookup() {
  return api.get('Instructions/Lookup', undefined).then(
    (res: AxiosResponse) => res.data,
    (error: AxiosError) => {
      throw error;
    }
  );
}
export async function fetchEmailTemplates(typeId: any) {
  return api.get('EmailTemplates/' + typeId + '/Lookup', undefined).then(
    (res: AxiosResponse) => res.data,
    (error: AxiosError) => {
      throw error;
    }
  );
}
