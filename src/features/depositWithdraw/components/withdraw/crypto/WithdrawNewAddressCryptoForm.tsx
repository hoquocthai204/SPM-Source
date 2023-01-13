import { SelectBoxField, TextInputField } from 'components/FormFields';
import TextInputUnitAndMaxField from 'components/FormFields/TextInputUnitAndMaxField';
import { SubmitButton, VerticalForm } from 'components/Forms';
import React, { useEffect, useState } from 'react';
import { useAppSelector, useAppTranslation, useErrTranslation } from 'app/hooks';
import { formatBigNumber, isEmptyObject } from 'utils';
import { Form } from 'antd';
import { InitBigNumber } from 'config/bignumber';
import ButtonWithModal from 'features/depositWithdraw/components/ButtonWithModal';
import { CheckAmountAvaiable } from './checkAmountAvaiable';
import { AUTHENTICATION_CODE } from 'consts';

interface WithdrawNewAddressCryptoFormProps {
  onSubmit: any;
  onChange: any;
}

const WithdrawNewAddressCryptoForm: React.FunctionComponent<WithdrawNewAddressCryptoFormProps> = ({
  onSubmit,
  onChange,
}) => {
  const t = useAppTranslation();
  const et = useErrTranslation();
  const BN = InitBigNumber();
  const [form] = Form.useForm();
  const [listNetwork, setListNetwork] = useState<any>([]);
  const paramsCrypto = useAppSelector((state) => state.depositWithdrawCrypto.paramsCryto);
  const [isShowForm, setIsShowForm] = useState(false);
  const [hasTagMemo, setHasTagMemo] = useState(false);
  const userWalletDetailCrypto = useAppSelector(
    (state) => state.depositWithdrawCrypto.userWalletDetailCrypto
  );
  const dailyWithdrawToday = useAppSelector(
    (state) => state.depositWithdrawCrypto.dailyWithdrawToday
  );

  const requiredEnabled2faCrypto = useAppSelector(
    (state) => state.depositWithdrawCrypto.requiredEnabled2faCrypto
  );
  const is2faCrypto = useAppSelector((state) => state.depositWithdrawCrypto.is2faCrypto);

  const [lpBuyPrice, setLPBuyPrice] = useState<number>(0);
  const getTotalValueSnapshotInThb = useAppSelector(
    (state) => state.wallet.getTotalValueSnapshotInThb
  );

  // format list network
  useEffect(() => {
    if (!isEmptyObject(paramsCrypto)) {
      const networksFormat: any = [];
      paramsCrypto.networks?.map((network: any) => {
        networksFormat.push({
          idNetwork: network.id,
          key: network.network,
          value: (
            <div
              className="flex-row flex-ai-center"
              style={{ gap: '5px', height: '100%', width: '100%' }}
            >
              <div className="text-sb-14-24" style={{ color: '#1E2329' }}>
                {network.network}
              </div>
              <div className="text-r-14-24" style={{ color: '#838E9C' }}>
                {network.name}
              </div>
            </div>
          ),
        });
      });
      setListNetwork(networksFormat);
    }
  }, [paramsCrypto]);

  const onChangeNetwork = (netWorkOnChange: any) => {
    const findCurrency = paramsCrypto.networks.find(
      (netWork: { network: any }) => netWork.network === netWorkOnChange
    );
    if (findCurrency.length !== 0) {
      findCurrency.tagRegex && setHasTagMemo(true);
    }
    onChange();
    setIsShowForm(true);
  };
  const [amountWithdraw, setAmountWithdraw] = React.useState<any>(0);

  const handleChangeAmountWithdraw = (value: any) => {
    setAmountWithdraw(value);
  };

  const settingWithdrawCrypto = useAppSelector(
    (state) => state.depositWithdrawCrypto.settingWithdrawCrypto
  );
  const handleOnClickMax = () => {
    form.setFieldsValue({
      amount: userWalletDetailCrypto.availableBalance,
    });
    setAmountWithdraw(userWalletDetailCrypto.availableBalance);
  };

  const handleSubmitWithdrawCrypto = (values: any) => {
    onSubmit({
      ...values,
      fee: settingWithdrawCrypto.withdrawFee,
      currency: userWalletDetailCrypto.currency,
    });
  };

  useEffect(() => {
    const lpBuyPrice = getTotalValueSnapshotInThb(
      userWalletDetailCrypto.currency,
      userWalletDetailCrypto.valuation
    );
    setLPBuyPrice(lpBuyPrice);
  }, [
    getTotalValueSnapshotInThb(userWalletDetailCrypto.currency, userWalletDetailCrypto.valuation),
  ]);
  return (
    <>
      <VerticalForm
        style={{ margin: '30px 0px 0px 0px' }}
        onFinish={handleSubmitWithdrawCrypto}
        form={form}
      >
        <TextInputField
          name="address"
          label={t('form.label.address')}
          placeholder={t('form.placeholder.address')}
          rules={[
            {
              required: true,
              message: et('input.validation.address.required'),
            },
          ]}
        />
        <SelectBoxField
          name="network"
          label={t('form.label.netWork')}
          array={listNetwork}
          placeholder={t('form.placeholder.netWork')}
          onChange={onChangeNetwork}
        />
        {isShowForm && (
          <>
            {hasTagMemo && (
              <TextInputField
                name="tagMemo"
                label={t('form.label.tagMemo')}
                placeholder={t('form.placeholder.tagMemo')}
                rules={[
                  {
                    required: true,
                    message: et('input.validation.tagMemo.required'),
                  },
                ]}
              />
            )}

            <TextInputUnitAndMaxField
              name="amount"
              label={t('form.label.amount')}
              unit={userWalletDetailCrypto.currency}
              form={form}
              placeholder={t('form.placeholder.amount')}
              value={amountWithdraw}
              onChangeInput={handleChangeAmountWithdraw}
              onClickMax={handleOnClickMax}
              rules={[
                {
                  validator: (_, value) => {
                    const valueToNumber = parseFloat(value);
                    const result = CheckAmountAvaiable({
                      amount: valueToNumber,
                      fee: settingWithdrawCrypto.withdrawFee,
                      minWithdraw: settingWithdrawCrypto.minWithdrawAmount,
                      maxWithdraw: settingWithdrawCrypto.maxWithdrawAmount,
                      availableBalance: userWalletDetailCrypto.availableBalance,
                      valuation: userWalletDetailCrypto.valuation,
                      userTodayWithdrawalAmount: dailyWithdrawToday.withdrawnAmountInDay,
                      dailyWithdrawToday: dailyWithdrawToday.limitUserInDay,
                      lpBuyPrice: lpBuyPrice,
                    });
                    return value === undefined || value === ''
                      ? Promise.reject(new Error(et('input.validation.amount.required')))
                      : result.isError
                      ? Promise.reject(new Error(et(result.message[0]) + ' ' + result.message[1]))
                      : Promise.resolve();
                  },
                },
              ]}
            />
            <TextInputField
              name="twoFaCode"
              label={t('form.label.authenticationCode')}
              placeholder={t('form.placeholder.authenticationCode')}
              rules={[
                {
                  required: is2faCrypto,
                  message: et('input.validation.2fa.required'),
                },
                {
                  pattern: AUTHENTICATION_CODE,
                  message: et('input.validation.2fa.allowNumber'),
                },
              ]}
            />
            <div>
              <div className="flex-row" style={{ gap: '10px' }}>
                <div className="text-rg-14-24" style={{ color: '#848E9C' }}>
                  {t('depositWithdraw.crypto.withdraw.newAddressBook.fee')}
                </div>
                <div className="text-sb-14-24" style={{ color: '#1E2329' }}>
                  {settingWithdrawCrypto.withdrawFee} {userWalletDetailCrypto.currency}
                </div>
              </div>
              <div className="flex-row" style={{ gap: '10px' }}>
                <div className="text-rg-14-24" style={{ color: '#848E9C' }}>
                  {t('depositWithdraw.crypto.withdraw.newAddressBook.yWillRecive')}
                </div>
                <div className="text-sb-14-24" style={{ color: '#1E2329' }}>
                  {amountWithdraw && amountWithdraw - settingWithdrawCrypto.withdrawFee > 0
                    ? new BN(amountWithdraw).minus(settingWithdrawCrypto.withdrawFee).toFormat()
                    : 0}{' '}
                  {userWalletDetailCrypto.currency}
                </div>
              </div>
            </div>
            {!requiredEnabled2faCrypto ? (
              <SubmitButton
                type="primary"
                name={t('form.nameButton.withdraw')}
                isBlock={true}
                buttonStyle={{
                  color: '#FFFFFF',
                  fontWeight: '600',
                  fontSize: '14px',
                  fontFamily: 'inherit',
                  height: '42px',
                  lineHeight: '20px',
                  marginTop: '40px',
                }}
              />
            ) : (
              <ButtonWithModal />
            )}
          </>
        )}
      </VerticalForm>
    </>
  );
};

export default WithdrawNewAddressCryptoForm;
