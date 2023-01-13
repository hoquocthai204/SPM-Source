import { Form } from 'antd';
import { useAppTranslation, useErrTranslation } from 'app/hooks';
import { RadioField } from 'components/FormFields/RadioField';
import { SubmitButton, VerticalForm } from 'components/Forms';
import * as React from 'react';

interface QuestioneireFormProps {
  initialValues: { key: string; value: number };
  onSubmit: any;
  listQuestionnaire: any[];
}

const QuestioneireForm: React.FunctionComponent<QuestioneireFormProps> = ({
  onSubmit,
  initialValues,
  listQuestionnaire,
}) => {
  const t = useAppTranslation();
  const et = useErrTranslation();

  const [form] = Form.useForm();

  return (
    <>
      <VerticalForm
        className="questionnaire__form"
        name="questionnaire"
        form={form}
        initialValues={initialValues}
        onFinish={onSubmit}
      >
        <h3 className="kyc-form__title">{t('verify-kyc.non-thai.questionnaire-form.title')}</h3>
        {listQuestionnaire.map((item, index) => (
          <RadioField
            key={index}
            options={item.answer}
            name={item.content}
            label={item.content}
            rules={[
              {
                required: true,
                message: et('verify-kyc.non-thai.questionnaire-form.validation.required'),
              },
            ]}
          />
        ))}
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
      </VerticalForm>
    </>
  );
};

export default QuestioneireForm;
