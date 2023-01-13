import React, { useState, useEffect, useCallback } from 'react';
import { SubmitButton, VerticalForm } from 'components/Forms';
import { ReCaptchaResponse } from 'models';
import { EMAIL_REGEX, GOOGLE_RECAPTCHA_SITE_KEY } from 'consts';
import { useAppTranslation, useErrTranslation, useAppDispatch, useAppSelector } from 'app/hooks';
import { ClickAndDragUploadFileField } from 'components/FormFields';
import { InfoBanner } from 'components/AlertBanners';
import DrapOrDropSingleFileField from 'components/FormFields/DrapOrDropSingleFileField';
import ReCAPTCHA from 'react-google-recaptcha';
import { setCaptchaKey } from '../../authSlice';
import authApi from 'api/authApi';
import { selectCaptchaKey } from '../../authSlice';

interface IStepThreeComponentProps {
  onFinishStepThree: (values: any) => void;
  onGetFile?: (file: File) => void;
}

export const StepThreeComponent: React.FunctionComponent<IStepThreeComponentProps> = (props) => {
  const t = useAppTranslation();
  const et = useErrTranslation();
  const dispatch = useAppDispatch();

  const { onFinishStepThree, onGetFile } = props;
  const [captcha, setCaptcha] = useState<Map<string, ReCaptchaResponse>>(new Map());
  const captchaKey = useAppSelector(selectCaptchaKey);
  const onChange = (value: string | null) => {
    dispatch(setCaptchaKey(value as string));
  };

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
    <>
      <VerticalForm onFinish={onFinishStepThree}>
        <InfoBanner
          description={
            <>
              <ul>
                <li className="text-r-12-18">{t('resetGoogleAuthenticator.liFirst')}</li>
                <li className="text-r-12-18">{t('resetGoogleAuthenticator.liSecond')}</li>
              </ul>
            </>
          }
        />

        <DrapOrDropSingleFileField
          name="uploadPassport"
          label={t('resetGoogleAuthenticator.labelUpload')}
          rules={[
            {
              validator: (_, value) => {
                if (!Boolean(value)) {
                  return Promise.reject(
                    new Error(et('reset-gg-authen.validation.uploadIdCard.required'))
                  );
                }
                const fileExten = value[0].name.split('.');
                const isValid =
                  value[0].type === 'image/jpeg' ||
                  value[0].type === 'image/jpg' ||
                  value[0].type === 'image/png';
                if (!isValid) {
                  return Promise.reject(
                    new Error(
                      `${et('reset-gg-authen.validation.uploadIdCard.mesExtensionOne')} .${
                        fileExten[1]
                      } ${et('reset-gg-authen.validation.uploadIdCard.mesExtensionTwo')}`
                    )
                  );
                } else {
                  return Promise.resolve();
                }
              },
            },
          ]}
        />

        <div style={{ display: 'flex', justifyContent: 'center' }}>
          {captcha.get('RESET 2FA')?.enable ? (
            <ReCAPTCHA sitekey={GOOGLE_RECAPTCHA_SITE_KEY} onChange={onChange} />
          ) : (
            ''
          )}
        </div>
        <SubmitButton
          name={t('form.nameButton.submit')}
          isBlock={true}
          type="primary"
          buttonStyle={{
            marginTop: '40px',
            color: '#FFFFFF',
            fontWeight: '600',
            fontSize: '14px',
            fontFamily: 'inherit',
            height: '42px',
            lineHeight: '20px',
          }}
        />
      </VerticalForm>
    </>
  );
};
