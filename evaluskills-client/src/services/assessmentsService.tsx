import { AxiosError, AxiosResponse } from 'axios';

import API from '../api';
import { ASSESSMENTS } from '../api/endpoints';
import AssessmentItemInterface, { AddAssessmentItemInterface } from '../interfaces/AssessmentItem';

const api = new API();

export async function getAssessments(): Promise<AssessmentItemInterface[]> {
  return api.get(ASSESSMENTS).then(
    (res: AxiosResponse) => {
      return res.data;
    },
    (error: AxiosError) => {
      throw error;
    }
  );
}

export async function addAssessment(assessment: any) {
  return api.post(ASSESSMENTS, assessment).then(
    (res: AxiosResponse) => {
      return res.data;
    },
    (error: AxiosError) => {
      throw error;
    }
  );
}
export async function editAssessment(id: string): Promise<AddAssessmentItemInterface> {
  return api.get(ASSESSMENTS, id).then(
    (res: AxiosResponse) => {
      return res.data;
    },
    (error: AxiosError) => {
      return error;
    }
  );
}

export async function getFilteredAssessment(params: any): Promise<AssessmentItemInterface[]> {
  return api.get(ASSESSMENTS, undefined, params).then(
    (res: AxiosResponse) => {
      return res.data;
    },
    (error: AxiosError) => {
      return error;
    }
  );
}
