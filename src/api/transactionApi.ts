import {
  BaseRequestQueryParam,
  CryptoTransaction,
  FiatTransaction,
  HttpResponse,
  OrderTransactions,
} from 'models';
import axiosClient from './axiosClient';

const transactionApi = {
  getCryptoTransactions(params: BaseRequestQueryParam): Promise<HttpResponse<CryptoTransaction[]>> {
    const url = `/wallet/api/public/crypto/transactions`;
    return axiosClient.get(url, { params });
  },

  getFiatTransactions(params: BaseRequestQueryParam): Promise<HttpResponse<FiatTransaction[]>> {
    const url = `/fiat/api/public/fiat/transactions`;
    return axiosClient.get(url, { params });
  },

  getOrderTransactions(params: BaseRequestQueryParam): Promise<HttpResponse<OrderTransactions[]>> {
    const url = `/lp/api/public/orders/`;
    return axiosClient.get(url, { params });
  },

  getDataExportCryptoTransaction(
    params: BaseRequestQueryParam
  ): Promise<HttpResponse<CryptoTransaction[]>> {
    const url = `/wallet/api/public/crypto/transactions/export`;
    return axiosClient.get(url, { params });
  },

  getDataExportFiatTransaction(
    params: BaseRequestQueryParam
  ): Promise<HttpResponse<FiatTransaction[]>> {
    const url = `/fiat/api/public/fiat/transactions/export`;
    return axiosClient.get(url, { params });
  },

  getDataExportOrderTransaction(
    params: BaseRequestQueryParam
  ): Promise<HttpResponse<OrderTransactions[]>> {
    const url = `/lp/api/public/orders/export`;
    return axiosClient.get(url, { params });
  },
};

export default transactionApi;
