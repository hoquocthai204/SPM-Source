import { Select } from 'antd';
import React from 'react';

interface SelectBoxFilterProps {
  data: any[];
  value: any;
  defaultValue?: string;
  label?: string;
  allowClear?: boolean;
  onChange?: (value: any) => void;
}

const SelectBoxOrderFilter: React.FunctionComponent<SelectBoxFilterProps> = (props) => {
  const { Option } = Select;
  return (
    <>
      <div>
        <span>{props.label}</span>
        <Select
          value={props.value}
          defaultValue={props.defaultValue}
          onChange={props.onChange}
          allowClear={true}
        >
          {props.data.map((item, index) => (
            <Option key={String(index)} value={item.key}>
              {item.value}
            </Option>
          ))}
        </Select>
      </div>
    </>
  );
};

export default SelectBoxOrderFilter;
