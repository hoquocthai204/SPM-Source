import kycApi from 'api/kycApi';
import { useAppDispatch } from 'app/hooks';
import { setStep } from 'features/kyc/kycSlice';
import { useHandleResponseError, useSubmitForm } from 'hooks';
import { KycInformation } from 'models';
import React, { useState } from 'react';
import IdentityVerifyForm from './IdentityVerifyForm';

interface IdentityVerifyProps {}

const initialValues: KycInformation = {};

const IdentityVerify: React.FunctionComponent<IdentityVerifyProps> = (props) => {
  const dispatch = useAppDispatch();

  const handleResponseError = useHandleResponseError();

  const [fileDirection1, setFileDirection1] = useState<File>({} as File);
  const [fileDirection2, setFileDirection2] = useState<File>({} as File);

  const handleGetFile1 = (value: File) => {
    setFileDirection1(value);
  };

  const handleGetFile2 = (value: File) => {
    setFileDirection2(value);
  };

  const handleSubmit = useSubmitForm(async (value: KycInformation) => {
    const formData = new FormData();

    formData.append('passportImage', fileDirection1);
    formData.append('selfieImage', fileDirection2);

    formData.append('step', '2');

    const { ok, error } = await kycApi.saveProgressKyc(formData, 'kyc');
    if (ok) dispatch(setStep(2));
    else if (error) handleResponseError(error);
  });

  return (
    <IdentityVerifyForm
      initialValues={initialValues}
      onSubmit={handleSubmit}
      handleGetFileDirection1={handleGetFile1}
      handleGetFileDirection2={handleGetFile2}
    />
  );
};

export default IdentityVerify;
