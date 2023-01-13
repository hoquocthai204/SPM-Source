import { Tabs } from 'antd';
import React, { useCallback, useEffect, useState } from 'react';
import { Sticky, StickyContainer } from 'react-sticky';
import TabDepositCrypto from './deposit/crypto/TabDepositCrypto';
import TabDepositFiat from './deposit/fiat/TabDepositFiat';
import TabWithdrawCrypto from './withdraw/crypto/TabWithdrawCrypto';
import TabWithdrawFiat from './withdraw/fiat/TabWithdrawFiat';
import { useAppDispatch, useAppSelector, useAppTranslation } from 'app/hooks';
import { useSearchParams } from 'react-router-dom';
import fiatApi from 'api/fiatApi';
import { useHandleResponseError, useLoadingSubmitForm } from 'hooks';
import { DisableDepositOrWithdraw } from 'components/Commons';
import {
  setAllSettingFiat,
  setDepositSettingFiat,
  setIs2faFiat,
  setRequiredEnabled2faFiat,
} from '../depositWithdrawSlice';
import Loading from 'components/UIElements/Loading/Loading';
import { TwoSetting } from 'models/depositWithdraw/twoSetting';
import { setIs2faCrypto, setRequiredEnabled2faCrypto } from '../depositWithdrawCryptoSlice';

const { TabPane } = Tabs;

