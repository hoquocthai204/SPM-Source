import React, { useCallback, useEffect, useState } from 'react';
import { VerticalForm, SubmitButton } from 'components/Forms';
import { PasswordInputField } from 'components/FormFields';
import { PASSWORD_REGEX, GOOGLE_RECAPTCHA_SITE_KEY } from 'consts';
import { InfoBanner } from 'components/AlertBanners';
import { useAppTranslation, useErrTranslation, useAppSelector, useAppDispatch } from 'app/hooks';
import { selectCaptchaKey } from '../../authSlice';
import authApi from 'api/authApi';
import { ReCaptchaResponse } from 'models';
import ReCAPTCHA from 'react-google-recaptcha';
import { setCaptchaKey } from '../../authSlice';
import { useHandleResponseError, useSubmitForm } from 'hooks';
import { encode } from 'base-64';
interface StepTwoComponentProps {
  email: string;
  setPassword: (password: string) => void;
  setStep: (step: number) => void;
}

export const StepTwoComponent: React.FunctionComponent<StepTwoComponentProps> = (props) => {
  const t = useAppTranslation();
  const et = useErrTranslation();
  const dispatch = useAppDispatch();

  const { email, setPassword, setStep } = props;
  const captchaKey = useAppSelector(selectCaptchaKey);
  const handleResponseError = useHandleResponseError();
  const [captcha, setCaptcha] = useState<Map<string, ReCaptchaResponse>>(new Map());
  const onChange = (value: string | null) => {
    dispatch(setCaptchaKey(value as string));
  };
  const onSubmitResetPassword = useSubmitForm(async (values: any) => {
    if (values) {
      const { ok, error } = await authApi.initialResetPassword({
        params: {
          email: email,
        },
        headers: {
          'X-Recaptcha': encode(captchaKey),
        },
      });
      if (ok) {
        setStep(3);
        setPassword(values.newPassword);
      } else if (error) {
        handleResponseError(error);
      }
    }
  });
  const getRecaptcha = useCallback(async () => {
    const { body } = await authApi.getRecatcha();
    if (body) {
      const mapRecaptcha = new Map();
      body.forEach((recaptcha) => mapRecaptcha.set(recaptcha.friendlyName, recaptcha));
      setCaptcha(mapRecaptcha);
    }
  }, []);
  useEffect(() => {
    getRecaptcha();
  }, []);
  return (
    <VerticalForm onFinish={onSubmitResetPassword}>
      <InfoBanner description={t('reset-password.descriptionBanner')} />
      <PasswordInputField
        name="newPassword"
        label={t('form.label.newPassword')}
        placeholder={t('form.placeholder.newPassword')}
        rules={[
          { required: true, message: et('reset-password.validation.newPassword.required') },
          { pattern: PASSWORD_REGEX, message: et('reset-password.validation.newPassword.pattern') },
        ]}
      />
      <PasswordInputField
        name="confirmNewPassword"
        label={t('form.label.confirmNewPassword')}
        placeholder={t('form.placeholder.confirmNewPassword')}
        dependencies={['newPassword']}
        rules={[
          { required: true, message: et('reset-password.validation.cofirmNewPassword.required') },
          ({ getFieldValue }) => ({
            validator(_, value) {
              if (!value || getFieldValue('newPassword') === value) return Promise.resolve();
              return Promise.reject(
                new Error(et('reset-password.validation.cofirmNewPassword.pattern'))
              );
            },
          }),
        ]}
      />
      <div style={{ display: 'flex', justifyContent: 'center' }}>
        {captcha.get('RESET PASSWORD')?.enable ? (
          <ReCAPTCHA sitekey={GOOGLE_RECAPTCHA_SITE_KEY} onChange={onChange} />
        ) : (
          ''
        )}
      </div>
      <SubmitButton
        name={t('form.nameButton.next')}
        isBlock={true}
        type="primary"
        buttonStyle={{
          marginTop: '24px',
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
