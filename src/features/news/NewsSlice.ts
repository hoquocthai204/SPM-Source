import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from 'app/store';

export interface NewsState {
  pageNum: number;
}

const initialState: NewsState = {
  pageNum: 0,
};

const newsSlice = createSlice({
  name: 'news',
  initialState,
  reducers: {
    setPageNum(state, action: PayloadAction<number>) {
      state.pageNum = action.payload;
    },
  },
  extraReducers: {},
});

// Actions
export const newsActions = newsSlice.actions;

// Selectors
export const selectPageNum = (state: RootState) => state.news.pageNum;

// Reducer
export default newsSlice.reducer;
