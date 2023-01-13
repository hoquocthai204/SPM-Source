import axiosClient, { handleRequest } from './axiosClient';
import queryString from 'query-string';
import {
  BodySendRequestAddNewAddress,
  BodySendRequestWithdrawCrypto,
  ParamsCryptoTransaction,
  ParamsSendRequestAddressBook,
  ParamsUserWalletAddressForDeposit,
} from 'models';
import { AxiosRequestConfig } from 'axios';

const cryptoApi = {
  getUserWalletsDetail: (idWallet: number) => {
    const url = `/wallet/api/public/user-wallets/${idWallet}`;
    return handleRequest(axiosClient(url));
  },
  searchTransactionCrypto: (params: ParamsCryptoTransaction) => {
    const paramsSerializer = queryString.stringify(params);
    const url = `/wallet/api/public/crypto/transactions/?${paramsSerializer}`;
    return handleRequest(axiosClient.get(url));
  },
  getCryptoDepositSetting: (idCrypto: number) => {
    const url = `/wallet/api/public/crypto/deposit-settings/${idCrypto}`;
    return handleRequest(axiosClient.get(url));
  },
  getAddress: (currencyShortName: string, params: ParamsUserWalletAddressForDeposit) => {
    const url = `/wallet/api/public/user-wallets/address/${currencyShortName}`;
    return handleRequest(axiosClient.get(url, { params }));
  },
  generateAddresForDeposit: (
    currencyShortName: string,
    body: ParamsUserWalletAddressForDeposit
  ) => {
    const url = `/wallet/api/public/user-wallets/address/${currencyShortName}?network=${body.network}`;
    return handleRequest(axiosClient.post(url, body));
  },
  getCryptoWithdrawSetting: (idCrypto: number) => {
    const url = `/wallet/api/public/crypto/withdrawal-settings/${idCrypto}`;
    return handleRequest(axiosClient.get(url));
  },
  getTotalAmountWithdrawToday: () => {
    const url = `/wallet/api/public/crypto/withdraw/total-in-day`;
    return handleRequest(axiosClient.get(url));
  },
  postWithdrawCrypto: (
    body: BodySendRequestWithdrawCrypto,
    headers: AxiosRequestConfig<BodySendRequestWithdrawCrypto>
  ) => {
    const url = `/wallet/api/public/crypto/withdraw`;
    return handleRequest(axiosClient.post(url, body, headers));
  },
  saveNewAddress: (body: BodySendRequestAddNewAddress) => {
    const url = `/wallet/api/public/address-books`;
    return handleRequest(axiosClient.post(url, body));
  },
  getListAddressBook: (params: ParamsSendRequestAddressBook) => {
    const url = `/wallet/api/public/address-books`;
    return handleRequest(axiosClient(url, { params }));
  },
  getInformationOfCurrency: (shortName: string) => {
    const url = `/setting/api/common/currencies/${shortName}`;
    return handleRequest(axiosClient(url));
  },
  getAllUserWallet: () => {
    const url = `/wallet/api/public/user-wallets`;
    return handleRequest(axiosClient(url));
  },
};

export default cryptoApi;
