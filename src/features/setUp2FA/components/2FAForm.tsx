import { Form } from 'antd';
import { useAppTranslation } from 'app/hooks';
import { TextInputField } from 'components/FormFields';
import { SubmitButton, VerticalForm } from 'components/Forms';
import React from 'react';

interface SetUp2FAProps {
  initialValues: any;
  onSubmit: any;
}

const SetUp2FAForm: React.FunctionComponent<SetUp2FAProps> = ({ onSubmit, initialValues }) => {
  const t = useAppTranslation();
  const [form] = Form.useForm();

  return (
    <>
      <VerticalForm
        className="setUp2FA__form"
        name="setUp2FA"
        initialValues={initialValues}
        onFinish={onSubmit}
        form={form}
      >
        <TextInputField
          label={t('setUp2FA.form.authCode')}
          name="twoFaCode"
          placeholder={t('setUp2FA.form.authCodePlaceholder')}
          rules={[
            { required: true, message: t('setUp2FA.validation.2FA.required') },
            { pattern: /^[0-9]{6}$/, message: t('setUp2FA.validation.2FA.pattern') },
          ]}
        />

        <SubmitButton
          name={t('setUp2FA.form.btnConfirm')}
          type="primary"
          formFieldStyle={{ marginTop: '40px' }}
          buttonStyle={{ width: '100%', fontWeight: '600' }}
        />
      </VerticalForm>
    </>
  );
};

export default SetUp2FAForm;
