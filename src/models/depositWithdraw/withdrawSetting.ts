export interface WithdrawSetting {
  autoWithdrawalEnabled: boolean;
  autoWithdrawalLimit: number;
  createdBy: string;
  createdDate: string;
  currencyId: number;
  currencySN: string;
  id: number;
  lastModifiedDate: string;
  maxWithdrawAmount: number;
  minWithdrawAmount: number;
  transactionPerHour: number;
  withdrawEnabled: boolean;
  withdrawFee: number;
}
