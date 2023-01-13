import kycApi from 'api/kycApi';
import settingApi from 'api/settingApi';
import { useHandleResponseError, useHandleResponseSuccess } from 'hooks';
import { Countries, KycInformation, Nationality, NdidKycRequest } from 'models';
import React, { useCallback, useEffect, useState } from 'react';
import ThaiKycFormContainer2 from './ThaiKycFormContainer2';

interface ThaiKycForm2Props {
  localStep: number;
  setLocalStep: (value: number) => void;
  ndidKycRequest: NdidKycRequest;
}

const ThaiKycForm2: React.FunctionComponent<ThaiKycForm2Props> = (props) => {
  const { localStep, setLocalStep, ndidKycRequest } = props;
  const [displayInfo, setDisplayInfo] = useState<any>();
  const [nationalities, setNationalities] = useState<Nationality[] | null>(null);
  const [countries, setCountries] = useState<Countries[] | null>(null);
  const [kycInfo, setKycInfo] = useState<KycInformation | null>(null);
  const handleResponseError = useHandleResponseError();
  const [ndidResult, setNdidResult] = useState<any>();
  const formData = new FormData();
  const handleResponseSuccess = useHandleResponseSuccess();

  useEffect(() => {
    getNationalities();
    getCountries();
    getNdidKycResult();
    getKycInfo();
  }, []);

  useEffect(() => {
    if (ndidKycRequest === null || !countries || !nationalities || !ndidResult || !kycInfo) return;

    setDisplayInfo({
      identityNumber: ndidKycRequest?.identityNumber || '--',
      englishName: ndidKycRequest?.englishName || '--',
      nativeName: ndidKycRequest?.nativeName || '--',
      nationality:
        nationalities?.find((e) => e.id === ndidKycRequest?.nationalityId)?.nationality || '--',
      gender: ndidResult?.gender || '--',
      maritalStatus: ndidKycRequest?.maritalStatus || '--',
      dob: ndidKycRequest?.dob || '--',

      residentialAddress: ndidKycRequest?.residentialAddress || '--',
      residentialDistrict: ndidKycRequest?.residentialDistrict || '--',
      residentialProvince: ndidKycRequest?.residentialProvince || '--',
      residentialPostCode: ndidKycRequest?.residentialPostCode || '--',

      currentAddress: ndidKycRequest?.currentAddress || '--',
      currentDistrict: ndidKycRequest?.currentDistrict || '--',
      currentProvince: ndidKycRequest?.currentProvince || '--',
      currentPostCode: ndidKycRequest?.currentPostCode || '--',

      occupation: kycInfo?.occupation || '--',
      workPosition: ndidKycRequest?.workPosition || '--',
      companyName: ndidKycRequest?.companyName || '--',

      companyCountry:
        countries?.find((e) => e.id === ndidKycRequest?.companyCountryId)?.niceName || '--',
      companyAddress: ndidKycRequest?.companyAddress || '--',
      companyPostCode: ndidKycRequest?.companyPostCode || '--',
      companyDistrict: ndidKycRequest?.companyDistrict || '--',
      companyProvince: ndidKycRequest?.companyProvince || '--',

      emergencyContactFirstName: ndidKycRequest?.emergencyContactFirstName || '--',
      emergencyContactLastName: ndidKycRequest?.emergencyContactLastName || '--',
      emergencyContactPhoneNumber: ndidKycRequest?.emergencyContactPhoneNumber || '--',
    });
  }, [ndidKycRequest, countries, nationalities, ndidResult, kycInfo]);

  const getNationalities = useCallback(async () => {
    const { body } = await settingApi.getNationality();
    if (body) setNationalities(body);
  }, []);

  const getCountries = useCallback(async () => {
    const { body } = await settingApi.getCountry();
    if (body) setCountries(body);
  }, []);

  const getKycInfo = useCallback(async () => {
    const { body } = await kycApi.getKycInfo();
    if (body) setKycInfo(body);
  }, []);

  const getNdidKycResult = useCallback(async () => {
    const { body } = await kycApi.getNdidKycResult();
    if (body) setNdidResult(body);
  }, []);

  const onSubmit = (value: any) => {
    value = {
      ...ndidKycRequest,
    };

    Object.keys(value).forEach((e) => {
      formData.append(e, value[e] || null);
    });

    handleSubmitNdidKyc(formData);
  };

  const handleSubmitNdidKyc = useCallback(async (data) => {
    const res = await kycApi.submitNdidKyc(data);
    if (res.ok) {
      handleResponseSuccess(Boolean(res.ok), 'NDID KYC is Submitted', () =>
        setLocalStep(localStep + 1)
      );
    } else
      handleResponseError(res.error, () => {
        setLocalStep(0);
      });
  }, []);

  return (
    <>{displayInfo && <ThaiKycFormContainer2 displayInfo={displayInfo} onSubmit={onSubmit} />}</>
  );
};

export default ThaiKycForm2;
