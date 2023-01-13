import { Button, DatePicker, DatePickerProps, Form } from 'antd';
import { useAppDispatch, useAppTranslation, useErrTranslation } from 'app/hooks';
import { SelectBoxField, TextInputField } from 'components/FormFields';
import { SubmitButton, VerticalForm } from 'components/Forms';
import { getDate } from 'features/kyc/kycSlice';
import { KycInformation } from 'models';
import date from 'date-and-time';
import React from 'react';
import { MIN_AGE_BASE_ON_DAYS } from 'consts';

interface PersonalFormProps {
  initialValues: KycInformation;
  onSubmit: any;
  type?: string;
  optionsGender: { key: string; value: string }[];
  countries: { key: number; value: string }[];
  titleName: { key: number; value: string }[];
  arrayPersonal?: { key: string; value: string }[];
  handleGoBack?: () => any;
}

const PersonalForm: React.FunctionComponent<PersonalFormProps> = ({
  initialValues,
  onSubmit,
  titleName,
  countries,
  optionsGender,
  type,
  arrayPersonal,
  handleGoBack,
}) => {
  const t = useAppTranslation();
  const et = useErrTranslation();

  const dispatch = useAppDispatch();

  const [form] = Form.useForm();

  const onChange: DatePickerProps['onChange'] = (_, dateString) => {
    dispatch(getDate(dateString));
  };
  return (
    <VerticalForm
      className="personal__form"
      name="personal"
      initialValues={initialValues}
      onFinish={onSubmit}
      form={form}
    >
      {arrayPersonal &&
        arrayPersonal?.length > 0 &&
        arrayPersonal.map((item, index) => {
          if (
            Object.keys(item)[0] === 'Title Name' ||
            Object.keys(item)[0] === 'Nationality' ||
            Object.keys(item)[0] === 'Gender'
          ) {
            return (
              <SelectBoxField
                key={index}
                name={
                  Object.keys(item)[0] === 'Nationality'
                    ? 'nationalityId'
                    : Object.keys(item)[0] === 'Title Name'
                    ? 'titleId'
                    : 'gender'
                }
                array={
                  Object.keys(item)[0] === 'Nationality'
                    ? countries
                    : Object.keys(item)[0] === 'Title Name'
                    ? titleName
                    : optionsGender
                }
                label={
                  Object.keys(item)[0] === 'Nationality'
                    ? t('verify-kyc.non-thai.personal-form.nation.label')
                    : Object.keys(item)[0] === 'Title Name'
                    ? t('verify-kyc.non-thai.personal-form.title-name.label')
                    : t('verify-kyc.non-thai.personal-form.gender.label')
                }
                placeholder={
                  Object.keys(item)[0] === 'Nationality'
                    ? 'Choose your nationality'
                    : Object.keys(item)[0] === 'Title Name'
                    ? 'Choose your title name'
                    : 'Choose your gender'
                }
              />
            );
          } else {
            return (
              <TextInputField
                name="fieldDisabled"
                key={index}
                label={Object.keys(item)[0]}
                placeholder={Object.values(item)[0] as string}
                disabled
              />
            );
          }
        })}
      {type === 'manual' && (
        <>
          <h3 className="kyc-form__title">{t('verify-kyc.non-thai.personal-form.title')}</h3>
          <div className="personal-details">
            <TextInputField
              label={t('verify-kyc.non-thai.personal-form.passport.label')}
              name="passportNumber"
              placeholder={t('verify-kyc.non-thai.personal-form.passport.plh')}
              rules={[
                {
                  required: true,
                  message: et('verify-kyc.non-thai.personal-form.validation.passport.required'),
                },
              ]}
            />
            <SelectBoxField
              name="titleId"
              label={t('verify-kyc.non-thai.personal-form.title-name.label')}
              array={titleName}
              placeholder={t('verify-kyc.non-thai.personal-form.title-name.plh')}
              rules={[
                {
                  required: true,
                  message: et('verify-kyc.non-thai.personal-form.validation.title-name.required'),
                },
              ]}
            />
            <TextInputField
              label={t('verify-kyc.non-thai.personal-form.first-name.label')}
              name="firstName"
              placeholder={t('verify-kyc.non-thai.personal-form.first-name.plh')}
              rules={[
                {
                  required: true,
                  message: et('verify-kyc.non-thai.personal-form.validation.first-name.required'),
                },
              ]}
            />
            <TextInputField
              label={t('verify-kyc.non-thai.personal-form.last-name.label')}
              name="lastName"
              placeholder={t('verify-kyc.non-thai.personal-form.last-name.plh')}
              rules={[
                {
                  required: true,
                  message: et('verify-kyc.non-thai.personal-form.validation.last-name.required'),
                },
              ]}
            />
            <SelectBoxField
              name="gender"
              label={t('verify-kyc.non-thai.personal-form.gender.label')}
              array={optionsGender}
              placeholder={t('verify-kyc.non-thai.personal-form.gender.plh')}
              rules={[
                {
                  required: true,
                  message: et('verify-kyc.non-thai.personal-form.validation.gender.required'),
                },
              ]}
            />
            <SelectBoxField
              name="nationalityId"
              label={t('verify-kyc.non-thai.personal-form.nation.label')}
              array={countries}
              placeholder={t('verify-kyc.non-thai.personal-form.nation.plh')}
              rules={[
                {
                  required: true,
                  message: et('verify-kyc.non-thai.personal-form.validation.nationality.required'),
                },
              ]}
            />

            <Form.Item
              name="dob"
              label={t('verify-kyc.non-thai.personal-form.dob.label')}
              rules={[
                {
                  validator: (_, value) => {
                    const dob = new Date(value);
                    const now = new Date();
                    if (date.subtract(now, dob).toDays() < MIN_AGE_BASE_ON_DAYS)
                      return Promise.reject(
                        new Error(et('verify-kyc.non-thai.personal-form.validation.dob.mustBe18'))
                      );
                    return value
                      ? Promise.resolve()
                      : Promise.reject(
                          new Error(et('verify-kyc.non-thai.personal-form.validation.dob.required'))
                        );
                  },
                },
              ]}
            >
              <DatePicker onChange={onChange} />
            </Form.Item>
          </div>
        </>
      )}
      <div className="group-btn-form">
        <Button type="ghost" onClick={handleGoBack}>
          {t('verify-kyc.btnGoBack')}
        </Button>
        <SubmitButton
          name="Next"
          type="primary"
          formFieldStyle={{ marginTop: '40px' }}
          className={type === 'manual' ? '' : 'ekyc-form'}
          buttonStyle={{
            width: '100%',
            fontWeight: '600',
            fontSize: '14px',
            lineHeight: '20px',
          }}
        />
      </div>
    </VerticalForm>
  );
};

export default PersonalForm;
