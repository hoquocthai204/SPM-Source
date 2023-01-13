export interface UserWalletsResponse {
  id: string;
  currency: string;
  currencyFN: string;
  blockedBalance: number;
  availableBalance: number;
  valuation: number;
  type: string;
}
