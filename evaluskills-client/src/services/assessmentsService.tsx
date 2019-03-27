import { AxiosError, AxiosResponse } from 'axios';

import API from '../API';
import { ASSESSMENTS } from '../API/endpoints';
import ErrorObject from '../API/ErrorObject';
import AssessmentItemInterface from '../interfaces/AssessmentItem';

const api = new API();

export async function getAssessments() {
  return api.get(ASSESSMENTS).then(
    (res: AxiosResponse) => {
      return res.data;
    },
    (error: AxiosError) => {
      return new ErrorObject(error);
    }
  );
}

export async function addAssessment(assessment: AssessmentItemInterface) {
  return api.post(ASSESSMENTS, assessment).then(
    (res: AxiosResponse) => {
      return res.data;
    },
    (error: AxiosError) => {
      return new ErrorObject(error);
    }
  );
}
