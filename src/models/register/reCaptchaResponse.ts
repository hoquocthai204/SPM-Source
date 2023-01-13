export type ApiMethodType = 'POST' | 'GET' | 'DELETE' | 'PUT';

export interface ReCaptchaResponse {
  apiMethod: ApiMethodType;
  apiUri: string;
  enable: boolean;
  friendlyName: string;
  id: number;
}
