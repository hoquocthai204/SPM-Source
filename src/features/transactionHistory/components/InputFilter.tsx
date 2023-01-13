import { Input } from 'antd';
import React, { ChangeEvent } from 'react';
interface BaseInputFilterProps {
  value: any;
  label?: string;
  placeholder?: string;
  onChange?: (event: ChangeEvent<HTMLInputElement>) => void;
}
interface InputFilterProps extends BaseInputFilterProps {}

export const InputFilter: React.FunctionComponent<InputFilterProps> = (props) => {
  return (
    <>
      <div>
        <span>{props.label}</span>
        <Input placeholder={props.placeholder} value={props.value} onChange={props.onChange} />
      </div>
    </>
  );
};
