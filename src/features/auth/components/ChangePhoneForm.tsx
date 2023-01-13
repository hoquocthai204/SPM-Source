import { Form } from 'antd';
import authApi from 'api/authApi';
import { useAppSelector, useAppTranslation, useErrTranslation } from 'app/hooks';
import { PhoneInputField, TextInputField, VerifyCodeInputField } from 'components/FormFields';
import { SubmitButton, VerticalForm } from 'components/Forms';
import { PHONE_NUMBER_REGEX } from 'consts';
import { useUserDetail } from 'hooks';
import { ChangePhone, ChangePhoneInformation } from 'models';
import React, { useCallback } from 'react';
import { cutString } from 'utils';
import { selectStepChangePhone } from '../authSlice';
interface IChangPhoneFormProps {
  initialValues: ChangePhoneInformation;
  initialChangePhone: ChangePhone;
  onSubmitNewPhone: any;
  onSubmitChangePhone: any;
}

const ChangPhoneForm: React.FunctionComponent<IChangPhoneFormProps> = ({
  onSubmitNewPhone,
  onSubmitChangePhone,
  initialValues,
  initialChangePhone,
}) => {
  const t = useAppTranslation();
  const et = useErrTranslation();

  const stepChangePhoneSelector = useAppSelector(selectStepChangePhone);

  const [form] = Form.useForm();
  const { currentUser } = useUserDetail();

  const onResendOldPhoneOtp = useCallback(async () => {
    await authApi.getResendPhoneOtp({ sendNewPhone: false });
  }, []);

  const onResendNewPhoneOtp = useCallback(async () => {
    await authApi.getResendPhoneOtp({ sendNewPhone: true });
  }, []);

  return (
    <>
      {stepChangePhoneSelector === 2 ? (
        <VerticalForm
          className="changePhone__form"
          name="change-phone"
          initialValues={initialValues}
          onFinish={onSubmitChangePhone}
          form={form}
        >
          {currentUser && (
            <VerifyCodeInputField
              label={`${t('change-phone.form.sendTo')} ${cutString({
                start: 3,
                end: 3,
                replaceBy: '***',
                originalString: currentUser.phoneNumber.toString() || '',
              })}`}
              name="oldPhoneOtp"
              placeholder={t('change-phone.form.plhOTP')}
              onSendCode={onResendOldPhoneOtp}
              autoSend={true}
              rules={[
                {
                  pattern: /^[0-9]{6}$/,
                  message: et('change-phone.validation.oldPhone.max6Digits'),
                },
                { required: true, message: et('change-phone.validation.oldPhone.required') },
              ]}
            />
          )}
          {form.getFieldValue('phoneNumber') && (
            <VerifyCodeInputField
              label={`${t('change-phone.form.sendTo')} ${cutString({
                start: 3,
                end: 3,
                replaceBy: '***',
                originalString:
                  (
                    form.getFieldValue('phoneCode') + form.getFieldValue('phoneNumber')
                  ).toString() || '',
              })}`}
              name="newPhoneOtp"
              placeholder={t('change-phone.form.plhOTP')}
              onSendCode={onResendNewPhoneOtp}
              autoSend={true}
              rules={[
                {
                  pattern: /^[0-9]{6}$/,
                  message: et('change-phone.validation.newPhone.max6Digits'),
                },
                { required: true, message: et('change-phone.validation.newPhone.required') },
              ]}
            />
          )}

          <TextInputField
            label={t('change-phone.form.ggAuthen')}
            name="twoFaCode"
            placeholder={t('change-phone.form.phlGGAuthen')}
            rules={[
              { pattern: /^[0-9]{6}$/, message: et('change-phone.validation.ggCode.max6Digits') },
              { required: true, message: et('change-phone.validation.ggCode.required') },
            ]}
          />
          <SubmitButton
            name={t('change-phone.form.btnSubmit')}
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
          className="changePhone__form"
          name="change-phone"
          initialValues={initialChangePhone}
          onFinish={onSubmitNewPhone}
          form={form}
        >
          <PhoneInputField
            label={t('change-phone.form.newPhone')}
            name="phoneNumber"
            placeholder={t('change-phone.form.newPhonePlh')}
            rules={[
              { required: true, message: et('change-phone.validation.newPhone.numberRequired') },
              {
                pattern: PHONE_NUMBER_REGEX,
                message: et('change-phone.validation.newPhone.invalidNumber'),
              },
            ]}
          />
          <SubmitButton
            name={t('change-phone.form.btnSubmit')}
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

export default ChangPhoneForm;
