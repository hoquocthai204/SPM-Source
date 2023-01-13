import { Button, Form } from 'antd';
import { useAppTranslation, useErrTranslation } from 'app/hooks';
import { PhoneInputField, SelectBoxField, TextInputField } from 'components/FormFields';
import { SubmitButton, VerticalForm } from 'components/Forms';
import { KycInformation } from 'models';
import React from 'react';

interface OccupationFormProps {
  initialValues: KycInformation;
  onSubmit: any;
  occupation: { key: number; value: string }[];
  countries: { key: number; value: string }[];
  handleGoBack?: () => void;
}

const OccupationForm: React.FunctionComponent<OccupationFormProps> = ({
  initialValues,
  onSubmit,
  occupation,
  countries,
  handleGoBack,
}) => {
  const t = useAppTranslation();
  const et = useErrTranslation();

  const [form] = Form.useForm();

  return (
    <>
      <VerticalForm
        className="occupation__form"
        name="occupation"
        initialValues={initialValues}
        onFinish={onSubmit}
        form={form}
      >
        <h3 className="kyc-form__title">{t('verify-kyc.non-thai.occupation-form.occupations')}</h3>
        <div className="occupation-details">
          <SelectBoxField
            name="occupationId"
            label={t('verify-kyc.non-thai.occupation-form.occupation.label')}
            array={occupation}
            placeholder={t('verify-kyc.non-thai.occupation-form.occupation.plh')}
            rules={[
              {
                required: true,
                message: et('verify-kyc.non-thai.occupation-form.validation.occupation.required'),
              },
            ]}
          />
          <TextInputField
            label={t('verify-kyc.non-thai.occupation-form.position.label')}
            name="workPosition"
            placeholder={t('verify-kyc.non-thai.occupation-form.position.plh')}
            rules={[
              {
                required: true,
                message: et('verify-kyc.non-thai.occupation-form.validation.position.required'),
              },
            ]}
          />

          <TextInputField
            label={t('verify-kyc.non-thai.occupation-form.company.label')}
            name="companyName"
            placeholder="Please type your company name"
            rules={[
              {
                required: true,
                message: et('verify-kyc.non-thai.occupation-form.validation.company.required'),
              },
            ]}
          />
        </div>

        <h3 className="kyc-form__title">
          {t('verify-kyc.non-thai.occupation-form.companyAddress')}
        </h3>
        <div className="company-address">
          <SelectBoxField
            name="companyCountryId"
            label="Country"
            array={countries}
            placeholder="Please choose your country"
            rules={[
              {
                required: true,
                message: et('verify-kyc.non-thai.occupation-form.validation.country.required'),
              },
            ]}
          />
          <TextInputField
            label={t('verify-kyc.non-thai.occupation-form.address.label')}
            name="companyAddress"
            placeholder={t('verify-kyc.non-thai.occupation-form.address.plh')}
            rules={[
              {
                required: true,
                message: et('verify-kyc.non-thai.occupation-form.validation.address.required'),
              },
            ]}
          />
          <TextInputField
            label={t('verify-kyc.non-thai.occupation-form.district.label')}
            name="companyDistrict"
            placeholder={t('verify-kyc.non-thai.occupation-form.district.plh')}
            rules={[
              {
                required: true,
                message: et('verify-kyc.non-thai.occupation-form.validation.district.required'),
              },
            ]}
          />
          <TextInputField
            label={t('verify-kyc.non-thai.occupation-form.province.label')}
            name="companyProvince"
            placeholder={t('verify-kyc.non-thai.occupation-form.province.plh')}
            rules={[
              {
                required: true,
                message: et('verify-kyc.non-thai.occupation-form.validation.province.required'),
              },
            ]}
          />
          <TextInputField
            label={t('verify-kyc.non-thai.occupation-form.postalCode.label')}
            name="companyPostCode"
            placeholder={t('verify-kyc.non-thai.occupation-form.postalCode.plh')}
            rules={[
              {
                required: true,
                message: et('verify-kyc.non-thai.occupation-form.validation.postalCode.required'),
              },
            ]}
          />
        </div>
        <h3 className="kyc-form__title">
          {t('verify-kyc.non-thai.occupation-form.emergencyContact')}
        </h3>
        <div className="emergency-contact">
          <TextInputField
            label={t('verify-kyc.non-thai.occupation-form.first-name.label')}
            name="emergencyContactFirstName"
            placeholder={t('verify-kyc.non-thai.occupation-form.first-name.plh')}
          />
          <TextInputField
            label={t('verify-kyc.non-thai.occupation-form.last-name.plh')}
            name="emergencyContactLastName"
            placeholder={t('verify-kyc.non-thai.occupation-form.last-name.plh')}
          />
          <PhoneInputField
            label={t('verify-kyc.non-thai.occupation-form.phone-number.plh')}
            name="emergencyContactPhoneNumber"
            placeholder={t('verify-kyc.non-thai.occupation-form.phone-number.plh')}
          />
        </div>
        <div className="group-btn-form">
          <Button type="ghost" onClick={handleGoBack}>
            {t('verify-kyc.btnGoBack')}
          </Button>
          <SubmitButton
            name="Next"
            type="primary"
            formFieldStyle={{ marginTop: '40px' }}
            buttonStyle={{
              width: '100%',
              fontWeight: '600',
              fontSize: '14px',
              lineHeight: '20px',
            }}
          />
        </div>
      </VerticalForm>
    </>
  );
};

export default OccupationForm;
