import { BaseRequestQueryParam, DocumentType, HttpResponse, KycInformation } from 'models';
import { ContentTC } from 'models/kyc/contentTC';
import { IdentityImageRes } from 'models/kyc/identityImageRes';
import { IDPRes } from 'models/kyc/idp';
import { KycResponse } from 'models/kyc/kycResponse';
import { InitNDIDRequest, NdidInfo } from 'models/kyc/ndidInfo';
import { Questionaire } from 'models/kyc/questionaire';
import { QuestionaireInformation } from 'models/kyc/questionnaireInformation';
import { QuestionaireResponse } from 'models/kyc/questionnaireResponse';
import axiosClient, { handleRequest } from './axiosClient';
import axiosFormDataClient from './axiosFormDataClient';

const kycApi = {
  getKycInfo(): Promise<HttpResponse<KycInformation>> {
    const url = `/user/api/public/kyc/`;
    return handleRequest(axiosClient.get(url));
  },

  saveKycProgress(data: any): Promise<HttpResponse<KycInformation>> {
    const url = `/user/api/public/kyc/actions/save-progress`;
    return handleRequest(axiosFormDataClient.post(url, data));
  },

  getNdidKycResult(): Promise<HttpResponse<any>> {
    const url = `/user/api/public/ndid/actions/check-result`;
    return handleRequest(axiosClient.get(url));
  },

  saveNdidKycProgress(data: any): Promise<HttpResponse<KycInformation>> {
    const url = `/user/api/public/ndid/actions/save-progress`;
    return handleRequest(axiosFormDataClient.post(url, data));
  },

  getIdps(data: String): Promise<HttpResponse<IDPRes>> {
    const url = `/user/api/public/ndid/actions/idps`;
    return handleRequest(axiosClient.post(url, { identityNumber: data }));
  },

  initNdid(data: InitNDIDRequest): Promise<HttpResponse<NdidInfo>> {
    const url = `/user/api/public/ndid/actions/initialize`;
    return handleRequest(axiosClient.post(url, data));
  },

  submitNdidKyc(data: KycInformation): Promise<HttpResponse<KycInformation>> {
    const url = `/user/api/public/ndid/actions/submit-kyc`;
    return handleRequest(axiosFormDataClient.post(url, data));
  },

  closeNdid(): Promise<HttpResponse<any>> {
    const url = `/user/api/public/ndid/actions/close-request`;
    return axiosClient.get(url);
  },
  getKycResult(params: BaseRequestQueryParam): Promise<HttpResponse<KycInformation>> {
    const url = `/user/api/public/ekycs/actions/check-result`;
    return axiosClient.get(url, { params });
  },
  getLastestKycInfo(params: BaseRequestQueryParam): Promise<HttpResponse<KycInformation>> {
    const url = `/user/api/public/kyc/`;
    return axiosClient.get(url, { params });
  },
  getDocumentType(params?: BaseRequestQueryParam): Promise<HttpResponse<DocumentType[]>> {
    const url = `/setting/api/public/document-types`;
    return axiosClient.get(url, { params });
  },
  saveProgressKyc(body: any, type?: string): Promise<HttpResponse<KycResponse>> {
    const url = `/user/api/public/${type}/actions/save-progress`;
    return handleRequest(axiosFormDataClient.post(url, body));
  },
  submitKyc(body?: any, type?: string): Promise<HttpResponse<KycResponse>> {
    const url = `/user/api/public/${type}/actions/submit${type === 'kyc' ? '' : '-kyc'}`;
    return handleRequest(axiosFormDataClient.post(url, body));
  },
  recognizeIdCardNumber(data: string): Promise<HttpResponse<IdentityImageRes>> {
    const url = '/user/api/public/ocr/recognize';
    return handleRequest(axiosClient.post(url, data));
  },
  getQuestionnaire(
    lang?: string,
    params?: BaseRequestQueryParam
  ): Promise<HttpResponse<Questionaire[]>> {
    const url = `/content/api/public/question/${lang}`;
    return axiosClient.get(url, { params });
  },
  submitSurveyQuestionnaire(
    body: QuestionaireInformation
  ): Promise<HttpResponse<QuestionaireResponse>> {
    const url = `/user/api/public/user-questionaire`;
    return handleRequest(axiosClient.post(url, body));
  },
  getNdidContentTC(data: string): Promise<HttpResponse<ContentTC>> {
    const url = `/content/api/common/ndid-content/${data}`;
    return handleRequest(axiosClient.get(url));
  },
};

export default kycApi;
