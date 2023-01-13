import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from 'app/store';

export interface SettingState {
  pastSessionPage: number;
  renderCurrent: Boolean;
  isKycVerified: boolean;
}

const initialState: SettingState = {
  pastSessionPage: 1,
  renderCurrent: true,
  isKycVerified: false,
};

const settingSlice = createSlice({
  name: 'setting',
  initialState,
  reducers: {
    setPastSessionPage: (state, action: PayloadAction<number>) => {
      state.pastSessionPage = action.payload;
    },
    setRenderCurrent: (state, action: PayloadAction<Boolean>) => {
      state.renderCurrent = action.payload;
    },
    setIsKycVerified: (state, action: PayloadAction<boolean>) => {
      state.isKycVerified = action.payload;
    },
  },
  extraReducers: {},
});

// Actions
export const { setPastSessionPage, setRenderCurrent, setIsKycVerified } = settingSlice.actions;

// Selectors
export const pastSessionPageStates = (state: RootState) => state.setting.pastSessionPage;
export const currentSessionRenderStates = (state: RootState) => state.setting.renderCurrent;
export const isKycVerifiedStates = (state: RootState) => state.setting.isKycVerified;

// Reducer
export default settingSlice.reducer;
