import { BaseRequestQueryParam, CurrentSession, HttpResponse, PastSession } from 'models';
import axiosClient from './axiosClient';

const sessionHistoryApi = {
  getAllCurrentSession(): Promise<HttpResponse<CurrentSession[]>> {
    const url = `/user/api/public/session/active`;
    return axiosClient.get(url);
  },
  getAllPastSession(params: BaseRequestQueryParam): Promise<HttpResponse<PastSession[]>> {
    const url = `/user/api/public/session/inactive`;
    return axiosClient.get(url, { params });
  },
  deleteAllPastSession(): Promise<HttpResponse<PastSession[]>> {
    const url = `/user/api/public/session/destroy`;
    return axiosClient.delete(url);
  },
  deletePastSessionById(sessionId: string): Promise<HttpResponse<PastSession[]>> {
    const url = `/user/api/public/session/destroy/${sessionId}`;
    return axiosClient.delete(url);
  },
};

export default sessionHistoryApi;
