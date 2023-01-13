import { ChangeEvent } from 'react';
import { BaseFormItemProps } from './BaseFormItemProps';

export interface BaseInputFieldProps extends BaseFormItemProps {
  placeholder?: string;
  className?: string;
  value?: string;
  defaultValue?: string;
  disabled?: boolean;
  onChange?: (event: ChangeEvent<HTMLInputElement>) => void;
}
