import { Form } from 'antd';
import { useAppTranslation, useErrTranslation } from 'app/hooks';
import { ClickAndDragUploadFileField } from 'components/FormFields';
import { SubmitButton, VerticalForm } from 'components/Forms';
import { KycInformation } from 'models';
import React, { useState } from 'react';

interface IdentityVerifyProps {
  initialValues: KycInformation;
  onSubmit: any;
  handleGetFileDirection1?: (file: File) => void;
  handleGetFileDirection2?: (file: File) => void;
}

const IdentityVerifyForm: React.FunctionComponent<IdentityVerifyProps> = ({
  initialValues,
  onSubmit,
  handleGetFileDirection1,
  handleGetFileDirection2,
}) => {
  const t = useAppTranslation();
  const et = useErrTranslation();

  const [form] = Form.useForm();
  const [fileUpload1, setFileUpload1] = useState<File>({} as File);
  const [fileUpload2, setFileUpload2] = useState<File>({} as File);

  const handleGetFile1 = (file: File) => {
    setFileUpload1(file);
    if (handleGetFileDirection1) handleGetFileDirection1(file);
  };

  const handleGetFile2 = (file: File) => {
    setFileUpload2(file);
    if (handleGetFileDirection2) handleGetFileDirection2(file);
  };

  return (
    <VerticalForm
      className="identity__form"
      name="identity"
      initialValues={initialValues}
      onFinish={onSubmit}
      form={form}
    >
      <ClickAndDragUploadFileField
        name="file1"
        label={t('verify-kyc.non-thai.identity-form.labelPassport')}
        required={true}
        message={et('verify-kyc.non-thai.identity-form.validation.passport.required')}
        fileSize={fileUpload1.size}
        fileType={fileUpload1.type}
        onGetFile={handleGetFile1}
      />

      <ClickAndDragUploadFileField
        name="file2"
        label={t('verify-kyc.non-thai.identity-form.labelSelfie')}
        required={true}
        message={et('verify-kyc.non-thai.identity-form.validation.selfie.required')}
        fileSize={fileUpload2.size}
        fileType={fileUpload2.type}
        onGetFile={handleGetFile2}
      />

      <SubmitButton
        name="Next"
        type="primary"
        formFieldStyle={{ marginTop: '40px' }}
        buttonStyle={{
          width: '100%',
          fontWeight: '600',
          fontSize: '14px',
          lineHeight: '20px',
        }}
      />
    </VerticalForm>
  );
};

export default IdentityVerifyForm;
