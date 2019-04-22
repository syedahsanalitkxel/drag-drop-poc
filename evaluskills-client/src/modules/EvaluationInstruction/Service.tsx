import { AxiosError, AxiosResponse } from 'axios';
import { identity, pickBy } from 'lodash-es';
import API from '../../api';
import { ASSESSMENTS, INSTRUCTIONS } from '../../api/endpoints';
import ResponseInterface, { PageDetailsInterface } from '../../api/ResponseInterface';

const api = new API();

export async function getInstructions(
  filters?: any
): Promise<{
  data: any;
  pageDetails?: PageDetailsInterface;
}> {
  return api.get(INSTRUCTIONS, undefined, pickBy(filters, identity)).then(
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

export async function addInstructions(instruments: any) {
  return api.post(INSTRUCTIONS, instruments).then(
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

export async function getFilteredAssessment(filters?: any): Promise<{ data: any; pageDetails?: PageDetailsInterface }> {
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
