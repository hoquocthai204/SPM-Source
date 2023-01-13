import React, { useEffect, useState } from 'react';
import product_logo_kbank from 'assets/images/product_logo_kbank.png';
import InfoDepositWithdraw from '../../InfoDepositWithdraw';
import WithdrawForm from './WithdrawForm';
import WithdrawResultFiat from './WithdrawResultFiat';
import { useAppDispatch, useAppSelector, useAppTranslation } from 'app/hooks';
import fiatApi from 'api/fiatApi';
import { BodySendRequestWithdrawFiat, DailyLimitWithdraw, WithdrawSetting } from 'models';
import { useHandleResponseError, useLoadingSubmitForm } from 'hooks';
import { formatNumber } from 'utils';
import { encode } from 'base-64';
import Loading from 'components/UIElements/Loading/Loading';
interface TabWithdrawFiatProps {
  listBankUserFiat: any;
}

const TabWithdrawFiat: React.FunctionComponent<TabWithdrawFiatProps> = ({ listBankUserFiat }) => {
  const t = useAppTranslation();

  const [step, setStep] = useState(1);
  const [resultSubmit, setResultSubmit] = useState<any>({});
  const dataFiatUser = useAppSelector((state) => state.depositWithdraw.dataFiatUser);
  const [saveAmount, setSaveAmount] = useState<string | number>(0);
  const handleResponseError = useHandleResponseError();
  const [withdrawSetting, setWithdrawSetting] = React.useState<WithdrawSetting | any>({});
  const [dailyLimitWithdraw, setDailyLimitWithdraw] = React.useState<DailyLimitWithdraw | any>({});
  const loading = useAppSelector((state) => state.loading.isLoading);
  const dispatch = useAppDispatch();
  const onSubmitWithdrawForm = (values: BodySendRequestWithdrawFiat) => {
    if (!isNaN(values.amount) && values.bankId) {
      postWithdrawFiat(values);
      setSaveAmount(values.amount);
    }
  };

  const postWithdrawFiat = useLoadingSubmitForm(async (values: BodySendRequestWithdrawFiat) => {
    const res = await fiatApi.postWithdrawFiat(
      {
        amount: parseFloat(values.amount.toFixed(2)),
        bankId: values.bankId,
        currency: values.currency,
        userId: values.userId,
        id: values.userId,
      },
      {
        headers: { 'X-Two-Fa': encode(JSON.stringify({ GOOGLE: values.twoFaCode })) },
      }
    );

    if (res.ok) {
      setResultSubmit(res.body);
      setStep(2);
    } else if (res.error) {
      const er = { ...res.error };
      if (er.message === 'user.error.2fa.google.code-invalid') {
        er.fieldErrors = {
          twoFaCode: [res.error.message],
        };
        handleResponseError(er);
      } else {
        handleResponseError(res.error);
      }
    }
  });

  const onCloseWithdrawFiat = () => {
    setStep(1);
  };

  // get withdraw setting
  const getWithdrawSetting = async () => {
    const res = await fiatApi.getWithdrawSetting();
    if (res.ok) {
      setWithdrawSetting(res.body);
    } else if (res.error) {
      handleResponseError(res.error);
    }
  };

  // get daily limit
  const getDailyLimit = async () => {
    const res = await fiatApi.getDailyLimit();
    if (res.ok) {
      setDailyLimitWithdraw(res.body);
      // dispatch(setDailyLimit(res.body));
    } else if (res.error) {
      handleResponseError(res.error);
    }
  };

  useEffect(() => {
    getWithdrawSetting();
    getDailyLimit();
  }, []);
  return (
    <>
      {loading && <Loading />}
      {step === 1 && (
        <>
          <div className="exchange-deposit-withdrawl__info">
            <InfoDepositWithdraw
              style={{ margin: '0px 0px 30px 0px' }}
              description={[
                {
                  des: t('depositWithdraw.fiat.withdraw.info.desOne'),
                  cleft: `${withdrawSetting.minWithdrawAmount} THB`,
                },
                {
                  des: t('depositWithdraw.fiat.withdraw.info.desThree'),
                  cleft: formatNumber(withdrawSetting.maxWithdrawAmount) + ` THB`,
                },
                {
                  des: t('depositWithdraw.fiat.withdraw.info.desTwo'),
                  cleft:
                    formatNumber(dailyLimitWithdraw.userTodayWithdrawalAmount) +
                    ' THB' +
                    ' / ' +
                    formatNumber(dailyLimitWithdraw.totalUserDailyWithdrawalLimit) +
                    ' THB',
                },
              ]}
            />
          </div>

          <div className="exchange-deposit-withdrawl__form">
            <WithdrawForm
              onSubmit={onSubmitWithdrawForm}
              listBank={listBankUserFiat}
              withdrawSetting={withdrawSetting}
              dailyLimitWithdraw={dailyLimitWithdraw}
            />
          </div>
        </>
      )}
      <div className="exchange-deposit-withdrawl__result">
        {step === 2 && (
          <>
            <WithdrawResultFiat
              result={resultSubmit}
              onClose={onCloseWithdrawFiat}
              amountWithdraw={saveAmount}
            />
          </>
        )}
      </div>
    </>
  );
};

export default TabWithdrawFiat;
