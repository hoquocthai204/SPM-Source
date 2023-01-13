import Paragraph from 'antd/lib/typography/Paragraph';
import authApi from 'api/authApi';
import googleAuthenAPI from 'api/setUp2FaAPI';
import { useAppDispatch, useAppSelector, useAppTranslation } from 'app/hooks';
import downLoadAppstore from 'assets/images/download_on_app_store.png';
import downLoadChPlay from 'assets/images/download_on_ch_play.png';
import google_2FA from 'assets/images/google_2FA.jpg';
import { InfoBanner } from 'components/AlertBanners/InfoBanner';
import { Breadcrumb } from 'components/Commons';
import { SubmitButton } from 'components/Forms';
import { showSuccessModal } from 'components/Modals';
import { setClearStateToLogout } from 'features/auth/authSlice';
import { useHandleResponseError } from 'hooks';
import { GoogleAuthenInformation, GoogleAuthenSecret } from 'models';
import PrivateRoute from 'PrivateRoute';
import React, { useCallback, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import SetUp2FAForm from '../components/2FAForm';
import { setStep } from './setUp2FASlice';

interface setUp2FAPageProps {}

const SetUp2FA: React.FunctionComponent<setUp2FAPageProps> = (props) => {
  const t = useAppTranslation();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const handleResponseError = useHandleResponseError();
  const step = useAppSelector((state) => state.setUp2FA.step);
  const [secret, setSecret] = useState<GoogleAuthenSecret>();

  const initial2FAFormValues: GoogleAuthenInformation = {
    twoFaCode: '',
    secret: '',
  };

  const handleChangeStep = () => {
    dispatch(setStep(step === 0 ? 1 : step === 1 ? 2 : 1));
  };

  const logoutSession = useCallback(async () => {
    await authApi.logout();
  }, []);

  const handleLogout = () => {
    dispatch(setStep(0));
    dispatch(setClearStateToLogout());
    logoutSession();
    navigate('/login');
  };

  const onSubmit2FA = async (value: any) => {
    const { ok, error } = await googleAuthenAPI.enableGoogleAuthentication({
      ...value,
      secret: secret?.secretKey,
    });
    if (ok) showSuccessModal({ message: t('setUp2FA.popUpSuccess'), onOk: handleLogout });
    else if (error) handleResponseError(error);
  };
  useEffect(() => {
    getGoogleAuthenSecret();
  }, []);
  const getGoogleAuthenSecret = useCallback(async () => {
    const { body } = await googleAuthenAPI.getSecretGoogleAuthen({});
    if (body) {
      setSecret({
        qrUri: body.qrUri,
        secretKey: body.secretKey,
      });
    } else {
      setSecret({});
    }
  }, []);
  return (
    <>
      <div className="set-up-2fa">
        <div className="set-up-2fa__go-back">
          <Breadcrumb backUrl={'/my/setting'} title={t('setUp2FA.security')} />
        </div>
        <div className="set-up-2fa__form">
          <div className="set-up-2fa__form__title">
            {t('setUp2FA.title1')} <br /> {t('setUp2FA.title2')}
          </div>
          {step === 2 && (
            <div className="set-up-2fa__form__input">
              <SetUp2FAForm onSubmit={onSubmit2FA} initialValues={initial2FAFormValues} />
            </div>
          )}
          {step === 1 && (
            <div className="set-up-2fa__form__info">
              <InfoBanner description={t('setUp2FA.form.notiInfo')} />
            </div>
          )}
          {step !== 2 && (
            <div className="set-up-2fa__form__img" style={step === 1 ? { height: '269px' } : {}}>
              <img
                src={step === 1 ? secret?.qrUri : google_2FA}
                alt=""
                width={step === 1 ? '250' : '100%'}
                height={step === 1 ? '250' : ''}
                style={step === 1 ? { marginTop: '0' } : {}}
              />
            </div>
          )}
          {step === 1 ? (
            <div className="set-up-2fa__form__code">
              <Paragraph copyable className="secretCode">
                {secret && secret.secretKey}
              </Paragraph>
              <span>Copy</span>
            </div>
          ) : (
            step === 0 && (
              <div className="set-up-2fa__form__description">{t('setUp2FA.installApp')}</div>
            )
          )}
          {step === 0 && (
            <div className="set-up-2fa__form__group-btn">
              <div className="download-app-store">
                <img src={downLoadAppstore} alt="App Store" />
              </div>
              <div className="download-ch-play">
                <img src={downLoadChPlay} alt="Ch Play" />
              </div>
            </div>
          )}
          <div className="set-up-2fa__form__button--next" onClick={() => handleChangeStep()}>
            {step === 2 ? (
              <SubmitButton
                name={t('setUp2FA.form.btnBack')}
                type="text"
                buttonStyle={{ width: '100%', fontWeight: '600' }}
              />
            ) : (
              <SubmitButton
                name={t('setUp2FA.form.btnNext')}
                type="primary"
                buttonStyle={{ width: '100%', fontWeight: '600' }}
              />
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default PrivateRoute(SetUp2FA);
