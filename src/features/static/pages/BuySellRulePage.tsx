import staticContentApi from 'api/staticApi';
import { useI18n } from 'app/hooks';
import LandingFooter from 'features/landing/components/LandingFooter';
import { StaticContent } from 'models';
import React, { useCallback, useEffect, useState } from 'react';

interface BuySellRulePageProps {}

const BuySellRulePage: React.FunctionComponent<BuySellRulePageProps> = (props) => {
  const i18n = useI18n();
  const [ruleBuySell, setRuleBuySell] = useState<StaticContent>();

  useEffect(() => {
    getRulesBuySell();
  }, [i18n.language]);

  const getRulesBuySell = useCallback(async () => {
    const { body } = await staticContentApi.ruleBuySell(i18n.language);
    if (body) {
      setRuleBuySell(body);
    } else {
      setRuleBuySell({});
    }
  }, []);
  return (
    <>
      <div className="static-content">
        <div className="static-content__title">{ruleBuySell?.title}</div>
      </div>
      <div
        className="static-content__content"
        dangerouslySetInnerHTML={{ __html: ruleBuySell?.content || '' }}
      />
      <LandingFooter />
    </>
  );
};

export default BuySellRulePage;
