import { Form } from 'antd';
import { useAppTranslation, useErrTranslation } from 'app/hooks';
import { TextInputField } from 'components/FormFields';
import { SubmitButton, VerticalForm } from 'components/Forms';
import { ALLOW_ONLY_NUMBER } from 'consts';
import * as React from 'react';

interface ThaiManualIdentityProps {
  setLocalStep: (value: number) => void;
  localStep: number;
  setIdentityNum: (value: string) => void;
  identityNum: string;
}

const ThaiManualIdentity: React.FunctionComponent<ThaiManualIdentityProps> = (props) => {
  const { setLocalStep, localStep, setIdentityNum, identityNum } = props;
  const [form] = Form.useForm();
  const et = useErrTranslation();
  const t = useAppTranslation();

  const handleManualSubmit = ({ identityNumber }: any) => {
    setIdentityNum(identityNumber);
    localStorage.setItem('identityNumber', identityNumber);
    setLocalStep(localStep + 1);
  };

  return (
    <div className="thai-kyc-container">
      <span className="verify-kyc__title">{t('verify-kyc.mainTitle')}</span>
      <VerticalForm
        className="thai-kyc-identity__form"
        onFinish={handleManualSubmit}
        form={form}
        name="KycManualIdentityNum"
      >
        <TextInputField
          label={t('verify-kyc.identityNumber')}
          name={'identityNumber'}
          placeholder={identityNum ?? ''}
          rules={[
            {
              required: true,
              message: et('verify-kyc.thai.identity-form.validation.identityNumber.required'),
            },
            {
              max: 13,
              message: et('verify-kyc.thai.identity-form.validation.identityNumber.max'),
            },
            {
              pattern: ALLOW_ONLY_NUMBER,
              message: et('verify-kyc.thai.identity-form.validation.identityNumber.onlyNumber'),
            },
          ]}
          disabled={Boolean(identityNum)}
        />
        <SubmitButton name={t('verify-kyc.submit')} type="primary" />
      </VerticalForm>
    </div>
  );
};

export default ThaiManualIdentity;
