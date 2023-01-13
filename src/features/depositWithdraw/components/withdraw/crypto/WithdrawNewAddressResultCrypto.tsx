import React, { useState } from 'react';

import { Checkbox } from 'antd';
import { useAppTranslation, useErrTranslation } from 'app/hooks';
import { cutString, formatBigNumber, isEmptyObject } from 'utils';

import { DepositWithdrawFailedIcon, DepositWithdrawSuccessIcon } from 'components/Icons';
import { SubmitButton, VerticalForm } from 'components/Forms';
import { TextInputField } from 'components/FormFields';
import cryptoApi from 'api/cryptoApi';
import { useHandleResponseError, useHandleResponseSuccess } from 'hooks';
import { ResultSubmitWithdrawCrypto } from 'models';
interface WithdrawNewAddressResultCryptoProps {
  result: ResultSubmitWithdrawCrypto | null;
  onClose: any;
}

const WithdrawNewAddressResultCrypto: React.FunctionComponent<
  WithdrawNewAddressResultCryptoProps
> = ({ result, onClose }) => {
  const [isShowInputAddressBook, setIsShowInputAddressBook] = useState(false);
  const t = useAppTranslation();
  const onChangeCheckBox = (e: any) => {
    setIsShowInputAddressBook(e.target.checked);
  };

  const handleResponseSuccess = useHandleResponseSuccess();
  const handleResponseError = useHandleResponseError();

  const handleSaveAddressOrClose = (values: any) => {
    if (!isEmptyObject(values)) {
      saveNewAddress(values);
    } else {
      onClose();
    }
  };

  const saveNewAddress = async (values: any) => {
    const res = await cryptoApi.saveNewAddress({
      address: result?.address,
      currency: result?.currency,
      name: values.shortName,
      network: result?.network,
      tag: result?.tagMemo ? result.tagMemo : '',
    });

    if (res.ok) {
      handleResponseSuccess(
        res.ok,
        t('depositWithdraw.crypto.withdraw.newAddressBook.messSaveNewAddressBookSuccess'),
        onClose
      );
    } else if (res.error) {
      handleResponseError(res.error);
    }
  };
  return (
    <>
      <div className="flex-col flex-ai-center">
        <span
          style={{
            marginTop: '14px',
          }}
        >
          {result?.status === 'success' && <DepositWithdrawSuccessIcon />}
        </span>
        {result?.status === 'success' && (
          <p className="text-sb-20-20">
            {' '}
            {t('depositWithdraw.crypto.withdraw.newAddressBook.resultSuccessTitle')}
          </p>
        )}
        {result?.status === 'failed' && (
          <p className="text-sb-20-20">
            {' '}
            {t('depositWithdraw.crypto.withdraw.newAddressBook.ressultFailedTitle')}
          </p>
        )}

        <p
          className="text-r-14-20"
          style={{
            textAlign: 'center',
            marginBottom: result?.status === 'success' ? '30px' : '40px',
          }}
        >
          {result?.status === 'failed' &&
            t('depositWithdraw.crypto.withdraw.newAddressBook.resultFailedMes')}
          {result?.status === 'success' &&
            t('depositWithdraw.crypto.withdraw.newAddressBook.resultSuccessMes')}
        </p>
      </div>

      <div className="flex-col" style={{ gap: '8px' }}>
        {/*Requested amount  */}
        <div className="flex-row flex-jt-space-bettween">
          <div className="text-r-14-20 " style={{ color: '#848E9C' }}>
            {t('depositWithdraw.crypto.withdraw.newAddressBook.resquestedAmount')}
          </div>
          <div className="text-md-14-20">
            {result?.amount ? result.amount : 0} {result?.currency ? result.currency : ''}
          </div>
        </div>
        {/*To address  */}
        <div className="flex-row flex-jt-space-bettween">
          <div className="text-r-14-20 " style={{ color: '#848E9C' }}>
            {t('depositWithdraw.crypto.withdraw.newAddressBook.toAddress')}
          </div>
          <div className="text-md-14-20">
            {cutString({
              start: 6,
              end: 6,
              replaceBy: '...',
              originalString: result?.address ? result.address : '',
            })}
          </div>
        </div>
        {/*To tag/memo  */}
        {result?.tagMemo ? (
          <>
            <div className="flex-row flex-jt-space-bettween">
              <div className="text-r-14-20 " style={{ color: '#848E9C' }}>
                {t('depositWithdraw.crypto.withdraw.newAddressBook.toTagMemo')}
              </div>
              <div className="text-md-14-20">{result.tagMemo ? result.tagMemo : ''} </div>
            </div>
          </>
        ) : null}

        {/*Fee  */}
        <div className="flex-row flex-jt-space-bettween">
          <div className="text-r-14-20 " style={{ color: '#848E9C' }}>
            {t('depositWithdraw.crypto.withdraw.newAddressBook.fee')}
          </div>
          <div className="text-md-14-20">
            {result?.fee ? result.fee : 0} {result?.currency ? result.currency : ''}
          </div>
        </div>
        {/*Receive amount  */}
        <div className="flex-row flex-jt-space-bettween">
          <div className="text-r-14-20 " style={{ color: '#848E9C' }}>
            {t('depositWithdraw.crypto.withdraw.addressBook.receiveAmount')}
          </div>
          <div className="text-md-14-20">
            {/* {result?.amount ? result.amount - (result.fee ? result.fee : 0) : 0}{' '} */}
            {result?.amount
              ? formatBigNumber(result.amount - (result.fee ? result.fee : 0))
              : 0}{' '}
            {result?.currency ? result.currency : ''}
          </div>
        </div>
      </div>

      <div className="flex-row flex-jt-space-bettween" style={{ marginTop: '30px' }}>
        <p className="text-md-14-16">
          {t('depositWithdraw.crypto.withdraw.newAddressBook.btnSaveAddress')}
        </p>
        <Checkbox onChange={onChangeCheckBox} />
      </div>
      <VerticalForm onFinish={handleSaveAddressOrClose}>
        {isShowInputAddressBook && (
          <TextInputField
            name="shortName"
            placeholder={t('depositWithdraw.crypto.withdraw.newAddressBook.placeHoldrAddress')}
            rules={[
              {
                required: true,
                message: 'Please enter short name address',
              },
            ]}
          />
        )}
        {isShowInputAddressBook ? (
          <SubmitButton
            type="primary"
            name={t('form.nameButton.saveNewAddress')}
            isBlock={true}
            buttonStyle={{
              color: '#FFFFFF',
              fontWeight: '600',
              fontSize: '14px',
              fontFamily: 'inherit',
              height: '42px',
              lineHeight: '20px',
              marginTop: '16px',
            }}
          />
        ) : (
          <SubmitButton
            type="primary"
            name={t('form.nameButton.close')}
            isBlock={true}
            buttonStyle={{
              color: '#FFFFFF',
              fontWeight: '600',
              fontSize: '14px',
              fontFamily: 'inherit',
              height: '42px',
              lineHeight: '20px',
              marginTop: '16px',
            }}
          />
        )}
      </VerticalForm>
    </>
  );
};

export default WithdrawNewAddressResultCrypto;
