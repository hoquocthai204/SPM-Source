import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from 'app/store';
import { BestPrice, MarketPrice } from 'models';
import { uniqueId } from 'utils';

export interface SocketState {
  marketPrices: MarketPrice;
  bestPrices: BestPrice[] | null;
  updateBalanceSignal: string | null;
}

const initialState: SocketState = {
  marketPrices: {},
  bestPrices: null,
  updateBalanceSignal: null,
};

const socketSlice = createSlice({
  name: 'socket',
  initialState,
  reducers: {
    setMarketPrices: (state, action: PayloadAction<MarketPrice>) => {
      state.marketPrices = action.payload;
    },
    setBestPrices: (state, action: PayloadAction<BestPrice[] | null>) => {
      state.bestPrices = action.payload;
    },

    pushUpdateBalanceSignal: (state) => {
      state.updateBalanceSignal = uniqueId();
    },
  },
  extraReducers: {},
});

// Actions
export const { setMarketPrices, pushUpdateBalanceSignal, setBestPrices } = socketSlice.actions;

// Selectors
export const selectMarketPrices = (state: RootState) => state.socket.marketPrices;
export const selectBestPrices = (state: RootState) => state.socket.bestPrices;

// Reducer
export default socketSlice.reducer;
