import staticContentApi from 'api/staticApi';
import { useI18n } from 'app/hooks';
import LandingFooter from 'features/landing/components/LandingFooter';
import { StaticContent } from 'models';
import React, { useCallback, useEffect, useState } from 'react';

interface PrivacyPolicyPageProps {}

const PrivacyPolicyPage: React.FunctionComponent<PrivacyPolicyPageProps> = (props) => {
  const i18n = useI18n();
  const [privacyPolicy, setPrivacyPolicy] = useState<StaticContent>();

  useEffect(() => {
    getPrivacyPolicy();
  }, [i18n.language]);

  const getPrivacyPolicy = useCallback(async () => {
    const { body } = await staticContentApi.privacyPolicy(i18n.language);
    if (body) {
      setPrivacyPolicy(body);
    } else {
      setPrivacyPolicy({});
    }
  }, []);
  return (
    <>
      <div className="static-content">
        <div className="static-content__title">{privacyPolicy?.title}</div>
      </div>
      <div
        className="static-content__content"
        dangerouslySetInnerHTML={{ __html: privacyPolicy?.content || '' }}
      />
      <LandingFooter />
    </>
  );
};

export default PrivacyPolicyPage;
