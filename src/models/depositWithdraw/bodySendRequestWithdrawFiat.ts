export interface BodySendRequestWithdrawFiat {
  amount: number;
  bankId: number;
  currency: string;
  userId: number;
  id: number
  twoFaCode?: number;
  twoFA?: number;
}
