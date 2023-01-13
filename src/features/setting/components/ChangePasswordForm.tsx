import { Form } from 'antd';
import { useAppTranslation, useErrTranslation } from 'app/hooks';
import { InfoBanner } from 'components/AlertBanners';
import { PasswordInputField } from 'components/FormFields';
import { SubmitButton, VerticalForm } from 'components/Forms';
import { PASSWORD_REGEX } from 'consts';
import React from 'react';

interface ChangePasswordFormProps {
  initialValues: any;
  onSubmit: any;
}

const ChangePasswordForm: React.FunctionComponent<ChangePasswordFormProps> = ({
  onSubmit,
  initialValues,
}) => {
  const t = useAppTranslation();
  const et = useErrTranslation();

  return (
    <>
      <VerticalForm
        className="change-password__form"
        name="changePassword"
        initialValues={initialValues}
        onFinish={onSubmit}
      >
        <InfoBanner description={t('setting.changePassword.form.banner')} />
        <PasswordInputField
          label={t('setting.changePassword.form.oldPassword')}
          name="currentPassword"
          placeholder={t('setting.changePassword.form.oldPasswordPlaceholder')}
          rules={[{ required: true, message: et('register.validation.password.required') }]}
        />
        <PasswordInputField
          label={t('setting.changePassword.form.newPassword')}
          name="newPassword"
          placeholder={t('setting.changePassword.form.newPasswordPlaceholder')}
          rules={[
            { required: true, message: et('changePassword.validation.newPassword.required') },
            {
              pattern: PASSWORD_REGEX,
              message: et('changePassword.validation.newPassword.pattern'),
            },
          ]}
        />

        <PasswordInputField
          label={t('setting.changePassword.form.cfNewPassword')}
          name="confirmNewPassword"
          dependencies={['newPassword']}
          placeholder={t('setting.changePassword.form.cfNewPasswordPlaceholder')}
          rules={[
            {
              required: true,
              message: et('changePassword.validation.confirmNewPassword.required'),
            },
            ({ getFieldValue }) => ({
              validator(_, value) {
                if (!value || getFieldValue('newPassword') === value) return Promise.resolve();
                return Promise.reject(
                  new Error(et('changePassword.validation.confirmNewPassword.pattern'))
                );
              },
            }),
          ]}
        />

        <SubmitButton
          name={t('setting.changePassword.form.changePasswordBtn')}
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
    </>
  );
};

export default ChangePasswordForm;
