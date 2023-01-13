import { Button, Modal, Spin } from 'antd';
import kycApi from 'api/kycApi';
import { useAppDispatch, useAppSelector, useAppTranslation } from 'app/hooks';
import { kycActions, kycStates } from 'features/kyc/kycSlice';
import { useHandleResponseError, useHandleResponseSuccess } from 'hooks';
import React, { useCallback, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

interface ThaiKycCountdownProps {
  localStep: number;
  setLocalStep: (value: number) => void;
}

let min: any, sec: any;
let count10: any;
let countdown: any;

const ThaiKycCountdown: React.FunctionComponent<ThaiKycCountdownProps> = (props) => {
  const { localStep, setLocalStep } = props;
  const [ndidResultRes, setNdidResultRes] = useState<any>();
  const [newTime, setNewTime] = useState<string | null>(null);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const allKycStates = useAppSelector(kycStates);
  const handleResponseError = useHandleResponseError();
  const handleResponseSuccess = useHandleResponseSuccess();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const t = useAppTranslation();

  useEffect(() => {
    if (ndidResultRes === undefined) return;
    if (ndidResultRes.ok) {
      if (!ndidResultRes?.body?.data) {
        clearInterval(countdown);
        clearInterval(count10);
        handleResponseSuccess(
          Boolean(!ndidResultRes?.body?.data),
          t('verify-kyc.ndidSuccess'),
          () => {
            getKycStatus();
            localStorage.removeItem('identityNumber');
            setLocalStep(localStep + 1);
          }
        );
      }
    }

    if (ndidResultRes.error) {
      clearInterval(countdown);
      clearInterval(count10);
      handleResponseError(ndidResultRes.error, () => {
        navigate(-1);
        localStorage.removeItem('identityNumber');
        setLocalStep(0);
      });
    }
  }, [ndidResultRes]);

  const getNdidKycResult = useCallback(async () => {
    const res = await kycApi.getNdidKycResult();
    if (res) setNdidResultRes(res);
  }, []);

  const getKycStatus = useCallback(async () => {
    const { body } = await kycApi.getKycInfo();
    if (body) {
      dispatch(kycActions.setKycStatus(body.kycStatus));
    }
  }, []);

  const closeNdid = useCallback(async () => {
    const res = await kycApi.closeNdid();
    if (res.ok) {
      clearInterval(count10);
      clearInterval(countdown);
      setLocalStep(localStep - 1);
    }
  }, []);

  const handleOk = () => {
    closeNdid();
  };
  const handleCancel = () => {
    setIsModalVisible(false);
  };
  const showModal = () => {
    setIsModalVisible(true);
  };

  useEffect(() => {
    count10 = setInterval(() => {
      getNdidKycResult();
    }, 10000);
  }, [dispatch, getNdidKycResult]);

  useEffect(() => {
    let value = ndidResultRes?.body?.data?.remainSeconds || allKycStates.verificationTime || 3599;
    countdown = setInterval(() => {
      min = Math.floor(value / 60);
      sec = value - min * 60;
      if (min < 10) min = String(`0${min}`);
      if (sec < 10) sec = String(`0${sec}`);
      value--;
      if (value === 0) {
        clearInterval(countdown);
        return;
      }
      setNewTime(min + ':' + sec);
    }, 1000);

    return () => clearInterval(countdown);
  }, [ndidResultRes?.body?.data, allKycStates.verificationTime]);

  return (
    <div className="thai-kyc-container">
      {newTime && allKycStates.reqTxnId ? (
        <>
          <span className="verify-kyc__title">{t('verify-kyc.mainTitle')}</span>
          <span className="verify-kyc__description">{t('verify-kyc.ndidCountdownSubtitle1')}</span>

          <span className="thai-kyc__countdown-number">{`${newTime}`}</span>

          <span className="verify-kyc__description">
            {t('verify-kyc.ndidCountdownSubtitle2', { value: allKycStates.reqTxnId })}
          </span>

          <Button type="primary" onClick={showModal}>
            {t('verify-kyc.cancel')}
          </Button>

          <Modal
            title={t('verify-kyc.cancelNdidProcess')}
            visible={isModalVisible}
            onOk={handleOk}
            onCancel={handleCancel}
          >
            <p>{t('verify-kyc.cancelProcess')}</p>
          </Modal>
        </>
      ) : (
        <Spin />
      )}
    </div>
  );
};

export default ThaiKycCountdown;
