import kycApi from 'api/kycApi';
import { useAppDispatch } from 'app/hooks';
import { setStep } from 'features/kyc/kycSlice';
import { useHandleResponseError, useSubmitForm, useUserDetail } from 'hooks';
import { DocumentType, KycInformation } from 'models';
import React, { useCallback, useEffect, useState } from 'react';
import AttackLicenseForm from './AttackLicenseForm';

interface AttackLicenseProps {
  lastestKyc: KycInformation;
  type?: string;
}

const initialValues: DocumentType = {
  documentTypeEn: '',
  documentTypeTh: '',
  id: 0,
};

const AttackLicense: React.FunctionComponent<AttackLicenseProps> = ({ lastestKyc, type }) => {
  const { currentUser } = useUserDetail();

  const dispatch = useAppDispatch();

  const [document, setDocument] = useState<{ key: any; value: any }[]>([]);
  const [fileDirection, setFileDirection] = useState<any>({});

  const handleResponseError = useHandleResponseError();

  useEffect(() => {
    getDocumentType();
  }, []);

  const getDocumentType = useCallback(async () => {
    const { body } = await kycApi.getDocumentType({});
    const optionsCountry: { key: number; value: string }[] = [];
    if (body) {
      body.map((item) => {
        const obj = {
          key: item.id,
          value: currentUser?.language === 'th' ? item.documentTypeTh : item.documentTypeEn,
        };
        optionsCountry.push(obj);
      });
    }
    setDocument(optionsCountry);
  }, []);

  const handleGetFileDiretion = (value: File) => {
    setFileDirection(value);
  };

  const handleSubmit = useSubmitForm(async (value: KycInformation) => {
    const obj = JSON.parse(JSON.stringify(value));
    const formData = new FormData();
    formData.append('documentTypeId', obj.documentTypeId);
    if (fileDirection && Object.keys(fileDirection).length) {
      formData.append('documentImage', fileDirection);
    }

    formData.append('step', '5');

    const { ok, error } = await kycApi.saveProgressKyc(
      formData,
      type === 'manual' ? 'kyc' : 'ekycs'
    );
    if (ok) {
      const obj = JSON.parse(JSON.stringify(lastestKyc));
      const redundantParams = [
        'email',
        'step',
        'passportImage',
        'selfieImage',
        'kycStatus',
        'kycType',
        'referalCode',
        'phoneNumber',
        'documentImage',
      ];
      Object.keys(obj)
        .filter((x) => obj[x] && redundantParams.indexOf(x) === -1)
        .forEach((item) => formData.append(item, obj[item]));

      formData.append('currentAddressSameResidential', obj.currentAddressSameResidential || false);

      formData.append('step', '5');

      formData.append('thaiCitizenship', obj.thaiCitizenship || false);

      formData.append('residentialAddressId', '-1');
      formData.append('currentAddressId', '-1');
      formData.append('companyAddressId', '-1');

      const { ok, error } = await kycApi.submitKyc(formData, type === 'manual' ? 'kyc' : 'ekycs');
      if (ok) dispatch(setStep(6));
      else if (error) handleResponseError(error);
    } else if (error) handleResponseError(error);
  });

  const handleGoBack = useSubmitForm(async () => {
    const formData = new FormData();
    formData.append('step', '4');

    const { ok, error } = await kycApi.saveProgressKyc(
      formData,
      type === 'manual' ? 'kyc' : 'ekycs'
    );
    if (ok) dispatch(setStep(4));
    else if (error) handleResponseError(error);
  });

  return (
    <>
      <AttackLicenseForm
        initialValues={initialValues}
        onSubmit={handleSubmit}
        optionsDocument={document}
        handleGetFileDiretion={handleGetFileDiretion}
        handleGoBack={handleGoBack}
      />
    </>
  );
};

export default AttackLicense;
