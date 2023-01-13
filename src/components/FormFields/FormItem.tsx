import { Form } from 'antd';
import { useAppSelector, useErrTranslation } from 'app/hooks';
import { selectFieldErrors } from 'components/Forms/formSlice';
import React from 'react';
import { BaseFormItemProps } from './BaseFormItemProps';

export const FormItem: React.FunctionComponent<BaseFormItemProps> = (props) => {
  const et = useErrTranslation();
  const errors = useAppSelector(selectFieldErrors);
  const validateStatus = errors && errors[props.name] ? 'error' : 'success';
  const help = errors && errors[props.name] ? et(errors[props.name][0]) : null;

  return <Form.Item {...props} validateStatus={validateStatus} help={help} />;
};
