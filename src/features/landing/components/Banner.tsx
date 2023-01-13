import { useAppTranslation } from 'app/hooks';
import bannerLogo from 'assets/images/landing_banner.png';
import React from 'react';
import { Button } from 'antd';
import { useUserDetail } from 'hooks';
import { IMG_ALT } from 'consts';
import { useNavigate } from 'react-router-dom';

interface BannerProps {}

const Banner: React.FunctionComponent<BannerProps> = (props) => {
  const t = useAppTranslation();
  const { isUserLoggedIn, currentUser } = useUserDetail();
  const navigate = useNavigate();

  const handleNav = () => {
    if (!isUserLoggedIn) {
      navigate('login');
    }
    if (isUserLoggedIn && currentUser?.kycStatus === 'ACCEPTED') {
      navigate('my/trade?orderSide=buy&coinBase=BTC&coinQuote=THB');
    }
    if (isUserLoggedIn && currentUser?.kycStatus !== 'ACCEPTED') {
      navigate('my/verify-kyc');
    }
  };
  return (
    <div className="banner">
      <div className="banner-content">
        <span className="banner-content_title">{t('landing.bannerTitle')}</span>
        <span className="banner-content_subtitle">{t('landing.bannerSubtitle')}</span>
        <Button type="default" size="large" className="banner__start-btn" onClick={handleNav}>
          {!isUserLoggedIn && t('landing.getStarted')}
          {isUserLoggedIn && currentUser?.kycStatus !== 'ACCEPTED' && t('common.verifyKYC')}
          {isUserLoggedIn && currentUser?.kycStatus === 'ACCEPTED' && t('common.trade')}
        </Button>
      </div>
      <img src={bannerLogo} alt={IMG_ALT} />
    </div>
  );
};

export default Banner;
