import {
  HttpResponse,
  ReCaptchaResponse,
  ReCaptchaHeader,
  BodySendRequest2FA,
  Reset2FAResponse,
} from 'models';
import axiosClient, { handleRequest } from './axiosClient';
import axiosFormDataClient from './axiosFormDataClient';

import { AxiosRequestConfig } from 'axios';

const reset2faApi = {
  getRecatcha(): Promise<HttpResponse<ReCaptchaResponse[]>> {
    const url = `/setting/api/common/recaptcha-settings`;
    return handleRequest(axiosClient.get(url));
  },
  inititalReset2FA(body: BodySendRequest2FA, headers: AxiosRequestConfig<BodySendRequest2FA>) {
    const url = `user/api/common/2fa/actions/reset/send-request`;
    return handleRequest(axiosClient.post(url, body, headers));
  },
  submitReset2FA(body: any): Promise<HttpResponse<Reset2FAResponse>> {
    const url = `user/api/common/2fa/actions/reset/submit-request`;
    return handleRequest(axiosFormDataClient.post(url, body));
  },
};

export default reset2faApi;
