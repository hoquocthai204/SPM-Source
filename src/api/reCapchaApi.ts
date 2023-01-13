import { HttpResponse, ReCaptchaResponse } from 'models';
import axiosClient from './axiosClient';

const reCapchaApi = {
  getReCapcha(): Promise<HttpResponse<ReCaptchaResponse>> {
    const url = `/setting/api/common/recaptcha-settings`;
    return axiosClient.get(url);
  },
};

export default reCapchaApi;
