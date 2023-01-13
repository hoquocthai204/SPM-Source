import { createSlice } from '@reduxjs/toolkit';

export interface cryptoState {
  amountSpend: number | null | undefined;
  price: number;
  fee: number;
  amountReceive: number | null | undefined;
}

const initialState: cryptoState = {
  amountSpend: null,
  price: 0,
  fee: 0,
  amountReceive: null,
};

const cryptoSlice = createSlice({
  name: 'tradeCrypto',
  initialState,
  reducers: {
    setAmountSpend(state, action) {
      state.amountSpend = action.payload;
    },
    setAmountReceive(state, action) {
      state.amountReceive = action.payload;
    },
    setFee(state, action) {
      state.fee = action.payload;
    },
    setPrice(state, action) {
      state.price = action.payload;
    },
    setDefault(state) {
      state.amountSpend = undefined;
      state.amountReceive = undefined;
      state.fee = 0;
    }
  },
  extraReducers: {},
});

// Actions
export const cryptoActions = cryptoSlice.actions;

// Selectors
export const cryptoStates = (state: any) => state.tradeCrypto;

// Reducer
const cryptoReducer = cryptoSlice.reducer;
export default cryptoReducer;
