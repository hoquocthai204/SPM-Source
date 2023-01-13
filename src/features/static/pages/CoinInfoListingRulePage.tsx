import staticContentApi from 'api/staticApi';
import { useI18n } from 'app/hooks';
import LandingFooter from 'features/landing/components/LandingFooter';
import { StaticContent } from 'models';
import React, { useCallback, useEffect, useState } from 'react';

interface CoinInfoListingRulePageProps {}

const CoinInfoListingRulePage: React.FunctionComponent<CoinInfoListingRulePageProps> = (props) => {
  const i18n = useI18n();
  const [coinListRule, setCoinListRule] = useState<StaticContent>();

  useEffect(() => {
    getCoinListRule();
  }, [i18n.language]);

  const getCoinListRule = useCallback(async () => {
    const { body } = await staticContentApi.coinListingRules(i18n.language);
    if (body) {
      setCoinListRule(body);
    } else {
      setCoinListRule({});
    }
  }, []);
  return (
    <>
      <div className="static-content">
        <div className="static-content__title">{coinListRule?.title}</div>
      </div>
      <div
        className="static-content__content"
        dangerouslySetInnerHTML={{ __html: coinListRule?.content || '' }}
      />
      <LandingFooter />
    </>
  );
};

export default CoinInfoListingRulePage;
