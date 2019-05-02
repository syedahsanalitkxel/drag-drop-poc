import { AxiosError, AxiosResponse } from 'axios';

import API from '../../api';
import {
  INSTRUMENT_TEMPLATES,
  FETCH_SUMMARY,
  FETCH_EVALUATION,
  START_EVALUATION,
  QUESTION_EVALUATION,
  SUBMIT_EVALUATION,
} from '../../api/endpoints';
import ResponseInterface, { PageDetailsInterface } from '../../api/ResponseInterface';
//import { InstrumentTemplateFilterInterface, InstrumentTemplateInterface } from './interface';
import { StartEvaluationInterface, Summary, QuestionEvaluationInterface, QuestionSaveInterface } from './interface';

const api = new API();
const postobj = {
  instrumentId: 1002,
  evaluationItemId: 0,
  isSkipped: true,
  comments: 'string',
  evaluationItemElements: [
    {
      selectedValue: 0,
      selectedText: null,
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
export async function fetchSummary(token: string): Promise<{ data: Summary }> {
  return api.get(FETCH_SUMMARY(token), undefined, undefined).then(
    (res: ResponseInterface) => {
      return res.data;
    },
    (error: AxiosError) => {
      throw error;
    }
  );
}
export async function getQuestionEvaluation(token: string, saveNext: QuestionSaveInterface): Promise<{ data: string }> {
  return api.post(QUESTION_EVALUATION(token), saveNext).then(
    (res: ResponseInterface) => {
      return { data: res.data };
    },
    (error: AxiosError) => {
      throw error;
    }
  );
}
export async function submitEvaluation(token: string): Promise<{ data: string }> {
  return api.post(SUBMIT_EVALUATION(token), undefined).then(
    (res: ResponseInterface) => {
      return { data: res.data };
    },
    (error: AxiosError) => {
      throw error;
    }
  );
}
export async function fetchQuestionEvaluation(
  token: string,
  instrumentid: string,
  Itemid: string
): Promise<{ data: QuestionEvaluationInterface }> {
  return api.post(FETCH_EVALUATION(token, instrumentid, Itemid), undefined).then(
    (res: ResponseInterface) => {
      return { data: res.data };
    },
    (error: AxiosError) => {
      throw error;
    }
  );
}
