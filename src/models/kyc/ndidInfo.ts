export interface NdidInfo {
  reqTxnId: string;
  verificationTime: number;
}

export interface InitNDIDRequest {
  identityNumber: string;
  idpId: string;
  marketingNameEn: string;
}

export interface NDIDResult {
  data: { remainSeconds: number };
  detail: string;
  type: string;
}
