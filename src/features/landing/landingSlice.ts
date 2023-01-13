import { createSlice } from '@reduxjs/toolkit';

export interface LandingState {}

const initialState: LandingState = {};

const landingSlice = createSlice({
  name: 'landing',
  initialState,
  reducers: {},
  extraReducers: {},
});

// Actions
export const landingActions = landingSlice.actions;

// Selectors

// Reducer
const landingReducer = landingSlice.reducer;
export default landingReducer;
