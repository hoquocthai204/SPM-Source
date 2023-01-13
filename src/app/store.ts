import { Action, configureStore, ThunkAction } from '@reduxjs/toolkit';
import authReducer from 'features/auth/authSlice';
import landingReducer from 'features/landing/landingSlice';
import marketReducer from 'features/market/marketSlice';
import staticReducer from 'features/static/staticSlice';
import walletReducer from 'features/wallet/walletSlice';
import formReducer from 'components/Forms/formSlice';
import SetUp2FAReducer from 'features/setUp2FA/pages/setUp2FASlice';
import socketSlice from 'features/socket/socketSlice';
import tradeReducer from 'features/trade/TradeSlice';
import cryptoReducer from 'features/trade/cryptoSlice';
import settingReducer from 'features/setting/SettingSlice';
import NotificationReducer from 'features/notification/notificationSlice';
import newsReducer from 'features/news/NewsSlice';
import depositWithdrawReducer from 'features/depositWithdraw/depositWithdrawSlice';
import loadingReducer from 'components/UIElements/Loading/loadingSlice';
import depositWithdrawCryptoReducer from 'features/depositWithdraw/depositWithdrawCryptoSlice';
import kycReducer from 'features/kyc/kycSlice';

export const store = configureStore({
  reducer: {
    landing: landingReducer,
    auth: authReducer,
    market: marketReducer,
    static: staticReducer,
    wallet: walletReducer,
    form: formReducer,
    setUp2FA: SetUp2FAReducer,
    socket: socketSlice,
    trade: tradeReducer,
    tradeCrypto: cryptoReducer,
    setting: settingReducer,
    notification: NotificationReducer,
    news: newsReducer,
    depositWithdraw: depositWithdrawReducer,
    loading: loadingReducer,
    depositWithdrawCrypto: depositWithdrawCryptoReducer,
    kyc: kycReducer,
  },
});
export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
