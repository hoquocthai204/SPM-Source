import { Button, Form } from 'antd';
import { useAppTranslation, useErrTranslation } from 'app/hooks';
import { ClickAndDragUploadFileField, SelectBoxField } from 'components/FormFields';
import { SubmitButton, VerticalForm } from 'components/Forms';
import { DocumentType } from 'models';
import * as React from 'react';

interface AttackLicenseFormProps {
  initialValues: DocumentType;
  onSubmit: any;
  optionsDocument: { key: number; value: string }[];
  handleGetFileDiretion?: (file: File) => void;
  handleGoBack?: () => void;
}

const AttackLicenseForm: React.FunctionComponent<AttackLicenseFormProps> = ({
  initialValues,
  onSubmit,
  optionsDocument,
  handleGetFileDiretion,
  handleGoBack,
}) => {
  const t = useAppTranslation();
  const et = useErrTranslation();

  const [form] = Form.useForm();

  const [fileUpload, setFileUpload] = React.useState<File>({} as File);

  const handleGetFile = (file: File) => {
    setFileUpload(file);
    if (handleGetFileDiretion) handleGetFileDiretion(file);
  };

  return (
    <>
      <VerticalForm
        className="license__form"
        name="license__form"
        initialValues={initialValues}
        onFinish={onSubmit}
        form={form}
      >
        <SelectBoxField
          name="documentTypeId"
          label={t('verify-kyc.non-thai.license-form.license-type.label')}
          array={optionsDocument}
          placeholder={t('verify-kyc.non-thai.license-form.license-type.plh')}
          rules={[
            {
              required: true,
              message: et('verify-kyc.non-thai.license-form.validation.license-type.required'),
            },
          ]}
        />

        <ClickAndDragUploadFileField
          name="file"
          label={t('verify-kyc.non-thai.license-form.file.label')}
          required={true}
          message={et('verify-kyc.non-thai.license-form.validation.file.required')}
          fileSize={fileUpload.size}
          fileType={fileUpload.type}
          onGetFile={handleGetFile}
        />
        <div className="group-btn-form">
          <Button type="ghost" onClick={handleGoBack}>
            {t('verify-kyc.btnGoBack')}
          </Button>
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
        </div>
      </VerticalForm>
    </>
  );
};

export default AttackLicenseForm;
