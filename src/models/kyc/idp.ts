import { IDPDetail } from './idpDetail';

export interface IDP {
  idpDetails: IDPDetail;
  idpId: string;
}

export interface IDPRes {
  idpOnBoards: IDP[];
  idpOnFlies: IDP[];
}
