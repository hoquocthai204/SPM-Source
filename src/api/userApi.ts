import {
  ChangePasswordInformation, HttpResponse,
  ReferralHistory, RegisterInformation, UserInformation
} from 'models';
import axiosClient, { handleRequest } from './axiosClient';

const userApi = {
  getUserDetail(): Promise<HttpResponse<UserInformation>> {
    const url = `/user/api/public/user-detail`;
    return handleRequest(axiosClient.get(url));
  },

  getReferralHistory(): Promise<HttpResponse<ReferralHistory[]>> {
    const url = `/user/api/public/referralCode/history`;
    return handleRequest(axiosClient.get(url));
  },
  changePassword(body: ChangePasswordInformation) {
    const url = `user/api/public/change-password`;
    return handleRequest(axiosClient.post(url, body));
  },
  register(body: RegisterInformation) {
    const url = `user/api/common/account/register`;
    return handleRequest(axiosClient.post(url, body));
  },
  updateLanguage(params: string) {
    const url = `user/api/public/user-detail/language?languageCode=${params}`
    return handleRequest(axiosClient.put(url))
  }
};

export default userApi;
