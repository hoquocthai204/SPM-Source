import React, { useCallback } from 'react';
import { VerticalForm, SubmitButton } from 'components/Forms';
import { VerifyCodeInputField } from 'components/FormFields';
import { AUTHENTICATION_CODE } from 'consts';
import { useAppTranslation, useErrTranslation } from 'app/hooks';
import authApi from 'api/authApi';
import { useHandleResponseError, useSubmitForm, useHandleResponseSuccess } from 'hooks';
import { useNavigate } from 'react-router-dom';

interface StepThreeComponentProps {
  email: string;
  password: string;
}

export const StepThreeComponent: React.FunctionComponent<StepThreeComponentProps> = (props) => {
  const t = useAppTranslation();
  const et = useErrTranslation();
  const { email, password } = props;
  const handleResponseSuccess = useHandleResponseSuccess();
  const handleResponseError = useHandleResponseError();

  const navigate = useNavigate();

  const onSubmitStepThree = useSubmitForm(async (values: any) => {
    if (values) {
      const { ok, error } = await authApi.resetPassword({
        email: email,
        emailCode: values.verifyEmail,
        password: password,
        smsCode: values.verifyPhoneCode,
      });
      if (ok) {
        const handleOK = () => {
          navigate('/');
        };
        handleResponseSuccess(ok, 'alertSuccess.resetPassword.message', handleOK);
      } else if (error) {
        const er = { ...error };
        if (er.message === 'user.error.token-not-found') {
          er.message = 'user.error.email-otp.notfound';
          handleResponseError(er);
        } else if (er.message === 'user.error.sms-otp.notfound') {
          er.message = 'user.error.sms-otp-resetpassword.notfound';
          handleResponseError(er);
        } else if (er.message === 'user.error.new-password-duplicated') {
          handleResponseError(er);
        } else {
          handleResponseError(error);
        }
      }
    }
  });

  const onResendEmailCode = useCallback(async () => {
    const { error } = await authApi.resendEmailCode({
      email,
    });
    if (error) {
      handleResponseError(error);
    }
  }, [email]);

  const onResendPhoneCode = useCallback(async () => {
    const { error } = await authApi.resendPhoneCode({
      email,
    });
    if (error) {
      handleResponseError(error);
    }
  }, [email]);

  return (
    <VerticalForm onFinish={onSubmitStepThree}>
      {/* email */}
      <VerifyCodeInputField
        label={t('form.label.emailAuthenCode')}
        name="verifyEmail"
        placeholder={t('form.placeholder.emailAuthenCode')}
        onSendCode={onResendEmailCode}
        rules={[
          { required: true, message: et('input.validation.authenticationCode.required') },
          {
            pattern: AUTHENTICATION_CODE,
            message: et('input.validation.authenticationCode.pattern'),
          },
        ]}
      />
      {/* phone */}
      <VerifyCodeInputField
        label={t('form.label.phoneAuthenCode')}
        name="verifyPhoneCode"
        placeholder={t('form.placeholder.phoneAuthenCode')}
        onSendCode={onResendPhoneCode}
        rules={[
          { required: true, message: et('input.validation.authenticationCode.required') },
          {
            pattern: AUTHENTICATION_CODE,
            message: et('input.validation.authenticationCode.pattern'),
          },
        ]}
      />

      {/* submit */}
      <SubmitButton
        name={t('form.nameButton.next')}
        isBlock={true}
        type="primary"
        buttonStyle={{
          color: '#FFFFFF',
          fontWeight: '600',
          fontSize: '14px',
          fontFamily: 'inherit',
          height: '42px',
          lineHeight: '20px',
        }}
      />
    </VerticalForm>
  );
};
