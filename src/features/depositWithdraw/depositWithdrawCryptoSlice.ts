import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ParamsCrypto, UserWalletDetails } from 'models';
import { DailyWithdrawCryptoToday } from 'models/depositWithdraw/dailyWithdrawCryptpToday';
import { TwoSetting } from 'models/depositWithdraw/twoSetting';

export interface DepositWithdrawCryptoState {
  paramsCryto: ParamsCrypto | any;
  userWalletDetailCrypto: UserWalletDetails | any;
  confirmationsDepositCrypto: number | string;
  confirmationsWithdrawCrypto: number | string;
  dailyWithdrawToday: DailyWithdrawCryptoToday | any;
  settingWithdrawCrypto: any;
  requiredEnabled2faCrypto: boolean;
  is2faCrypto: boolean;
}

const initialState: DepositWithdrawCryptoState = {
  paramsCryto: {},
  userWalletDetailCrypto: {},
  confirmationsDepositCrypto: 0,
  confirmationsWithdrawCrypto: 0,
  dailyWithdrawToday: {},
  settingWithdrawCrypto: {},
  requiredEnabled2faCrypto: true,
  is2faCrypto: false,
};

const depositWithdrawCryptoSlice = createSlice({
  name: 'depositWithdrawCrypto',
  initialState,
  reducers: {
    setParamsCrypto: (state, action: PayloadAction<ParamsCrypto>) => {
      state.paramsCryto = action.payload;
    },
    setUserWalletDetailCrypto: (state, action: PayloadAction<UserWalletDetails | {}>) => {
      state.userWalletDetailCrypto = action.payload;
    },
    setConfirmationsDepositCrypto: (state, action: PayloadAction<number>) => {
      state.confirmationsDepositCrypto = action.payload;
    },
    setConfirmationsWithdrawCrypto: (state, action: PayloadAction<number>) => {
      state.confirmationsWithdrawCrypto = action.payload;
    },
    setDailyWithdrawToday: (state, action) => {
      state.dailyWithdrawToday = action.payload;
    },
    setSettingWithdrawCrypto: (state, action) => {
      state.settingWithdrawCrypto = action.payload;
    },
    setRequiredEnabled2faCrypto: (state, action: PayloadAction<boolean>) => {
      state.requiredEnabled2faCrypto = action.payload;
    },
    setIs2faCrypto: (state, action: PayloadAction<boolean>) => {
      state.is2faCrypto = action.payload;
    },
  },
});

export const {
  setParamsCrypto,
  setUserWalletDetailCrypto,
  setConfirmationsDepositCrypto,
  setConfirmationsWithdrawCrypto,
  setDailyWithdrawToday,
  setSettingWithdrawCrypto,
  setRequiredEnabled2faCrypto,
  setIs2faCrypto,
} = depositWithdrawCryptoSlice.actions;

const depositWithdrawCryptoReducer = depositWithdrawCryptoSlice.reducer;

export default depositWithdrawCryptoReducer;
