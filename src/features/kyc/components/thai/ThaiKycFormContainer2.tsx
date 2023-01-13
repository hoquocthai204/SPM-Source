import { Form } from 'antd';
import { useAppTranslation } from 'app/hooks';
import { TextInputField } from 'components/FormFields';
import { SubmitButton, VerticalForm } from 'components/Forms';
import React from 'react';

interface ThaiKycFormContainer2Props {
  displayInfo: any;
  onSubmit: (value: any) => void;
}

const ThaiKycFormContainer2: React.FunctionComponent<ThaiKycFormContainer2Props> = (props) => {
  const { displayInfo, onSubmit } = props;
  const t = useAppTranslation();
  const [form] = Form.useForm();
  return (
    <VerticalForm
      initialValues={displayInfo}
      onFinish={onSubmit}
      form={form}
      name="ThaiKycReview"
      className="thai-kyc-form"
    >
      <h3>{t('verify-kyc.thai.personal-form.title')}</h3>
      <div className="thai-kyc__form-detail">
        <TextInputField
          label={t('verify-kyc.thai.personal-form.identityNumber')}
          name={Object.keys(displayInfo)[0]}
          disabled
        />
        <TextInputField
          label={t('verify-kyc.thai.personal-form.nameEnglish')}
          name={Object.keys(displayInfo)[1]}
          disabled
        />
        <TextInputField
          label={t('verify-kyc.thai.personal-form.nameThai')}
          name={Object.keys(displayInfo)[2]}
          disabled
        />
        <TextInputField
          label={t('verify-kyc.thai.personal-form.nation.label')}
          name={Object.keys(displayInfo)[3]}
          disabled
        />
        <TextInputField
          label={t('verify-kyc.thai.personal-form.gender.label')}
          name={Object.keys(displayInfo)[4]}
          disabled
        />
        <TextInputField
          label={t('verify-kyc.thai.personal-form.maritalStatus.label')}
          name={Object.keys(displayInfo)[5]}
          disabled
        />
        <TextInputField
          label={t('verify-kyc.thai.personal-form.dob.label')}
          name={Object.keys(displayInfo)[6]}
          disabled
        />
      </div>

      {/* ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ */}
      <h3>{t('verify-kyc.thai.residential-form.title1')}</h3>
      <div className="thai-kyc__form-detail">
        <TextInputField
          label={t('verify-kyc.thai.residential-form.address.label')}
          name={Object.keys(displayInfo)[7]}
          disabled
        />
        <TextInputField
          label={t('verify-kyc.thai.residential-form.district.label')}
          name={Object.keys(displayInfo)[8]}
          disabled
        />
        <TextInputField
          label={t('verify-kyc.thai.residential-form.province.label')}
          name={Object.keys(displayInfo)[9]}
          disabled
        />
        <TextInputField
          label={t('verify-kyc.thai.residential-form.postalCode.label')}
          name={Object.keys(displayInfo)[10]}
          disabled
        />
      </div>

      {/* ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ */}
      <h3>{t('verify-kyc.thai.residential-form.title2')}</h3>
      <div className="thai-kyc__form-detail">
        <TextInputField
          label={t('verify-kyc.thai.residential-form.address.label')}
          name={Object.keys(displayInfo)[11]}
          disabled
        />
        <TextInputField
          label={t('verify-kyc.thai.residential-form.district.label')}
          name={Object.keys(displayInfo)[12]}
          disabled
        />
        <TextInputField
          label={t('verify-kyc.thai.residential-form.province.label')}
          name={Object.keys(displayInfo)[13]}
          disabled
        />
        <TextInputField
          label={t('verify-kyc.thai.residential-form.postalCode.label')}
          name={Object.keys(displayInfo)[14]}
          disabled
        />
      </div>

      {/* ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ */}
      <h3>{t('verify-kyc.thai.occupation-form.occupations')}</h3>
      <div className="thai-kyc__form-detail">
        <TextInputField
          label={t('verify-kyc.thai.occupation-form.occupation.label')}
          name={Object.keys(displayInfo)[15]}
          disabled
        />
        <TextInputField
          label={t('verify-kyc.thai.occupation-form.position.label')}
          name={Object.keys(displayInfo)[16]}
          disabled
        />
        <TextInputField
          label={t('verify-kyc.thai.occupation-form.company.label')}
          name={Object.keys(displayInfo)[17]}
          disabled
        />
      </div>

      {/* ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ */}
      <h3>{t('verify-kyc.thai.occupation-form.companyAddress')}</h3>
      <div className="thai-kyc__form-detail">
        <TextInputField
          label={t('verify-kyc.thai.occupation-form.country.label')}
          name={Object.keys(displayInfo)[18]}
          disabled
        />
        <TextInputField
          label={t('verify-kyc.thai.residential-form.address.label')}
          name={Object.keys(displayInfo)[19]}
          disabled
        />
        <TextInputField
          label={t('verify-kyc.thai.occupation-form.postalCode.label')}
          name={Object.keys(displayInfo)[20]}
          disabled
        />
        <TextInputField
          label={t('verify-kyc.thai.occupation-form.district.label')}
          name={Object.keys(displayInfo)[21]}
          disabled
        />
        <TextInputField
          label={t('verify-kyc.thai.occupation-form.province.label')}
          name={Object.keys(displayInfo)[22]}
          disabled
        />
      </div>

      {/* ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ */}
      <h3>{t('verify-kyc.thai.occupation-form.emergencyContact')}</h3>
      <div className="thai-kyc__form-detail">
        <TextInputField
          label={t('verify-kyc.thai.occupation-form.first-name.label')}
          name={Object.keys(displayInfo)[23]}
          disabled
        />
        <TextInputField
          label={t('verify-kyc.thai.occupation-form.last-name.label')}
          name={Object.keys(displayInfo)[24]}
          disabled
        />
        <TextInputField
          label={t('verify-kyc.thai.occupation-form.phone-number.label')}
          name={Object.keys(displayInfo)[25]}
          disabled
        />
      </div>

      <SubmitButton name={t('verify-kyc.submit')} type="primary" />
    </VerticalForm>
  );
};

export default ThaiKycFormContainer2;
