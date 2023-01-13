import staticContentApi from 'api/staticApi';
import { useI18n } from 'app/hooks';
import LandingFooter from 'features/landing/components/LandingFooter';
import { StaticContent } from 'models';
import React, { useCallback, useEffect, useState } from 'react';

interface AMLCTPFPolicyPageProps {}

const AMLCTPFPolicyPage: React.FunctionComponent<AMLCTPFPolicyPageProps> = (props) => {
  const i18n = useI18n();
  const [policy, setPolicy] = useState<StaticContent>();

  useEffect(() => {
    getAMLPolicy();
  }, [i18n.language]);

  const getAMLPolicy = useCallback(async () => {
    const { body } = await staticContentApi.ctpfPolicy(i18n.language);
    if (body) {
      setPolicy(body);
    } else {
      setPolicy({});
    }
  }, []);

  return (
    <>
      <div className="static-content">
        <div className="static-content__title">{policy?.title}</div>
      </div>
      <div
        className="static-content__content"
        dangerouslySetInnerHTML={{ __html: policy?.content || '' }}
      />
      <LandingFooter />
    </>
  );
};

export default AMLCTPFPolicyPage;
