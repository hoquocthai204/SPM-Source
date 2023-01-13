import { Button } from 'antd';
import kycApi from 'api/kycApi';
import { useAppSelector, useAppTranslation } from 'app/hooks';
import { showInfoModal } from 'components/Modals';
import { useUserDetail } from 'hooks';
import { KycInformation } from 'models';
import React, { useCallback, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AttackLicense from '../components/nonThai/AttackLicense';
import IdentityVerify from '../components/nonThai/IdentityVerify';
import Occupation from '../components/nonThai/Occupation';
import PersonalInformation from '../components/nonThai/PersonalInformation';
import Residential from '../components/nonThai/Residential';
import Questioneire from '../components/questionnaire/Questioneire';
import { selectStep } from '../kycSlice';

interface KycPageProps {}

const labelPersonalInformation = [
  'Passport',
  'Title Name',
  'First Name',
  'Last Name',
  'Nationality',
  'Gender',
  'Date of birth',
];

const KycPage: React.FunctionComponent<KycPageProps> = (props) => {
  const t = useAppTranslation();
  const navigate = useNavigate();

  const stepKyc = useAppSelector(selectStep);

  const { currentUser } = useUserDetail();

  const [kycResult, setKycResult] = useState<KycInformation>();
  const [lastestKyc, setLastestKyc] = useState<KycInformation>({});
  const [listPersonalInformation, setListPersonalInformation] = useState<KycInformation>();
  const [arrayPersonal, setArrayPersonal] = useState<any[]>();

  const handleOK = () => {
    navigate('/');
  };

  const handleClickNonThai = () => {
    showInfoModal({ message: t('verify-kyc.downloadApp'), onOk: handleOK });
  };

  const handleClickThai = () => {
    navigate('thai');
  };

  useEffect(() => {
    if (currentUser?.kycStatus === 'ACCEPTED') {
      showInfoModal({
        message: t('verify-kyc.redirectLanding'),
        onOk: handleOK,
      });
    }
  }, []);

  useEffect(() => {
    getStep();
  }, [stepKyc]);

  const getStep = useCallback(async () => {
    const { body } = await kycApi.getLastestKycInfo({});
    if (body) {
      setLastestKyc(body);
    }
  }, []);

  useEffect(() => {
    if (kycResult && Object.keys(kycResult).length > 0) {
      setListPersonalInformation({
        passportNumber: kycResult.passportNumber,
        titleId: kycResult.titleId,
        firstName: kycResult.firstName,
        lastName: kycResult.lastName,
        nationalityId: kycResult.nationalityId,
        gender: kycResult.gender,
        dob: kycResult.dob,
      });
    }
  }, [kycResult]);

  useEffect(() => {
    if (listPersonalInformation && Object.keys(listPersonalInformation).length > 0) {
      const listValue = Object.values(listPersonalInformation);
      const newArray = labelPersonalInformation.map((item, index) => {
        return {
          [item]: listValue[index],
        };
      });
      setArrayPersonal(newArray);
    }
  }, [listPersonalInformation]);

  useEffect(() => {
    if (lastestKyc.kycType === 'EKYC' && lastestKyc.kycStatus !== 'EKYC_VERIFICATION_FAIL') {
      getKycResult();
    }
    if (
      lastestKyc.kycStatus === 'WAITING_FOR_NDID' ||
      lastestKyc.kycStatus === 'NDID_VERIFICATION_SUCCESS' ||
      (lastestKyc.kycStatus === 'SUBMITTED' && lastestKyc.kycType === 'NDID')
    ) {
      navigate('thai');
    }
  }, [lastestKyc]);

  const getKycResult = useCallback(async () => {
    const { body } = await kycApi.getKycResult({});
    if (body) {
      setKycResult(body);
    } else {
      setKycResult({});
    }
  }, []);

  return (
    <div className="verify-kyc">
      {lastestKyc.kycStatus !== 'SUBMITTED' && lastestKyc.kycStatus !== 'WAITING_FOR_APPROVAL' && (
        <div className="verify-kyc__title">{t('verify-kyc.mainTitle')}</div>
      )}
      <div className="verify-kyc__description">
        {(!lastestKyc.kycStatus ||
          [
            'EKYC_VERIFICATION_TIMEOUT',
            'EKYC_VERIFICATION_CANCELLED',
            'REJECTED',
            'RESETKYC',
            'NDID_VERIFICATION_FAIL',
            'NDID_VERIFICATION_CANCEL',
            'NDID_VERIFICATION_REJECTED',
          ].includes(lastestKyc.kycStatus)) && <span>{t('verify-kyc.chooseCitizenship')}</span>}

        {lastestKyc.kycStatus &&
          lastestKyc.kycStatus !== 'SUBMITTED' &&
          lastestKyc.kycType === 'MANUAL' && <p>{t('verify-kyc.fillInfoTitle')}</p>}
      </div>

      {(!lastestKyc.kycStatus ||
        [
          'EKYC_VERIFICATION_TIMEOUT',
          'EKYC_VERIFICATION_CANCELLED',
          'REJECTED',
          'RESETKYC',
          'NDID_VERIFICATION_FAIL',
          'NDID_VERIFICATION_CANCEL',
          'NDID_VERIFICATION_REJECTED',
        ].includes(lastestKyc.kycStatus)) && (
        <div className="verify-kyc__options">
          <Button type="primary" onClick={handleClickThai}>
            {t('verify-kyc.thaiCitizen')}
          </Button>
          <Button type="ghost" onClick={handleClickNonThai}>
            {t('verify-kyc.nonThaiCitizen')}
          </Button>
          <Button className="verify-later">{t('verify-kyc.verifyKYCLater')}</Button>
        </div>
      )}

      {lastestKyc.kycType === 'EKYC' && (
        <>
          {!lastestKyc.step && lastestKyc.kycStatus === 'EKYC_VERIFICATION_SUCCESS' && (
            <PersonalInformation arrayPersonal={arrayPersonal ?? []} kycResult={kycResult || {}} />
          )}
          {lastestKyc.step === 3 && <Residential />}
          {lastestKyc.step === 4 && <Occupation />}
          {lastestKyc.step === 5 &&
            lastestKyc.kycStatus !== 'SUBMITTED' &&
            !lastestKyc.riskMessage && <AttackLicense lastestKyc={lastestKyc} />}
          {lastestKyc.kycStatus === 'SUBMITTED' && <Questioneire lastestKyc={lastestKyc} />}
          {lastestKyc.kycStatus === 'WAITING_FOR_APPROVAL' &&
            showInfoModal({ message: t('verify-kyc.popUpSuccess'), onOk: navigate('/') })}
        </>
      )}

      {(lastestKyc.kycStatus === 'EKYC_VERIFICATION_FAIL' ||
        (lastestKyc.kycType === 'MANUAL' && lastestKyc.step === 0)) && <IdentityVerify />}

      {lastestKyc.kycType === 'MANUAL' && (
        <>
          {lastestKyc.step === 2 && (
            <PersonalInformation
              arrayPersonal={arrayPersonal ?? []}
              kycResult={kycResult || {}}
              type="manual"
            />
          )}
          {lastestKyc.step === 3 && <Residential type="manual" />}
          {lastestKyc.step === 4 && <Occupation type="manual" />}
          {lastestKyc.step === 5 &&
            lastestKyc.kycStatus !== 'SUBMITTED' &&
            !lastestKyc.riskMessage && <AttackLicense lastestKyc={lastestKyc} type="manual" />}
          {lastestKyc.kycStatus === 'SUBMITTED' && <Questioneire lastestKyc={lastestKyc} />}
          {lastestKyc.kycStatus === 'WAITING_FOR_APPROVAL' &&
            showInfoModal({ message: t('verify-kyc.popUpSuccess'), onOk: navigate('/') })}
        </>
      )}
    </div>
  );
};

export default KycPage;
