import { Form, FormProps } from 'antd';
import React from 'react';
import { useAppDispatch } from 'app/hooks';
import { removeFieldError } from './formSlice';

interface VerticalFormProps extends FormProps {}

export const VerticalForm: React.FunctionComponent<VerticalFormProps> = (props) => {
  const dispatch = useAppDispatch();
  return (
    <Form
      {...props}
      layout="vertical"
      autoComplete="off"
      requiredMark={false}
      scrollToFirstError={true}
      onValuesChange={(changedValues) => {
        const field = Object.keys(changedValues)[0] as string;
        dispatch(removeFieldError(field));
      }}
    />
  );
};
