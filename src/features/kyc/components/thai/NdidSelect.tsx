import { Button } from 'antd';
import kycApi from 'api/kycApi';
import { useAppTranslation, useI18n } from 'app/hooks';
import thaiKycNdidLogo from 'assets/images/thai_kyc_ndid.png';
import { IMG_ALT } from 'consts';
import { useUserDetail } from 'hooks';
import { ContentTC } from 'models/kyc/contentTC';
import React, { useCallback, useEffect, useState } from 'react';

interface NdidSelectProps {
  setLocalStep: (value: number) => void;
  localStep: number;
}

const NdidSelect: React.FunctionComponent<NdidSelectProps> = (props) => {
  const [subStep, setSubStep] = useState(0);
  const { currentUser } = useUserDetail();
  const i18n = useI18n();
  const [contentTC, setContentTC] = useState<ContentTC | null>(null);
  const t = useAppTranslation();

  useEffect(() => {
    getContentTC(currentUser?.language || i18n.language);
  }, []);

  const handleClick = () => {
    setSubStep(subStep + 1);
  };

  const handleChange = () => {
    props.setLocalStep(props.localStep + 1);
  };

  const handleCancel = () => {
    setSubStep(subStep - 1);
  };

  const getContentTC = useCallback(async (lang) => {
    const { body } = await kycApi.getNdidContentTC(lang);
    if (body) setContentTC(body);
  }, []);

  return (
    <>
      {subStep === 0 && (
        <div className="thai-kyc-container">
          <span className="verify-kyc__title">{t('verify-kyc.mainTitle')}</span>
          <span className="verify-kyc__description">{t('verify-kyc.veridyKycWay')}</span>
          <div className="thai-kyc-select___item">
            <span className="thai-kyc-select___item-title">{t('verify-kyc.useNdid')}</span>
            <img className="thai-kyc-select___item-img" src={thaiKycNdidLogo} alt={IMG_ALT} />
          </div>
          <Button type="primary" onClick={handleClick}>
            {t('verify-kyc.next')}
          </Button>
        </div>
      )}
      {subStep === 1 && (
        <div className="thai-kyc-content">
          <div
            className="static-content__content"
            dangerouslySetInnerHTML={{ __html: contentTC?.content || '' }}
          />
          <div className="thai-kyc-content__button-container">
            <Button className="thai-kyc-content__button" type="ghost" onClick={handleCancel}>
              {t('verify-kyc.decline')}
            </Button>
            <Button className="thai-kyc-content__button" type="primary" onClick={handleChange}>
              {t('verify-kyc.accept')}
            </Button>
          </div>
        </div>
      )}
    </>
  );
};

export default NdidSelect;
