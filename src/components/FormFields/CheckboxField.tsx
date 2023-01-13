import { Checkbox } from 'antd';
import { CheckboxChangeEvent } from 'antd/lib/checkbox';
import FormItem from 'antd/lib/form/FormItem';
import React from 'react';
import { BaseInputFieldProps } from './BaseInputFieldProps';

interface CheckboxFieldProps extends BaseInputFieldProps {
  required?: boolean;
  message?: string;
  onGetChecked?: (value: CheckboxChangeEvent) => void;
  defaultChecked?: boolean;
}

export const CheckboxField: React.FunctionComponent<CheckboxFieldProps> = (props) => {
  const handleChange = (e: CheckboxChangeEvent) => {
    const { onGetChecked } = props;
    if (onGetChecked) onGetChecked(e);
  };
  return (
    <FormItem
      name={props.name}
      valuePropName="checked"
      rules={[
        {
          validator: (_, value) => {
            if (Boolean(props.required) === false) return Promise.resolve();
            return value ? Promise.resolve() : Promise.reject(new Error(props.message));
          },
        },
      ]}
    >
      <Checkbox
        disabled={props.disabled}
        onChange={handleChange}
        defaultChecked={props.defaultChecked}
      >
        {props.label}
      </Checkbox>
    </FormItem>
  );
};
