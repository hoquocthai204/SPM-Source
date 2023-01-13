import { Input } from 'antd';
import { NamePath } from 'antd/lib/form/interface';
import React from 'react';
import { BaseInputFieldProps } from './BaseInputFieldProps';
import { FormItem } from './FormItem';

interface PasswordInputFieldProps extends BaseInputFieldProps {
  dependencies?: NamePath[];
}

export const PasswordInputField: React.FunctionComponent<PasswordInputFieldProps> = (props) => {
  return (
    <FormItem {...props}>
      <Input.Password
        placeholder={props.placeholder}
        value={props.value}
        defaultValue={props.defaultValue}
        onChange={props.onChange}
        disabled={props.disabled}
      />
    </FormItem>
  );
};
