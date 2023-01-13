import { createSlice } from '@reduxjs/toolkit';

export interface StaticState {}

const initialState: StaticState = {};

const staticSlice = createSlice({
  name: 'static',
  initialState,
  reducers: {},
  extraReducers: {},
});

// Actions
export const staticActions = staticSlice.actions;

// Selectors

// Reducer
const staticReducer = staticSlice.reducer;
export default staticReducer;
