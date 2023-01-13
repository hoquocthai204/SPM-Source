import bankApi from 'api/bankApi';
import { useAppTranslation } from 'app/hooks';
import { encode } from 'base-64';
import { InfoBanner } from 'components/AlertBanners';
import { showSuccessModal } from 'components/Modals';
import { useHandleResponseError, useSubmitForm } from 'hooks';
import { BankInfo } from 'models/bank/bankInfo';
import PrivateRoute from 'PrivateRoute';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AddUserBankForm from '../components/AddUserBankForm';

interface addUserBankProps {}

const AddUserBank: React.FunctionComponent<addUserBankProps> = (props) => {
  const navigate = useNavigate();
  const t = useAppTranslation();

  const [fileDirection, setFileDirection] = useState<any>({});

  const handleResponseError = useHandleResponseError();

  const initialUserBankFormValues = {
    accountHolderName: '',
    accountNumber: '',
    bankId: null,
    file: null,
  };

  const handleGetFile = (file: File) => {
    setFileDirection(file);
  };
  const handleOk = () => {
    navigate('/my/manage-bank');
  };
  const onSubmitUserBank = useSubmitForm(async (value: BankInfo) => {
    const obj = JSON.parse(JSON.stringify(value));
    const formData = new FormData();

    formData.append('accountHolderName', obj.accountHolderName);
    formData.append('accountNumber', obj.accountNumber);
    formData.append('bankId', obj.bankId);
    formData.append('file', fileDirection);

    const { ok, error } = await bankApi.addBank(formData, {
      headers: { 'X-Two-Fa': encode(JSON.stringify({ GOOGLE: value.twoFaCode })) },
    });
    if (ok) showSuccessModal({ message: t('add-user-bank.popUpSuccess'), onOk: handleOk });
    else if (error) handleResponseError(error);
  });
  return (
    <>
      <div className="add-user-bank">
        <div className="add-user-bank__form">
          <div className="add-user-bank__form__title">{t('add-user-bank.title')}</div>
          <InfoBanner description={t('add-user-bank.form.infoBanner')} />
          <div className="add-user-bank__form__input">
            <AddUserBankForm
              initialValues={initialUserBankFormValues}
              onSubmit={onSubmitUserBank}
              handleGetFileDiretion={handleGetFile}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default PrivateRoute(AddUserBank);
