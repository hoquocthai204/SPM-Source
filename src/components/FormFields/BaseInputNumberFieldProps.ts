import { Rule } from "antd/lib/form";
import { ChangeEvent } from "react";

export interface BaseInputNumberFieldProps {
  label?: string;
  name?: string;
  rules?: Rule[];
  placeholder?: string;
  className?: string;
  value?: number | string;
  defaultValue?: string;
  disabled?: boolean;
  onChange?: (event: ChangeEvent<HTMLInputElement>) => void;
}