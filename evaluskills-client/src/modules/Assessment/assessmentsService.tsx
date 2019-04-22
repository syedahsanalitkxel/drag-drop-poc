import { AxiosError, AxiosResponse } from 'axios';
import { identity, pickBy } from 'lodash-es';
import API from '../../api';
import { ASSESSMENTS } from '../../api/endpoints';
import ResponseInterface, { PageDetailsInterface } from '../../api/ResponseInterface';
import AssessmentItemInterface from './interface';

const api = new API();

export async function getAssessments(
  filters?: any
): Promise<{
  data: AssessmentItemInterface[];
  pageDetails?: PageDetailsInterface;
}> {
  return api.get(ASSESSMENTS, undefined, pickBy(filters, identity)).then(
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
export async function updateAssessment(assessment: any, id: string) {
  return api.put(ASSESSMENTS, assessment, id).then(
    (res: AxiosResponse) => {
      return {
        data: res.data,
      };
    },
    (error: AxiosError) => {
      throw error;
    }
  );
}

export async function editAssessmentService(id: string): Promise<any> {
  return api.get(ASSESSMENTS, id).then(
    (res: AxiosResponse) => {
      return res.data;
    },
    (error: AxiosError) => {
      return error;
    }
  );
}

export async function deleteAssessmentService(id: any): Promise<any> {
  return api.delete(ASSESSMENTS, id).then(
    (res: AxiosResponse) => {
      return res.data;
    },
    (error: AxiosError) => {
      return error;
    }
  );
}

export async function getFilteredAssessment(
  filters?: any
): Promise<{ data: AssessmentItemInterface[]; pageDetails?: PageDetailsInterface }> {
  return api.get(ASSESSMENTS, undefined, filters).then(
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
