import userApi from 'api/userApi';
import { useAppDispatch, useAppTranslation, useTitle } from 'app/hooks';
import { Breadcrumb } from 'components/Commons';
import { showSuccessModal } from 'components/Modals';
import { setClearStateToLogout } from 'features/auth/authSlice';
import { useHandleResponseError, useSubmitForm, usePreventPage } from 'hooks';
import { ChangePasswordInformation } from 'models';
import PrivateRoute from 'PrivateRoute';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import ChangePasswordForm from '../components/ChangePasswordForm';

interface ChangePasswordPageProps {}

const initialChangePasswordFormValues: ChangePasswordInformation = {
  currentPassword: '',
  newPassword: '',
};

const ChangePasswordPage: React.FunctionComponent<ChangePasswordPageProps> = (props) => {
  usePreventPage({ twoFa: true });
  const t = useAppTranslation();
  useTitle(t('title.changePassword'));
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const handleClearStateToLogout = () => {
    dispatch(setClearStateToLogout());
    setTimeout(() => {
      navigate('/login');
    }, 1000);
  };

  const handleResponseError = useHandleResponseError();
  const onSubmitChangePasswordForm = useSubmitForm(async (value: ChangePasswordInformation) => {
    const { ok, error } = await userApi.changePassword({ ...value });
    if (ok)
      showSuccessModal({
        message: t('setting.changePassword.popUpSuccess'),
        onOk: handleClearStateToLogout,
      });
    else if (error) handleResponseError(error);
  });

  return (
    <div className="change-password-page">
      <Breadcrumb title={t('setting.changePassword.goBack')} backUrl={'/my/setting'} size="small" />
      <div className="change-password">
        <span className="text-sb-32-30 change-password__title">
          {t('setting.changePassword.title')}
        </span>
        <ChangePasswordForm
          onSubmit={onSubmitChangePasswordForm}
          initialValues={initialChangePasswordFormValues}
        />
      </div>
    </div>
  );
};

export default PrivateRoute(ChangePasswordPage);
