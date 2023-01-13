import { BaseRequestQueryParam, HttpResponse, StaticContent } from 'models';
import axiosClient from './axiosClient';

const staticContentApi = {
  aboutUs(language: string, params?: BaseRequestQueryParam): Promise<HttpResponse<StaticContent>> {
    const url = `/content/api/common/about-us/${language ?? 'en'}`;
    return axiosClient.get(url, { params });
  },
  ctpfPolicy(language: string, params?: BaseRequestQueryParam): Promise<HttpResponse<StaticContent>> {
    const url = `/content/api/common/aml-ctpf-policy/${language ?? 'en'}`;
    return axiosClient.get(url, { params });
  },
  ruleBuySell(language: string, params?: BaseRequestQueryParam): Promise<HttpResponse<StaticContent>> {
    const url = `/content/api/common/buy-sell-rule/${language ?? 'en'}`;
    return axiosClient.get(url, { params });
  },
  coinListingRules(language: string, params?: BaseRequestQueryParam): Promise<HttpResponse<StaticContent>> {
    const url = `/content/api/common/coin-listing-rule/${language ?? 'en'}`;
    return axiosClient.get(url, { params });
  },
  termAndCondition(language: string, params?: BaseRequestQueryParam): Promise<HttpResponse<StaticContent>> {
    const url = `/content/api/common/term-and-condition/${language ?? 'en'}`;
    return axiosClient.get(url, { params });
  },
  privacyPolicy(language: string, params?: BaseRequestQueryParam): Promise<HttpResponse<StaticContent>> {
    const url = `/content/api/common/privacy-policy/${language ?? 'en'}`;
    return axiosClient.get(url, { params });
  },
  fatcaPage(language: string, params?: BaseRequestQueryParam): Promise<HttpResponse<StaticContent>> {
    const url = `/content/api/common/fatca-content/${language ?? 'en'}`;
    return axiosClient.get(url, { params });
  },
};

export default staticContentApi;
