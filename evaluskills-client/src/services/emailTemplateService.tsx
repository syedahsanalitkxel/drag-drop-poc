import { AxiosError, AxiosResponse } from 'axios';
import { EMAIL } from '../api/endpoints';

import API from '../api';
import { EmailFiterInterface, EmailListingInterface } from '../interfaces/Email';
import ResponseInterface, { PageDetailsInterface } from '../api/ResponseInterface';
const api = new API();

export async function getEmails(): Promise<EmailListingInterface[]> {
  return api.get(EMAIL).then(
    (res: AxiosResponse) => {
      return res.data;
    },
    (error: AxiosError) => {
      return error;
    }
  );
}

export async function getEmailById(id: string): Promise<EmailListingInterface> {
  return api.get(EMAIL, id).then(
    (res: AxiosResponse) => {
      return res.data;
    },
    (error: AxiosError) => {
      return error;
    }
  );
}

export async function getFilteredEmails(filters?: EmailFiterInterface) {
  return api.get(EMAIL, undefined, filters).then(
    (res: ResponseInterface) => {
      return {
        emailData: res.data,
        pageDetails: res.pageDetails,
      };
    },
    (error: AxiosError) => {
      return error;
    }
  );
}

export async function addEmail(email: any) {
  return api.post(EMAIL, JSON.stringify(email)).then(
    (res: AxiosResponse) => {
      return res.data;
    },
    (error: AxiosError) => {
      return error;
    }
  );
}

export async function editEmail(email: any, id: any) {
  return api.put(EMAIL, email, id).then(
    (res: AxiosResponse) => {
      return res.data;
    },
    (error: AxiosError) => {
      return error;
    }
  );
}
