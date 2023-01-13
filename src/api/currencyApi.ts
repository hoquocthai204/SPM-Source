import { BaseRequestQueryParam, Currency, HttpResponse } from 'models';
import axiosClient from './axiosClient';

const currencyApi = {
  getAllCurrency(params: BaseRequestQueryParam): Promise<HttpResponse<Currency[]>> {
    const url = `/setting/api/common/currencies`;
    return axiosClient.get(url, { params });
  },
  getCurrencyByIdOrShortName(params: string): Promise<HttpResponse<Currency>> {
    const url = `/setting/api/common/currencies/${params}`;
    return axiosClient.get(url);
  },
};

export default currencyApi;
