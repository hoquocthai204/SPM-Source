import { useAppSelector, useAppTranslation } from 'app/hooks';
import { showConfirmModal } from 'components/Modals';
import { selectCurrentUser } from 'features/auth/authSlice';
import { useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';

interface PreventPage {
  kyc?: boolean;
  twoFa?: boolean;
}

export const usePreventPage = ({ kyc, twoFa }: PreventPage) => {
  const t = useAppTranslation();
  const navigate = useNavigate();
  const currentUser = useAppSelector(selectCurrentUser);
  const isModalShown = useRef<boolean>(false);

  useEffect(() => {
    checkPreventPage();
  }, [currentUser?.kycStatus, currentUser, isModalShown, currentUser?.twoFaType]);

  const checkPreventPage = () => {
    if (isModalShown.current) return;
    //kyc
    if (kyc) {
      if (currentUser && currentUser?.kycStatus !== 'ACCEPTED' && !isModalShown.current) {
        isModalShown.current = true;
        showConfirmModal({
          title: t('preventWhenNonKyc.title'),
          message: t('preventWhenNonKyc.message'),
          onOk: () => navigate('/my/verify-kyc'),
          okText: t('preventWhenNonKyc.btnOk'),
          onCancel: () => navigate(-1),
          afterClose: () => (isModalShown.current = false),
        });
        return;
      }
    }
    if (twoFa) {
      if (currentUser && (!currentUser?.twoFaType || currentUser?.twoFaType === 'NONE')) {
        isModalShown.current = true;
        showConfirmModal({
          title: t('preventWhenNo2FA.title'),
          message: t('preventWhenNo2FA.message'),
          onOk: () => navigate('/my/set-up-2fa'),
          onCancel: () => navigate(-1),
          afterClose: () => (isModalShown.current = false),
        });
        return;
      }
    }
  };
};
