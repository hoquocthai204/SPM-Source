import { createSlice } from '@reduxjs/toolkit';

export interface MarketState {
  timeFilter: number;
  watchlistFilter: string;
  coinNameSearch: string;
  coinSelected: object;
}

const initialState: MarketState = {
  timeFilter: 24,
  watchlistFilter: 'Watchlist',
  coinNameSearch: '',
  coinSelected: {},
};

const marketSlice = createSlice({
  name: 'market',
  initialState,
  reducers: {
    setTimeFilter(state, action) {
      state.timeFilter = action.payload;
    },
    setWatchlistFilter(state, action) {
      state.watchlistFilter = action.payload;
    },
    setCoinNameSearch(state, action) {
      state.coinNameSearch = action.payload;
    },
    setCoinSelected(state, action) {
      state.coinSelected = action.payload;
    },
  },
  extraReducers: {},
});

// Actions
export const marketActions = marketSlice.actions;

// Selectors
export const marketStates = (state: any) => state.market;

// Reducer
const marketReducer = marketSlice.reducer;
export default marketReducer;
