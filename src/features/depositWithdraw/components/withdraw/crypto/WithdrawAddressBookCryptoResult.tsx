import * as React from 'react';

import { Button } from 'antd';
import { DepositWithdrawFailedIcon, DepositWithdrawSuccessIcon } from 'components/Icons';
import { useAppTranslation } from 'app/hooks';
import { cutString, formatBigNumber } from 'utils';

interface WithdrawAddressBookCryptoResultProps {
  result: any;
  onClose: any;
}

const WithdrawAddressBookCryptoResult: React.FunctionComponent<
  WithdrawAddressBookCryptoResultProps
> = ({ result, onClose }) => {
  const t = useAppTranslation();
  return (
    <>
      <div className="flex-col flex-ai-center">
        <span
          style={{
            marginTop: '14px',
          }}
        >
          {result.status === 'success' && <DepositWithdrawSuccessIcon />}
          {result.status === 'failed' && <DepositWithdrawFailedIcon />}
        </span>
        {result.status === 'success' && (
          <p className="text-sb-20-20">
            {t('depositWithdraw.crypto.withdraw.addressBook.resultSuccessTitle')}
          </p>
        )}
        {result.status === 'failed' && (
          <p className="text-sb-20-20">
            {t('depositWithdraw.crypto.withdraw.addressBook.ressultFailedTitle')}
          </p>
        )}

        <p
          className="text-r-14-20"
          style={{
            textAlign: 'center',
            marginBottom: result === 'success' ? '30px' : '40px',
          }}
        >
          {result.status === 'failed' &&
            t('depositWithdraw.crypto.withdraw.addressBook.resultFailedMes')}
          {result.status === 'success' &&
            t('depositWithdraw.crypto.withdraw.addressBook.resultSuccessMes')}
        </p>
      </div>

      <div className="flex-col" style={{ gap: '8px' }}>
        {/*Requested amount  */}
        <div className="flex-row flex-jt-space-bettween">
          <div className="text-r-14-20 " style={{ color: '#848E9C' }}>
            {t('depositWithdraw.crypto.withdraw.addressBook.resquestedAmount')}
          </div>
          <div className="text-md-14-20">
            {result.amount ? result.amount : 0} {result.currency ? result.currency : ''}
          </div>
        </div>
        {/*To address  */}
        <div className="flex-row flex-jt-space-bettween">
          <div className="text-r-14-20 " style={{ color: '#848E9C' }}>
            {t('depositWithdraw.crypto.withdraw.addressBook.toAddress')}
          </div>
          <div className="text-md-14-20">
            {' '}
            {cutString({
              start: 6,
              end: 6,
              replaceBy: '...',
              originalString: result.address ? result.address : '',
            })}
          </div>
        </div>
        {/*To tag/memo  */}
        {result.tagMemo ? (
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
            {t('depositWithdraw.crypto.withdraw.addressBook.fee')}
          </div>
          <div className="text-md-14-20">
            {' '}
            {result.fee ? result.fee : 0} {result.currency ? result.currency : ''}
          </div>
        </div>
        {/*Receive amount  */}
        <div className="flex-row flex-jt-space-bettween">
          <div className="text-r-14-20 " style={{ color: '#848E9C' }}>
            {t('depositWithdraw.crypto.withdraw.addressBook.receiveAmount')}
          </div>
          <div className="text-md-14-20">
            {' '}
            {/* {result.amount ? result.amount - result.fee : 0}{' '} */}
            {result?.amount
              ? formatBigNumber(result.amount - (result.fee ? result.fee : 0))
              : 0}{' '}
            {result.currency ? result.currency : ''}
          </div>
        </div>
      </div>
      <Button
        onClick={onClose}
        block
        type="primary"
        style={{
          marginTop: '40px',
          color: '#FFFFFF',
          fontWeight: '600',
          fontSize: '14px',
          fontFamily: 'inherit',
          height: '42px',
          lineHeight: '20px',
        }}
      >
        {t('form.nameButton.close')}
      </Button>
    </>
  );
};

export default WithdrawAddressBookCryptoResult;
