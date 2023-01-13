import { FormItemProps } from 'antd';
import { Rule } from 'antd/lib/form';

export interface BaseFormItemProps extends FormItemProps {
  label?: string;
  name: string;
  rules?: Rule[];
}
