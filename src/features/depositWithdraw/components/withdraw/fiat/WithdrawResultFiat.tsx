import React from 'react';
import { Button } from 'antd';
import { DepositWithdrawSuccessIcon, DepositWithdrawFailedIcon } from 'components/Icons';
import { t } from 'i18next';
interface WithdrawResultFiatProps {
  result: any;
  onClose: any;
  amountWithdraw?: string | number;
}

const WithdrawResultFiat: React.FunctionComponent<WithdrawResultFiatProps> = ({
  result,
  onClose,
  amountWithdraw,
}) => {
  return (
    <>
      <div className="flex-col flex-ai-center">
        <span
          style={{
            marginTop: '14px',
          }}
        >
          {result.status === 'PENDING_APPROVAL' || result.status === 'COMPLETED' ? (
            <DepositWithdrawSuccessIcon />
          ) : (
            <DepositWithdrawFailedIcon />
          )}
        </span>
        {result.status === 'PENDING_APPROVAL' || result.status === 'COMPLETED' ? (
          <p className="text-sb-20-20">{t('depositWithdraw.resultSuccessTitle')}</p>
        ) : (
          <p className="text-sb-20-20">{t('depositWithdraw.ressultFailedTitle')}</p>
        )}
        <p
          className="text-r-14-20"
          style={{
            textAlign: 'center',
            marginBottom: result === 'success' ? '30px' : '40px',
          }}
        >
          {result.status === 'PENDING_APPROVAL' || result.status === 'COMPLETED'
            ? `We will send you an email when your withdraw order status updates`
            : `Your withdraw request could not be performed. Please try again later`}
        </p>
      </div>
      {result.status === 'PENDING_APPROVAL' ||
        (result.status === 'COMPLETED' && (
          <div className="flex-col" style={{ gap: '8px' }}>
            <div className="flex-row flex-jt-space-bettween">
              <div className="text-r-14-20 " style={{ color: '#848E9C' }}>
                {t('depositWithdraw.amount')}
              </div>
              <div className="text-md-14-20">{amountWithdraw} THB</div>
            </div>

            <div className="flex-row flex-jt-space-bettween">
              <div className="text-r-14-20 " style={{ color: '#848E9C' }}>
                {t('depositWithdraw.transactionID')}
              </div>
              <div className="text-md-14-20">{result.id}</div>
            </div>
          </div>
        ))}

      <Button
        onClick={onClose}
        block
        style={{
          marginTop:
            result.status === 'PENDING_APPROVAL' || result.status === 'COMPLETED' ? '40px' : '0px',
          color: '#FFFFFF',
          fontWeight: '600',
          fontSize: '14px',
          fontFamily: 'inherit',
          height: '42px',
          lineHeight: '20px',
          backgroundColor: '#08A19C',
        }}
      >
        {t('form.nameButton.close')}
      </Button>
    </>
  );
};

export default WithdrawResultFiat;
