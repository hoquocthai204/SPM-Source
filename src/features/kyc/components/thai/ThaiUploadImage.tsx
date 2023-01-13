import { Form } from 'antd';
import kycApi from 'api/kycApi';
import { useAppTranslation, useErrTranslation } from 'app/hooks';
import { ClickAndDragUploadFileField } from 'components/FormFields';
import { SubmitButton, VerticalForm } from 'components/Forms';
import { useHandleResponseError, useSubmitForm } from 'hooks';
import React, { useCallback, useState } from 'react';

interface ThaiUploadImageProps {
  setLocalStep: (value: number) => void;
  localStep: number;
  setIdentityNum?: (value: string) => void;
}

const ThaiUploadImage: React.FunctionComponent<ThaiUploadImageProps> = (props) => {
  const { setLocalStep, localStep } = props;
  const et = useErrTranslation();
  const [fileUpload, setFileUpload] = useState<any>({});
  const [form] = Form.useForm();
  const t = useAppTranslation();
  const handleResponseError = useHandleResponseError();

  const handleGetFile = (file: File) => {
    setFileUpload(file);
  };

  const onSubmit = useSubmitForm(async () => {
    const formData = new FormData();
    formData.append('frontImage', fileUpload);
    formData.append('thaiCitizenship', 'true');
    handleRecognize(formData);
  });

  const handleRecognize = useCallback(async (data) => {
    const res = await kycApi.recognizeIdCardNumber(data);
    if (res.body?.data) {
      localStorage.setItem('identityNumber', res.body?.data);
      setLocalStep(localStep + 2);
    } else {
      handleResponseError(res.error, () => setLocalStep(localStep + 1));
    }
  }, []);

  return (
    <div className="thai-kyc-container">
      <span className="verify-kyc__title">{t('verify-kyc.mainTitle')}</span>
      <span className="verify-kyc__description">{t('verify-kyc.identityVerification')}</span>
      <VerticalForm
        className="thai-upload__form"
        name="add-user-bank"
        onFinish={onSubmit}
        form={form}
      >
        <ClickAndDragUploadFileField
          name="file"
          required={true}
          message={et('add-user-bank.validation.fileUpload.required')}
          fileSize={fileUpload.size}
          fileType={fileUpload.type}
          onGetFile={handleGetFile}
        />
        <SubmitButton name={t('verify-kyc.submit')} type="primary" />
      </VerticalForm>
    </div>
  );
};

export default ThaiUploadImage;
