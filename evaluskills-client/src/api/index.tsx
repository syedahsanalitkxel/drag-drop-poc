import axios, { AxiosInstance, AxiosPromise, AxiosRequestConfig } from 'axios';

import { contentType } from '../enums';
import { BASE_URL } from './endpoints';
import errorResponseHandler from './errorHandler';

export default class API {
  private config: AxiosRequestConfig;
  private instance: AxiosInstance;

  constructor(
    config: AxiosRequestConfig = {
      headers: { contentType: contentType.json },
    }
  ) {
    const token = window.localStorage.getItem('token');
    this.config = {
      baseURL: config.baseURL || BASE_URL,
      headers: {
        Authorization: token ? `Bearer ${token}` : null,
        'Content-Type': contentType[config.headers.contentType] || contentType.json,
      },
      timeout: 2000,
    };

    this.instance = axios.create(this.config);
    this.instance.interceptors.response.use(response => response, errorResponseHandler);
  }

  public get(url: string, id?: string, params?: any): AxiosPromise {
    if (id) {
      url += `/${id}`;
    }
    return this.instance.get(url, { params });
  }

  public post(url: string, body: any): AxiosPromise {
    return this.instance.post(url, body);
  }

  public delete(url: string, id: string): AxiosPromise {
    return this.instance.delete(`${url}/${id}`);
  }

  public put(url: string, body: string): AxiosPromise {
    return this.instance.put(url, body);
  }

  public patch(url: string, body: string): AxiosPromise {
    return this.instance.patch(url, body);
  }
}
