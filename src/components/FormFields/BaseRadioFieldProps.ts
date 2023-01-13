import { RadioChangeEvent } from 'antd';
import { Rule } from 'antd/lib/form';
import React from 'react';

export interface BaseRadioFieldProps {
  label?: string | React.ReactNode;
  name: string;
  rules?: Rule[];
  className?: string;
  value?: any;
  array?: any[];
  onChange?: (e: RadioChangeEvent) => void;
}
