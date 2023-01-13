import { HttpResponse, UserWalletsResponse } from 'models';
import axiosClient, { handleRequest } from './axiosClient';

const walletAPI = {
  getAllUserWallet(): Promise<HttpResponse<UserWalletsResponse[]>> {
    const url = `wallet/api/public/user-wallets`;
    return handleRequest(axiosClient.get(url));
  },
  getAllCurriences(params: { size: number }) {
    const url = `setting/api/common/currencies`;
    return handleRequest(axiosClient.get(url, { params }));
  },
  getChange24hBalance(params: { dt: Date }) {
    const url = `wallet/api/public/user-wallets/snapshot`;
    return handleRequest(axiosClient.get(url, { params }));
  },
  getSnapshotCurrency(currency: string, params: { dt: Date }) {
    const url = `wallet/api/public/user-wallets/snapshot/${currency}`;
    return handleRequest(axiosClient.get(url, { params }));
  },
};

export default walletAPI;
