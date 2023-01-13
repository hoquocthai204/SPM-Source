import kycApi from 'api/kycApi';
import settingApi from 'api/settingApi';
import { useAppDispatch } from 'app/hooks';
import { setStep } from 'features/kyc/kycSlice';
import { useHandleResponseError, useSubmitForm, useUserDetail } from 'hooks';
import { KycInformation } from 'models';
import React, { useCallback, useEffect, useState } from 'react';
import OccupationForm from './OccupationForm';

interface OccupationProps {
  type?: string;
}

const initialValues: KycInformation = {};

const Occupation: React.FunctionComponent<OccupationProps> = ({ type }) => {
  const { currentUser } = useUserDetail();

  const dispatch = useAppDispatch();

  const handleResponseError = useHandleResponseError();

  const [occupation, setOccupation] = useState<{ key: number; value: string }[]>([]);
  const [countries, setCountries] = useState<{ key: number; value: string }[]>([]);

  const getPhoneNumber = (phoneNumber: string, phoneCode: string) => {
    if (phoneNumber?.startsWith(phoneCode)) {
      return phoneNumber;
    }
    return `${phoneCode}${phoneNumber}`;
  };

  const handleSubmit = useSubmitForm(async (value: KycInformation) => {
    const obj = JSON.parse(JSON.stringify(value));
    const formData = new FormData();

    const phoneNumberValid = getPhoneNumber(
      obj.emergencyContactPhoneNumber,
      obj.phoneCode?.toString() || '66'
    );
    Object.keys(obj)
      .filter((x) => x !== 'phoneCode' && x !== 'emergencyContactPhoneNumber' && obj[x])
      .forEach((item) => formData.append(item, obj[item]));

    formData.append('emergencyContactPhoneNumber', phoneNumberValid);
    formData.append('step', '5');

    const { ok, error } = await kycApi.saveProgressKyc(
      formData,
      type === 'manual' ? 'kyc' : 'ekycs'
    );
    if (ok) dispatch(setStep(5));
    else if (error) handleResponseError(error);
  });

  useEffect(() => {
    getOccupation();
    getCountries();
  }, []);

  const getOccupation = useCallback(async () => {
    const { body } = await settingApi.getOccupation({});
    const optionsOccupation: { key: number; value: string }[] = [];
    if (body) {
      body.map((item) => {
        const obj = {
          key: item.id,
          value: currentUser?.language === 'th' ? item.occupationThai : item.occupationEn,
        };
        optionsOccupation.push(obj);
      });
    }
    setOccupation(optionsOccupation);
  }, []);

  const getCountries = useCallback(async () => {
    const { body } = await settingApi.getCountry({});
    const optionsCountry: { key: number; value: string }[] = [];
    if (body) {
      body.map((item) => {
        const obj = {
          key: item.id,
          value: item.niceName,
        };
        optionsCountry.push(obj);
      });
    }
    setCountries(optionsCountry);
  }, []);

  const handleGoBack = useSubmitForm(async () => {
    const formData = new FormData();
    formData.append('step', '3');

    const { ok, error } = await kycApi.saveProgressKyc(
      formData,
      type === 'manual' ? 'kyc' : 'ekycs'
    );
    if (ok) dispatch(setStep(3));
    else if (error) handleResponseError(error);
  });

  return (
    <>
      <OccupationForm
        initialValues={initialValues}
        onSubmit={handleSubmit}
        occupation={occupation}
        countries={countries}
        handleGoBack={handleGoBack}
      />
    </>
  );
};

export default Occupation;
