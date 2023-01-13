import React from 'react';
import FormItem from 'antd/lib/form/FormItem';
import { BaseInputFieldProps } from './BaseInputFieldProps';
import { Upload, message } from 'antd';
import { InboxOutlined } from '@ant-design/icons';
import { MAX_SIZE_IMAGE } from 'consts';
import { useAppTranslation, useErrTranslation } from 'app/hooks';

const { Dragger } = Upload;
interface DrapOrDropSingleFileFieldProps extends BaseInputFieldProps {}

const DrapOrDropSingleFileField: React.FunctionComponent<DrapOrDropSingleFileFieldProps> = (
  props
) => {
  const t = useAppTranslation();
  const et = useErrTranslation();
  const normFile = (e: any) => {
    if (Array.isArray(e)) {
      return e;
    }
    if (e.fileList.length > 1) {
      e.fileList.shift();
    }
    return e && e.fileList;
  };
  return (
    <>
      <FormItem label={props.label}>
        <FormItem
          {...props}
          getValueFromEvent={normFile}
          valuePropName="fileList"
          noStyle
          rules={props.rules}
        >
          <Dragger
            name={props.name}
            multiple={true}
            listType="picture"
            action="/"
            accept=".png,.jpg,.jpeg"
            beforeUpload={(file) => {
              if (
                file.type === 'image/jpeg' ||
                file.type === 'image/jpg' ||
                file.type === 'image/png'
              ) {
                return false;
              } else {
                return true;
              }
            }}
          >
            <p className="ant-upload-drag-icon" style={{ marginBottom: '0px' }}>
              <InboxOutlined />
            </p>
            <p
              className="ant-upload-text"
              style={{ fontSize: '12px', lineHeight: '24px', fontWeight: '500' }}
            >
              {t('common.uploadFileText')}
            </p>
          </Dragger>
        </FormItem>
      </FormItem>
    </>
  );
};

export default DrapOrDropSingleFileField;
