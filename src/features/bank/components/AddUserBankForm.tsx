import { Form } from 'antd';
import bankApi from 'api/bankApi';
import { useAppTranslation, useErrTranslation } from 'app/hooks';
import { ClickAndDragUploadFileField, SelectBoxField, TextInputField } from 'components/FormFields';
import { SubmitButton, VerticalForm } from 'components/Forms';
import { AllBank, BankInfo } from 'models';
import React, { ChangeEvent, useCallback, useEffect, useState } from 'react';

interface AddUserBankProps {
  initialValues: BankInfo;
  onSubmit: any;
  handleGetFileDiretion?: (file: File) => void;
}

const AddUserBankForm: React.FunctionComponent<AddUserBankProps> = ({
  onSubmit,
  initialValues,
  handleGetFileDiretion,
}) => {
  const t = useAppTranslation();
  const et = useErrTranslation();

  const [bankAvailable, setBankAvailable] = useState<AllBank[]>([]);
  const [bankOptions, setBankOptions] = useState<Object[]>([]);
  const [fileUpload, setFileUpload] = useState<any>({});
  const [bankSelect, setBankSelect] = useState<any>();
  const [form] = Form.useForm();

  useEffect(() => {
    getBanks();
  }, []);

  const getBanks = useCallback(async () => {
    const { body } = await bankApi.getAllBanksAvailable({ size: 999999 });
    if (body) {
      setBankAvailable(body);
    }
  }, []);
  useEffect(() => {
    if (bankAvailable && bankAvailable.length > 0) {
      setBankOptions(
        bankAvailable?.map((item) => ({
          key: item.id,
          value: (
            <div className="list-options">
              <img src={item.bankImage} alt="" width="20" height="20" />
              <p style={{ margin: '0 0 0 10px' }}>{item.bankName}</p>
            </div>
          ),
        }))
      );
    }
  }, [bankAvailable]);
  const handleGetFile = (file: File) => {
    setFileUpload(file);
    if (handleGetFileDiretion) handleGetFileDiretion(file);
  };
  const handleChange = (event: any) => {
    setBankSelect(event);
  };
  return (
    <>
      <VerticalForm
        className="addUserBank__form"
        name="add-user-bank"
        initialValues={initialValues}
        onFinish={onSubmit}
        form={form}
      >
        <SelectBoxField
          name="bankId"
          label={t('add-user-bank.form.bankBranch')}
          array={bankOptions}
          onChange={handleChange}
          placeholder={t('add-user-bank.form.bankBranchPlh')}
          rules={[{ required: true, message: et('add-user-bank.validation.bankBranch.required') }]}
        />
        <TextInputField
          label={t('add-user-bank.form.bankNumber')}
          name="accountNumber"
          placeholder={t('add-user-bank.form.bankNumberplh')}
          rules={[
            { required: true, message: et('add-user-bank.validation.bankNumber.required') },
            {
              pattern: bankSelect === 12 || bankSelect === 16 ? /^[0-9]{12}$/ : /^[0-9]{10}$/,
              message:
                bankSelect === 12 || bankSelect === 16
                  ? et('add-user-bank.validation.bankNumber.mustBe12digits')
                  : et('add-user-bank.validation.bankNumber.mustBe10digits'),
            },
          ]}
        />

        <TextInputField
          label={t('add-user-bank.form.holderName')}
          name="accountHolderName"
          placeholder={t('add-user-bank.form.holderNamePlh')}
          rules={[
            {
              validator: (_, value) => {
                if (value.length > 50)
                  return Promise.reject(
                    new Error(et('add-user-bank.validation.holderName.lessThan50Characters'))
                  );
                return value
                  ? Promise.resolve()
                  : Promise.reject(new Error(et('add-user-bank.validation.holderName.required')));
              },
            },
          ]}
        />

        <ClickAndDragUploadFileField
          name="file"
          label={t('add-user-bank.form.uploadBookbank')}
          required={true}
          message={et('add-user-bank.validation.fileUpload.required')}
          fileSize={fileUpload.size}
          fileType={fileUpload.type}
          onGetFile={handleGetFile}
        />
        <TextInputField
          label={t('add-user-bank.form.ggCodeLabel')}
          name="twoFaCode"
          placeholder={t('add-user-bank.form.ggCodePlh')}
          rules={[
            { pattern: /^[0-9]{6}$/, message: et('add-user-bank.validation.ggCode.max6Digits') },
            { required: true, message: et('add-user-bank.validation.ggCode.required') },
          ]}
        />
        <SubmitButton
          name={t('add-user-bank.form.btnSubmit')}
          type="primary"
          formFieldStyle={{ marginTop: '40px' }}
          buttonStyle={{
            width: '100%',
            fontWeight: '600',
            fontSize: '14px',
            lineHeight: '20px',
          }}
        />
      </VerticalForm>
    </>
  );
};

export default AddUserBankForm;
