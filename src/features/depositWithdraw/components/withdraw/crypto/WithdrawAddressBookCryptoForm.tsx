import { SelectBoxField, TextInputField } from 'components/FormFields';
import TextInputUnitAndMaxField from 'components/FormFields/TextInputUnitAndMaxField';
import { SubmitButton, VerticalForm } from 'components/Forms';
import { useAppSelector, useAppTranslation, useErrTranslation } from 'app/hooks';
import React, { useCallback, useEffect, useState } from 'react';
import { formatBigNumber, isEmptyObject } from 'utils';
import cryptoApi from 'api/cryptoApi';
import { Link } from 'react-router-dom';
import { Form } from 'antd';
import { useHandleResponseError } from 'hooks';
import { AddressBookFormat } from 'models';
import { InitBigNumber } from 'config/bignumber';
import ButtonWithModal from 'features/depositWithdraw/components/ButtonWithModal';
import { CheckAmountAvaiable } from './checkAmountAvaiable';
import { AUTHENTICATION_CODE } from 'consts';

interface WithdrawAddressBookCryptoFormProps {
  onSubmit: any;
  onChange: any;
}
const WithdrawAddressBookCryptoForm: React.FunctionComponent<
  WithdrawAddressBookCryptoFormProps
> = ({ onSubmit, onChange }) => {
  const t = useAppTranslation();
  const et = useErrTranslation();
  const [form] = Form.useForm();
  const BN = InitBigNumber();

  const [amountWithdraw, setAmountWithdraw] = React.useState<any>('');
  const handleResponseError = useHandleResponseError();
  const paramsCrypto = useAppSelector((state) => state.depositWithdrawCrypto.paramsCryto);
  const [listAddressBook, setListAddressBook] = useState<Array<AddressBookFormat>>([]);
  const [isShowForm, setIsShowForm] = useState(false);
  const [informationAddressBook, setInformationAddressBook] = useState<
    AddressBookFormat | undefined | null
  >(null);

  const userWalletDetailCrypto = useAppSelector(
    (state) => state.depositWithdrawCrypto.userWalletDetailCrypto
  );

  const requiredEnabled2faCrypto = useAppSelector(
    (state) => state.depositWithdrawCrypto.requiredEnabled2faCrypto
  );
  const is2faCrypto = useAppSelector((state) => state.depositWithdrawCrypto.is2faCrypto);

  const [lpBuyPrice, setLPBuyPrice] = useState<number>(0);
  const getTotalValueSnapshotInThb = useAppSelector(
    (state) => state.wallet.getTotalValueSnapshotInThb
  );

  useEffect(() => {
    if (!isEmptyObject(paramsCrypto)) {
      getListAddressBookCrypto(paramsCrypto.currencyShorName);
    }
  }, [paramsCrypto]);

  const onChangeNetwork = (netWork: any) => {
    const _tempInforNetwork = listAddressBook.find((v: any) => {
      return v.id === netWork;
    });
    setInformationAddressBook(_tempInforNetwork);
    onChange();
    setIsShowForm(true);
  };

  const settingWithdrawCrypto = useAppSelector(
    (state) => state.depositWithdrawCrypto.settingWithdrawCrypto
  );

  const dailyWithdrawToday = useAppSelector(
    (state) => state.depositWithdrawCrypto.dailyWithdrawToday
  );

  const handleChangeAmountWithdraw = (value: any) => {
    setAmountWithdraw(value);
  };

  const getListAddressBookCrypto = useCallback(
    async (currencyShorName: string) => {
      const res = await cryptoApi.getListAddressBook({
        currency: currencyShorName,
      });

      if (res.ok) {
        const listAddressBookFormat: any = [];
        res.body.map((addressbook: any) => {
          listAddressBookFormat.push({
            ...addressbook,
            key: addressbook.id,
            value: <div>{addressbook.name}</div>,
          });
        });
        setListAddressBook(listAddressBookFormat);
      } else if (res.error) {
        handleResponseError(res.error);
      }
    },
    [paramsCrypto.currencyShorName]
  );

  const handleOnClickMax = () => {
    form.setFieldsValue({
      amount: userWalletDetailCrypto.availableBalance,
    });
    setAmountWithdraw(userWalletDetailCrypto.availableBalance);
  };

  const hadnleSubmitWithdrawCrypto = (values: any) => {
    onSubmit({
      ...values,
      fee: settingWithdrawCrypto.withdrawFee,
      currency: userWalletDetailCrypto.currency,
      network: informationAddressBook?.networkSN,
      address: informationAddressBook?.address,
      tagMemo: informationAddressBook?.tag,
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
        className="withdraw-address-book"
        onFinish={hadnleSubmitWithdrawCrypto}
        form={form}
      >
        <SelectBoxField
          name="address"
          array={listAddressBook}
          placeholder="Select address book"
          label={
            <div className="flex-row flex-jt-space-bettween" style={{ width: '100%' }}>
              <div>{t('depositWithdraw.crypto.withdraw.addressBook.addressBook')}</div>
              <div style={{ color: '#357CE1' }}>
                <Link to="/my/manage-address-book">
                  {t('depositWithdraw.crypto.withdraw.addressBook.manageAddressBook')}
                </Link>
              </div>
            </div>
          }
          onChange={onChangeNetwork}
        />
        {isShowForm && (
          <>
            <div
              className="withdraw-address-book__info flex-col"
              style={{ gap: '8px', maxWidth: '431px' }}
            >
              <div className="flex-row" style={{}}>
                <div className="text-md-14-gray" style={{ flexBasis: '100px' }}>
                  {t('depositWithdraw.crypto.withdraw.addressBook.netWork')}
                </div>
                <div className="text-md-14-black">
                  {informationAddressBook?.networkSN ? informationAddressBook.networkSN : '---'}
                </div>
              </div>
              <div className="table__address" style={{ display: 'table' }}>
                <div className="tr">
                  <div className="td text-md-14-gray" style={{ width: '100px' }}>
                    {' '}
                    {t('depositWithdraw.crypto.withdraw.addressBook.address')}
                  </div>
                  <div className="td text-md-14-black">
                    {informationAddressBook?.address ? informationAddressBook.address : '---'}
                  </div>
                </div>
              </div>
              {informationAddressBook?.tag && (
                <>
                  {' '}
                  <div className="flex-row" style={{}}>
                    <div className="text-md-14-gray" style={{ flexBasis: '100px' }}>
                      {t('depositWithdraw.crypto.withdraw.addressBook.tagMemo')}
                    </div>
                    <div className="text-md-14-black">
                      {informationAddressBook.tag ? informationAddressBook.tag : '---'}
                    </div>
                  </div>
                </>
              )}
            </div>
            <TextInputUnitAndMaxField
              name="amount"
              label={t('form.label.amount')}
              unit={userWalletDetailCrypto.currency}
              form={form}
              placeholder={t('form.placeholder.amount')}
              onClickMax={handleOnClickMax}
              onChangeInput={handleChangeAmountWithdraw}
              value={amountWithdraw}
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
                  {t('depositWithdraw.crypto.withdraw.addressBook.fee')}
                </div>
                <div className="text-sb-14-24" style={{ color: '#1E2329' }}>
                  {settingWithdrawCrypto.withdrawFee} {userWalletDetailCrypto.currency}
                </div>
              </div>
              <div className="flex-row" style={{ gap: '10px' }}>
                <div className="text-rg-14-24" style={{ color: '#848E9C' }}>
                  {t('depositWithdraw.crypto.withdraw.addressBook.yWillRecive')}
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

export default WithdrawAddressBookCryptoForm;
