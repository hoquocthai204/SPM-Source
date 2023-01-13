import { Button } from 'antd';
import authApi from 'api/authApi';
import { useAppDispatch, useAppSelector, useAppTranslation } from 'app/hooks';
import { encode } from 'base-64';
import { Breadcrumb } from 'components/Commons';
import { showSuccessModal } from 'components/Modals';
import { useHandleResponseError, useSubmitForm, useUserDetail, usePreventPage } from 'hooks';
import { ChangePhone, ChangePhoneInformation } from 'models';
import PrivateRoute from 'PrivateRoute';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { selectStepChangePhone, setStepChangePhone } from '../authSlice';
import ChangePhoneForm from '../components/ChangePhoneForm';

interface IChangePhonePageProps {}
const initialChangePhoneFormValues = {
  oldPhoneOtp: '',
  newPhoneOtp: '',
  twoFaCode: '',
};
const initialChangePhone: ChangePhone = {
  phoneNumber: '',
  phoneCode: '66',
  newPhoneCode: '',
};
const ChangePhonePage: React.FunctionComponent<IChangePhonePageProps> = (props) => {
  usePreventPage({ twoFa: true });
  const t = useAppTranslation();

  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const handleResponseError = useHandleResponseError();

  const { getUserDetail } = useUserDetail();

  const stepChangePhoneSelector = useAppSelector(selectStepChangePhone);

  const [newPhone, setNewPhone] = useState<string>('');

  const handleOK = () => {
    navigate('/my/setting');
    dispatch(setStepChangePhone(1));
  };

  const getPhoneNumber = (phoneNumber: string, phoneCode: string) => {
    if (phoneNumber?.startsWith(phoneCode)) {
      return phoneNumber;
    }
    return `${phoneCode}${phoneNumber}`;
  };

  const onSubmitNewPhone = useSubmitForm(async (value: ChangePhone) => {
    const phoneNumber = getPhoneNumber(value.phoneNumber, value.phoneCode?.toString());
    const { ok, error } = await authApi.getPhoneNumberOtp({ phoneNumber });
    if (ok) {
      dispatch(setStepChangePhone(2));
      setNewPhone(phoneNumber);
    } else if (error) {
      if (error.message === 'user.error.user-detail.phone-already-taken') {
        error.message = error.message + '-change-phone';
        error.title = error.title + '-change-phone';
        handleResponseError(error);
      } else {
        const fieldErrorPhoneNumber = error.fieldErrors;
        (fieldErrorPhoneNumber || {}).phoneNumber = (fieldErrorPhoneNumber || {})[
          'sendUpdateUserPhoneNumber.phoneNumber'
        ];
        handleResponseError(error);
      }
    }
  });

  const onSubmitChangePhone = useSubmitForm(async (value: ChangePhoneInformation) => {
    const detail = await getUserDetail();
    if (detail?.twoFaType === 'NONE') return;
    else {
      const { ok, error } = await authApi.updatePhone(
        {
          newPhoneOtp: value.newPhoneOtp,
          oldPhoneOtp: value.oldPhoneOtp,
        },
        { headers: { 'X-Two-Fa': encode(JSON.stringify({ GOOGLE: value.twoFaCode })) } }
      );
      if (ok) showSuccessModal({ message: t('change-phone.modalSuccess'), onOk: handleOK });
      else if (error) {
        handleResponseError(error);
      }
    }
  });

  useEffect(() => {
    if (!newPhone) dispatch(setStepChangePhone(1));
  }, [newPhone]);

  return (
    <>
      <div className="change-phone">
        <div className="change-phone__head">
          <Breadcrumb backUrl={'/my/setting'} title={t('change-phone.btnGoBack')} />
        </div>
        <div className="change-phone__form">
          <div className="change-phone__form__title">{t('change-phone.form.title')}</div>
          <ChangePhoneForm
            initialChangePhone={initialChangePhone}
            initialValues={initialChangePhoneFormValues}
            onSubmitNewPhone={onSubmitNewPhone}
            onSubmitChangePhone={onSubmitChangePhone}
          />
          {stepChangePhoneSelector !== 1 && (
            <Button
              type="ghost"
              style={{ width: '100%' }}
              onClick={() => dispatch(setStepChangePhone(1))}
            >
              Back
            </Button>
          )}
        </div>
      </div>
    </>
  );
};

export default PrivateRoute(ChangePhonePage);
