import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from 'app/store';

export interface LoadingState {
  isLoading: boolean;
}

const initialState: LoadingState = {
  isLoading: false,
};

const loadingSlice = createSlice({
  name: 'loading',
  initialState,
  reducers: {
    setLoading: (state) => {
      state.isLoading = true;
    },
    resetLoading: (state) => {
        state.isLoading = false;
      },
  },
});

export const { setLoading, resetLoading } = loadingSlice.actions;
// Reducer
export default loadingSlice.reducer;
