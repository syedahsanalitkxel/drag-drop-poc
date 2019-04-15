import { AxiosResponse } from 'axios';

export interface PageDetailsInterface {
  currentPage: number;
  nextPageLink?: number;
  pageSize: number;
  previousPageLink?: number;
  totalCount?: number;
  totalPages?: number;
}

export default interface ResponseInterface extends AxiosResponse {
  pageDetails?: PageDetailsInterface;
}
