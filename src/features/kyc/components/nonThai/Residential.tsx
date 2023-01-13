import kycApi from 'api/kycApi';
import { useAppDispatch } from 'app/hooks';
import { setStep } from 'features/kyc/kycSlice';
import { useHandleResponseError, useSubmitForm } from 'hooks';
import { KycInformation } from 'models';
import * as React from 'react';
import ResidentialForm from './ResidentialForm';

interface ResidentialProps {
  type?: string;
}
const initialValues: KycInformation = {};
const Residential: React.FunctionComponent<ResidentialProps> = ({ type }) => {
  const dispatch = useAppDispatch();
  const handleResponseError = useHandleResponseError();

  const handleSubmit = useSubmitForm(async (value: KycInformation) => {
    const obj = JSON.parse(JSON.stringify(value));

    const formData = new FormData();
    Object.keys(obj)
      .filter((x) => obj[x])
      .forEach((item) => formData.append(item, obj[item]));
    formData.append('currentAddressSameResidential', obj.currentAddressSameResidential || 'false');

    if (obj.currentAddressSameResidential) {
      formData.append('currentAddress', obj.residentialAddress);
      formData.append('currentPostCode', obj.residentialPostCode);
      formData.append('currentProvince', obj.residentialProvince);
      formData.append('currentDistrict', obj.residentialDistrict);
    }

    formData.append('step', '4');

    const { ok, error } = await kycApi.saveProgressKyc(
      formData,
      type === 'manual' ? 'kyc' : 'ekycs'
    );
    if (ok) dispatch(setStep(4));
    else if (error) handleResponseError(error);
  });

  const handleGoBack = useSubmitForm(async () => {
    const formData = new FormData();
    formData.append('step', '2');

    const { ok, error } = await kycApi.saveProgressKyc(
      formData,
      type === 'manual' ? 'kyc' : 'ekycs'
    );
    if (ok) dispatch(setStep(2));
    else if (error) handleResponseError(error);
  });

  return (
    <>
      <div className="redential">
        <ResidentialForm
          initialValues={initialValues}
          onSubmit={handleSubmit}
          handleGoBack={handleGoBack}
        />
      </div>
    </>
  );
};

export default Residential;
