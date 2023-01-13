import { Form } from 'antd';
import { CheckboxChangeEvent } from 'antd/lib/checkbox';
import { useAppTranslation, useErrTranslation } from 'app/hooks';
import {
  CheckboxField,
  PhoneInputField,
  SelectBoxField,
  TextInputField,
} from 'components/FormFields';
import { SubmitButton, VerticalForm } from 'components/Forms';
import { PHONE_NUMBER_REGEX } from 'consts';
import { NdidKycRequest } from 'models';
import React from 'react';

interface ThaiKycFormContainer1Props {
  inputInformation: any;
  onSubmit: (value: any) => void;
  isChecked: boolean;
  ndidKycRequest: NdidKycRequest;
  handleToggleCheck: (e: CheckboxChangeEvent) => void;
  occupations: any;
  countries: any;
}

const ThaiKycFormContainer1: React.FunctionComponent<ThaiKycFormContainer1Props> = (props) => {
  const {
    inputInformation,
    onSubmit,
    isChecked,
    ndidKycRequest,
    handleToggleCheck,
    occupations,
    countries,
  } = props;
  const t = useAppTranslation();
  const et = useErrTranslation();
  const [form] = Form.useForm();
  return (
    <VerticalForm
      initialValues={inputInformation}
      onFinish={onSubmit}
      form={form}
      name="ThaiKyc"
      className="thai-kyc-form"
    >
      <h3>{t('verify-kyc.thai.residential-form.title2')}</h3>
      <CheckboxField
        name={Object.keys(inputInformation)[0]}
        label={t('verify-kyc.thai.residential-form.sameAddress')}
        onGetChecked={handleToggleCheck}
      />
      <div className="thai-kyc__form-detail">
        <TextInputField
          label={t('verify-kyc.thai.residential-form.address.label')}
          name={Object.keys(inputInformation)[1]}
          placeholder={
            isChecked
              ? ndidKycRequest.residentialAddress
              : t('verify-kyc.thai.residential-form.address.plh')
          }
          rules={[
            {
              required: !isChecked,
              message: et('verify-kyc.thai.residential-form.validation.address.required'),
            },
          ]}
          disabled={isChecked}
        />
        <TextInputField
          label={t('verify-kyc.thai.residential-form.district.label')}
          name={Object.keys(inputInformation)[2]}
          placeholder={
            isChecked
              ? ndidKycRequest.residentialDistrict
              : t('verify-kyc.thai.residential-form.district.plh')
          }
          rules={[
            {
              required: !isChecked,
              message: et('verify-kyc.thai.residential-form.validation.district.required'),
            },
          ]}
          disabled={isChecked}
        />
        <TextInputField
          label={t('verify-kyc.thai.residential-form.province.label')}
          name={Object.keys(inputInformation)[3]}
          placeholder={
            isChecked
              ? ndidKycRequest.residentialProvince
              : t('verify-kyc.thai.residential-form.province.plh')
          }
          rules={[
            {
              required: !isChecked,
              message: et('verify-kyc.thai.residential-form.validation.province.required'),
            },
          ]}
          disabled={isChecked}
        />
        <TextInputField
          label={t('verify-kyc.thai.residential-form.postalCode.label')}
          name={Object.keys(inputInformation)[4]}
          placeholder={
            isChecked
              ? ndidKycRequest.residentialPostCode
              : t('verify-kyc.thai.residential-form.postalCode.plh')
          }
          rules={[
            {
              required: !isChecked,
              message: et('verify-kyc.thai.residential-form.validation.postalCode.required'),
            },
          ]}
          disabled={isChecked}
        />
      </div>
      {/* ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ */}
      <h3>{t('verify-kyc.thai.occupation-form.occupations')}</h3>
      <div className="thai-kyc__form-detail">
        <SelectBoxField
          label={t('verify-kyc.thai.occupation-form.occupation.label')}
          name={Object.keys(inputInformation)[5]}
          array={occupations || []}
          rules={[
            {
              required: true,
              message: et('verify-kyc.thai.occupation-form.validation.occupation.required'),
            },
          ]}
          placeholder={t('verify-kyc.thai.occupation-form.occupation.plh')}
        />
        <TextInputField
          label={t('verify-kyc.thai.occupation-form.position.label')}
          name={Object.keys(inputInformation)[6]}
          rules={[
            {
              required: true,
              message: et('verify-kyc.thai.occupation-form.validation.position.required'),
            },
          ]}
          placeholder={t('verify-kyc.thai.occupation-form.position.plh')}
        />
        <TextInputField
          label={t('verify-kyc.thai.occupation-form.company.label')}
          name={Object.keys(inputInformation)[7]}
          rules={[
            {
              required: true,
              message: et('verify-kyc.thai.occupation-form.validation.company.required'),
            },
          ]}
          placeholder={t('verify-kyc.thai.occupation-form.company.plh')}
        />
      </div>

      {/* ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ */}
      <h3>{t('verify-kyc.thai.occupation-form.companyAddress')}</h3>
      <div className="thai-kyc__form-detail">
        <SelectBoxField
          label={t('verify-kyc.thai.occupation-form.country.label')}
          name={Object.keys(inputInformation)[8]}
          array={countries || []}
          placeholder={t('verify-kyc.thai.occupation-form.country.plh')}
          rules={[
            {
              required: true,
              message: et('verify-kyc.thai.occupation-form.validation.country.required'),
            },
          ]}
        />
        <TextInputField
          label={t('verify-kyc.thai.residential-form.address.label')}
          name={Object.keys(inputInformation)[9]}
          placeholder={t('verify-kyc.thai.residential-form.address.plh')}
          rules={[
            {
              required: true,
              message: et('verify-kyc.thai.residential-form.validation.address.required'),
            },
          ]}
        />
        <TextInputField
          label={t('verify-kyc.thai.occupation-form.postalCode.label')}
          name={Object.keys(inputInformation)[10]}
          placeholder={t('verify-kyc.thai.occupation-form.postalCode.plh')}
          rules={[
            {
              required: true,
              message: et('verify-kyc.thai.occupation-form.validation.postalCode.required'),
            },
          ]}
        />
        <TextInputField
          label={t('verify-kyc.thai.occupation-form.district.label')}
          name={Object.keys(inputInformation)[11]}
          placeholder={t('verify-kyc.thai.occupation-form.district.plh')}
          rules={[
            {
              required: true,
              message: et('verify-kyc.thai.occupation-form.validation.district.required'),
            },
          ]}
        />
        <TextInputField
          label={t('verify-kyc.thai.occupation-form.province.label')}
          name={Object.keys(inputInformation)[12]}
          placeholder={t('verify-kyc.thai.occupation-form.province.plh')}
          rules={[
            {
              required: true,
              message: et('verify-kyc.thai.occupation-form.validation.province.required'),
            },
          ]}
        />
      </div>

      {/* ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ */}
      <h3>{t('verify-kyc.thai.occupation-form.emergencyContact')}</h3>
      <div className="thai-kyc__form-detail">
        <TextInputField
          label={t('verify-kyc.thai.occupation-form.first-name.label')}
          name={Object.keys(inputInformation)[13]}
          placeholder={t('verify-kyc.thai.occupation-form.first-name.plh')}
        />
        <TextInputField
          label={t('verify-kyc.thai.occupation-form.last-name.label')}
          name={Object.keys(inputInformation)[14]}
          placeholder={t('verify-kyc.thai.occupation-form.last-name.plh')}
        />

        <PhoneInputField
          label={t('verify-kyc.thai.occupation-form.phone-number.label')}
          name={Object.keys(inputInformation)[15]}
          rules={[
            {
              pattern: PHONE_NUMBER_REGEX,
              message: et('register.validation.mobilePhone.pattern'),
            },
          ]}
          placeholder={t('verify-kyc.thai.occupation-form.phone-number.plh')}
        />
      </div>

      <SubmitButton name={t('verify-kyc.next')} type="primary" />
    </VerticalForm>
  );
};

export default ThaiKycFormContainer1;
