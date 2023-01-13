import * as React from 'react';
import { Checkbox } from 'antd';
import { BaseInputFieldProps } from 'components/FormFields/BaseInputFieldProps';
import { CheckboxChangeEvent } from 'antd/lib/checkbox';

interface ICheckBoxProps extends BaseInputFieldProps {
  onChangeCheckBox: (event: CheckboxChangeEvent) => void;
}

export const CheckBox: React.FunctionComponent<ICheckBoxProps> = (props) => {
  return (
    <>
      <Checkbox
        className="text-md-14-16"
        style={{ color: '#848E9C', fontFamily: 'Poppins', fontStyle: 'normal' }}
        onChange={props.onChangeCheckBox}
      >
        {props.label}
      </Checkbox>
    </>
  );
};
