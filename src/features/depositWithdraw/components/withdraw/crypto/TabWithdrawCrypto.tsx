import React, { useCallback, useEffect, useState } from 'react';
import { Sticky, StickyContainer } from 'react-sticky';
import { Tabs } from 'antd';
import { InfoBanner } from 'components/AlertBanners';
import WithdrawNewAddressCryptoForm from './WithdrawNewAddressCryptoForm';
import WithdrawNewAddressResultCrypto from './WithdrawNewAddressResultCrypto';
import WithdrawAddressBookCryptoForm from './WithdrawAddressBookCryptoForm';
import WithdrawAddressBookCryptoResult from './WithdrawAddressBookCryptoResult';
import InfoDepositWithdraw from '../../InfoDepositWithdraw';
import { useAppDispatch, useAppSelector, useAppTranslation } from 'app/hooks';
import cryptoApi from 'api/cryptoApi';
import { formatNumber, formatNumberExponential, isEmptyObject } from 'utils';
import {
  setDailyWithdrawToday,
  setSettingWithdrawCrypto,
} from 'features/depositWithdraw/depositWithdrawCryptoSlice';
import { encode } from 'base-64';
import { BodySendRequestWithdrawCrypto, ResultSubmitWithdrawCrypto } from 'models';
import { useHandleResponseError } from 'hooks';

const { TabPane } = Tabs;

