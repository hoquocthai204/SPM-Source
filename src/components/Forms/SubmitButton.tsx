import { Button, Spin } from 'antd';
import { ButtonType } from 'antd/lib/button';
import FormItem from 'antd/lib/form/FormItem';
import { selectIsSubmitting } from 'components/Forms/formSlice';
import React, { CSSProperties } from 'react';
import { useSelector } from 'react-redux';

interface SubmitButtonProps {
  name: string;
  type?: ButtonType;
  className?: string;
  formFieldStyle?: CSSProperties;
  buttonStyle?: CSSProperties;
  isBlock?: boolean;
}

export const SubmitButton: React.FunctionComponent<SubmitButtonProps> = ({
  name,
  type,
  className,
  formFieldStyle,
  buttonStyle,
  isBlock,
}) => {
  const isSubmitting = useSelector(selectIsSubmitting);
  return (
    <FormItem className={className} style={formFieldStyle}>
      <Button
        type={type}
        htmlType="submit"
        disabled={isSubmitting}
        style={buttonStyle}
        block={isBlock}
      >
        {!isSubmitting && name}
        {isSubmitting && <Spin />}
      </Button>
    </FormItem>
  );
};
