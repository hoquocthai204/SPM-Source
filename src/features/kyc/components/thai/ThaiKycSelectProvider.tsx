import kycApi from 'api/kycApi';
import { useAppDispatch, useAppTranslation } from 'app/hooks';
import { kycActions } from 'features/kyc/kycSlice';
import { IDPRes } from 'models/kyc/idp';
import React, { useCallback, useEffect, useState } from 'react';

interface ThaiKycSelectProviderProps {
  localStep: number;
  setLocalStep: (value: number) => void;
  identityNum: string;
}

const ThaiKycSelectProvider: React.FunctionComponent<ThaiKycSelectProviderProps> = (props) => {
  const { localStep, setLocalStep, identityNum } = props;
  const [idps, setIdps] = useState<IDPRes | null>(null);
  const dispatch = useAppDispatch();
  const t = useAppTranslation();

  const handleSelect = (id: string, name: string) => {
    initNDID(id, name);
    setLocalStep(localStep + 1);
  };

  const initNDID = useCallback(async (idpId, marketingNameEn) => {
    const res = await kycApi.initNdid({
      identityNumber: identityNum,
      idpId: idpId,
      marketingNameEn: marketingNameEn,
    });

    if (res.body) {
      dispatch(kycActions.setReqTxnId(res.body.reqTxnId));
      dispatch(kycActions.setVerificationTime(res.body.verificationTime));
    }
  }, []);

  useEffect(() => {
    getIDPs(identityNum || localStorage.getItem('identityNumber'));
  }, []);

  const getIDPs = useCallback(async (value) => {
    const { body } = await kycApi.getIdps(value);
    if (body) setIdps(body);
  }, []);

  return (
    <>
      {idps && (
        <div className="thai-kyc-container">
          <span className="verify-kyc__title">{t('verify-kyc.mainTitle')}</span>
          <span className="verify-kyc__description">{t('verify-kyc.selectProviderTitle')}</span>
          <div className="thai-kyc__list-box">
            <span className="thai-kyc__list-title">{t('verify-kyc.selectProvider')}</span>
            <div className="thai-kyc__items">
              {idps?.idpOnBoards.map((e) => (
                <button
                  key={e.idpId}
                  onClick={() => handleSelect(e.idpId, e.idpDetails.marketingNameEn)}
                >
                  <img
                    style={{ width: '30px', height: '30px' }}
                    src={e.idpDetails.imageUri}
                    alt={''}
                  />
                  <span>{e.idpDetails.marketingNameEn}</span>
                </button>
              ))}
            </div>
          </div>
          <div className="thai-kyc__list-box">
            <span className="thai-kyc__list-title">{t('verify-kyc.selectOtherProvider')}</span>
            <div className="thai-kyc__items-other">
              {idps?.idpOnFlies.map((e) => (
                <button
                  key={e.idpId}
                  onClick={() => handleSelect(e.idpId, e.idpDetails.marketingNameEn)}
                >
                  <div className="thai-kyc__img-box">
                    <img
                      style={{ width: '30px', height: '30px' }}
                      src={e.idpDetails.imageUri}
                      alt={''}
                    />
                  </div>
                  <span>{e.idpDetails.marketingNameEn}</span>
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ThaiKycSelectProvider;
