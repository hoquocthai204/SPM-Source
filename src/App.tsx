import { LandingLayout, ProductLayout } from 'components/Layouts';
import LoadUserDetail from 'features/auth/components/LoadUserDetail';
import ChangeEmailPage from 'features/auth/pages/ChangeEmailPage';
import ChangePhonePage from 'features/auth/pages/ChangePhonePage';
import LoginPage from 'features/auth/pages/LoginPage';
import RegisterPage from 'features/auth/pages/RegisterPage';
import ResetGoogleAuthentication from 'features/auth/pages/ResetGoogleAuthentication';
import ResetPasswordPage from 'features/auth/pages/ResetPasswordPage';
import VerifyAccountPage from 'features/auth/pages/VerifyAccountPage';
import AddUserBank from 'features/bank/pages/AddUserBank';
import ManageBank from 'features/bank/pages/ManageBank';
import KycMainPage from 'features/kyc/pages/KycMainPage';
import LandingPage from 'features/landing/pages/LandingPage';
import AddAddressBook from 'features/manageAddressBook/pages/AddAddressBook';
import ManageAddressBook from 'features/manageAddressBook/pages/ManageAddressBookPage';
import MarketNonLoggedInPage from 'features/market/pages/MarketNonLoggedInPage';
import MarketPage from 'features/market/pages/MarketPage';
import NewsPage from 'features/news/pages/NewsPage';
import NotificationPage from 'features/notification/pages/NotificationPage';
import OrderHistoryPage from 'features/orderHistory/pages/OrderHistoryPage';
import ChangePasswordPage from 'features/setting/pages/ChangePasswordPage';
import ReferralHistoryPage from 'features/setting/pages/ReferralHistoryPage';
import SessionHistoryPage from 'features/setting/pages/SessionHistoryPage';
import SettingPage from 'features/setting/pages/SettingPage';
import SetUp2FA from 'features/setUp2FA/pages/SetUp2FA';
import NotificationSocket from 'features/socket/components/NotificationSocket';
import Socket from 'features/socket/components/Socket';
import AboutUsPage from 'features/static/pages/AboutUsPage';
import AMLCTPFPolicyPage from 'features/static/pages/AMLCTPFPolicyPage';
import BuySellRulePage from 'features/static/pages/BuySellRulePage';
import CoinInfoListingRulePage from 'features/static/pages/CoinInfoListingRulePage';
import FatCaPage from 'features/static/pages/FatcaPage';
import NotFoundPage from 'features/static/pages/NotFoundPage';
import PrivacyPolicyPage from 'features/static/pages/PrivacyPolicyPage';
import TermsConditionsPage from 'features/static/pages/TermsConditionsPage';
import TradePage from 'features/trade/pages/TradePage';
import TransactionHistory from 'features/transactionHistory/pages/TransactionHistory';
import WalletOverviewPage from 'features/wallet/pages/WalletOverviewPage';
import React from 'react';
import { Route, Routes } from 'react-router-dom';
import CryptoDepositWithdrawPage from './features/depositWithdraw/pages/CryptoDepositWithdrawPage';
import FiatDepositWithdrawPage from './features/depositWithdraw/pages/FiatDepostiWithdrawPage';

export interface AppProps {}

const App: React.FunctionComponent<AppProps> = (props) => {
  return (
    <>
      <LoadUserDetail />
      <Socket />
      <NotificationSocket />
      <Routes>
        <Route path="/*" element={<LandingLayout />}>
          <Route path="" element={<LandingPage />} />
          <Route path="login" element={<LoginPage />} />
          <Route path="register" element={<RegisterPage />} />
          <Route path="verify-account" element={<VerifyAccountPage />} />
          <Route path="reset-google-authenticator" element={<ResetGoogleAuthentication />} />
          <Route path="forgot-password" element={<ResetPasswordPage />} />
          <Route path="news/*" element={<NewsPage />} />
          <Route path="about" element={<AboutUsPage />} />
          <Route path="aml-ctpf-policy" element={<AMLCTPFPolicyPage />} />
          <Route path="buy-sell-rules" element={<BuySellRulePage />} />
          <Route path="coin_info-listing_rules" element={<CoinInfoListingRulePage />} />
          <Route path="terms-conditions" element={<TermsConditionsPage />} />
          <Route path="privacy-policy" element={<PrivacyPolicyPage />} />
          <Route path="fatca" element={<FatCaPage />} />
          <Route path="market" element={<MarketNonLoggedInPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Route>

        <Route path="/my/*" element={<ProductLayout />}>
          <Route path="market" element={<MarketPage />} />
          <Route path="session-history" element={<SessionHistoryPage />} />
          <Route path="change-email" element={<ChangeEmailPage />} />
          <Route path="change-phone" element={<ChangePhonePage />} />
          <Route path="change-password" element={<ChangePasswordPage />} />
          <Route path="set-up-2fa" element={<SetUp2FA />} />
          <Route path="manage-bank" element={<ManageBank />} />
          <Route path="add-user-bank" element={<AddUserBank />} />
          <Route path="notification" element={<NotificationPage />} />
          <Route path="referral-history" element={<ReferralHistoryPage />} />
          <Route path="setting" element={<SettingPage />} />
          <Route path="history/transaction" element={<TransactionHistory />} />
          <Route path="trade" element={<TradePage />} />
          <Route path="history/order" element={<OrderHistoryPage />} />
          <Route path="wallet" element={<WalletOverviewPage />} />
          <Route path="fiat" element={<FiatDepositWithdrawPage />} />
          <Route path="crypto" element={<CryptoDepositWithdrawPage />} />
          <Route path="manage-address-book" element={<ManageAddressBook />} />
          <Route path="add-address-book" element={<AddAddressBook />} />
          <Route path="change-phone" element={<ChangePhonePage />} />
          <Route path="verify-kyc/*" element={<KycMainPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Route>
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </>
  );
};

export default App;
