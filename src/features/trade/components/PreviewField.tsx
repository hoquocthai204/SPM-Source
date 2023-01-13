import FormItem from 'antd/lib/form/FormItem';
import React from 'react';

interface PreviewFieldProps {
  name: string;
  className?: string;
  classNameTop?: string;
  classNameBottom?: string;
  content?: string | undefined;
  value?: string | number;
}

export const PreviewField: React.FunctionComponent<PreviewFieldProps> = (props) => {
  return (
    <FormItem {...props}>
      <div className={props.className}>
        <div className={props.classNameTop}>{props.content}</div>
        <div className={props.classNameBottom}>{props.value}</div>
      </div>
    </FormItem>
  );
};
