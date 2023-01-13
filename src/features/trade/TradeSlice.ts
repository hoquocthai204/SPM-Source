import { createSlice } from '@reduxjs/toolkit';

export interface TradeState {
  stepTrade: number;
  isDisabledButtonAmount: boolean;
}

const initialState: TradeState = {
  stepTrade: 0,
  isDisabledButtonAmount: true,
};

const tradeSlice = createSlice({
  name: 'trade',
  initialState,
  reducers: {
    setStepTrade(state, action) {
      state.stepTrade = action.payload;
    },
    setIsDisabledButtonAmount(state, action) {
      state.isDisabledButtonAmount = action.payload;
    },
  },
  extraReducers: {},
});

// Actions
export const tradeActions = tradeSlice.actions;

// Selectors
export const tradeStates = (state: any) => state.trade;
export const stepTradeState = (state: any) => state.trade.stepTrade;

export const isDisabledButtonAmountState = (state: any) => state.trade.isDisabledButtonAmount;

// Reducer
const tradeReducer = tradeSlice.reducer;
export default tradeReducer;
