import React, { useCallback, useEffect, useState } from 'react';
import CurrencyInfoAndBalanceTitle from '../components/CurrencyInfoAndBalanceTitle';
import DepositWithdrawHistory from '../components/DepositWithdrawHistory';
import ExchangeDepositWithdraw from '../components/ExchangeDepositWithdraw';
import bg_deposit from 'assets/images/bg_deposit.png';
import PrivateRoute from 'PrivateRoute';
import { useSearchParams } from 'react-router-dom';
import { useAppDispatch } from 'app/hooks';
import { setParamsCrypto } from '../depositWithdrawCryptoSlice';
import { InforCurrencyState, LocationDepositWithdrawCryptoState, UserWalletDetails } from 'models';
import cryptoApi from 'api/cryptoApi';
import { useHandleResponseError } from 'hooks';
import { isEmptyObject } from 'utils';
interface CryptoDepositWithdrawPageProps {}

const CryptoDepositWithdrawPage: React.FunctionComponent<CryptoDepositWithdrawPageProps> = (
  props
) => {
  // const location = useLocation() as unknown as LocationDepositWithdrawCryptoState;
  const [searchParams, setSearchParams] = useSearchParams();
  const [typeUrl, setTypeUrl] = React.useState<string>('');
  const [tabUrl, setTabUrl] = React.useState<string>('');
  const [currencyUrl, setCurrencyUrl] = React.useState<string>('');
  const [userWalletDetail, setUserWalletDetail] = React.useState<UserWalletDetails | null>(null);
  const [inforCurrency, setInforCurrency] = React.useState<InforCurrencyState | any>({});

  const dispatch = useAppDispatch();

  //HANDLE SEARCH PARAM URL
  const getTypeUrl = searchParams.get('type');
  const getTabUrl = searchParams.get('tab');
  const getCurrency = searchParams.get('currency');
  const handleResponseError = useHandleResponseError();

  useEffect(() => {
    if (getTypeUrl) {
      setTypeUrl(getTypeUrl);
    }
    if (getTabUrl) {
      setTabUrl(getTabUrl);
    }
    if (getCurrency) {
      getInformationCurrency(getCurrency);
      getAllUserWallet(getCurrency);
      setCurrencyUrl(getCurrency);
    }
  }, [getTypeUrl, getTabUrl, getCurrency]);

  const getInformationCurrency = useCallback(
    async (shortName: string) => {
      const res = await cryptoApi.getInformationOfCurrency(shortName);

      if (res.ok) {
        setInforCurrency(res.body);
      } else if (res.error) {
        handleResponseError(res.error);
      }
    },
    [getCurrency]
  );

  const getAllUserWallet = useCallback(
    async (shortName: string) => {
      const res = await cryptoApi.getAllUserWallet();

      if (res.ok) {
        const walletDetail = res.body.find((wallet: any) => {
          return wallet.currency === shortName;
        });
        setUserWalletDetail(walletDetail);
      } else if (res.error) {
        handleResponseError(res.error);
      }
    },
    [getCurrency]
  );

  useEffect(() => {
    if (userWalletDetail || !isEmptyObject(inforCurrency)) {
      dispatch(
        setParamsCrypto({
          currencyId: inforCurrency?.id,
          currencyShorName: inforCurrency.shortName,
          idWallet: userWalletDetail?.id,
          // userId: location.state.userId,
          inforCoin: {
            logoCoin: inforCurrency.image,
            nameCoin: inforCurrency.shortName,
            netWork: inforCurrency.fullName,
          },
          networks: inforCurrency.networks,
        })
      );
    }
  }, [userWalletDetail, inforCurrency, getCurrency]);

  return (
    <>
      <div className="fiat-deposit-wrapper">
        <div className="flex-row fiat-deposit" style={{ gap: '10px' }}>
          <div className="fiat-deposit-overview">
            <CurrencyInfoAndBalanceTitle type="crypto" />
            <DepositWithdrawHistory
              type="crypto"
              typeUrl={getTypeUrl}
              tabUrl={getTabUrl}
              currencyUrl={getCurrency}
            />
          </div>
          <div className="exchange-deposit-withdrawl">
            <ExchangeDepositWithdraw
              type="crypto"
              typeUrl={getTypeUrl}
              tabUrl={getTabUrl}
              currencyUrl={getCurrency}
            />
            <div style={{ textAlign: 'right' }}>
              <span>
                <img src={bg_deposit} alt="MAXBIT" />
              </span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default PrivateRoute(CryptoDepositWithdrawPage);
