import React, { useEffect } from 'react';
import CurrencyInfoAndBalanceTitle from '../components/CurrencyInfoAndBalanceTitle';
import DepositWithdrawHistory from '../components/DepositWithdrawHistory';
import ExchangeDepositWithdraw from '../components/ExchangeDepositWithdraw';
import bg_deposit from 'assets/images/bg_deposit.png';
import PrivateRoute from 'PrivateRoute';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useAppDispatch, useAppSelector, useAppTranslation } from 'app/hooks';
// import { LocationDepositWithdrawProps, UserWalletDetails } from 'models';
import { showConfirmModal } from 'components/Modals';
import { selectCurrentUser } from 'features/auth/authSlice';
import { useWindowDimensions } from 'utils';

interface FiatDepositWithdrawPageProps {}

const FiatDepositWithdrawPage: React.FunctionComponent<FiatDepositWithdrawPageProps> = (props) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const getTypeUrl = searchParams.get('type');
  const getTabUrl = searchParams.get('tab');
  // const dispatch = useAppDispatch();
  const [typeUrl, setTypeUrl] = React.useState<string>('');
  const [tabUrl, setTabUrl] = React.useState<string>('');
  const getCurrency = searchParams.get('currency');
  const [currencyUrl, setCurrencyUrl] = React.useState<string>('');
  const t = useAppTranslation();
  const navigate = useNavigate();
  const windowSize = useWindowDimensions();

  useEffect(() => {
    if (getTypeUrl) {
      setTypeUrl(getTypeUrl);
    }
    if (getTabUrl) {
      setTabUrl(getTabUrl);
    }
    if (getCurrency) {
      setCurrencyUrl(getCurrency);
    }
  }, [getTypeUrl, getTabUrl, getCurrency]);

  const currentUser = useAppSelector(selectCurrentUser);

  const onOk = () => {
    navigate('/');
  };
  const onCancel = () => {
    navigate('/');
  };

  React.useEffect(() => {
    if (currentUser?.kycStatus && currentUser?.kycStatus !== 'ACCEPTED') {
      showConfirmModal({
        title: t('wallet.kycStatus.title'),
        message: t('wallet.kycStatus.message'),
        onOk: onOk,
        okText: 'Verify KYC',
        onCancel: onCancel,
      });
    }
    // if (!currentUser?.kycStatus && currentUser?.twoFaType === 'NONE') {
    //   showConfirmModal({
    //     title: t('wallet.twoFaStatus.title'),
    //     message: t('wallet.twoFaStatus.message'),
    //     onOk: onOk,
    //     okText: '',
    //     onCancel: onCancel,
    //   });
    // }
  }, []);

  return (
    <>
      <div className="fiat-deposit-wrapper">
        <div className="flex-row fiat-deposit" style={{ gap: '10px' }}>
          <div className="fiat-deposit-overview">
            <CurrencyInfoAndBalanceTitle type="fiat" />
            {windowSize.width < 1024 && (
              <div className="exchange-deposit-withdrawl" style={{ marginBottom: '10px' }}>
                <ExchangeDepositWithdraw
                  type="fiat"
                  typeUrl={getTypeUrl}
                  tabUrl={getTabUrl}
                  currencyUrl={getCurrency}
                />
                <div className="exchange-deposit-withdrawl__bg" style={{ textAlign: 'right' }}>
                  <span>
                    <img src={bg_deposit} alt="MAXBIT" />
                  </span>
                </div>
              </div>
            )}
            <DepositWithdrawHistory
              type="fiat"
              typeUrl={getTypeUrl}
              tabUrl={getTabUrl}
              currencyUrl={getCurrency}
            />
          </div>
          {windowSize.width >= 1024 && (
            <div className="exchange-deposit-withdrawl">
              <ExchangeDepositWithdraw
                type="fiat"
                typeUrl={getTypeUrl}
                tabUrl={getTabUrl}
                currencyUrl={getCurrency}
              />
              <div className="exchange-deposit-withdrawl__bg" style={{ textAlign: 'right' }}>
                <span>
                  <img src={bg_deposit} alt="MAXBIT" />
                </span>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default PrivateRoute(FiatDepositWithdrawPage);
