import React from 'react';
import { BaseInputNumberFieldProps } from './BaseInputNumberFieldProps';
import { Input } from 'antd';
import FormItem from 'antd/lib/form/FormItem';

interface TextInputUnitAndMaxFieldProps extends BaseInputNumberFieldProps {
  unit: string;
  form?: any;
  onChangeInput?: any;
  onClickMax?: any;
}

const TextInputUnitAndMaxField: React.FunctionComponent<TextInputUnitAndMaxFieldProps> = (
  props
) => {
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
          className="inputMaxAndUnit"
          name={props.name}
          placeholder={props.placeholder}
          disabled={props.disabled}
          addonAfter={
            <div className="addOn">
              <span
                onClick={() => {
                  props.onClickMax();
                }}
              >
                MAX
              </span>
              <span>|</span>
              <span>{props.unit}</span>
            </div>
          }
          onChange={hanldeOnChange}
        />
      </FormItem>
    </>
  );
};

export default TextInputUnitAndMaxField;
