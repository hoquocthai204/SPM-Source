import { BaseRequestQueryParam, GoogleAuthenInformation, GoogleAuthenResponse, GoogleAuthenSecret, HttpResponse } from 'models';
import axiosClient, { handleRequest } from './axiosClient';

const googleAuthenAPI = {
  getSecretGoogleAuthen(params: BaseRequestQueryParam): Promise<HttpResponse<GoogleAuthenSecret>> {
    const url = `/user/api/public/2fa/google/secret`;
    return axiosClient.get(url, { params });
  },
  enableGoogleAuthentication(body: GoogleAuthenInformation): Promise<HttpResponse<GoogleAuthenResponse>> {
    const url = `/user/api/public/2fa/google/enable`;
    return handleRequest(axiosClient.post(url, body));
  },
};

export default googleAuthenAPI;
