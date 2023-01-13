export interface UserWalletDetails {
  availableBalance: number | 0;
  blockedBalance: number | 0;
  currency: string;
  currencyFN: string | number | null;
  id?: number;
  type: string;
  valuation: number | null;
  totalBalanceInTHB?: number;
}
