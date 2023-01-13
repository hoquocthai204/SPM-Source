import React from 'react';
import { VerticalForm, SubmitButton } from 'components/Forms';
import { EMAIL_REGEX } from 'consts';
import { useAppTranslation, useErrTranslation } from 'app/hooks';
import { TextInputField } from 'components/FormFields';
interface StepOneComponentProps {
  setStep: (step: number) => void;
  setEmail: (email: string) => void;
}

export const StepOneComponent: React.FunctionComponent<StepOneComponentProps> = (props) => {
  const { setStep, setEmail } = props;
  const t = useAppTranslation();
  const et = useErrTranslation();
  const onSubmitStepOne = (values: any) => {
    if (values) {
      setStep(2);
      setEmail(values.email);
    }
  };
  return (
    <VerticalForm onFinish={onSubmitStepOne}>
      <TextInputField
        label={t('form.label.email')}
        name="email"
        placeholder={t('form.placeholder.email')}
        rules={[
          { required: true, message: et('reset-gg-authen.validation.email.required') },
          { pattern: EMAIL_REGEX, message: et('reset-gg-authen.validation.email.pattern') },
        ]}
      />
      <SubmitButton
        name={t('form.nameButton.next')}
        isBlock={true}
        type="primary"
        buttonStyle={{
          color: '#FFFFFF',
          fontWeight: '600',
          fontSize: '14px',
          fontFamily: 'inherit',
          height: '42px',
          lineHeight: '20px',
        }}
      />
    </VerticalForm>
  );
};
