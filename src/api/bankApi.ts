import { AxiosRequestConfig } from 'axios';
import { AllBank, BankInfo, BankResponse, BaseRequestQueryParam, HttpResponse, UserBank } from 'models';
import axiosClient, { handleRequest } from './axiosClient';
import axiosFormDataClient from './axiosFormDataClient';

const bankApi = {
  getAllBanksAvailable(params: BaseRequestQueryParam): Promise<HttpResponse<AllBank[]>> {
    const url = `/wallet/api/public/banks`;
    return axiosClient.get(url, { params });
  },
  getAllUserBanks(params: BaseRequestQueryParam): Promise<HttpResponse<UserBank[]>> {
    const url = `/wallet/api/public/user/banks`;
    return axiosClient.get(url, { params });
  },
  addBank(body: any, headers: AxiosRequestConfig<BankInfo>): Promise<HttpResponse<BankResponse>> {
    const url = `/wallet/api/public/user/banks`;
    return handleRequest(axiosFormDataClient.post(url, body, headers));
  },
  deleteUserBankById(bankId: string): Promise<HttpResponse<UserBank[]>> {
    const url = `/wallet/api/public/user/banks/${bankId}`;
    return axiosClient.delete(url);
  },
};

export default bankApi;
