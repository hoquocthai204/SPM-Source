import {
  ActionUserFavoriteCurrency,
  BaseRequestQueryParam,
  HttpResponse,
  UserFavoriteCurrency,
} from 'models';
import axiosClient, { handleRequest } from './axiosClient';

const userFavoriteCurrenciesApi = {
  getAllUserFavoriteCurrencies(
    params: BaseRequestQueryParam
  ): Promise<HttpResponse<UserFavoriteCurrency[]>> {
    const url = `/setting/api/public/currencies/user-favorites`;
    return axiosClient.get(url, { params });
  },
  postUserFavoriteCurrencies(body: ActionUserFavoriteCurrency) {
    const url = `/setting/api/public/currencies/user-favorites`;
    return handleRequest(axiosClient.post(url, body));
  },
  deleteUserFavoriteCurrencies(body: ActionUserFavoriteCurrency) {
    const url = `/setting/api/public/currencies/user-favorites`;
    return handleRequest(axiosClient.delete(url, { data: body }));
  },
  getUserFavoriteCurrenciesByShortName(
    params: string
  ): Promise<HttpResponse<UserFavoriteCurrency>> {
    const url = `/setting/api/public/currencies/user-favorites/${params}`;
    return axiosClient.get(url);
  },
};

export default userFavoriteCurrenciesApi;
