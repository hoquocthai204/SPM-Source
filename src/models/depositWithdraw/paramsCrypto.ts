import { NetworksCurrency } from './networksCurrency';

export interface ParamsCrypto {
  currencyId: number;
  currencyShorName: string;
  idWallet?: number;
  userId?: number;
  inforCoin?: {
    logoCoin: string;
    nameCoin: string;
    netWork: string;
  };
  networks?: NetworksCurrency;
}
