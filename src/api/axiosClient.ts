import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';
import { BadRequestFieldError } from 'models';
import { isEmptyObject } from 'utils';
import { HttpResponse } from '../models/http';
import parse from 'parse-link-header';
import queryString from 'query-string';
const axiosClient = axios.create({
  baseURL: process.env.REACT_APP_BASE_GATEWAY_URL || 'http://localhost:8080',
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true,
});

// Add a request interceptor
axiosClient.interceptors.request.use(
  function (config: AxiosRequestConfig) {
    // Do something before request is sent
    return config;
  },
  function (error) {
    // Do something with request error
    return Promise.reject(error);
  }
);

// Add a response interceptor
axiosClient.interceptors.response.use(
  function (response: AxiosResponse) {
    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data
    const data: HttpResponse<any> = {
      status: response.status,
      ok: true,
      body: response.data,
    };
    if (response.headers.link) {
      data.pagination = {
        paging: parse(response.headers.link),
        total: Number(response.headers['x-total-count']),
      };
    }
    return data;
  },
  function ({ response }) {
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // Do something with response error
    const { status, data } = response;
    const fieldErrors: BadRequestFieldError = {};

    if (data && data.fieldErrors) {
      for (let i = 0; i < data.fieldErrors.length; i++) {
        const { field, messageCode } = data.fieldErrors[0];
        if (fieldErrors[field]) fieldErrors[field].push(messageCode);
        else fieldErrors[field] = [messageCode];
      }
    }

    const error: HttpResponse<any> = {
      status,
      ok: false,
      error: {
        unauthorized: status === 401,
        badRequest: status === 400,
        notFound: status === 404,
        clientError: status >= 400 && status <= 499,
        serverError: status >= 500 && status <= 599,
        message: data.messageCode,
        title: data.messageCode + "-title",
        fieldErrors: isEmptyObject(fieldErrors) ? undefined : fieldErrors,
      },
    };

    return Promise.reject(error);
  }
);

export const handleRequest = (promise: Promise<any>) => {
  return promise
    .then((res: any) => res as HttpResponse<any>)
    .catch((err: any) => err as HttpResponse<any>);
};

export default axiosClient;
