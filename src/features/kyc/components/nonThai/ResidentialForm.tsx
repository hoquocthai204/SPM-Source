import { Button, Form } from 'antd';
import { CheckboxChangeEvent } from 'antd/lib/checkbox';
import { useAppTranslation, useErrTranslation } from 'app/hooks';
import { CheckboxField, TextInputField } from 'components/FormFields';
import { SubmitButton, VerticalForm } from 'components/Forms';
import { KycInformation } from 'models';
import React, { useState } from 'react';

interface ResidentialFormProps {
  initialValues: KycInformation;
  onSubmit: any;
  handleGoBack?: () => void;
}
const ResidentialForm: React.FunctionComponent<ResidentialFormProps> = ({
  initialValues,
  onSubmit,
  handleGoBack,
}) => {
  const t = useAppTranslation();
  const et = useErrTranslation();
  const [form] = Form.useForm();

  const [isChecked, setIschecked] = useState<any>();

  const onGetChecked = (event: CheckboxChangeEvent) => {
    setIschecked(event.target.checked);
  };

  return (
    <>
      <VerticalForm
        className="residential__form"
        name="residential"
        initialValues={initialValues}
        onFinish={onSubmit}
        form={form}
      >
        <h2>{t('verify-kyc.non-thai.residential-form.title1')}</h2>
        <div className="residential-address">
          <TextInputField
            label={t('verify-kyc.non-thai.residential-form.address.label')}
            name="residentialAddress"
            placeholder={t('verify-kyc.non-thai.residential-form.address.plh')}
            rules={[
              {
                required: true,
                message: et('verify-kyc.non-thai.residential-form.validation.address.required'),
              },
            ]}
          />
          <TextInputField
            label={t('verify-kyc.non-thai.residential-form.district.label')}
            name="residentialDistrict"
            placeholder={t('verify-kyc.non-thai.residential-form.district.plh')}
            rules={[
              {
                required: true,
                message: et('verify-kyc.non-thai.residential-form.validation.district.required'),
              },
            ]}
          />
          <TextInputField
            label={t('verify-kyc.non-thai.residential-form.state.label')}
            name="residentialProvince"
            placeholder={t('verify-kyc.non-thai.residential-form.state.plh')}
            rules={[
              {
                required: true,
                message: et('verify-kyc.non-thai.residential-form.validation.state.required'),
              },
            ]}
          />
          <TextInputField
            label={t('verify-kyc.non-thai.residential-form.postalCode.label')}
            name="residentialPostCode"
            placeholder={t('verify-kyc.non-thai.residential-form.postalCode.plh')}
            rules={[
              {
                required: true,
                message: et('verify-kyc.non-thai.residential-form.validation.postalCode.required'),
              },
            ]}
          />
        </div>
        <h2>{t('verify-kyc.non-thai.residential-form.title2')}</h2>
        <CheckboxField
          name="currentAddressSameResidential"
          label="My current address is the same as the residential address"
          onGetChecked={onGetChecked}
        />
        <div className="current-address">
          {!isChecked && (
            <>
              <TextInputField
                label={t('verify-kyc.non-thai.residential-form.address.label')}
                name="currentAddress"
                placeholder={t('verify-kyc.non-thai.residential-form.address.plh')}
                rules={[
                  {
                    required: true,
                    message: et('verify-kyc.non-thai.residential-form.validation.address.required'),
                  },
                ]}
              />
              <TextInputField
                label={t('verify-kyc.non-thai.residential-form.district.label')}
                name="currentDistrict"
                placeholder={t('verify-kyc.non-thai.residential-form.district.plh')}
                rules={[
                  {
                    required: true,
                    message: et(
                      'verify-kyc.non-thai.residential-form.validation.district.required'
                    ),
                  },
                ]}
              />
              <TextInputField
                label={t('verify-kyc.non-thai.residential-form.province.label')}
                name="currentProvince"
                placeholder={t('verify-kyc.non-thai.residential-form.province.plh')}
                rules={[
                  {
                    required: true,
                    message: et(
                      'verify-kyc.non-thai.residential-form.validation.province.required'
                    ),
                  },
                ]}
              />
              <TextInputField
                label={t('verify-kyc.non-thai.residential-form.postalCode.label')}
                name="currentPostCode"
                placeholder={t('verify-kyc.non-thai.residential-form.postalCode.plh')}
                rules={[
                  {
                    required: true,
                    message: et(
                      'verify-kyc.non-thai.residential-form.validation.postalCode.required'
                    ),
                  },
                ]}
              />
            </>
          )}
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

export default ResidentialForm;
