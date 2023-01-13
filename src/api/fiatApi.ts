import { AxiosRequestConfig } from 'axios';
import {
  BodySendRequestDepositFiat,
  BodySendRequestWithdrawFiat,
  ParamsCryptoTransaction,
} from 'models';
import axiosClient, { handleRequest } from './axiosClient';

const fiatApi = {
  getUserWalletDetails: (id: number) => {
    const url = `wallet/api/public/user-wallets/${id}`;
    return handleRequest(axiosClient.get(url));
  },
  getAllUserWallets: () => {
    const url = `/wallet/api/public/user-wallets`;
    return handleRequest(axiosClient(url));
  },
  searchTransactionForUser: (params: ParamsCryptoTransaction) => {
    const url = `/fiat/api/public/fiat/transactions`;
    return handleRequest(axiosClient.get(url, { params }));
  },
  getBankUser: () => {
    const url = `wallet/api/public/user/banks`;
    return handleRequest(axiosClient(url));
  },
  // information of fiat -> exp: minDeposit, depositEnabled
  getFiatDepositSettting: () => {
    const url = `/fiat/api/public/fiat/deposit-settings`;
    return handleRequest(axiosClient(url));
  },
  // setting system config
  getSettingSystemConfig: (key: string) => {
    const url = `/setting/api/common/configurations/system-config/${key}`;
    return handleRequest(axiosClient(url));
  },
  getSetting2fa: () => {
    const url = `/setting/api/public/2fa`;
    return handleRequest(axiosClient(url));
  },
  // post deposit fiat
  postDepositFiat: (body: BodySendRequestDepositFiat) => {
    const url = `/fiat/api/public/fiat/deposit`;
    return handleRequest(axiosClient.post(url, body));
  },
  // cancel deposit fiat
  cancelDepositFiat: (body: { transactionId: number }) => {
    const url = `/fiat/api/public/fiat/deposit/cancel`;
    return handleRequest(axiosClient.post(url, body));
  },
  // withdraw
  // --- daily limit
  getDailyLimit: () => {
    const url = `/fiat/api/public/fiat/user/daily-limit`;
    return handleRequest(axiosClient(url));
  },
  // --- withdraw setting
  getWithdrawSetting: () => {
    const url = `/fiat/api/public/fiat/withdrawal-settings`;
    return handleRequest(axiosClient(url));
  },
  // --- post withdraw fiat
  postWithdrawFiat: (
    body: BodySendRequestWithdrawFiat,
    headers: AxiosRequestConfig<BodySendRequestWithdrawFiat>
  ) => {
    const url = `/fiat/api/public/fiat/withdraw`;
    return handleRequest(axiosClient.post(url, body, headers));
  },
  // end withdraw
};

export default fiatApi;
