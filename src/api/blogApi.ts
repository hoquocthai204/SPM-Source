import { BaseRequestQueryParam, BlogContent, BlogDetailContent, HttpResponse } from 'models';
import axiosClient, { handleRequest } from './axiosClient';

const blogApi = {
  getAllBlog(lang: string, params?: BaseRequestQueryParam): Promise<HttpResponse<BlogContent[]>> {
    const url = `/content/api/common/blogs-content/${lang ?? 'en'}`;
    return handleRequest(axiosClient.get(url, params && { params }));
  },
  getBlog(id: number, lang: string): Promise<HttpResponse<BlogDetailContent>> {
    const url = `/content/api/common/blogs-content/${id}/${lang}`;
    return handleRequest(axiosClient.get(url));
  },
};

export default blogApi;
