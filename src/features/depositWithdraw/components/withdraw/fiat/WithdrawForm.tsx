import { Button, Form } from 'antd';
import { SelectBoxField, TextInputField, TextInputUnitField } from 'components/FormFields';
import RadiButtonField from 'components/FormFields/RadioButtonField';
import { SubmitButton, VerticalForm } from 'components/Forms';
import React, { useEffect, useState } from 'react';
import { formatBigNumber, formatNumber } from 'utils';
import { useAppSelector, useAppTranslation, useErrTranslation } from 'app/hooks';
import { useHandleResponseError } from 'hooks';
import { DailyLimitWithdraw, WithdrawSetting } from 'models';
import { showConfirmModal } from 'components/Modals';
import { useNavigate } from 'react-router-dom';
// import ModalCommon from 'components/Modals/ModalCommon';
import ButtonWithModal from 'features/depositWithdraw/components/ButtonWithModal';
import { AUTHENTICATION_CODE } from 'consts';
interface WithdrawFormProps {
  onSubmit: any;
  listBank: any;
  withdrawSetting?: WithdrawSetting | any;
  dailyLimitWithdraw?: DailyLimitWithdraw | any;
}

const WithdrawForm: React.FunctionComponent<WithdrawFormProps> = ({
  onSubmit,
  listBank,
  withdrawSetting,
  dailyLimitWithdraw,
}) => {
  const [form] = Form.useForm();
  const t = useAppTranslation();
  const et = useErrTranslation();
  const [arrBank, setArrBank] = useState<any>([]);
  const [amountWithdraw, setAmountWithdraw] = React.useState('');
  const [avaiable, setAvaiable] = React.useState<number>(0);
  const dataFiatUser = useAppSelector((state) => state.depositWithdraw.dataFiatUser);
  const inforUserFiat = useAppSelector((state) => state.depositWithdraw.inforUserFiat);
  const loading = useAppSelector((state) => state.loading.isLoading);

  const requiredEnabled2faFiat = useAppSelector(
    (state) => state.depositWithdraw.requiredEnabled2faFiat
  );
  const is2faFiat = useAppSelector((state) => state.depositWithdraw.is2faFiat);

  const hanldeSubmitWithdraw = (values: any) => {};
  const handleChangeAmountWithdraw = (value: any) => {
    setAmountWithdraw(value);

    // handle remove button quickly select when on change input
    const listInputRadio = document.querySelectorAll('input[type="radio"]') as
      | HTMLCollectionOf<HTMLElement>
      | any;
    for (let index = 0; index < listInputRadio.length; index++) {
      listInputRadio[index].parentElement?.classList.remove('ant-radio-button-checked');
      listInputRadio[index].parentElement?.parentElement?.classList.remove(
        'ant-radio-button-wrapper-checked'
      );
      listInputRadio[index].dataset.waschecked = false;
    }
  };

  const handleOnChangeSelectQuick = (value: any) => {
    const amount = (avaiable * Number(value)) / 100;
    setAmountWithdraw(amount.toString());
    form.setFieldsValue({
      amount: amount,
    });
    setAmountWithdraw(amount.toString());
  };

  // Render list to select box field
  useEffect(() => {
    if (listBank) {
      const listBankFormat: any = [];
      listBank.map((bank: any) => {
        listBankFormat.push({
          key: bank.id,
          value: (
            <div className="flex-row flex-ai-center">
              <img src={bank.bankImage} alt="" width="20" height="20" />
              <p style={{ margin: '0 0 0 10px' }}>{bank.bankNameEn}</p>
              <p style={{ margin: '0 0 0 10px' }}>{bank.accountNumber}</p>
            </div>
          ),
        });
      });
      setArrBank(listBankFormat);
      if (listBank.length === 1) {
        form.setFieldsValue({
          verifyBankAccount: listBank[0].id,
        });
      }
      // const _indexBank = listBank.findIndex((bank: any)=> {
      //   return bank.bankNameEn === 'Bank of Ayudhya'
      // })
      // form.setFieldsValue({
      //   verifyBankAccount: listBank[_indexBank].id
      // })
    }
  }, [listBank]);

  // set avaiable for form to quick amount
  useEffect(() => {
    if (Object.entries(dataFiatUser).length !== 0) {
      if (dataFiatUser.availableBalance) {
        setAvaiable(dataFiatUser.availableBalance);
      } else {
        setAvaiable(0);
      }
    }
  }, [dataFiatUser]);

  const hanldeSubmit = (values: any) => {
    onSubmit({
      amount: parseFloat(amountWithdraw),
      bankId: values.verifyBankAccount,
      currency: dataFiatUser.currency,
      userId: inforUserFiat.userIdState,
      twoFaCode: values.twoFaCode,
    });
  };

  return (
    <>
      <VerticalForm
        form={form}
        onFinish={hanldeSubmit}
        style={{
          filter: loading ? 'blur(1px)' : 'blur(0px)',
        }}
      >
        <SelectBoxField
          name="verifyBankAccount"
          label={t('form.label.verifyBankAccount')}
          array={arrBank}
          placeholder={t('form.placeholder.verifyBankAccount')}
          rules={[
            {
              required: true,
              message: et('input.validation.verifyBankAccount.required'),
            },
          ]}
          // disabled
        />
        <TextInputUnitField
          name="amount"
          label={t('form.label.amount')}
          unit="THB"
          placeholder={t('form.placeholder.amount')}
          form={form}
          value={amountWithdraw}
          onChangeInput={handleChangeAmountWithdraw}
          rules={[
            {
              validator: (_, value) => {
                const valueToNumber = parseFloat(value);
                if (value === undefined || value === '') {
                  return Promise.reject(new Error(et('input.validation.amount.required')));
                }
                if (
                  valueToNumber <
                  (Object.entries(withdrawSetting).length === 0
                    ? 0
                    : withdrawSetting.minWithdrawAmount)
                ) {
                  return Promise.reject(
                    new Error(
                      et('input.validation.amount.minValue') +
                        ' ' +
                        `${withdrawSetting.minWithdrawAmount}`
                    )
                  );
                }
                if (
                  valueToNumber >
                  (Object.entries(withdrawSetting).length === 0
                    ? 0
                    : withdrawSetting.maxWithdrawAmount)
                ) {
                  return Promise.reject(
                    new Error(
                      et('input.validation.amount.maxValue') +
                        ' ' +
                        `${withdrawSetting.maxWithdrawAmount}`
                    )
                  );
                }
                if (valueToNumber > avaiable) {
                  return Promise.reject(new Error('Amount must be smaller than available balance'));
                }
                if (
                  valueToNumber + dailyLimitWithdraw.userTodayWithdrawalAmount >
                  dailyLimitWithdraw.totalUserDailyWithdrawalLimit
                ) {
                  return Promise.reject(new Error(et('input.validation.amount.limitWithdraw')));
                } else {
                  return Promise.resolve();
                }
              },
            },
          ]}
        />
        <RadiButtonField
          className="buttonSelectQuick"
          values={['25', '50', '75', '100']}
          onChangeButton={handleOnChangeSelectQuick}
        />
        <TextInputField
          name="twoFaCode"
          label={t('form.label.authenticationCode')}
          placeholder={t('form.placeholder.authenticationCode')}
          rules={[
            {
              required: is2faFiat,
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
              {t('depositWithdraw.fee')}
            </div>
            <div className="text-sb-14-24" style={{ color: '#1E2329' }}>
              {formatNumber(withdrawSetting.withdrawFee, true)} THB
            </div>
          </div>
          <div className="flex-row" style={{ gap: '10px' }}>
            <div className="text-rg-14-24" style={{ color: '#848E9C' }}>
              {t('depositWithdraw.yWillRecive')}
            </div>
            <div className="text-sb-14-24" style={{ color: '#1E2329' }}>
              {parseFloat(amountWithdraw) - withdrawSetting.withdrawFee < 0
                ? 0
                : formatNumber(parseFloat(amountWithdraw) - withdrawSetting.withdrawFee, true)}{' '}
              THB
            </div>
          </div>
        </div>
        {!requiredEnabled2faFiat ? (
          <SubmitButton
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
              backgroundColor: '#08A19C',
            }}
          />
        ) : (
          <ButtonWithModal />
        )}
      </VerticalForm>
    </>
  );
};

export default WithdrawForm;
