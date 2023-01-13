import { createAsyncThunk, createSlice, PayloadAction, current } from '@reduxjs/toolkit';
import walletAPI from 'api/walletApi';
import { UserWalletsResponse, Currency, DataTableCurrency } from 'models';
import { setMarketPrices, setBestPrices } from 'features/socket/socketSlice';
import { calculatePriceToTHB } from 'utils';

export interface WalletState {
  userWallets: UserWalletsResponse[] | [];
  currenciesData: Array<Currency>;
  dataCurrenciesTable: { total?: number | 0; data?: any };
  fiatBalance: number;
  cryptoBalance: number;
  marketPrices: any;
  totalValueSnapshotInThb: number;
  totalValueSnapshotInThbCurrency: number;
  getTotalValueSnapshotInThb: (shorName: string | undefined, valuation: number) => number;
}

const initialState: WalletState = {
  userWallets: [],
  currenciesData: [],
  dataCurrenciesTable: {},
  fiatBalance: 0,
  cryptoBalance: 0,
  marketPrices: [],
  totalValueSnapshotInThb: 0,
  totalValueSnapshotInThbCurrency: 0,
  getTotalValueSnapshotInThb: (shorName: string | undefined, valuation: number | 0): number => {
    return valuation;
  },
};
export const getAllCurriencesExtra = createAsyncThunk(
  'setting/getAllCurriencesExtra',
  async (additionalData: any, thunkAPI) => {
    const { ok, body, error } = await walletAPI.getAllCurriences({
      ...additionalData,
    });
    if (ok && body) {
      return body;
    } else if (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);
const walletSlice = createSlice({
  name: 'wallet',
  initialState,
  reducers: {
    setUserWallets: (state, action: PayloadAction<UserWalletsResponse[] | []>) => {
      state.userWallets = action.payload;
    },
    setDataCurrenciesTable: (state, action) => {
      state.dataCurrenciesTable = action.payload;
    },
    setFiatBalance: (state, action: any) => {
      state.fiatBalance = action.payload;
    },
    setTotalValueSnapshotInThb: (state, action: PayloadAction<number>) => {
      state.totalValueSnapshotInThb = action.payload;
    },
    setTotalValueSnapshotInThbCurrency: (state, action: PayloadAction<number>) => {
      state.totalValueSnapshotInThbCurrency = action.payload;
    },
  },

  extraReducers: (builder) => {
    builder.addCase(getAllCurriencesExtra.fulfilled, (state, action) => {
      state.currenciesData = action.payload;
    });
    builder.addCase(getAllCurriencesExtra.rejected, (state, action) => {});
    builder.addCase(setMarketPrices, (state, action) => {
      state.marketPrices = Object.values({ ...action.payload });
    });

    builder.addCase(setBestPrices, (state, action) => {
      const marketPrices = current(state.marketPrices);
      const userWallets = current(state.userWallets);
      const bestPrice = action.payload;

      let _cryptoBalance = 0;

      if (userWallets.length !== 0 && bestPrice?.length !== 0) {
        const _arrCurrency: any = [];
        userWallets.forEach((wallet, index) => {
          if (wallet.type === 'CRYPTO') {
            const _currenyCrypto = marketPrices.find((v: any) => v[0] === wallet.currency);

            if (_currenyCrypto) {
              const _index = bestPrice?.findIndex((v) => v.coinPair.includes(_currenyCrypto[0]));

              if (bestPrice && _index !== -1 && _index !== undefined) {
                _arrCurrency.push({
                  shortName: wallet.currency,
                  availableBalance: wallet.availableBalance,
                  blockedBalance: wallet.blockedBalance,
                  priceTHB: bestPrice[_index].lpBuyPrice,
                });

                state.getTotalValueSnapshotInThb = (currency) => {
                  for (const wallet of _arrCurrency) {
                    if (currency === wallet.shortName) return wallet.priceTHB;
                  }
                  return 0;
                };

                _cryptoBalance =
                  _cryptoBalance +
                  calculatePriceToTHB(
                    wallet.availableBalance,
                    wallet.blockedBalance,
                    bestPrice[_index].lpBuyPrice
                  );
              } else {
                _arrCurrency.push({
                  shortName: wallet.currency,
                  availableBalance: wallet.availableBalance,
                  blockedBalance: wallet.blockedBalance,
                  priceTHB: wallet.valuation,
                });
                _cryptoBalance =
                  _cryptoBalance +
                  calculatePriceToTHB(
                    wallet.availableBalance,
                    wallet.blockedBalance,
                    wallet.valuation
                  );
              }
            }
          }
        });
        state.cryptoBalance = _cryptoBalance;
      }
    });
  },
});

// Actions
export const {
  setUserWallets,
  setDataCurrenciesTable,
  setFiatBalance,
  setTotalValueSnapshotInThb,
} = walletSlice.actions;

// Selectors
export const walletStates = (state: any) => state.wallet;

// Reducer
const walletReducer = walletSlice.reducer;
export default walletReducer;
