import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from 'app/store';
import { RegisterInformation, UserInformation } from 'models';

export interface AuthState {
  isLoggedIn: boolean;
  currentUser?: UserInformation;
  userRegister: RegisterInformation | undefined;
  captchaKey: string;
  stepChangeMail: number;
  stepChangePhone: number;
}

const initialState: AuthState = {
  isLoggedIn: false,
  currentUser: undefined,
  userRegister: undefined,
  captchaKey: '',
  stepChangeMail: 1,
  stepChangePhone: 1,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setIsLoggedIn: (state, action: PayloadAction<boolean>) => {
      state.isLoggedIn = action.payload;
    },
    setCurrentUser: (state, action: PayloadAction<UserInformation | undefined>) => {
      state.currentUser = action.payload;
    },
    setClearStateToLogout: (state) => {
      state.isLoggedIn = false;
      state.currentUser = undefined;
    },
    setUserRegister: (state, action: PayloadAction<RegisterInformation | undefined>) => {
      state.userRegister = action.payload;
    },
    setCaptchaKey: (state, action: PayloadAction<string>) => {
      state.captchaKey = action.payload;
    },
    setStepChangeMail: (state, action: PayloadAction<number>) => {
      state.stepChangeMail = action.payload;
    },
    setStepChangePhone: (state, action: PayloadAction<number>) => {
      state.stepChangePhone = action.payload;
    },
  },
  extraReducers: {},
});

// Actions
export const {
  setIsLoggedIn,
  setCurrentUser,
  setClearStateToLogout,
  setUserRegister,
  setCaptchaKey,
  setStepChangeMail,
  setStepChangePhone,
} = authSlice.actions;

// Selectors
export const selectIsLoggedIn = (state: RootState) => state.auth.isLoggedIn;
export const selectCurrentUser = (state: RootState) => state.auth.currentUser;
export const selectUserRegister = (state: RootState) => state.auth.userRegister;
export const selectCaptchaKey = (state: RootState) => state.auth.captchaKey;
export const selectStepChangeMail = (state: RootState) => state.auth.stepChangeMail;
export const selectStepChangePhone = (state: RootState) => state.auth.stepChangePhone;
// Reducer
export default authSlice.reducer;
