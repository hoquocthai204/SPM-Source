import authApi from 'api/authApi';
import { useAppTranslation, useErrTranslation, useTitle } from 'app/hooks';
import { showConfirmModal } from 'components/Modals';
import { useHandleResponseError } from 'hooks';
import { usePreventLoggedIn } from 'hooks/usePreventLoggedIn';
import { useSubmitForm } from 'hooks/useSubmitForm';
import { useUserDetail } from 'hooks/useUserDetail';
import { LoginInformation } from 'models';
import React from 'react';
import LoginForm from '../components/LoginForm';

interface LoginPageProps {}

const initialLoginFormValues: LoginInformation = {
  email: '',
  password: '',
  twoFaCode: null,
};

const LoginPage: React.FunctionComponent<LoginPageProps> = (props) => {
  const t = useAppTranslation();
  const et = useErrTranslation();
  useTitle(t('title.loginPage'));
  usePreventLoggedIn();
  const handleResponseError = useHandleResponseError();

  const { getUserDetail } = useUserDetail();

  const onSubmitLoginForm = useSubmitForm(async (value: LoginInformation) => {
    const { ok, error } = await authApi.login({
      ...value,
      twoFaCode: value.twoFaCode === '' ? null : value.twoFaCode,
      platform: 'WEB',
    });
    if (ok) {
      getUserDetail();
    } else if (error) {
      if (error.message === 'user.error.login.reach.maxlimit') {
        showConfirmModal({
          message: et('user.error.login.reach.maxlimit'),
          onOk: async () => {
            const { ok } = await authApi.login({ ...value, platform: 'WEB', destroySession: true });
            if (ok) getUserDetail();
          },
        });
        getUserDetail();
      } else {
        handleResponseError(error);
      }
    }
  });

  return (
    <>
      <div className="login">
        <span className="text-sb-32-30 login__title">{t('login.title')}</span>
        <LoginForm onSubmit={onSubmitLoginForm} initialValues={initialLoginFormValues} />
      </div>
    </>
  );
};

export default LoginPage;
