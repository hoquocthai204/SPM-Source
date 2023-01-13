import * as React from 'react';
import { SubmitButton, VerticalForm } from 'components/Forms';
import { useAppTranslation, useErrTranslation } from 'app/hooks';
import { CheckboxField } from 'components/FormFields';
import gg_authen from 'assets/images/gg_authen.png';

interface IStepTwoComponentProps {
  onFinishStepTwo: (values: any) => void;
}

export const StepTwoComponent: React.FunctionComponent<IStepTwoComponentProps> = (props) => {
  const t = useAppTranslation();
  const et = useErrTranslation();
  const { onFinishStepTwo } = props;
  return (
    <>
      <div className="reset-google-authentication-form__info">
        <div className="reset-google-authentication-form__info-img">
          <img src={gg_authen} alt="Maxbit" />
        </div>
        <div className="reset-google-authentication-form__info-paraphrase">
          <div className="text-md-22-20" style={{ color: '#474747', marginBottom: '15px' }}>
            {t('resetGoogleAuthenticator.infoGoogleAuthenication.paraphraseOne')}
          </div>
          <div className="text-md-22-20" style={{ color: '#474747' }}>
            {t('resetGoogleAuthenticator.infoGoogleAuthenication.paraphraseTwo')}
          </div>
        </div>
        <div className="reset-google-authentication-form__info-evm">
          <div className="text-r-14-20">
            {t('resetGoogleAuthenticator.infoGoogleAuthenication.rule')}
          </div>
        </div>
      </div>

      <VerticalForm onFinish={onFinishStepTwo}>
        <CheckboxField
          name="checkboxFirst"
          label={t('resetGoogleAuthenticator.ruleCheckBoxOne')}
          message="Should accept agreement"
          required={true}
        />

        <CheckboxField
          name="checkboxSecond"
          label={t('resetGoogleAuthenticator.ruleCheckBoxTwo')}
          message="Should accept agreement"
          required={true}
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
