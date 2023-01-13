import blogApi from 'api/blogApi';
import currencyApi from 'api/currencyApi';
import ohlcApi from 'api/ohlcApi';
import LandingFooter from 'features/landing/components/LandingFooter';
import { BlogContent, Currency, MiniChartImage } from 'models';
import React, { useCallback, useEffect, useState } from 'react';
import Banner from '../components/Banner';
import Blogs from '../components/Blogs';
import MarketComparison from '../components/MarketComparison';
import News from '../components/News';
import StepsIntroduction from '../components/StepsIntroduction';
import TopMovers from '../components/TopMovers';

interface LandingPageProps {}

const LandingPage: React.FunctionComponent<LandingPageProps> = (props) => {
  const [currencies, setCurrencies] = useState<Map<string, Currency>>(new Map());
  const [chartMini24h, setChartMini24h] = useState<Map<string, MiniChartImage>>(new Map());
  const [blogs, setBlogs] = useState<BlogContent[]>([]);

  useEffect(() => {
    getCurrencies();
    getMiniChart24h();
    getBlogs();
  }, []);

  const getCurrencies = useCallback(async () => {
    const { body } = await currencyApi.getAllCurrency({ size: 99999999 });
    if (body) {
      const mapCurrencies = new Map();
      body.forEach((currency) => mapCurrencies.set(currency.shortName, currency));
      setCurrencies(mapCurrencies);
    }
  }, []);

  const getMiniChart24h = useCallback(async () => {
    const { body } = await ohlcApi.getAllChartMini();
    if (body) {
      const mapChartMini24h = new Map();
      body.forEach((chart) => mapChartMini24h.set(chart.base, chart));
      setChartMini24h(mapChartMini24h);
    }
  }, []);

  const getBlogs = useCallback(async () => {
    const { body } = await blogApi.getAllBlog('en');
    if (body) {
      setBlogs(
        body
          .sort((a, b) => new Date(b.publishTime).getTime() - new Date(a.publishTime).getTime())
          .slice(0, 7)
      );
    }
  }, []);

  return (
    <>
      <div className="landing">
        <Banner />
        <TopMovers currencies={currencies} chartMini24h={chartMini24h} />
        <MarketComparison currencies={currencies} />
        <News news={blogs ?? []} />
        <StepsIntroduction />
        <Blogs blogs={blogs ?? []} />
      </div>
      <LandingFooter />
    </>
  );
};

export default LandingPage;
