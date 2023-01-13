export interface ResultSubmitWithdrawCrypto {
  address: string;
  amount: number;
  currency: string;
  network: string;
  tagMemo?: string;
  authenticationCode?: string;
  status?: string;
  fee?: number;
}
