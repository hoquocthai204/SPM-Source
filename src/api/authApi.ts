import { AxiosRequestConfig } from 'axios';
import {
  HttpResponse,
  LoginInformation,
  ReCaptchaResponse,
  ResetPasswordParams,
  ResetPasswordInformation,
  EmailAuthen,
  BaseRequestQueryParam,
  EmailOTPInformation,
  EmailOTPResponse,
  EmailInformation,
  ChangePhoneResponse,
  ChangePhoneInformation,
  ChangePhone,
} from 'models';
import { LoginResponse } from 'models/authentication/loginResponse';
import axiosClient, { handleRequest } from './axiosClient';

const authApi = {
  login(body: LoginInformation): Promise<HttpResponse<LoginResponse>> {
    const url = `/auth/api/common/auth`;
    return handleRequest(axiosClient.post(url, body));
  },
  logout() {
    const url = `/auth/api/public/session/logout`;
    return handleRequest(axiosClient.put(url));
  },
  initialResetPassword(config: ResetPasswordParams) {
    const url = `user/common/user/reset-password`;
    return handleRequest(axiosClient.get(url, { ...config }));
  },
  resetPassword(body: ResetPasswordInformation) {
    const url = `user/common/user/reset-password`;
    return handleRequest(axiosClient.post(url, body));
  },
  resendEmailCode(params: EmailAuthen) {
    const url = `user/common/user/reset-password/email/resend`;
    return handleRequest(axiosClient.get(url, { params }));
  },
  resendPhoneCode(params: EmailAuthen) {
    const url = `user/common/user/reset-password/phone/resend`;
    return handleRequest(axiosClient.get(url, { params }));
  },
  getRecatcha(): Promise<HttpResponse<ReCaptchaResponse[]>> {
    const url = `/setting/api/common/recaptcha-settings`;
    return handleRequest(axiosClient.get(url));
  },
  getPhoneNumberOtp(params: BaseRequestQueryParam) {
    const url = `/user/api/public/phone/actions/update/send-request`;
    return handleRequest(axiosClient.get(url, { params }));
  },
  getResendPhoneOtp(params: BaseRequestQueryParam) {
    const url = `/user/api/public/phone/actions/update/resend`;
    return axiosClient.get(url, { params });
  },
  updatePhone(
    body: ChangePhoneInformation,
    headers: AxiosRequestConfig<ChangePhoneInformation>
  ): Promise<HttpResponse<ChangePhoneResponse>> {
    const url = `/user/api/public/phone/actions/update`;
    return handleRequest(axiosClient.put(url, body, headers));
  },
  getEmailOTP(params: BaseRequestQueryParam) {
    const url = `/user/api/public/email/actions/update/send-request`;
    return handleRequest(axiosClient.get(url, { params }));
  },
  getResendEmailOTP(body: EmailOTPInformation): Promise<HttpResponse<EmailOTPResponse>> {
    const url = `/user/api/public/email/actions/update/resend-email`;
    return handleRequest(axiosClient.post(url, body));
  },
  updateEmail(body: EmailInformation, headers: AxiosRequestConfig<EmailInformation>): Promise<HttpResponse<EmailOTPResponse>> {
    const url = `/user/api/public/email/actions/update/verify-token`;
    return handleRequest(axiosClient.put(url, body, headers));
  },
};

export default authApi;
