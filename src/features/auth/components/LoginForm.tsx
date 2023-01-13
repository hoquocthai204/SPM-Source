import { useAppTranslation, useErrTranslation } from 'app/hooks';
import { PasswordInputField, TextInputField } from 'components/FormFields';
import { SubmitButton, VerticalForm } from 'components/Forms';
import { AUTHENTICATION_CODE, EMAIL_REGEX } from 'consts';
import { LoginInformation } from 'models';
import React from 'react';
import { NavLink } from 'react-router-dom';

interface LoginFormProps {
  initialValues: LoginInformation;
  onSubmit: any;
}

const LoginForm: React.FunctionComponent<LoginFormProps> = ({ onSubmit, initialValues }) => {
  const t = useAppTranslation();
  const et = useErrTranslation();

  return (
    <>
      <VerticalForm
        className="login__form"
        name="login"
        initialValues={initialValues}
        onFinish={onSubmit}
      >
        <TextInputField
          label={t('login.form.email')}
          name="email"
          placeholder={t('login.form.emailPlaceholder')}
          rules={[
            { required: true, message: et('login.validation.email.required') },
            { pattern: EMAIL_REGEX, message: et('login.validation.email.pattern') },
          ]}
        />

        <PasswordInputField
          label={t('login.form.password')}
          name="password"
          placeholder={t('login.form.passwordPlaceholder')}
          rules={[{ required: true, message: et('login.validation.password.required') }]}
        />

        <TextInputField
          label={t('login.form.authCode')}
          name="twoFaCode"
          rules={[{ pattern: AUTHENTICATION_CODE, message: et('login.validation.twoFA.pattern') }]}
          placeholder={t('login.form.authCodePlaceholder')}
        />

        <SubmitButton
          name={t('login.form.loginBtn')}
          type="primary"
          formFieldStyle={{ marginTop: '40px' }}
          buttonStyle={{
            width: '100%',
            fontWeight: '600',
            fontSize: '14px',
            lineHeight: '20px',
          }}
        />

        <div className="other-options">
          <NavLink to="/forgot-password">
            <span className="text-sb-14-20">{t('login.form.forgotPassword')}</span>
          </NavLink>
          <NavLink to="/reset-google-authenticator">
            <span className="text-sb-14-20">{t('login.form.resetAuthCode')}</span>
          </NavLink>
          <NavLink to="/register">
            <span className="text-sb-14-20">{t('login.form.register')}</span>
          </NavLink>
        </div>
      </VerticalForm>
    </>
  );
};

export default LoginForm;
