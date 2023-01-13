import { Rule } from 'antd/lib/form';
import React, { ChangeEvent } from 'react';

export interface BaseSelectFieldProps {
  label?: string | React.ReactNode;
  name: string;
  rules?: Rule[];
  placeholder?: string;
  className?: string;
  value?: any;
  array: any[];
  defaultValue?: any;
  disabled?: boolean;
  onChange?: (event: ChangeEvent<HTMLInputElement>) => void;
  // onChange?: any;
}
