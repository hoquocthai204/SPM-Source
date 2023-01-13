import { Form } from 'antd';
import currencyApi from 'api/currencyApi';
import { useAppTranslation, useErrTranslation } from 'app/hooks';
import { SelectBoxField, TextInputField } from 'components/FormFields';
import { SubmitButton, VerticalForm } from 'components/Forms';
import { AddressBookInFormation } from 'models';
import React, { useCallback, useEffect, useState } from 'react';

interface AddAddressBookProps {
  initialValues: AddressBookInFormation;
  onSubmit: any;
  onGetCurrency: (nameCurrecny: string) => void;
}

const AddAddressBookForm: React.FunctionComponent<AddAddressBookProps> = ({
  onSubmit,
  initialValues,
  onGetCurrency,
}) => {
  const t = useAppTranslation();
  const et = useErrTranslation();

  const [coinOptions, setCoinOptions] = useState<
    { key: number; value: string; network: any; enabled?: boolean }[]
  >([]);
  const [networkOptions, setNetworkOptions] = useState<any[]>([]);
  const [coinSelect, setCoinSelect] = useState<number>(0);

  const [form] = Form.useForm();

  useEffect(() => {
    if (coinOptions.length > 0) {
      setNetworkOptions(
        coinOptions.map((item) =>
          item.network.map((x: { network: string; tagRegex: string }) => ({
            key: x.network,
            value: x.network,
            tagRegex: x.tagRegex,
          }))
        )
      );
    }
  }, [coinOptions]);

  useEffect(() => {
    getCurrencies();
  }, []);

  const getCurrencies = useCallback(async () => {
    const { body } = await currencyApi.getAllCurrency({ size: 99999999 });
    if (body) {
      setCoinOptions(
        body
          .filter((item) => item.enabled === true)
          .map((item) => ({
            key: item.id,
            value: item.shortName,
            network: item.networks,
          }))
      );
    }
  }, []);

  const handleChangeCoin = (value: any) => {
    const nameCurrency = coinOptions.filter((x) => x.key === value);
    setCoinSelect(value);
    if (onGetCurrency) onGetCurrency(nameCurrency[0].value);
  };

  return (
    <>
      <VerticalForm
        className="addAddressBook_form"
        name="add-address-book"
        initialValues={initialValues}
        onFinish={onSubmit}
        form={form}
      >
        <TextInputField
          label={t('address-book.form.shortName')}
          name="name"
          placeholder={t('address-book.form.labelPlh')}
          rules={[{ required: true, message: et('address-book.validation.name.required') }]}
        />
        <SelectBoxField
          name="currency"
          label={t('address-book.form.coin')}
          array={coinOptions}
          placeholder={t('address-book.form.selectCoin')}
          rules={[{ required: true, message: et('address-book.validation.coin.required') }]}
          onChange={handleChangeCoin}
        />
        <TextInputField
          label={t('address-book.form.address')}
          name="address"
          placeholder={t('address-book.form.addressPlh')}
          rules={[{ required: true, message: et('address-book.validation.address.required') }]}
        />
        <SelectBoxField
          name="network"
          label={t('address-book.form.network')}
          array={networkOptions[coinSelect - 1] ?? []}
          placeholder={t('address-book.form.networkPlh')}
          rules={[{ required: true, message: et('address-book.validation.network.required') }]}
        />
        {coinSelect !== 0 && !!networkOptions[coinSelect - 1][0].tagRegex && (
          <TextInputField
            label={t('address-book.form.tagMemo')}
            name="tag"
            placeholder={t('address-book.form.tagPlh')}
            rules={[{ required: true, message: et('address-book.validation.tagMemo.required') }]}
          />
        )}
        <SubmitButton
          name={t('address-book.form.btnSubmit')}
          type="primary"
          formFieldStyle={{ marginTop: '40px' }}
          buttonStyle={{
            width: '100%',
            fontWeight: '600',
            fontSize: '14px',
            lineHeight: '20px',
          }}
        />
      </VerticalForm>
    </>
  );
};

export default AddAddressBookForm;
