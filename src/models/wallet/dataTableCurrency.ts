export interface DataTableCurrency {
  available: number;
  coin: {
    logoCoin: string;
    nameCoin: string;
    netWork: string;
  };
  currencyId: number;
  fullName: string;
  idUserWallet: number;
  inOrder: number;
  key: number;
  networks: any;
  shortName: string;
  thbValue: number;
  total: number;
  valuation: number | null;
}
