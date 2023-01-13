import { createSlice } from '@reduxjs/toolkit';

export interface setUp2FAStep {
  step: number;
}

const initialState: setUp2FAStep = {
  step: 0,
};

const SetUp2FASlice = createSlice({
  name: 'SetUp2FASlice',
  initialState,
  reducers: {
    setStep: (state, action) => {
      state.step = action.payload;
    },
  },
  extraReducers: {},
});

// Actions
export const { setStep } = SetUp2FASlice.actions;

// Selectors

// Reducer
const SetUp2FAReducer = SetUp2FASlice.reducer;
export default SetUp2FAReducer;
