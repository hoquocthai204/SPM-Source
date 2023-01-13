import { VerifyCodeInputField } from 'components/FormFields';
import { SubmitButton, VerticalForm } from 'components/Forms';
import { useAppTranslation, useErrTranslation } from 'app/hooks';
import * as React from 'react';

interface IStepFourComponentProps {
  onFinishStepFour: (values: any) => void;
  onSendCode?: any;
}

export const StepFourComponent: React.FunctionComponent<IStepFourComponentProps> = (props) => {
  const t = useAppTranslation();
  const et = useErrTranslation();
  const { onFinishStepFour } = props;
  return (
    <>
      <VerticalForm onFinish={onFinishStepFour}>
        <VerifyCodeInputField
          label={t('form.label.emailAuthenCode')}
          name="verifyEmail"
          placeholder={t('form.placeholder.emailAuthenCode')}
          rules={[
            { required: true, message: et('reset-gg-authen.validation.verifyEmail.required') },
          ]}
          onSendCode={props.onSendCode}
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
