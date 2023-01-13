import kycApi from 'api/kycApi';
import { useAppDispatch, useAppSelector, useAppTranslation } from 'app/hooks';
import { showInfoModal } from 'components/Modals';
import { kycActions, kycStates } from 'features/kyc/kycSlice';
import { KycInformation } from 'models';
import React, { useCallback, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Questioneire from '../questionnaire/Questioneire';
import NdidSelect from './NdidSelect';
import ThaiKycCountdown from './ThaiKycCountdown';
import ThaiKycForm1 from './ThaiKycForm1';
import ThaiKycForm2 from './ThaiKycForm2';
import ThaiKycSelectProvider from './ThaiKycSelectProvider';
import ThaiManualIdentity from './ThaiManualIdentity';
import ThaiUploadImage from './ThaiUploadImage';

interface ThaiKycProps {}

const ThaiKyc: React.FunctionComponent<ThaiKycProps> = (props) => {
  const [localStep, setLocalStep] = useState<number>(0);
  const allKycStates = useAppSelector(kycStates);
  const dispatch = useAppDispatch();
  const [ndidKycRequest, setNdidKycRequest] = useState<any | null>(null);
  const [ndidResultRes, setNdidResultRes] = useState<any | null>(null);
  const [identityNum, setIdentityNum] = useState<string>('');
  const [kycInfo, setKycInfo] = useState<KycInformation | null>(null);
  const navigate = useNavigate();
  const t = useAppTranslation();

  useEffect(() => {
    getKycStatus();
    getNdidKycResult();
  }, []);

  const getKycStatus = useCallback(async () => {
    const { body } = await kycApi.getKycInfo();
    if (body) {
      dispatch(kycActions.setKycStatus(body.kycStatus));
      dispatch(kycActions.setReqTxnId(body.ndidReqTxnId));
    }
  }, []);

  const getNdidKycResult = useCallback(async () => {
    const res = await kycApi.getNdidKycResult();
    if (res) setNdidResultRes(res);
  }, []);

  const getKycInfo = useCallback(async () => {
    const { body } = await kycApi.getKycInfo();
    if (body) setKycInfo(body);
  }, []);

  useEffect(() => {
    if (localStep === 7) getKycInfo();
  }, [localStep]);

  useEffect(() => {
    if (ndidResultRes?.body?.data)
      dispatch(kycActions.setVerificationTime(ndidResultRes.body.data.remainSeconds));
  }, [ndidResultRes?.body?.data]);

  useEffect(() => {
    if (allKycStates.kycStatus)
      switch (allKycStates.kycStatus) {
        case 'WAITING_FOR_NDID':
          setLocalStep(4);
          break;
        case 'NDID_VERIFICATION_SUCCESS':
          setLocalStep(5);
          break;
        case 'SUBMITTED':
          setLocalStep(7);
          break;
      }
  }, [allKycStates.kycStatus]);

  return (
    <div className="verify-kyc">
      {localStep === 0 && (
        <ThaiUploadImage
          setIdentityNum={setIdentityNum}
          setLocalStep={setLocalStep}
          localStep={localStep}
        />
      )}
      {localStep === 1 && (
        <ThaiManualIdentity
          setLocalStep={setLocalStep}
          localStep={localStep}
          setIdentityNum={setIdentityNum}
          identityNum={identityNum}
        />
      )}
      {localStep === 2 && <NdidSelect setLocalStep={setLocalStep} localStep={localStep} />}
      {localStep === 3 && (
        <ThaiKycSelectProvider
          identityNum={identityNum}
          localStep={localStep}
          setLocalStep={setLocalStep}
        />
      )}
      {localStep === 4 && <ThaiKycCountdown localStep={localStep} setLocalStep={setLocalStep} />}
      {localStep === 5 && (
        <ThaiKycForm1
          ndidKycRequest={ndidKycRequest}
          setNdidKycRequest={setNdidKycRequest}
          localStep={localStep}
          setLocalStep={setLocalStep}
        />
      )}
      {localStep === 6 && (
        <ThaiKycForm2
          ndidKycRequest={ndidKycRequest}
          localStep={localStep}
          setLocalStep={setLocalStep}
        />
      )}
      {localStep === 7 && kycInfo && <Questioneire lastestKyc={kycInfo} />}
      {allKycStates.step + 1 === 8 &&
        showInfoModal({ message: t('verify-kyc.popUpSuccess'), onOk: navigate('/') })}
    </div>
  );
};

export default ThaiKyc;
