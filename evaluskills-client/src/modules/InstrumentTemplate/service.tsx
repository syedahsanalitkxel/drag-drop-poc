import { AxiosError, AxiosResponse } from 'axios';

import API from '../../api';
import { INSTRUMENT_TEMPLATES } from '../../api/endpoints';
import { InstrumentTemplateFilterInterface, InstrumentTemplateInterface } from './interface';

const api = new API();

export async function getInstrumentTemplates(
  filters?: InstrumentTemplateFilterInterface
): Promise<InstrumentTemplateInterface[]> {
  return api.get(INSTRUMENT_TEMPLATES, undefined, filters).then(
    (res: AxiosResponse) => res.data,
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
