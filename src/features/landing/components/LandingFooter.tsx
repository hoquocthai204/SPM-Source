import { Footer } from 'antd/lib/layout/layout';
import { useAppTranslation } from 'app/hooks';
// import maxbitLogo from 'assets/images/maxbit_logo.png';
import maxbitLogo from 'assets/images/landing_logo.png';
import * as React from 'react';
import { Link } from 'react-router-dom';

interface LandingFooterProps {}

const LandingFooter: React.FunctionComponent<LandingFooterProps> = (props) => {
  const t = useAppTranslation();
  return (
    <Footer>
      <div className="landing-footer">
        <div className="landing-footer__nav-groups">
          <div className="landing-footer__nav-group">
            <Link to="/about">{t('footer.aboutUs')}</Link>
            <Link to="/terms-conditions">{t('footer.termsConditions')}</Link>
            <Link to="/coin_info-listing_rules">{t('footer.coinInfos-listingRules')}</Link>
          </div>

          <div className="landing-footer__nav-group">
            <Link to="/buy-sell-rules">{t('footer.buy/sellRules')}</Link>
            <Link to="/privacy-policy">{t('footer.privacyPolicy')}</Link>
            <Link to="/aml-ctpf-policy">{t('footer.aml/ctpfPolicy')}</Link>
          </div>

          <div className="landing-footer__nav-group">
            <Link to="/news">{t('footer.news')}</Link>
            <Link to="/chat">{t('footer.chat')}</Link>
            <Link to="/help">{t('footer.help')}</Link>
          </div>

          <div className="landing-footer__nav-main-group">
            <img src={maxbitLogo} alt="" />
            <p className="landing-footer__main-content">{t('footer.content1')}</p>
          </div>
        </div>

        <div className="landing-footer__final-content">
          <p>{t('footer.content2')}</p>
        </div>
      </div>
    </Footer>
  );
};

export default LandingFooter;
