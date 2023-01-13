import { Select } from 'antd';
import FormItem from 'antd/lib/form/FormItem';
import React, { useState } from 'react';
import { BaseSelectFieldProps } from './BaseSelectFieldProps';

interface SelectBoxFieldProps extends BaseSelectFieldProps {}

export const SelectBoxField: React.FunctionComponent<SelectBoxFieldProps> = (props) => {
  const { Option } = Select;
  return (
    <FormItem {...props}>
      <Select
        placeholder={props.placeholder}
        disabled={props.disabled}
        onChange={props.onChange}
        defaultValue={props.defaultValue}
      >
        {props.array.map((ar, index) => (
          <Option key={String(index)} value={ar.key}>
            {ar.value}
          </Option>
        ))}
      </Select>
    </FormItem>
  );
};
