import React, { useEffect, useState } from 'react';
import InfoDepositWithdraw from '../../InfoDepositWithdraw';
import DepositForm from './DepositForm';
import DepositResult from './DepositResult';
import { useAppDispatch, useAppSelector, useAppTranslation } from 'app/hooks';
import { DailyLimitWithdraw, TransactionUser } from 'models';
import fiatApi from 'api/fiatApi';
import date from 'date-and-time';
import { DATE_TIME_FORMAT_3 } from 'consts';
import { useHandleResponseError, useLoadingSubmitForm } from 'hooks';
import Loading from 'components/UIElements/Loading/Loading';
import { formatNumber } from 'utils';

interface TabDepositFormProps {
  listBankUserFiat: any;
  currency: string;
}
const TabDepositForm: React.FunctionComponent<TabDepositFormProps> = ({
  listBankUserFiat,
  currency,
}) => {
  const [step, setStep] = useState(1);
  const inforUserFiat = useAppSelector((state) => state.depositWithdraw.inforUserFiat);
  const loading = useAppSelector((state) => state.loading.isLoading);

  const [reponseDepositFiat, setResponseFiatDeposit] = useState<any>({});
  const handleResponseError = useHandleResponseError();
  const t = useAppTranslation();
  const [transactionUser, setTransactionUser] = useState<TransactionUser | any>({});
  const fiatDepositSetting = useAppSelector((state) => state.depositWithdraw.fiatDepositSetting);
  const dataFiatUser = useAppSelector((state) => state.depositWithdraw.dataFiatUser);
  const [dailyLimitDepositFiat, setDailyLimitDepositFiat] = useState<DailyLimitWithdraw | any>('');
  const dispatch = useAppDispatch();

  const onSubmitDepositForm = (values: any) => {
    if (values) {
      postDepositFiat(+values.amountDeposit, currency);
    }
  };

  const onClose = () => {
    setStep(1);
  };

  // cancel deposit fiat
  const onCancel = useLoadingSubmitForm(async (propsCancel: any) => {
    const res = await fiatApi.cancelDepositFiat({
      ...propsCancel,
    });

    if (res.ok) {
      setStep(1);
    } else if (res.error) {
      handleResponseError(res.error);
    }
  });

  // get transaction of user
  const getTransactionUser = async (idUser: number) => {
    const { body, error } = await fiatApi.searchTransactionForUser({
      // id: idUser,
      'status.in': 'PENDING',
    });

    if (body) {
      setTransactionUser(body);
    } else {
      setTransactionUser({});
    }
  };
  useEffect(() => {
    if (Object.entries(inforUserFiat).length !== 0) {
      getTransactionUser(inforUserFiat.userIdState);
    }
  }, [inforUserFiat]);

  // handle send form deposit fiat
  const postDepositFiat = useLoadingSubmitForm(
    async (amount: number, currency: string, id: number) => {
      const { ok, error, body } = await fiatApi.postDepositFiat({
        amount: amount,
        currency: currency,
      });
      if (ok || body) {
        setResponseFiatDeposit(body);
        setStep(2);
      } else if (error) {
        handleResponseError(error);
      }
    }
  );

  // check transaction when loaded page or login again
  const checkExistTransactionPending = async () => {
    const res = await fiatApi.searchTransactionForUser({
      'currency.equals': inforUserFiat.idCurrencyFiatState,
      size: 9999999,
      'type.equals': 'DEPOSIT',
    });

    if (res.ok) {
      if (res.body[res.body.length - 1].status === 'PENDING') {
        setResponseFiatDeposit(res.body[res.body.length - 1]);
        setStep(2);
      } else {
        setStep(1);
      }
    } else if (res.error) {
      handleResponseError(res.error);
    }
  };

  // get list currency to check exist transacion pending
  useEffect(() => {
    checkExistTransactionPending();
  }, []);

  // get daily limit
  const getDailyLimitDepositFiat = async () => {
    const res = await fiatApi.getDailyLimit();
    if (res.ok) {
      setDailyLimitDepositFiat(res.body);
    } else if (res.error) {
      handleResponseError(res.error);
    }
  };

  useEffect(() => {
    getDailyLimitDepositFiat();
  }, []);
  return (
    <>
      {loading && <Loading />}
      {step === 1 && (
        <>
          <div className="exchange-deposit-withdrawl__info">
            <InfoDepositWithdraw
              // style={{ margin: '0px 14px 30px 14px' }}
              description={[
                {
                  des: t('depositWithdraw.fiat.deposit.info.desOne'),
                  cleft: `${fiatDepositSetting.minDepositAmount} THB`,
                },
                {
                  des: t('depositWithdraw.fiat.deposit.info.desTwo'),
                  cleft: '23:30 - 00:05',
                },
                {
                  des: t('depositWithdraw.fiat.deposit.info.desSix'),
                  cleft: t('depositWithdraw.fiat.deposit.info.dexSeven'),
                },
                {
                  des: t('depositWithdraw.fiat.withdraw.info.desTwo'),
                  cleft:
                    formatNumber(dailyLimitDepositFiat.userTodayDepositAmount) +
                    ' THB' +
                    ' / ' +
                    formatNumber(dailyLimitDepositFiat.totalUserDailyDepositLimit) +
                    ' THB',
                },
              ]}
            />
          </div>
          <div className="exchange-deposit-withdrawl__form">
            <DepositForm
              onSubmit={onSubmitDepositForm}
              listBank={listBankUserFiat}
              fiatDepositSetting={fiatDepositSetting}
              dailyLimitDepositFiat={dailyLimitDepositFiat}
            />
          </div>
        </>
      )}
      {step === 2 && (
        <>
          <div className="exchange-deposit-withdrawl__info">
            <InfoDepositWithdraw
              description={[
                {
                  des: t('depositWithdraw.fiat.deposit.info.desSix'),
                  cleft: t('depositWithdraw.fiat.deposit.info.dexSeven'),
                },
                {
                  des: t('depositWithdraw.fiat.deposit.info.desEight'),
                  cleft: t('depositWithdraw.fiat.deposit.info.desNight'),
                },
                {
                  des: t('depositWithdraw.fiat.deposit.info.desTen'),
                  cleft: t('depositWithdraw.fiat.deposit.info.and'),
                },
                {
                  des: t('depositWithdraw.fiat.deposit.info.desTwel'),
                  cleft: date.format(new Date(reponseDepositFiat.qrExpiry), DATE_TIME_FORMAT_3),
                },
              ]}
            />
          </div>
          <div className="exchange-deposit-withdrawl__result">
            <DepositResult onClose={onClose} result={reponseDepositFiat} onCancel={onCancel} />
          </div>
        </>
      )}
    </>
  );
};

export default TabDepositForm;
