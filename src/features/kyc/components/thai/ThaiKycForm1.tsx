import { CheckboxChangeEvent } from 'antd/lib/checkbox';
import kycApi from 'api/kycApi';
import settingApi from 'api/settingApi';
import { useAppTranslation } from 'app/hooks';
import { useHandleResponseError } from 'hooks';
import { NdidKycRequest } from 'models';
import React, { useCallback, useEffect, useState } from 'react';
import ThaiKycFormContainer1 from './ThaiKycFormContainer1';

interface ThaiKycForm1Props {
  localStep: number;
  setLocalStep: (value: number) => void;
  ndidKycRequest: NdidKycRequest;
  setNdidKycRequest: (value: NdidKycRequest) => void;
}

const ThaiKycForm1: React.FunctionComponent<ThaiKycForm1Props> = (props) => {
  const { localStep, setLocalStep, ndidKycRequest, setNdidKycRequest } = props;
  const [countries, setCountries] = useState<any | null>(null);
  const [occupations, setOccupations] = useState<any | null>();
  const [inputInformation, setInputInformation] = useState<any>(null);
  const [isChecked, setIsChecked] = useState(false);
  const handleResponseError = useHandleResponseError();
  const formData = new FormData();
  const t = useAppTranslation();

  useEffect(() => {
    if (ndidKycRequest)
      setInputInformation({
        currentAddressSameResidential: isChecked,

        currentAddress: '',
        currentDistrict: '',
        currentProvince: '',
        currentPostCode: '',

        occupationId:
          ndidKycRequest.occupationId > 0
            ? ndidKycRequest.occupationId
            : t('verify-kyc.thai.occupation-form.occupation.plh'),
        workPosition: ndidKycRequest.workPosition,
        companyName: ndidKycRequest.companyName,

        companyCountryId: ndidKycRequest.companyCountryId || 211,
        companyAddress: ndidKycRequest.companyAddress,
        companyPostCode: ndidKycRequest.companyPostCode,
        companyDistrict: ndidKycRequest.companyDistrict,
        companyProvince: ndidKycRequest.companyProvince,

        emergencyContactFirstName: ndidKycRequest.emergencyContactFirstName,
        emergencyContactLastName: ndidKycRequest.emergencyContactLastName,
        emergencyContactPhoneNumber: ndidKycRequest.emergencyContactPhoneNumber,
        residentialAddressId: ndidKycRequest.residentialAddressId,
      });
  }, [ndidKycRequest]);

  useEffect(() => {
    getCountries();
    getOccupations();
    getNdidKycRequest();
  }, []);

  const onSubmit = (value: any) => {
    if (isChecked) {
      value = {
        ...ndidKycRequest,
        ...value,
        occupation: occupations.find((e: any) => e.key === value.occupationId)?.value,
        currentAddress: ndidKycRequest.residentialAddress,
        currentDistrict: ndidKycRequest.residentialDistrict,
        currentProvince: ndidKycRequest.residentialProvince,
        currentPostCode: ndidKycRequest.residentialPostCode,
        emergencyContactPhoneNumber: value.emergencyContactPhoneNumber
          ? `+${value.phoneCode ?? '66'}${value.emergencyContactPhoneNumber}`
          : '',
      };
    } else {
      value = {
        ...ndidKycRequest,
        ...value,
        occupation: occupations.find((e: any) => e.key === value.occupationId)?.value,
        emergencyContactPhoneNumber: value.emergencyContactPhoneNumber
          ? `+${value.phoneCode ?? '66'}${value.emergencyContactPhoneNumber}`
          : '',
      };
    }
    delete value.phoneCode;
    setNdidKycRequest(value);
    Object.keys(value).forEach((e) => {
      formData.append(e, value[e]);
    });

    handleSaveNdidKyc(formData);
  };

  const handleSaveNdidKyc = useCallback(async (data: any) => {
    const res = await kycApi.saveNdidKycProgress(data);
    if (res.ok) {
      setLocalStep(localStep + 1);
    } else
      handleResponseError(res.error, () => {
        setLocalStep(0);
      });
  }, []);

  const getNdidKycRequest = useCallback(async () => {
    const { body } = await kycApi.getNdidKycResult();
    if (body)
      setNdidKycRequest({
        identityNumber: body.identityNumber,
        laserCode: body.laserCode,
        titleId: body.titleId,
        title: body.title,
        nativeName: body.nativeName,
        englishName: body.englishName,
        nationalityId: body.nationalityId,
        maritalStatus: body.maritalStatus,
        dob: body.dob,
        countryId: body.currentCountryId,

        residentialAddress: body.residentialAddress,
        residentialDistrict: body.residentialDistrict,
        residentialProvince: body.residentialProvince,
        residentialPostCode: body.residentialPostCode,
        residentialSubDistrict: body.residentialSubDistrict,

        currentAddress: body.currentAddress,
        currentDistrict: body.currentDistrict,
        currentProvince: body.currentProvince,
        currentPostCode: body.currentPostCode,
        currentSubDistrict: body.currentSubDistrict,

        occupationId: body.occupationId,
        workPosition: body.workPosition,

        companyName: body.companyName,
        companyCountryId: body.companyCountryId,
        companyAddress: body.companyAddress,
        companyDistrict: body.companyDistrict,
        companyProvince: body.companyProvince,
        companyPostCode: body.companyPostCode,
        companySubDistrict: body.companySubDistrict,

        emergencyContactFirstName: body.emergencyContactFirstName,
        emergencyContactLastName: body.emergencyContactLastName,
        emergencyContactPhoneNumber: body.emergencyContactPhoneNumber,

        passportNumber: body.passportNumber,
        firstName: body.firstName,
        lastName: body.lastName,

        thaiCitizenship: true,

        // Temporary
        residentialAddressId: body.residentialAddressId,
        companyAddressId: Number(body.companyAddressId),
        currentAddressId: Number(body.currentAddressId),
      });
  }, []);

  const getCountries = useCallback(async () => {
    const { body } = await settingApi.getCountry();
    if (body) setCountries(body.map((e) => ({ key: e.id, value: e.niceName })));
  }, []);

  const getOccupations = useCallback(async () => {
    const { body } = await settingApi.getOccupation();
    if (body) setOccupations(body.map((e) => ({ key: e.id, value: e.occupationEn })));
  }, []);

  const handleToggleCheck = (e: CheckboxChangeEvent) => {
    setIsChecked(e.target.checked);
  };

  return (
    <>
      {inputInformation && (
        <ThaiKycFormContainer1
          inputInformation={inputInformation}
          onSubmit={onSubmit}
          isChecked={isChecked}
          ndidKycRequest={ndidKycRequest}
          handleToggleCheck={handleToggleCheck}
          occupations={occupations}
          countries={countries}
        />
      )}
    </>
  );
};

export default ThaiKycForm1;
