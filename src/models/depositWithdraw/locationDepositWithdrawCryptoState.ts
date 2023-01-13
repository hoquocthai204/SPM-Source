import { NetworksCurrency } from './networksCurrency';

export interface LocationDepositWithdrawCryptoState {
  state: {
    currencyId: number;
    currencyShorName: string;
    idWallet: number;
    userId: number;
    inforCoin?: {
      logoCoin: string;
      nameCoin: string;
      netWork: string;
    };
    networks?: NetworksCurrency;
  };
}
