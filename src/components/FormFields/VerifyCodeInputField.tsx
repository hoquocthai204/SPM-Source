import { Input } from 'antd';
import { useAppTranslation } from 'app/hooks';
import React, { useRef, useState } from 'react';
import { CountDownTimer } from '../Commons/CountDownTimer';
import { BaseInputFieldProps } from './BaseInputFieldProps';
import { FormItem } from './FormItem';

interface VerifyCodeInputFieldProps extends BaseInputFieldProps {
  onSendCode?: () => void;
  fieldInfo?: {
    isShow: boolean;
    info: string;
  };
  autoSend?: boolean;
}

export const VerifyCodeInputField: React.FunctionComponent<VerifyCodeInputFieldProps> = ({
  onSendCode,
  fieldInfo,
  autoSend,
  ...props
}) => {
  const t = useAppTranslation();
  const verificationCodeInputRef = useRef<Input>(null);
  const [sendCode, setSendCode] = useState(true);
  const [autoSendCode, setAutoSendCode] = useState(autoSend || false);

  const onClickSendCode = () => {
    if (props.disabled) return;
    setSendCode(true);
    verificationCodeInputRef.current?.focus();
    if (onSendCode) onSendCode();
  };
  const handleFinish = () => {
    setSendCode(false);
    setAutoSendCode(false);
  };
  return (
    <>
      <FormItem {...props} className={`verification-code__field ${props.className}`}>
        <Input
          ref={verificationCodeInputRef}
          placeholder={props.placeholder}
          addonAfter={
            <span onClick={onClickSendCode}>
              {!sendCode && autoSendCode === false && (
                <span className={`send-code ${props.disabled ? 'send-code--disabled' : ''}`}>
                  {t('common.sendCode')}
                </span>
              )}
              {(sendCode || autoSendCode) && (
                <span className="counter">
                  <CountDownTimer initialSeconds={60} onFinish={handleFinish} />
                </span>
              )}
            </span>
          }
          disabled={props.disabled}
        />
        {/* {fieldInfo?.isShow && <div className="verification-code__field-info">{t('form.messEnterDigitCode')} {fieldInfo.info}</div>} */}
      </FormItem>
    </>
  );
};
