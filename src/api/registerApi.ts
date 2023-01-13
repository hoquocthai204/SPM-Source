import { AxiosRequestConfig } from 'axios';
import {
  Email,
  HttpResponse,
  ReCaptchaResponse,
  RegisterInformation,
  ResendPhoneNumber,
  VerifyInformation,
} from 'models';
import axiosClient, { handleRequest } from './axiosClient';

const registerApi = {
  register(body: RegisterInformation, headers: AxiosRequestConfig<RegisterInformation>) {
    const url = `/user/api/common/account/register`;
    return handleRequest(axiosClient.post(url, body, headers));
  },
  getRecapcha(): Promise<HttpResponse<ReCaptchaResponse[]>> {
    const url = `/setting/api/common/recaptcha-settings`;
    return handleRequest(axiosClient.get(url));
  },

  verify(body: VerifyInformation) {
    const url = `/user/api/common/account/verify`;
    return handleRequest(axiosClient.post(url, body));
  },
  resendEmail(params: Email) {
    const url = `/user/api/common/account/email/resend`;
    return axiosClient.get(url, { params });
  },
  resendPhone(body: ResendPhoneNumber) {
    const url = `/user/api/common/account/phone/resend`;
    return axiosClient.post(url, body);
  },
};

export default registerApi;
