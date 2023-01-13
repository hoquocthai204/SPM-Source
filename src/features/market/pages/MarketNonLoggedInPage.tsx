import currencyApi from 'api/currencyApi';
import ohlcApi from 'api/ohlcApi';
import { useAppTranslation, useTitle } from 'app/hooks';
import { Breadcrumb } from 'components/Commons';
import { Currency, MiniChartImage } from 'models';
import React, { useCallback, useEffect, useState } from 'react';
import MarketNonLoggedIn from '../components/MarketNonLoggedIn';

interface IMarketNonLoggedInPageProps {}

const MarketNonLoggedInPage: React.FunctionComponent<IMarketNonLoggedInPageProps> = (props) => {
  const t = useAppTranslation();
  useTitle(t('title.market'));

  const [currencies, setCurrencies] = useState<Currency[]>();
  const [chartMini24hs, setChartMini24hs] = useState<MiniChartImage[]>();

  useEffect(() => {
    getCurrencies();
    getMiniChart24h();
  }, []);

  const getCurrencies = useCallback(async () => {
    const { body } = await currencyApi.getAllCurrency({ size: 99999999 });
    if (body) {
      setCurrencies(body);
    }
  }, []);

  const getMiniChart24h = useCallback(async () => {
    const { body } = await ohlcApi.getAllChartMini();
    if (body) setChartMini24hs(body);
  }, []);
  return (
    <>
      <div className="market-page" style={{ padding: '0' }}>
        <Breadcrumb title={t('market.title')} />
        <MarketNonLoggedIn currencies={currencies} chartMini24hs={chartMini24hs} />
      </div>
    </>
  );
};

export default MarketNonLoggedInPage;
