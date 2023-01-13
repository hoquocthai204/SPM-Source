import * as React from 'react';
import { Input } from 'antd';
import FormItem from 'antd/lib/form/FormItem';
import { BaseInputNumberFieldProps } from './BaseInputNumberFieldProps';
interface ITextInputUnitFieldProps extends BaseInputNumberFieldProps {
  unit: string;
  form?: any;
  onChangeInput?: any;
}

export const TextInputUnitField: React.FunctionComponent<ITextInputUnitFieldProps> = (props) => {
  const hanldeOnChange = (event: any) => {
    const fname = event.target.name;
    const v = event.target.value;
    const reg = /^-?(0|[1-9][0-9]*)(\.[0-9]*)?$/;
    if ((!Number.isNaN(v) && reg.test(v)) || v === '' || v === '-') {
      props.form.setFieldsValue({
        [fname]: v,
      });
      props.onChangeInput(v);
    } else {
      props.form.setFieldsValue({
        [fname]: props.value,
      });
    }
  };

  return (
    <>
      <FormItem {...props}>
        <Input
          className="inputUnit"
          name={props.name}
          placeholder={props.placeholder}
          disabled={props.disabled}
          addonAfter={<div className="addOnUnit">{props.unit}</div>}
          onChange={hanldeOnChange}
        />
      </FormItem>
    </>
  );
};
