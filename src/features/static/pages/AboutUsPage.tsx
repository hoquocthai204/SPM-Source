import staticContentApi from 'api/staticApi';
import { useI18n } from 'app/hooks';
import LandingFooter from 'features/landing/components/LandingFooter';
import { StaticContent } from 'models';
import React, { useCallback, useEffect, useState } from 'react';

interface AboutUsPageProps {}

const AboutUsPage: React.FunctionComponent<AboutUsPageProps> = (props) => {
  const i18n = useI18n();
  const [aboutUs, setAboutUs] = useState<StaticContent>({});

  useEffect(() => {
    getAboutUsContent();
  }, [i18n.language]);

  const getAboutUsContent = useCallback(async () => {
    const { body } = await staticContentApi.aboutUs(i18n.language);
    if (body) {
      setAboutUs(body);
    } else {
      setAboutUs({});
    }
  }, []);

  return (
    <>
      <div className="static-content">
        <div className="static-content__title">{aboutUs.title}</div>
      </div>
      <div
        className="static-content__content"
        dangerouslySetInnerHTML={{ __html: aboutUs.content || '' }}
      />
      <LandingFooter />
    </>
  );
};

export default AboutUsPage;
