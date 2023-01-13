import staticContentApi from 'api/staticApi';
import { useI18n } from 'app/hooks';
import LandingFooter from 'features/landing/components/LandingFooter';
import { StaticContent } from 'models';
import React, { useCallback, useEffect, useState } from 'react';

interface FatCaProps {}

const FatCaPage: React.FunctionComponent<FatCaProps> = (props) => {
  const [fatca, setFatca] = useState<StaticContent>();
  const i18n = useI18n();

  useEffect(() => {
    getFatca();
  }, [i18n.language]);

  const getFatca = useCallback(async () => {
    const { body } = await staticContentApi.fatcaPage(i18n.language);
    if (body) {
      setFatca(body);
    } else {
      setFatca({});
    }
  }, []);

  return (
    <>
      <div className="static-content">
        <div className="static-content__title">{fatca?.title}</div>
      </div>
      <div
        className="static-content__content"
        dangerouslySetInnerHTML={{ __html: fatca?.content || '' }}
      />
      <LandingFooter />
    </>
  );
};

export default FatCaPage;
