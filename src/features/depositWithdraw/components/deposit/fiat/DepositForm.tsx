import React, { useEffect, useState } from 'react';
import { Form } from 'antd';
import { SelectBoxField, TextInputUnitField } from 'components/FormFields';
import { SubmitButton, VerticalForm } from 'components/Forms';
import { useAppSelector, useAppTranslation, useErrTranslation } from 'app/hooks';
import { DailyLimitWithdraw, FiatDepositSetting } from 'models';

interface DepositFormProps {
  onSubmit: any;
  listBank: any;
  fiatDepositSetting?: FiatDepositSetting | any;
  dailyLimitDepositFiat?: DailyLimitWithdraw | any;
}

const DepositForm: React.FunctionComponent<DepositFormProps> = ({
  onSubmit,
  listBank,
  fiatDepositSetting,
  dailyLimitDepositFiat,
}) => {
  const [form] = Form.useForm();
  const [amountDeposit, setAmountDeposit] = React.useState('');
  // const dispatch = useAppDispatch()
  const handleChangeAmountDeposit = (value: any) => {
    setAmountDeposit(value);
  };

  const t = useAppTranslation();
  const et = useErrTranslation();

  const [arrBank, setArrBank] = useState<any>([]);
  const loading = useAppSelector((state) => state.loading.isLoading);

  // User Bank
  useEffect(() => {
    if (listBank) {
      const listBankFormat: any = [];
      // listBank.map((bank: any) => {
      //   listBankFormat.push({
      //     key: bank.id,
      //     value: (
      //       <div className="flex-row flex-ai-center">
      //         {/* <img src={bank.bankImage} alt="" width="20" height="20" />
      //         <p style={{ margin: '0 0 0 10px' }}>{bank.bankNameEn}</p> */}
      //         <p style={{ margin: '0 0 0 10px' }}>Bay Bank</p>
      //       </div>
      //     ),
      //   });
      // });
      listBankFormat.push({
        key: 123,
        value: (
          <div className="flex-row flex-ai-center">
            <p style={{ margin: '0 0 0 10px' }}>Bay Bank</p>
          </div>
        ),
      });
      setArrBank(listBankFormat);
      // hard code
      form.setFieldsValue({
        idSelectBank: 123,
      });
      // if (listBank.length === 1) {
      //   form.setFieldsValue({
      //     idSelectBank: listBank[0].id,
      //   });
      // }
      // const _indexBank = listBank.findIndex((bank: any) => {
      //   return bank.bankNameEn === 'Bank of Ayudhya';
      // });
      // if (_indexBank !== -1) {
      //   form.setFieldsValue({
      //     idSelectBank: listBank[_indexBank].id,
      //   });
      // }
    }
  }, [listBank]);

  return (
    <>
      <VerticalForm
        form={form}
        onFinish={onSubmit}
        style={{
          filter: loading ? 'blur(1px)' : 'blur(0px)',
        }}
      >
        <SelectBoxField
          name="idSelectBank"
          label={t('form.label.bankBranch')}
          array={arrBank}
          placeholder={t('form.placeholder.bankBranch')}
          defaultValue={arrBank.length === 1 && { value: arrBank[0].key }}
          rules={[
            {
              required: true,
              message: et('input.validation.bankBranch.required'),
            },
          ]}
          disabled
        />

        <TextInputUnitField
          name="amountDeposit"
          label={t('form.label.amount')}
          placeholder={t('form.placeholder.amount')}
          unit="THB"
          form={form}
          value={amountDeposit}
          onChangeInput={handleChangeAmountDeposit}
          rules={[
            {
              validator: (_, value) => {
                const valueToNumber = parseFloat(value);
                if (value === undefined || value === '') {
                  return Promise.reject(new Error(et('input.validation.amount.required')));
                }
                if (
                  parseFloat(value) <
                  (Object.entries(fiatDepositSetting).length === 0
                    ? 0
                    : fiatDepositSetting.minDepositAmount)
                ) {
                  return Promise.reject(
                    new Error(
                      et('input.validation.amount.minValue') +
                        ` ${fiatDepositSetting.minDepositAmount}`
                    )
                  );
                }
                if (valueToNumber > dailyLimitDepositFiat.totalUserDailyDepositLimit) {
                  return Promise.reject(new Error(et('input.validation.amount.limitDepositFiat')));
                } else {
                  return Promise.resolve();
                }
                // if (
                //   valueToNumber + dailyLimitDepositFiat.userTodayDepositAmount >
                //   dailyLimitDepositFiat.totalUserDailyDepositLimit
                // ) {
                //   return Promise.reject(new Error(et('input.validation.amount.limitDepositFiat')));
                // } else {
                //   return Promise.resolve();
                // }
              },
            },
          ]}
        />
        <SubmitButton
          name={t('form.nameButton.next')}
          isBlock={true}
          buttonStyle={{
            color: '#FFFFFF',
            fontWeight: '600',
            fontSize: '14px',
            fontFamily: 'inherit',
            height: '42px',
            lineHeight: '20px',
            marginTop: '16px',
            backgroundColor: '#08A19C',
          }}
        />
      </VerticalForm>
    </>
  );
};

export default DepositForm;
