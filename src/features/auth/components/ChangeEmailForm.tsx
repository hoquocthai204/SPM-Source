import { useAppSelector, useAppTranslation, useErrTranslation } from 'app/hooks';
import { SubmitButton, VerticalForm } from 'components/Forms';
import { EMAIL_REGEX } from 'consts';
import React, { useCallback } from 'react';

import { Form } from 'antd';
import authApi from 'api/authApi';
import { TextInputField, VerifyCodeInputField } from 'components/FormFields';
import { useUserDetail } from 'hooks';
import { EmailInformation, EmailOTPInformation } from 'models';
import { cutString } from 'utils';
import { selectStepChangeMail } from '../authSlice';
interface IChangeEmailFormProps {
  initialChangeEmail: EmailOTPInformation;
  onSubmitNewEmail: any;
  initialValues: EmailInformation;
  onUpdateNewEmail: any;
}

const ChangeEmailForm: React.FunctionComponent<IChangeEmailFormProps> = ({
  initialChangeEmail,
  onSubmitNewEmail,
  initialValues,
  onUpdateNewEmail,
}) => {
  const t = useAppTranslation();
  const et = useErrTranslation();

  const stepChangeMail = useAppSelector(selectStepChangeMail);

  const { currentUser } = useUserDetail();

  const [form] = Form.useForm();

  const handleResendOTPNewMail = useCallback(async () => {
    await authApi.getResendEmailOTP({
      newEmail: true,
      email: form.getFieldValue('newEmail') || '',
    });
  }, [form.getFieldValue('newEmail')]);

  const handleResendOTPOldMail = useCallback(async () => {
    await authApi.getResendEmailOTP({ newEmail: false, email: currentUser?.email });
  }, []);

  return (
    <>
      {stepChangeMail === 2 ? (
        <VerticalForm
          className="changeEmail__form"
          name="change-email"
          initialValues={initialValues}
          onFinish={onUpdateNewEmail}
          form={form}
        >
          {form.getFieldValue('newEmail') && (
            <VerifyCodeInputField
              label={`${t('changeEmail.sendTo')} ${cutString({
                start: 4,
                end: -form.getFieldValue('newEmail').indexOf('@'),
                originalString: form.getFieldValue('newEmail'),
                replaceBy: '***',
              })}`}
              name="newEmailVerifyCode"
              placeholder={t('changeEmail.form.enterYourCode')}
              autoSend={true}
              onSendCode={handleResendOTPNewMail}
              rules={[
                { pattern: /^[0-9]{6}$/, message: et('change-email.validation.mustBe6digits') },
                { required: true, message: et('change-email.validation.email.required') },
              ]}
            />
          )}
          {currentUser?.email && (
            <VerifyCodeInputField
              label={`${t('changeEmail.sendTo')} ${cutString({
                start: 4,
                end: -currentUser?.email.indexOf('@'),
                originalString: currentUser?.email,
                replaceBy: '***',
              })}`}
              name="emailVerifyCode"
              placeholder={t('changeEmail.form.enterYourCode')}
              autoSend={true}
              onSendCode={handleResendOTPOldMail}
              rules={[
                { pattern: /^[0-9]{6}$/, message: et('change-email.validation.mustBe6digits') },
                { required: true, message: et('change-email.validation.email.required') },
              ]}
            />
          )}
          <TextInputField
            label={t('changeEmail.form.enterGGCode')}
            name="twoFaCode"
            placeholder={t('changeEmail.form.ggCode')}
            rules={[
              { pattern: /^[0-9]{6}$/, message: et('change-email.validation.ggCode.invalidCode') },
              { required: true, message: et('change-email.validation.ggCode.required') },
            ]}
          />
          <SubmitButton
            name={t('form.nameButton.submit')}
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
      ) : (
        <VerticalForm
          className="changeEmail__form"
          name="change-email"
          initialValues={initialChangeEmail}
          onFinish={onSubmitNewEmail}
          form={form}
        >
          <TextInputField
            label={t('changeEmail.form.newEmail')}
            name="newEmail"
            placeholder={t('changeEmail.form.emailPlh')}
            rules={[
              { required: true, message: et('change-email.validation.email.newEmailRequired') },
              { pattern: EMAIL_REGEX, message: et('change-email.validation.email.invalid') },
            ]}
          />
          <SubmitButton
            name={t('form.nameButton.submit')}
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
      )}
    </>
  );
};

export default ChangeEmailForm;
