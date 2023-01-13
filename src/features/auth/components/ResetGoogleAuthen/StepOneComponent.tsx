import { SubmitButton, VerticalForm } from 'components/Forms';
import { EMAIL_REGEX } from 'consts';
import { useAppTranslation, useErrTranslation } from 'app/hooks';
import { TextInputField } from 'components/FormFields';
import * as React from 'react';

interface IStepOneComponentProps {
  onFinishStepOne: (values: any) => void;
}

export const StepOneComponent: React.FunctionComponent<IStepOneComponentProps> = (props) => {
  const t = useAppTranslation();
  const et = useErrTranslation();
  const { onFinishStepOne } = props;

  return (
    <>
      <VerticalForm onFinish={onFinishStepOne}>
        <TextInputField
          name="email"
          label={t('form.label.email')}
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
    </>
  );
};
