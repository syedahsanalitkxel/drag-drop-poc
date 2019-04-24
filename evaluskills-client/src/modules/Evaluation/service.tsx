import { AxiosError, AxiosResponse } from 'axios';

import API from '../../api';
import { INSTRUMENT_TEMPLATES, START_EVALUATION, QUESTION_EVALUATION } from '../../api/endpoints';
import ResponseInterface, { PageDetailsInterface } from '../../api/ResponseInterface';
//import { InstrumentTemplateFilterInterface, InstrumentTemplateInterface } from './interface';
import { StartEvaluationInterface, QuestionEvaluationInterface } from './interface';

const api = new API();
const postobj = {
  instrumentId: 1,
  evaluationItemId: 0,
  isSkipped: true,
  comments: 'string',
  evaluationItemElements: [
    {
      selectedValue: 0,
      selectedText: 'string',
      evaluationItemElementId: 0,
    },
  ],
};
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
export async function getStartEvaluation(token: string): Promise<{ data: StartEvaluationInterface }> {
  return api.get(START_EVALUATION(token), undefined, undefined).then(
    (res: ResponseInterface) => {
      return res.data;
    },
    (error: AxiosError) => {
      throw error;
    }
  );
}
export async function getQuestionEvaluation(token: string): Promise<{ data: QuestionEvaluationInterface }> {
  return api.post(QUESTION_EVALUATION(token), postobj).then(
    (res: ResponseInterface) => {
      return res.data;
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
