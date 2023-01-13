import * as React from 'react';

import { useAppSelector, useAppTranslation, useErrTranslation } from 'app/hooks';
import WalletOverView from '../components/WalletOverView';
import WalletOverViewTable from '../components/WalletOverViewTable';
import PrivateRoute from 'PrivateRoute';
import { selectCurrentUser } from 'features/auth/authSlice';
import { showConfirmModal } from 'components/Modals';
import { useNavigate } from 'react-router-dom';

interface IWalletOverviewPageProps {}

const WalletOverviewPage: React.FunctionComponent<IWalletOverviewPageProps> = (props) => {
  const t = useAppTranslation();
  const et = useErrTranslation();
  const [isHide, setIsHide] = React.useState(false);
  const currentUser = useAppSelector(selectCurrentUser);
  const navigate = useNavigate();
  const onOk = () => {
    navigate('/my/verify-kyc');
  };
  const onCancel = () => {
    navigate('/');
  };
  React.useEffect(() => {
    if (!currentUser?.kycStatus || currentUser?.kycStatus !== 'ACCEPTED') {
      showConfirmModal({
        title: t('wallet.kycStatus.title'),
        message: t('wallet.kycStatus.message'),
        onOk: onOk,
        okText: 'Verify KYC',
        onCancel: onCancel,
      });
    }
    // if (!currentUser?.kycStatus && currentUser?.twoFaType === 'NONE') {
    //   showConfirmModal(
    //     t('wallet.twoFaStatus.title'),
    //     t('wallet.twoFaStatus.message'),
    //     onOk,
    //     '',
    //     onCancel
    //   );
    // }
  }, []);
  return (
    <>
      <div className="wallet">
        {/* TITLE */}
        <div className="wallet-title text-sb-32-30">{t('wallet.title')}</div>
        {/*  WALLET OVERVIEW*/}
        <WalletOverView
          eyeHide={isHide}
          onChangeHide={(value: boolean) => {
            setIsHide(value);
          }}
          userId={currentUser?.userId}
        />
        {/* WALLET TABLE */}
        <WalletOverViewTable isHide={isHide} userId={currentUser?.userId} />
      </div>
    </>
  );
};

export default PrivateRoute(WalletOverviewPage);
