import { BaseRequestQueryParam, HttpResponse, Notification, NotificationResponse, NotiInformation } from 'models';
import axiosClient, { handleRequest } from './axiosClient';

const notificationApi = {
  getNotification(params: BaseRequestQueryParam): Promise<HttpResponse<Notification[]>> {
    const url = `/notification/api/public/notification-data`;
    return axiosClient.get(url, { params });
  },
  getNotiUnread(params: BaseRequestQueryParam): Promise<HttpResponse<Notification>> {
    const url = `/notification/api/public/notification-data/unread`;
    return axiosClient.get(url, { params });
  },
  markReadAllNotification(body: NotiInformation): Promise<HttpResponse<NotificationResponse>> {
    const url = `/notification/api/public/notification-data/mark-read-all`;
    return handleRequest(axiosClient.post(url, body));
  },
  readNotification(notiId: string): Promise<HttpResponse<Notification>> {
    const url = `/notification/api/public/notification-data/${notiId}`;
    return axiosClient.get(url);
  },
};

export default notificationApi;
