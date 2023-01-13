import React, { useState } from 'react';
import { useAppTranslation, useErrTranslation, useAppSelector } from 'app/hooks';
import {
  StepOneComponent,
  StepTwoComponent,
  StepThreeComponent,
  StepFourComponent,
} from '../components/ResetGoogleAuthen';
import reset2faApi from 'api/reset2faApi';
import { encode } from 'base-64';
import { selectCaptchaKey } from '../authSlice';
import { useHandleResponseError, useSubmitForm, useHandleResponseSuccess } from 'hooks';
import { useNavigate } from 'react-router-dom';
import { usePreventLoggedIn } from 'hooks/usePreventLoggedIn';

interface IResetGoogleAuthenticationProps {}

const ResetGoogleAuthentication: React.FunctionComponent<IResetGoogleAuthenticationProps> = (
  props
) => {
  const [step, setStep] = useState(1);
  const t = useAppTranslation();
  const et = useErrTranslation();
  usePreventLoggedIn();
  const navigate = useNavigate();
  const handleReponseSucess = useHandleResponseSuccess();

  const captchaKey = useAppSelector(selectCaptchaKey);
  const [email, setEmail] = React.useState('');
  const [fileImg, setFileImg] = React.useState<any>();
  const [token, setToken] = React.useState<string>('');
  const handleResponseError = useHandleResponseError();

  const onFinishStepOne = (values: any) => {
    if (values) {
      setStep((prevState) => prevState + 1);
      setEmail(values.email);
    }
  };
  const onFinishStepTwo = (values: any) => {
    if (values.checkboxFirst === true && values.checkboxSecond)
      setStep((prevState) => prevState + 1);
  };
  const onFinishStepThree = useSubmitForm(async (values: any) => {
    if (values) {
      const { ok, error } = await reset2faApi.inititalReset2FA(
        {
          countryCode: 'VN',
          email: email,
          languageCode: 'VN',
          twoFaType: 'GOOGLE',
        },
        {
          headers: { 'X-Recaptcha': encode(captchaKey) },
        }
      );
      if (ok) {
        setFileImg(values.uploadPassport[0]);
        setStep(4);
      } else if (error) {
        const er = { ...error };
        if (er.message === 'user.error.2fa.reset.request-inprocess') {
          const hanleError = () => {
            navigate('/');
          };
          handleResponseError(error, hanleError);
        }
      }
    }
  });
  const onSubmit = useSubmitForm(async (values: any) => {
    if (values) {
      const formData = new FormData();
      formData.append('file', fileImg.originFileObj);
      formData.append('email', email);
      formData.append('token', values.verifyEmail);
      formData.append('twoFaType', 'GOOGLE');
      const { ok, error } = await reset2faApi.submitReset2FA(formData);
      if (ok) {
        const handleOK = () => {
          navigate('/');
        };
        handleReponseSucess(ok, 'reset-gg-authen.reset-succes', handleOK);
      } else if (error) {
        const er = { ...error };
        er.title = 'reset-gg-authen.title-failed';
        if (er.message === 'user.error.token-not-found') {
          er.message = 'user.error.email-otp-code-not-found';
          handleResponseError(er);
        }
      }
      setToken(values.verifyEmail);
    }
  });
  const onGetFile = (file: File) => {};
  const onSendEmailCode = async () => {
    onFinishStepThree({ uploadPassport: [fileImg] });
  };
  return (
    <>
      <div className="reset-google-authentication">
        <div className="reset-google-authentication-head">
          <div className="reset-google-authentication-head__title text-sb-32-30">
            {t('resetGoogleAuthenticator.titleFirst')}
          </div>
          <div className="reset-google-authentication-head__title text-sb-32-30">
            {t('resetGoogleAuthenticator.titleSecond')}
          </div>
        </div>
        <div className="reset-google-authentication-form">
          {/* STEP - 1: Enter email */}
          {step === 1 && <StepOneComponent onFinishStepOne={onFinishStepOne} />}
          {/* STEP 2: Chekcbox */}
          {step === 2 && <StepTwoComponent onFinishStepTwo={onFinishStepTwo} />}
          {/* STEP 3: Upload image */}
          {step === 3 && (
            <StepThreeComponent onFinishStepThree={onFinishStepThree} onGetFile={onGetFile} />
          )}
          {/* STEP 3: Send OTP */}
          {step === 4 && (
            <StepFourComponent onFinishStepFour={onSubmit} onSendCode={onSendEmailCode} />
          )}
        </div>
      </div>
    </>
  );
};

export default ResetGoogleAuthentication;
