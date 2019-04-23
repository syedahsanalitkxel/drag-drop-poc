import { AxiosError, AxiosResponse } from 'axios';
import { identity, pickBy } from 'lodash-es';
import API from '../../api';
import { ASSESSMENTS, INSTRUCTIONS } from '../../api/endpoints';
import ResponseInterface, { PageDetailsInterface } from '../../api/ResponseInterface';
import { InstructionsInterface, Instructions } from './Interface';
const api = new API();

export async function getInstructions(
  filters?: any
): Promise<{
  data: Instructions[];
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

export async function addInstructions(instruments: InstructionsInterface) {
  return api.post(INSTRUCTIONS, instruments).then(
    (res: AxiosResponse) => {
      return res.data;
    },
    (error: AxiosError) => {
      throw error;
    }
  );
}
export async function editInstrctionsService(id: string): Promise<InstructionsInterface> {
  return api.get(INSTRUCTIONS, id).then(
    (res: AxiosResponse) => {
      return res.data;
    },
    (error: AxiosError) => {
      return error;
    }
  );
}
export async function updateInstructions(instruction: InstructionsInterface, id: string) {
  return api.put(INSTRUCTIONS, instruction, id).then(
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
