import registerApi from 'api/registerApi';
import { useAppSelector, useAppTranslation, useTitle } from 'app/hooks';
import { useHandleResponseError } from 'hooks';
import { VerifyInformation } from 'models';
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { selectUserRegister } from '../authSlice';
import VerifyAccountForm from '../components/VerifyAccountForm';

interface VerifyAccountPageProps {}

const initialVerifyAccountFormValues: VerifyInformation = {
  emailVerifyCode: '',
  phoneVerifyCode: '',
};

const VerifyAccountPage: React.FunctionComponent<VerifyAccountPageProps> = (props) => {
  const t = useAppTranslation();
  useTitle(t('title.verifyAccountPage'));
  const navigate = useNavigate();
  const userRegister = useAppSelector(selectUserRegister);

  const handleResponseError = useHandleResponseError();

  const onSubmitVerifyAccountForm = async (value: VerifyInformation) => {
    const { ok, error } = await registerApi.verify({
      ...value,
      phoneNumber: userRegister?.phoneNumber,
      email: userRegister?.email,
    });
    if (ok) navigate('/login');
    if (error) handleResponseError(error);
  };
  useEffect(() => {
    window.addEventListener('beforeunload', (event) => {
      event.returnValue = `Are you sure you want to leave?`;
    });
  }, []);

  return (
    <>
      <div className="verify-account">
        <span className="text-sb-32-30 verify-account__title">{t('verify-account.title')}</span>
        <VerifyAccountForm
          onSubmit={onSubmitVerifyAccountForm}
          initialValues={initialVerifyAccountFormValues}
          userRegister={userRegister}
        />
      </div>
    </>
  );
};

export default VerifyAccountPage;
