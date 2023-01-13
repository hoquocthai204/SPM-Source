import React, { AllHTMLAttributes } from 'react';
import { Button } from 'antd';
import { useAppSelector, useAppTranslation, useErrTranslation } from 'app/hooks';
import { downloadQRCode } from 'utils';
import date from 'date-and-time';
import { DATE_TIME_FORMAT_3 } from 'consts';

interface DepositResultProps {
  onClose: any;
  result?: any;
  onCancel?: any;
}

const DepositResult: React.FunctionComponent<DepositResultProps> = ({
  onClose,
  result,
  onCancel,
}) => {
  const t = useAppTranslation();
  const et = useErrTranslation();
  const loading = useAppSelector((state) => state.loading.isLoading);

  return (
    <>
      <div
        style={{
          filter: loading ? 'blur(1px)' : 'blur(0px)',
        }}
      >
        <div className="flex-col flex-ai-center" style={{ marginBottom: '29px' }}>
          <span>
            <img
              src={`data:image/png;base64,${result.qrCode}`}
              alt="QR-code"
              width={200}
              height={200}
              id="qrCodeEl"
            />
          </span>
          <a
            href={`data:image/png;base64,${result.qrCode}`}
            className="text-md-12-24"
            style={{ color: '#357CE1' }}
            onClick={(e: any) => {
              const createdDate = date.format(new Date(result.qrExpiry), DATE_TIME_FORMAT_3);
              downloadQRCode(e, createdDate, result.amount);
            }}
          >
            {t('depositWithdraw.saveQrCode')}
          </a>
        </div>

        <div className="flex-col" style={{ gap: '8px' }}>
          <div className="flex-row flex-jt-space-bettween">
            <div className="text-r-14-20 " style={{ color: '#848E9C' }}>
              {t('depositWithdraw.amount')}
            </div>
            <div className="text-md-14-20">{result.amount} THB</div>
          </div>
          <div className="flex-row flex-jt-space-bettween">
            <div className="text-r-14-20 " style={{ color: '#848E9C' }}>
              {t('depositWithdraw.transactionId')}
            </div>
            <div className="text-md-14-20">{result.ref01 ? result.ref01 : result.id}</div>
          </div>
          <div className="flex-row flex-jt-space-bettween">
            <div className="text-r-14-20 " style={{ color: '#848E9C' }}>
              {t('depositWithdraw.ref')}
            </div>
            <div className="text-md-14-20">{result.ref02 ? result.ref02 : result.userId}</div>
          </div>

          {/* <div className="flex-row flex-jt-space-bettween">
            <div className="text-r-14-20 " style={{ color: '#848E9C' }}>
              {t('depositWithdraw.ref02')}
            </div>
            <div className="text-md-14-20">{result.ref01 ? result.ref01 : result.id}</div>
          </div> */}
        </div>

        <div className="flex-row" style={{ gap: '20px' }}>
          <Button
            onClick={onCancel.bind(null, {
              transactionId: result.id ? result.id : result.ref01,
            })}
            block
            style={{
              marginTop: '40px',
              color: '#FFFFFF',
              fontWeight: '600',
              fontSize: '14px',
              fontFamily: 'inherit',
              height: '42px',
              lineHeight: '20px',
              backgroundColor: '#08A19C',
            }}
          >
            Cancel
          </Button>
        </div>
      </div>
    </>
  );
};

export default DepositResult;
