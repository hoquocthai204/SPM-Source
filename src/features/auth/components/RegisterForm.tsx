import { Form } from 'antd';
import registerApi from 'api/registerApi';
import { useAppDispatch, useAppTranslation, useErrTranslation } from 'app/hooks';
import { encode } from 'base-64';
import { InfoBanner } from 'components/AlertBanners';
import {
  CheckboxField,
  PasswordInputField,
  PhoneInputField,
  TextInputField,
} from 'components/FormFields';
import { SubmitButton, VerticalForm } from 'components/Forms';
import {
  EMAIL_REGEX,
  GOOGLE_RECAPTCHA_SITE_KEY,
  PASSWORD_REGEX,
  PHONE_NUMBER_REGEX,
  REFERRAL_CODE,
} from 'consts';
import { useHandleResponseError, useSubmitForm } from 'hooks';
import { ReCaptchaResponse, RegisterInformation } from 'models';
import React, { createRef, useCallback, useEffect, useState } from 'react';
import ReCAPTCHA from 'react-google-recaptcha';
import { NavLink, useNavigate } from 'react-router-dom';

import { setUserRegister } from '../authSlice';

interface RegisterFormProps {
  initialValues: any;
}

const RegisterForm: React.FunctionComponent<RegisterFormProps> = ({ initialValues }) => {
  const t = useAppTranslation();
  const et = useErrTranslation();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const handleResponseError = useHandleResponseError();

  const captchaRef = createRef<ReCAPTCHA>();

  const [form] = Form.useForm();
  const [captcha, setCaptcha] = useState<Map<string, ReCaptchaResponse>>(new Map());
  const [captchaKey, setCaptchaKey] = useState<string>('');

  const onChangeCaptcha = (value: string | null) => {
    setCaptchaKey(value as string);
  };

  useEffect(() => {
    getRecaptcha();
  }, []);

  const getRecaptcha = useCallback(async () => {
    const { body } = await registerApi.getRecapcha();
    if (body) {
      const mapRecaptcha = new Map();
      body.forEach((recaptcha) => mapRecaptcha.set(recaptcha.friendlyName, recaptcha));
      setCaptcha(mapRecaptcha);
    }
  }, []);

  const onSubmitRegisterForm = useSubmitForm(async (value: RegisterInformation) => {
    const { ok, error } = await registerApi.register(
      { ...value, phoneNumber: value.phoneCode + value.phoneNumber },
      { headers: { 'X-Recaptcha': encode(captchaKey) } }
    );
    if (ok) {
      dispatch(setUserRegister({ ...value, phoneNumber: value.phoneCode + value.phoneNumber }));
      setTimeout(() => navigate('/verify-account'), 200);
    } else if (error) handleResponseError(error);
    captchaRef.current?.reset();
  });

  return (
    <>
      <VerticalForm
        className="register__form"
        name="register"
        initialValues={initialValues}
        onFinish={onSubmitRegisterForm}
        form={form}
      >
        <InfoBanner description={t('register.form.banner')} />
        <TextInputField
          label={t('register.form.email')}
          name="email"
          placeholder={t('register.form.emailPlaceholder')}
          rules={[
            { required: true, message: et('register.validation.email.required') },
            { pattern: EMAIL_REGEX, message: et('register.validation.email.pattern') },
            { max: 200, message: et('register.validation.email.maxLength') },
          ]}
        />

        <PhoneInputField
          label={t('register.form.phoneNumber')}
          name="phoneNumber"
          placeholder={t('register.form.phoneNumberPlaceholder')}
          rules={[
            { required: true, message: et('register.validation.mobilePhone.required') },
            { pattern: PHONE_NUMBER_REGEX, message: et('register.validation.mobilePhone.pattern') },
          ]}
        />

        <PasswordInputField
          label={t('register.form.password')}
          name="password"
          placeholder={t('register.form.passwordPlaceholder')}
          rules={[
            { required: true, message: et('register.validation.password.required') },
            { pattern: PASSWORD_REGEX, message: et('register.validation.password.pattern') },
            { max: 128, message: et('register.validation.password.maxLength') },
          ]}
        />

        <PasswordInputField
          label={t('register.form.cfPassword')}
          name="confirmPassword"
          dependencies={['password']}
          placeholder={t('register.form.cfPasswordPlaceholder')}
          rules={[
            { required: true, message: et('register.validation.confirmPassword.required') },
            ({ getFieldValue }) => ({
              validator(_, value) {
                if (!value || getFieldValue('password') === value) return Promise.resolve();
                return Promise.reject(new Error(et('register.validation.confirmPassword.pattern')));
              },
            }),
          ]}
        />

        <TextInputField
          label={t('register.form.referralCode')}
          name="referralCode"
          placeholder={t('register.form.referralCodePlaceholder')}
          rules={[
            { pattern: REFERRAL_CODE, message: et('register.validation.referralCode.pattern') },
          ]}
        />

        <CheckboxField
          name="firstCheckbox"
          label={t('register.form.firstCheckBox')}
          required={true}
          message={et('register.validation.checkBox.required')}
        />
        <CheckboxField
          name="secondCheckbox"
          label={t('register.form.secondCheckBox')}
          required={true}
          message={et('register.validation.checkBox.required')}
        />
        <div style={{ display: 'flex', justifyContent: 'center' }}>
          {captcha.get('SIGNUP')?.enable ? (
            <ReCAPTCHA
              ref={captchaRef}
              sitekey={GOOGLE_RECAPTCHA_SITE_KEY}
              onChange={onChangeCaptcha}
            />
          ) : (
            ''
          )}
        </div>

        <SubmitButton
          name={t('register.form.loginBtn')}
          type="primary"
          formFieldStyle={{ marginTop: '40px' }}
          buttonStyle={{
            width: '100%',
            fontWeight: '600',
            fontSize: '14px',
            lineHeight: '20px',
          }}
        />
        <NavLink to="/login">
          <span className="text-sb-14-20">{t('register.form.login')}</span>
        </NavLink>
      </VerticalForm>
    </>
  );
};

export default RegisterForm;
