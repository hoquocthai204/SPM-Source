import { Radio, RadioChangeEvent } from 'antd';
import FormItem from 'antd/lib/form/FormItem';
import React, { useState } from 'react';
import { BaseRadioFieldProps } from './BaseRadioFieldProps';

interface RadioFieldProps extends BaseRadioFieldProps {
  onGetValue?: (value: any) => void;
  options: any[];
}

export const RadioField: React.FunctionComponent<RadioFieldProps> = (props) => {
  const [valueRadio, setValueRadio] = useState<number>();
  const onChange = ({ target: { value } }: RadioChangeEvent) => {
    setValueRadio(value);
  };

  return (
    <FormItem {...props}>
      <Radio.Group options={props.options} onChange={onChange} value={valueRadio} />
    </FormItem>
  );
};
