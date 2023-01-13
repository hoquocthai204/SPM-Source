import { Button } from 'antd';
import { useAppSelector, useAppTranslation } from 'app/hooks';
import * as React from 'react';
import { useNavigate } from 'react-router-dom';
import { showConfirmModal } from '../../../components/Modals';

interface ButtonWithModalProps {
  requiredVerifyKYC?: boolean;
  nameButton?: string;
}

const ButtonWithModal: React.FunctionComponent<ButtonWithModalProps> = (props) => {
  const { requiredVerifyKYC } = props;
  const navigate = useNavigate();
  const t = useAppTranslation();

  const requiredEnabled2faFiat = useAppSelector(
    (state) => state.depositWithdraw.requiredEnabled2faFiat
  );
  const requiredEnabled2faCrypto = useAppSelector(
    (state) => state.depositWithdrawCrypto.requiredEnabled2faCrypto
  );
  const onRedirectEnabled2FA = () => {
    navigate('/my/set-up-2fa');
  };

  const onCancelEnabled2FA = () => {};

  const checkModalWhich = () => {
    if (requiredEnabled2faFiat || requiredEnabled2faCrypto) {
      showConfirmModal({
        title: t('wallet.modalConfirm.title'),
        message: t('wallet.modalConfirm.message'),
        onOk: onRedirectEnabled2FA,
        okText: t('wallet.modalConfirm.okText'),
        onCancel: onCancelEnabled2FA,
        cancelText: t('wallet.modalConfirm.cancelText'),
      });
    }
  };
  return (
    <>
      <Button
        onClick={checkModalWhich}
        block
        style={{
          color: '#FFFFFF',
          fontWeight: '600',
          fontSize: '14px',
          fontFamily: 'inherit',
          height: '42px',
          lineHeight: '20px',
          marginTop: '40px',
          backgroundColor: '#08A19C',
        }}
      >
        {t('form.nameButton.withdraw')}
      </Button>
    </>
  );
};

export default ButtonWithModal;
