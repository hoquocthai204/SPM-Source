import { Button } from 'antd';
import { useAppTranslation } from 'app/hooks';
import step1 from 'assets/images/step_intro_1.png';
import step2 from 'assets/images/step_intro_2.png';
import step3 from 'assets/images/step_intro_3.png';
import step4 from 'assets/images/step_intro_4.png';
import { useUserDetail } from 'hooks';
import React from 'react';
import { useNavigate } from 'react-router-dom';

interface StepsIntroductionProps {}

const StepsIntroduction: React.FunctionComponent<StepsIntroductionProps> = (props) => {
  const t = useAppTranslation();
  const { isUserLoggedIn, currentUser } = useUserDetail();
  const navigate = useNavigate();

  const handleNav = () => {
    if (!isUserLoggedIn) navigate('login');
    if (isUserLoggedIn && currentUser?.kycStatus !== 'ACCEPTED') {
      navigate('my/verify-kyc');
    }
    if (isUserLoggedIn && currentUser?.kycStatus === 'ACCEPTED') {
      navigate('my/add-user-bank');
    }
  };
  return (
    <div className="steps-intro">
      <div className="steps-intro__left-side">
        <span className="steps-intro__header">{t('landing.stepHeader')}</span>
        <span className="steps-intro__detail">{t('landing.stepsDetail')}</span>
        <Button type="default" size="large" className="steps-intro__start-btn" onClick={handleNav}>
          {!isUserLoggedIn && t('landing.getStarted')}
          {isUserLoggedIn && currentUser?.kycStatus !== 'ACCEPTED' && t('common.verifyKYC')}
          {isUserLoggedIn && currentUser?.kycStatus === 'ACCEPTED' && t('common.addBankAccount')}
        </Button>
      </div>
      <div className="steps-intro__right-side">
        <div className="steps-intro__step">
          <img src={step1} alt="" style={{ width: '80px', height: '80px' }} />
          <div className="steps-intro__step-content">
            <span className="steps-intro__step-title">{t('landing.stepTitle')}</span>
            <span className="steps-intro__step-subtitle">{t('landing.stepSubtitle')}</span>
          </div>
        </div>

        <div className="steps-intro__step">
          <img src={step2} alt="" style={{ width: '80px', height: '80px' }} />
          <div className="steps-intro__step-content">
            <span className="steps-intro__step-title">{t('landing.stepTitle2')}</span>
            <span className="steps-intro__step-subtitle">{t('landing.stepSubtitle2')}</span>
          </div>
        </div>

        <div className="steps-intro__step">
          <img src={step3} alt="" style={{ width: '80px', height: '80px' }} />
          <div className="steps-intro__step-content">
            <span className="steps-intro__step-title">{t('landing.stepTitle3')}</span>
            <span className="steps-intro__step-subtitle">{t('landing.stepSubtitle3')}</span>
          </div>
        </div>

        <div className="steps-intro__step">
          <img src={step4} alt="" style={{ width: '80px', height: '80px' }} />
          <div className="steps-intro__step-content">
            <span className="steps-intro__step-title">{t('landing.stepTitle4')}</span>
            <span className="steps-intro__step-subtitle">{t('landing.stepSubtitle4')}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StepsIntroduction;
