import { createSlice } from '@reduxjs/toolkit';
import { RootState } from 'app/store';

export interface kycState {
  reqTxnId: string;
  verificationTime: Number;
  kycStatus: string;
  kycInfo: any;
  step: number;
  dateString: string;
}

const initialState: kycState = {
  reqTxnId: '',
  verificationTime: 0,
  kycStatus: '',
  kycInfo: {},
  step: 0,
  dateString: '',
};

const kycSlice = createSlice({
  name: 'kyc',
  initialState,
  reducers: {
    setReqTxnId(state, action) {
      state.reqTxnId = action.payload;
    },
    setVerificationTime(state, action) {
      state.verificationTime = action.payload;
    },
    setKycStatus(state, action) {
      state.kycStatus = action.payload;
    },
    setKycInfo(state, action) {
      state.kycInfo = action.payload;
    },
    setStep: (state, action) => {
      state.step = action.payload;
    },
    getDate: (state, action) => {
      state.dateString = action.payload;
    },
  },
  extraReducers: {},
});

// Actions
export const kycActions = kycSlice.actions;
export const { setStep, getDate } = kycSlice.actions;
// Selectors
export const kycStates = (state: any) => state.kyc;
export const selectStep = (state: RootState) => state.kyc.step;
export const selectDate = (state: RootState) => state.kyc.dateString;
// Reducer
const kycReducer = kycSlice.reducer;
export default kycReducer;