interface ExchangeDepositWithdrawProps {
  type: 'fiat' | 'crypto';
  tabUrl?: any;
  typeUrl?: any;
  currencyUrl?: any;
}
const CustomizeTabBarDepositWithdraw = (props: any, DefaultTabBar: any) => (
  <Sticky>
    {({ style }) => {
      return (
        <>
          <DefaultTabBar {...props} className="site-custom-tab-bar-right" style={{ ...style }} />
        </>
      );
    }}
  </Sticky>
);
const ExchangeDepositWithdraw: React.FunctionComponent<ExchangeDepositWithdrawProps> = ({
  type,
  tabUrl,
  typeUrl,
  currencyUrl,
}) => {
  const t = useAppTranslation();
  const [tabUrlState, setTabUrlState] = React.useState<string>('');
  const [currentTabExchange, setCurrentTabExchange] = React.useState<any>();
  const [searchParams, setSearchParams] = useSearchParams();
  const [listBankUser, setListBankUser] = useState<any>();
  const allSettingFiat = useAppSelector((state) => state.depositWithdraw.settingFiat);
  const currentUser = useAppSelector((state) => state.auth.currentUser);

  const handleResponseError = useHandleResponseError();
  const dispatch = useAppDispatch();
  useEffect(() => {
    if (tabUrl) {
      setTabUrlState(tabUrl);
    }
  }, [tabUrl]);

  const onTabClick = (key: string) => {
    if (key === 'v-deposit') {
      setSearchParams({
        type: typeUrl,
        tab: 'v-deposit',
        currency: currencyUrl,
      });
      setCurrentTabExchange('v-deposit');
    } else if (key === 'v-withdraw') {
      setSearchParams({
        type: typeUrl,
        tab: 'v-withdraw',
        currency: currencyUrl,
      });
      setCurrentTabExchange('v-withdraw');
    }
  };

  useEffect(() => {
    setCurrentTabExchange(tabUrl);
  }, [tabUrl]);

  const getListBankUser = useCallback(async () => {
    const { body } = await fiatApi.getBankUser();

    if (body) {
      const listBankVerifed = body.filter((v: any) => {
        return v.bankStatus === 'VERIFIED';
      });
      setListBankUser(listBankVerifed);
    }
  }, []);

  // get all setting deposit/withdraw of fiat
  const getALLSettingOfFiat = useLoadingSubmitForm(async () => {
    const systemConfigSettingDepositFiat = await fiatApi.getSettingSystemConfig('CRYPTO_DEPOSIT');
    const settingDepositFiat = await fiatApi.getFiatDepositSettting();
    const systemConfigSettingWithdrawFiat = await fiatApi.getSettingSystemConfig(
      'CRYPTO_WITHDRAWAL'
    );

    const settingWithdrawFiat = await fiatApi.getWithdrawSetting();

    if (
      systemConfigSettingDepositFiat.ok ||
      settingDepositFiat.ok ||
      systemConfigSettingWithdrawFiat.ok ||
      settingWithdrawFiat.ok
    ) {
      dispatch(setDepositSettingFiat(settingDepositFiat.body));
      dispatch(
        setAllSettingFiat({
          systemConfigSettingDepositFiat: systemConfigSettingDepositFiat.body,
          settingDepositFiat: settingDepositFiat.body,
          systemConfigSettingWithdrawFiat: systemConfigSettingWithdrawFiat.body,
          settingWithdrawFiat: settingWithdrawFiat.body,
        })
      );
    }
  });

  const getSetting2fa = useCallback(async () => {
    const { ok, body } = await fiatApi.getSetting2fa();

    if (ok) {
      const _fiatSetting = body.find(
        (setting: TwoSetting) => setting.friendlyName === 'FIAT WITHDRAWAL'
      );
      const _cryptoSetting = body.find(
        (setting: TwoSetting) => setting.friendlyName === 'CRYPTO WITHDRAWAL'
      );
      dispatch(setIs2faFiat(_fiatSetting.enable));
      dispatch(setIs2faCrypto(_cryptoSetting.enable));

      if (currentUser) {
        _fiatSetting.enable && currentUser.twoFaType !== 'GOOGLE'
          ? dispatch(setRequiredEnabled2faFiat(true))
          : dispatch(setRequiredEnabled2faFiat(false));

        _cryptoSetting.enable && currentUser.twoFaType !== 'GOOGLE'
          ? dispatch(setRequiredEnabled2faCrypto(true))
          : dispatch(setRequiredEnabled2faCrypto(false));
      }
    }
  }, [currentUser]);

  useEffect(() => {
    getALLSettingOfFiat();
    getListBankUser();
    getSetting2fa();
  }, [currentUser]);

  return (
    <>
      {Object.entries(allSettingFiat).length === 0 ? (
        <Loading style={{ height: '100px' }} />
      ) : (
        <StickyContainer>
          <Tabs
            activeKey={currentTabExchange}
            onTabClick={onTabClick}
            renderTabBar={CustomizeTabBarDepositWithdraw}
          >
            {/* Deposit */}
            <TabPane tab={t('depositWithdraw.tabs.deposit')} key="v-deposit">
              {type === 'fiat' ? (
                allSettingFiat.systemConfigSettingDepositFiat.value === 'true' &&
                allSettingFiat.settingDepositFiat.depositEnabled ? (
                  <TabDepositFiat listBankUserFiat={listBankUser} currency={currencyUrl} />
                ) : (
                  <DisableDepositOrWithdraw message={t('depositWithdraw.messageFail')} />
                )
              ) : null}

              {/* {type === 'fiat' && <TabDepositFiat listBankUserFiat={listBankUser} />} */}
              {type === 'crypto' && <TabDepositCrypto />}
            </TabPane>

            {/* Withdraw */}
            <TabPane tab={t('depositWithdraw.tabs.withdraw')} key="v-withdraw">
              {type === 'fiat' ? (
                allSettingFiat.systemConfigSettingWithdrawFiat.value === 'true' &&
                allSettingFiat.settingWithdrawFiat.withdrawEnabled ? (
                  <TabWithdrawFiat listBankUserFiat={listBankUser} />
                ) : (
                  <DisableDepositOrWithdraw message={t('depositWithdraw.messageFail')} />
                )
              ) : null}

              {/* {type === 'fiat' && <TabWithdrawFiat listBankUserFiat={listBankUser} />} */}
              {type === 'crypto' && <TabWithdrawCrypto />}
            </TabPane>
          </Tabs>
        </StickyContainer>
      )}
    </>
  );
};

export default ExchangeDepositWithdraw;