interface TabWithdrawCryptoProps {}
const CustomizeTabBarAddressBook = (props: any, DefaultTabBar: any) => (
  <Sticky>
    {({ style }) => {
      return (
        <>
          <DefaultTabBar
            {...props}
            className="site-custom-tab-bar-address-book"
            style={{ ...style }}
          />
        </>
      );
    }}
  </Sticky>
);
const TabWithdrawCrypto: React.FunctionComponent<TabWithdrawCryptoProps> = (props) => {
  const t = useAppTranslation();
  const dispatch = useAppDispatch();
  const [stepNewAddress, setStepNewAddress] = useState(1);
  const [stepAddressBook, setStepAddressBook] = useState(1);
  const [resultSubmit, setResultSubmit] = useState<ResultSubmitWithdrawCrypto | null>(null);
  const [afterSelectNetwork, setAfterSelectNetwork] = useState(false);
  const [afterSelectAddress, setAfterSelectAddress] = useState(false);
  const handleResponseError = useHandleResponseError();
  const onSubmitWithdrawNewAddressCryptoForm = (values: BodySendRequestWithdrawCrypto) => {
    if (values) {
      postWithdrawCrypto(values, 'newAddress');
    }
  };
  const onSubmitWithdrawAddressBookCrypotoForm = (values: BodySendRequestWithdrawCrypto) => {
    if (values) {
      postWithdrawCrypto(values, 'address');
    }
  };
  const onCloseWithdrawCryptoNewAddreess = () => {
    setStepNewAddress(1);
  };
  const onChangeNetwork = () => {
    setAfterSelectNetwork(true);
  };
  const onChangeAddress = () => {
    setAfterSelectAddress(true);
  };
  const onCloseWithdrawCryptoAddressBook = () => {
    setStepAddressBook(1);
  };
  const paramsCryto = useAppSelector((state) => state.depositWithdrawCrypto.paramsCryto);
  const dailyWithdrawToday = useAppSelector(
    (state) => state.depositWithdrawCrypto.dailyWithdrawToday
  );
  const userWalletDetailCrypto = useAppSelector(
    (state) => state.depositWithdrawCrypto.userWalletDetailCrypto
  );
  const settingWithdrawCrypto = useAppSelector(
    (state) => state.depositWithdrawCrypto.settingWithdrawCrypto
  );
  const [saveDataSendRequest, setSaveDataSendRequest] = useState<any>({});

  const postWithdrawCrypto = async (
    values: BodySendRequestWithdrawCrypto,
    tab: 'address' | 'newAddress'
  ) => {
    const res = await cryptoApi.postWithdrawCrypto(
      {
        address: values.address,
        amount: Number(values.amount),
        currency: values.currency,
        network: values.network,
        tag: values.tagMemo ? values.tagMemo : '',
      },
      {
        headers: { 'X-Two-Fa': encode(JSON.stringify({ GOOGLE: values.twoFaCode })) },
      }
    );

    if (res.ok) {
      if (tab === 'newAddress') {
        setResultSubmit({ ...values, status: 'success' });
        setStepNewAddress(2);
      } else if (tab === 'address') {
        setResultSubmit({ ...values, status: 'success' });
        setStepAddressBook(2);
      }
    } else if (res.error) {
      const er = { ...res.error };

      if (res.error.message === 'wallet.validation.withdrawal.address.invalid') {
        er.fieldErrors = {
          address: [res.error.message],
        };
        handleResponseError(er);
      }

      if (res.error.message === 'wallet.validation.withdrawal.address.user-self-wallet') {
        er.fieldErrors = {
          address: [res.error.message],
        };
        handleResponseError(er);
      } else {
        handleResponseError(res.error);
      }
    }
  };

  // get setting withdraw crypto
  const getSettingWithdrawCrypto = useCallback(
    async (idCrypto: number) => {
      const res = await cryptoApi.getCryptoWithdrawSetting(idCrypto);
      if (res.ok) {
        dispatch(setSettingWithdrawCrypto(res.body));
      } else if (res.error) {
        handleResponseError(res.error);
      }
    },
    [paramsCryto?.currencyId]
  );

  // get daily withraw to day
  const getLimitWithdrawToday = useCallback(async () => {
    const res = await cryptoApi.getTotalAmountWithdrawToday();

    if (res.ok) {
      dispatch(setDailyWithdrawToday(res.body));
    } else if (res.error) {
      handleResponseError(res.error);
    }
  }, []);

  useEffect(() => {
    if (!isEmptyObject(paramsCryto) && paramsCryto?.currencyId) {
      getSettingWithdrawCrypto(paramsCryto?.currencyId);
      getLimitWithdrawToday();
    }
  }, [paramsCryto]);

  return (
    <>
      <StickyContainer>
        <Tabs defaultActiveKey="newAddress" renderTabBar={CustomizeTabBarAddressBook}>
          <TabPane tab="New Address" key="newAddress">
            {stepNewAddress === 1 && (
              <>
                <div className="exchange-deposit-withdrawl__info">
                  {afterSelectNetwork ? (
                    <InfoDepositWithdraw
                      description={[
                        {
                          des: `${t('depositWithdraw.crypto.withdraw.info.desOne')} <b>${
                            formatNumberExponential(settingWithdrawCrypto.minWithdrawAmount) + ' '
                          }</b>${settingWithdrawCrypto.currencySN}`,
                        },
                        {
                          des: `${t('depositWithdraw.crypto.withdraw.info.desSix')} <b>${
                            formatNumberExponential(settingWithdrawCrypto.maxWithdrawAmount) + ' '
                          }</b>${settingWithdrawCrypto.currencySN}`,
                        },
                        {
                          des: t('depositWithdraw.crypto.withdraw.info.desTwo'),
                          cleft:
                            formatNumber(dailyWithdrawToday.withdrawnAmountInDay, true) +
                            ' THB' +
                            ' / ' +
                            formatNumber(dailyWithdrawToday.limitUserInDay, true) +
                            ' THB',
                        },
                        {
                          des: `${t('depositWithdraw.crypto.withdraw.info.desThree')} <b>${
                            settingWithdrawCrypto.confirmations
                          }</b> ${t('depositWithdraw.crypto.withdraw.info.desFour')}`,
                        },
                      ]}
                    />
                  ) : (
                    <InfoBanner description={t('depositWithdraw.crypto.withdraw.info.desFive')} />
                  )}
                </div>
                <div className="exchange-deposit-withdrawl__form">
                  <WithdrawNewAddressCryptoForm
                    onSubmit={onSubmitWithdrawNewAddressCryptoForm}
                    onChange={onChangeNetwork}
                  />
                </div>
              </>
            )}
            {stepNewAddress === 2 && (
              <>
                <div className="exchange-deposit-withdrawl__result">
                  <WithdrawNewAddressResultCrypto
                    result={resultSubmit}
                    onClose={onCloseWithdrawCryptoNewAddreess}
                  />
                </div>
              </>
            )}
          </TabPane>
          <TabPane tab="Address Book" key="addressBook">
            {stepAddressBook === 1 && (
              <>
                <div className="exchange-deposit-withdrawl__info">
                  {afterSelectAddress ? (
                    <InfoDepositWithdraw
                      description={[
                        {
                          des: `${t('depositWithdraw.crypto.withdraw.info.desOne')} <b>${
                            formatNumberExponential(settingWithdrawCrypto.minWithdrawAmount) + ' '
                          }</b>${settingWithdrawCrypto.currencySN}`,
                        },
                        {
                          des: `${t('depositWithdraw.crypto.withdraw.info.desSix')} <b>${
                            formatNumberExponential(settingWithdrawCrypto.maxWithdrawAmount) + ' '
                          }</b>${settingWithdrawCrypto.currencySN}`,
                        },
                        {
                          des: t('depositWithdraw.crypto.withdraw.info.desTwo'),
                          cleft:
                            formatNumber(dailyWithdrawToday.withdrawnAmountInDay, true) +
                            ' THB' +
                            ' / ' +
                            formatNumber(dailyWithdrawToday.limitUserInDay, true) +
                            ' THB',
                        },
                        {
                          des: `${t('depositWithdraw.crypto.withdraw.info.desThree')} <b>${
                            settingWithdrawCrypto.confirmations
                          }</b> ${t('depositWithdraw.crypto.withdraw.info.desFour')}`,
                        },
                      ]}
                    />
                  ) : (
                    <InfoBanner description={t('depositWithdraw.crypto.withdraw.info.desFive')} />
                  )}
                </div>
                <div className="exchange-deposit-withdrawl__form">
                  <WithdrawAddressBookCryptoForm
                    onChange={onChangeAddress}
                    onSubmit={onSubmitWithdrawAddressBookCrypotoForm}
                  />
                </div>
              </>
            )}
            {stepAddressBook === 2 && (
              <>
                <div className="exchange-deposit-withdrawl__result">
                  <WithdrawAddressBookCryptoResult
                    result={resultSubmit}
                    onClose={onCloseWithdrawCryptoAddressBook}
                  />
                </div>
              </>
            )}
          </TabPane>
        </Tabs>
      </StickyContainer>
    </>
  );
};

export default TabWithdrawCrypto;
