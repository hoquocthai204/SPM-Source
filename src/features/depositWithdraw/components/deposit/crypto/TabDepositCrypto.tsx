import React, { useState } from 'react';
import { InfoBanner } from 'components/AlertBanners';
import DepositFormCrypto from './DepositFormCrypto';
import InfoDepositWithdraw from '../../InfoDepositWithdraw';
import { useAppSelector, useAppTranslation } from 'app/hooks';

interface TabDepositCryptoProps {}

const TabDepositCrypto: React.FunctionComponent<TabDepositCryptoProps> = (props) => {
  const [step, setStep] = useState(1);
  const [afterSelectNetwork, setAfterSelectNetwork] = useState(false);
  const onSubmitDepositFormCrypto = () => {};
  const onChangeNetwork = () => {
    setAfterSelectNetwork(true);
  };
  const t = useAppTranslation();
  const confirmationsDepositCrypto = useAppSelector(
    (state) => state.depositWithdrawCrypto.confirmationsDepositCrypto
  );
  const paramsCrypto = useAppSelector((state) => state.depositWithdrawCrypto.paramsCryto);
  return (
    <>
      {step === 1 && (
        <>
          <div className="exchange-deposit-withdrawl__info">
            {afterSelectNetwork ? (
              <InfoDepositWithdraw
                description={[
                  {
                    des: t('depositWithdraw.crypto.deposit.info.desOne', {
                      shortName: paramsCrypto.currencyShorName,
                    }),
                  },
                  {
                    des: t('depositWithdraw.crypto.deposit.info.desTwo', {
                      fullName: paramsCrypto.inforCoin.netWork,
                    }),
                  },
                  {
                    des: `${t(
                      'depositWithdraw.crypto.deposit.info.desThree'
                    )} <b>${confirmationsDepositCrypto}</b> ${t(
                      'depositWithdraw.crypto.deposit.info.desFour'
                    )}`,
                  },
                ]}
              />
            ) : (
              <InfoBanner description={t('depositWithdraw.crypto.deposit.info.desFive')} />
            )}
          </div>
          <div className="exchange-deposit-withdrawl__form">
            <DepositFormCrypto onSubmit={onSubmitDepositFormCrypto} onChange={onChangeNetwork} />
          </div>
        </>
      )}
    </>
  );
};

export default TabDepositCrypto;
