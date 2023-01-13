import staticContentApi from 'api/staticApi';
import { useI18n } from 'app/hooks';
import LandingFooter from 'features/landing/components/LandingFooter';
import { StaticContent } from 'models';
import React, { useCallback, useEffect, useState } from 'react';

interface TermsConditionsPageProps {}

const TermsConditionsPage: React.FunctionComponent<TermsConditionsPageProps> = (props) => {
  const i18n = useI18n();
  const [termAndCondition, setTermAndCondition] = useState<StaticContent>();

  useEffect(() => {
    getTermAndCondition();
  }, [i18n.language]);

  const getTermAndCondition = useCallback(async () => {
    const { body } = await staticContentApi.termAndCondition(i18n.language);
    if (body) {
      setTermAndCondition(body);
    } else {
      setTermAndCondition({});
    }
  }, []);
  return (
    <>
      <div className="static-content">
        <div className="static-content__title">{termAndCondition?.title}</div>
      </div>
      <div
        className="static-content__content"
        dangerouslySetInnerHTML={{ __html: termAndCondition?.content || '' }}
      />
      <LandingFooter />
    </>
  );
};

export default TermsConditionsPage;
