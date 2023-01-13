import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import fiatApi from 'api/fiatApi';
import { DailyLimitWithdraw, InformationUserFiat, UserWalletDetails } from 'models';
import { TwoSetting } from 'models/depositWithdraw/twoSetting';

export interface DepositWithdrawState {
  dataDepositHistory: any;
  dataWithdrawHistory: any;
  inforUserFiat: InformationUserFiat | {} | any;
  dataFiatUser: UserWalletDetails | {} | any;
  settingFiat:
    | {
        systemConfigSettingDepositFiat: any;
        settingDepositFiat: any;
        systemConfigSettingWithdrawFiat: any;
        settingWithdrawFiat: any;
      }
    | any;
  fiatDepositSetting: any;
  dailyLimit: DailyLimitWithdraw | {} | any;
  requiredEnabled2faFiat: boolean;
  is2faFiat: boolean;
}

const initialState: DepositWithdrawState = {
  dataDepositHistory: [],
  dataWithdrawHistory: 1234,
  inforUserFiat: {},
  dataFiatUser: {},
  fiatDepositSetting: {},
  settingFiat: {},
  dailyLimit: {},
  requiredEnabled2faFiat: true,
  is2faFiat: false,
};
export const searchTransactionForUser = createAsyncThunk(
  'fiat/searchTransactionForUser',
  async (additionalData: any, thunkAPI) => {
    const res = await fiatApi.searchTransactionForUser({
      ...additionalData,
    });
    if (res.ok) {
      return res;
    } else if (res.error) {
      return thunkAPI.rejectWithValue(res.error);
    }
  }
);
const depositWithdrawSlice = createSlice({
  name: 'depositWithdraw',
  initialState,
  reducers: {
    setInformationUserFiat: (state, action: PayloadAction<InformationUserFiat> | undefined) => {
      state.inforUserFiat = action?.payload;
    },
    setDataFiatUser: (state, action: PayloadAction<UserWalletDetails> | undefined) => {
      state.dataFiatUser = action?.payload;
    },
    setDepositSettingFiat: (state, action) => {
      state.fiatDepositSetting = action.payload;
    },
    setAllSettingFiat: (state, action) => {
      state.settingFiat = { ...action.payload };
    },
    setDailyLimit: (state, action) => {
      state.dailyLimit = action.payload;
    },
    setRequiredEnabled2faFiat: (state, action: PayloadAction<boolean>) => {
      state.requiredEnabled2faFiat = action.payload;
    },
    setIs2faFiat: (state, action: PayloadAction<boolean>) => {
      state.is2faFiat = action.payload;
    },
  },
  extraReducers: (builder) => {
    // FIAT TRANSACTION
    builder.addCase(searchTransactionForUser.fulfilled, (state, action) => {
      if (action.payload?.body.length === 0) {
        state.dataDepositHistory = {
          data: [],
          total: 0,
          isLoading: false,
        };
        state.dataWithdrawHistory = {
          data: [],
          total: 0,
          isLoading: false,
        };
      } else {
        if (action.payload?.body[0].type === 'DEPOSIT') {
          state.dataDepositHistory = {
            data: action.payload.body,
            total: action.payload.pagination?.total,
            isLoading: false,
          };
        } else if (action.payload?.body[0].type === 'WITHDRAW') {
          state.dataWithdrawHistory = {
            data: action.payload.body,
            total: action.payload.pagination?.total,
            isLoading: false,
          };
        }
      }
    });
    builder.addCase(searchTransactionForUser.pending, (state, action) => {
      state.dataDepositHistory = {
        data: [],
        total: 0,
        isLoading: true,
      };
      state.dataWithdrawHistory = {
        data: [],
        total: 0,
        isLoading: true,
      };
    });
    builder.addCase(searchTransactionForUser.rejected, (state, action) => {
      state.dataDepositHistory = {
        data: [],
        total: 0,
      };
      state.dataWithdrawHistory = {
        data: [],
        total: 0,
      };
    });
  },
});

//Actions
export const {
  setInformationUserFiat,
  setDataFiatUser,
  setDepositSettingFiat,
  setAllSettingFiat,
  setDailyLimit,
  setRequiredEnabled2faFiat,
  setIs2faFiat,
} = depositWithdrawSlice.actions;

// Reducer
const depositWithdrawReducer = depositWithdrawSlice.reducer;

export default depositWithdrawReducer;
