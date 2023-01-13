import { Button } from 'antd';
import authApi from 'api/authApi';
import { useAppDispatch, useAppSelector, useAppTranslation } from 'app/hooks';
import { encode } from 'base-64';
import { Breadcrumb } from 'components/Commons';
import { showSuccessModal } from 'components/Modals';
import { useHandleResponseError, usePreventPage, useSubmitForm, useUserDetail } from 'hooks';
import { EmailInformation, EmailOTPInformation } from 'models';
import PrivateRoute from 'PrivateRoute';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { selectStepChangeMail, setClearStateToLogout, setStepChangeMail } from '../authSlice';
import ChangeEmailForm from '../components/ChangeEmailForm';

interface IChangeEmailPageProps {}

const initialValues: EmailInformation = {
  emailVerifyCode: '',
  newEmailVerifyCode: '',
  twoFaCode: '',
  newEmail: '',
};

const initialChangeEmail = {
  newEmail: '',
};

const ChangeEmailPage: React.FunctionComponent<IChangeEmailPageProps> = (props) => {
  usePreventPage({ twoFa: true });
  const t = useAppTranslation();

  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const stepChangeMailSelector = useAppSelector(selectStepChangeMail);

  const handleResponseError = useHandleResponseError();

  const { getUserDetail } = useUserDetail();

  const [newMail, setNewMail] = useState<string>('');

  const handleSubmitNewEmail = useSubmitForm(async (value: EmailOTPInformation) => {
    const { ok, error } = await authApi.getEmailOTP(value);
    if (ok) {
      dispatch(setStepChangeMail(2));
      setNewMail(value.newEmail as string);
    } else if (error) {
      handleResponseError(error);
    }
  });

  const handleUpdateNewEmail = useSubmitForm(async (value: EmailInformation) => {
    const detail = await getUserDetail();
    if (detail?.twoFaType === 'NONE') return;
    else {
      const { ok, error } = await authApi.updateEmail(
        {
          newEmail: newMail,
          emailVerifyCode: value.emailVerifyCode,
          newEmailVerifyCode: value.newEmailVerifyCode,
        },
        { headers: { 'X-Two-Fa': encode(JSON.stringify({ GOOGLE: value.twoFaCode })) } }
      );
      if (ok) showSuccessModal({ message: t('changeEmail.successModal'), onOk: handleOK });
      else if (error) {
        handleResponseError(error);
      }
    }
  });

  useEffect(() => {
    if (!newMail) dispatch(setStepChangeMail(1));
  }, [newMail]);

  const handleOK = () => {
    dispatch(setStepChangeMail(1));
    dispatch(setClearStateToLogout());
    navigate('/login');
  };

  return (
    <div className="change-email">
      <div className="change-email__head">
        <Breadcrumb backUrl={'/my/setting'} title={t('btnGoBack.account')} />
      </div>
      <div className="change-email__form">
        <div className="change-email__form-title">{t('changeEmail.title')}</div>
        <ChangeEmailForm
          initialChangeEmail={initialChangeEmail}
          onSubmitNewEmail={handleSubmitNewEmail}
          initialValues={initialValues}
          onUpdateNewEmail={handleUpdateNewEmail}
        />
        {stepChangeMailSelector !== 1 && (
          <Button type="ghost" onClick={() => dispatch(setStepChangeMail(1))}>
            {t('changeEmail.btnGoback')}
          </Button>
        )}
      </div>
    </div>
  );
};

export default PrivateRoute(ChangeEmailPage);
