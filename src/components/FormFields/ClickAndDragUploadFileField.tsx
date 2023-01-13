import { InboxOutlined } from '@ant-design/icons';
import { Upload } from 'antd';
import FormItem from 'antd/lib/form/FormItem';
import { useAppTranslation, useErrTranslation } from 'app/hooks';
import { MAX_SIZE_IMAGE } from 'consts';
import React from 'react';
import { BaseInputFieldProps } from './BaseInputFieldProps';

interface ClickAndDragUploadFileFieldProps extends BaseInputFieldProps {
  required?: boolean;
  message?: string;
  fileSize: number;
  fileType?: string;
  onGetFile?: (file: File) => void;
}

export const ClickAndDragUploadFileField: React.FunctionComponent<
  ClickAndDragUploadFileFieldProps
> = (props) => {
  const t = useAppTranslation();
  const et = useErrTranslation();
  const normFile = (e: any) => {
    if (Array.isArray(e)) {
      return e;
    }
    return e && e.fileList;
  };

  const onChangeFile = (file: File) => {
    const { onGetFile } = props;
    if (onGetFile) onGetFile(file);
  };
  return (
    <FormItem label={props.label}>
      <FormItem
        name={props.name}
        valuePropName="fileList"
        getValueFromEvent={normFile}
        rules={[
          {
            validator: (_, value) => {
              if (Boolean(props.required) === false) return Promise.resolve();
              if (props.fileSize > MAX_SIZE_IMAGE)
                return Promise.reject(new Error(et('add-user-bank.validation.fileUpload.size')));
              if (
                props.fileType &&
                props.fileType !== 'image/png' &&
                props.fileType !== 'image/jpeg' &&
                props.fileType !== 'image/jpg'
              )
                return Promise.reject(
                  new Error(et('add-user-bank.validation.fileUpload.extension'))
                );
              return value ? Promise.resolve() : Promise.reject(new Error(props.message));
            },
          },
        ]}
        noStyle
      >
        <Upload.Dragger
          name="files"
          action="/"
          accept=".png,.jpg,.jpeg"
          listType="picture"
          beforeUpload={(file) => {
            onChangeFile(file);
            return false;
          }}
        >
          <p className="ant-upload-drag-icon">
            <InboxOutlined />
          </p>
          <p className="ant-upload-text" style={{ fontSize: '14px' }}>
            {t('common.uploadFileText')}
          </p>
        </Upload.Dragger>
      </FormItem>
    </FormItem>
  );
};
