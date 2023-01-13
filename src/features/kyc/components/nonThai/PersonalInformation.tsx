/* eslint-disable react-hooks/rules-of-hooks */
import kycApi from 'api/kycApi';
import settingApi from 'api/settingApi';
import { useAppDispatch, useAppSelector } from 'app/hooks';
import { DATE_FORMAT } from 'consts';
import date from 'date-and-time';
import { selectDate, setStep } from 'features/kyc/kycSlice';
import { useHandleResponseError, useSubmitForm, useUserDetail } from 'hooks';
import { KycInformation } from 'models';
import React, { useCallback, useEffect, useState } from 'react';
import PersonalForm from './PersonalForm';

interface PersonalInformationProps {
  arrayPersonal: { key: string; value: string }[];
  kycResult: KycInformation;
  type?: string;
}
const initialValues: KycInformation = {};

const optionsGender = [
  { key: 'FEMALE', value: 'FEMALE' },
  { key: 'MALE', value: 'MALE' },
];

const PersonalInformation: React.FunctionComponent<PersonalInformationProps> = ({
  arrayPersonal,
  kycResult,
  type,
}) => {
  const dispatch = useAppDispatch();

  const handleResponseError = useHandleResponseError();

  const { currentUser } = useUserDetail();

  const dateString = useAppSelector(selectDate);

  const [countries, setCountries] = useState<{ key: number; value: string }[]>([]);
  const [titleName, setTitleName] = useState<{ key: number; value: string }[]>([]);

  useEffect(() => {
    getCountries();
    getTitleName();
  }, []);

  const getCountries = useCallback(async () => {
    const { body } = await settingApi.getNationality({});
    const optionsCountry: { key: number; value: string }[] = [];
    if (body) {
      body.map((item) => {
        const obj = {
          key: item.id,
          value: item.nationality,
        };
        optionsCountry.push(obj);
      });
    }
    setCountries(optionsCountry);
  }, []);

  const getTitleName = useCallback(async () => {
    const { body } = await settingApi.getTitleName({});
    const optionsTitleName: { key: number; value: string }[] = [];
    if (body) {
      body.map((item) => {
        const obj = {
          key: item.id,
          value: currentUser?.language === 'th' ? item.titleThai : item.titleEn,
        };
        optionsTitleName.push(obj);
      });
    }
    setTitleName(optionsTitleName);
  }, []);

  const handleSaveProgressEkyc = useSubmitForm(async (value: KycInformation) => {
    const formData = new FormData();
    const obj = JSON.parse(JSON.stringify(value));

    formData.append('passportNumber', kycResult?.passportNumber || '');
    formData.append('nationalityId', obj.nationalityId.toString() || '');
    formData.append('firstName', kycResult?.firstName || '');
    formData.append('lastName', kycResult?.lastName || '');
    formData.append('dob', kycResult?.dob?.toString() || '');
    formData.append('titleId', obj.titleId?.toString() || '');
    formData.append('gender', obj.gender || '');
    formData.append('step', '3');

    const { ok, error } = await kycApi.saveProgressKyc(formData, 'ekycs');
    if (ok) dispatch(setStep(3));
    else if (error) handleResponseError(error);
  });

  const handleSaveProgressManual = useSubmitForm(async (value: KycInformation) => {
    const formData = new FormData();
    const obj = JSON.parse(JSON.stringify(value));
    Object.keys(obj)
      .filter((x) => x !== 'dob')
      .forEach((item) => formData.append(item, obj[item]));

    if (dateString) {
      formData.append('dob', date.format(new Date(dateString), DATE_FORMAT) || '');
    }

    formData.append('step', '3');

    const { ok, error } = await kycApi.saveProgressKyc(formData, 'kyc');
    if (ok) dispatch(setStep(3));
    else if (error) handleResponseError(error);
  });

  const handleGoback = useSubmitForm(async () => {
    const formData = new FormData();
    formData.append('step', '0');

    const { ok, error } = await kycApi.saveProgressKyc(
      formData,
      type === 'manual' ? 'kyc' : 'ekycs'
    );
    if (ok) dispatch(setStep(0));
    else if (error) handleResponseError(error);
  });

  return (
    <>
      <div className="personal-information">
        <div
          className={
            type === 'manual'
              ? 'personal-information__form--manual'
              : 'personal-information__form--ekyc'
          }
        >
          {arrayPersonal.length > 0 && (
            <PersonalForm
              initialValues={initialValues}
              onSubmit={handleSaveProgressEkyc}
              arrayPersonal={arrayPersonal}
              countries={countries}
              titleName={titleName}
              optionsGender={optionsGender}
            />
          )}
          {type === 'manual' && (
            <PersonalForm
              initialValues={initialValues}
              onSubmit={handleSaveProgressManual}
              countries={countries}
              titleName={titleName}
              optionsGender={optionsGender}
              type={type}
              handleGoBack={handleGoback}
            />
          )}
        </div>
      </div>
    </>
  );
};

export default PersonalInformation;
