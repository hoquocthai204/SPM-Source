import {
  BaseRequestQueryParam,
  Countries,
  Country,
  HttpResponse,
  Language,
  Occupation,
  TitleName,
} from 'models';
import axiosClient, { handleRequest } from './axiosClient';

const settingApi = {
  getLanguages(): Promise<HttpResponse<Language[]>> {
    const url = `/setting/api/common/languages`;
    return handleRequest(axiosClient.get(url));
  },

  getNationality(params?: BaseRequestQueryParam): Promise<HttpResponse<Country[]>> {
    const url = `/setting/api/common/nationality`;
    return axiosClient.get(url, { params });
  },

  getTitleName(params?: BaseRequestQueryParam): Promise<HttpResponse<TitleName[]>> {
    const url = `/setting/api/public/titles`;
    return axiosClient.get(url, { params });
  },

  getCountry(params?: BaseRequestQueryParam): Promise<HttpResponse<Countries[]>> {
    const url = `/setting/api/common/countries`;
    return axiosClient.get(url, { params });
  },

  getOccupation(params?: BaseRequestQueryParam): Promise<HttpResponse<Occupation[]>> {
    const url = `/setting/api/public/occupations`;
    return axiosClient.get(url, { params });
  },
};

export default settingApi;
