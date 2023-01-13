import { Button, Form, Spin } from 'antd';
import FormItem from 'antd/lib/form/FormItem';
import registerApi from 'api/registerApi';
import { useAppTranslation, useErrTranslation } from 'app/hooks';
import { InfoBanner } from 'components/AlertBanners';
import { VerifyCodeInputField } from 'components/FormFields';
import { VerticalForm } from 'components/Forms';
import { selectIsSubmitting } from 'components/Forms/formSlice';
import { AUTHENTICATION_CODE } from 'consts';
import { RegisterInformation } from 'models';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppSelector } from 'app/hooks';

interface VerifyAccountFormProps {
  initialValues: any;
  onSubmit: any;
  userRegister?: RegisterInformation;
}

const VerifyAccountForm: React.FunctionComponent<VerifyAccountFormProps> = ({
  onSubmit,
  initialValues,
  userRegister,
}) => {
  const t = useAppTranslation();
  const et = useErrTranslation();

  const isSubmitting = useAppSelector(selectIsSubmitting);

  const navigate = useNavigate();
  const [form] = Form.useForm();

  useEffect(() => {
    if (!userRegister) navigate('/login');
  });
  const [, forceUpdate] = useState({});
  useEffect(() => {
    forceUpdate({});
  }, []);

  const onResendEmail = () => {
    if (userRegister) registerApi.resendEmail({ email: userRegister?.email });
  };

  const onResendPhone = () => {
    if (userRegister)
      registerApi.resendPhone({
        email: userRegister?.email,
        phoneNumber: userRegister?.phoneNumber,
      });
  };

  return (
    <>
      <VerticalForm
        className="verify-account__form"
        name="verifyAccount"
        initialValues={initialValues}
        onFinish={onSubmit}
        form={form}
      >
        <InfoBanner description={t('verify-account.form.banner')} />
        <VerifyCodeInputField
          label={t('verify-account.form.email')}
          name="emailVerifyCode"
          placeholder={t('verify-account.form.emailPlaceholder')}
          rules={[
            { required: true, message: et('verifyAccount.email.required') },
            { pattern: AUTHENTICATION_CODE, message: et('verifyAccount.email.pattern') },
          ]}
          onSendCode={onResendEmail}
        />
        <VerifyCodeInputField
          label={t('verify-account.form.phone')}
          name="phoneVerifyCode"
          placeholder={t('verify-account.form.phonePlaceholder')}
          rules={[
            { required: true, message: et('verifyAccount.phone.required') },
            { pattern: AUTHENTICATION_CODE, message: et('verifyAccount.phone.pattern') },
          ]}
          onSendCode={onResendPhone}
        />

        <FormItem shouldUpdate>
          {() => (
            <Button
              name={t('verify-account.form.verifyAccountBtn')}
              type="primary"
              htmlType="submit"
              disabled={
                !form.isFieldsTouched(true) ||
                !!form.getFieldsError().filter(({ errors }) => errors.length).length
              }
              style={{
                width: '100%',
                fontWeight: '600',
                fontSize: '14px',
                lineHeight: '20px',
              }}
            >
              {!isSubmitting && t('verify-account.form.verifyAccountBtn')}
              {isSubmitting && <Spin />}
            </Button>
          )}
        </FormItem>
      </VerticalForm>
    </>
  );
};

export default VerifyAccountForm;
