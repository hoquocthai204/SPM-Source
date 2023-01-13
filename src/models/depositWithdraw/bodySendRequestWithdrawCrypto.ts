export interface BodySendRequestWithdrawCrypto {
  address: string;
  amount: number;
  currency: string;
  network: string;
  tagMemo?: string;
  tag?: string;
  // authenticationCode?: string;
  twoFaCode?: string;
}
