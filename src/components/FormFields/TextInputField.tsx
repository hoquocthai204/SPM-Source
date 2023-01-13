import { Input } from 'antd';
import React from 'react';
import { BaseInputFieldProps } from './BaseInputFieldProps';
import { FormItem } from './FormItem';

interface TextInputFieldProps extends BaseInputFieldProps {}

export const TextInputField: React.FunctionComponent<TextInputFieldProps> = (props) => {
  return (
    <FormItem {...props}>
      <Input placeholder={props.placeholder} disabled={props.disabled} />
    </FormItem>
  );
};
