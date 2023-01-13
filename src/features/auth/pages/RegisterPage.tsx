import { useAppTranslation, useTitle } from 'app/hooks';
import { RegisterInformation } from 'models';
import React from 'react';
import RegisterForm from '../components/RegisterForm';

interface RegisterPageProps {}

const initialRegisterFormValues: RegisterInformation = {
  email: '',
  phoneNumber: '',
  password: '',
  referalId: '',
};

const RegisterPage: React.FunctionComponent<RegisterPageProps> = (props) => {
  const t = useAppTranslation();
  useTitle(t('title.signupPage'));

  return (
    <>
      <div className="register">
        <span className="text-sb-32-30 register__title">{t('register.title')}</span>
        <RegisterForm initialValues={initialRegisterFormValues} />
      </div>
    </>
  );
};

export default RegisterPage;
