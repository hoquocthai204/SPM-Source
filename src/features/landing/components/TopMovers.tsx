import { Divider } from 'antd';
import { useAppSelector, useAppTranslation } from 'app/hooks';
import { DecreaseIcon, IncreaseIcon } from 'components/Icons';
import { IMG_ALT } from 'consts';
import { selectMarketPrices } from 'features/socket/socketSlice';
import { useUserDetail } from 'hooks';
import { Currency, MiniChartImage } from 'models';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { isEmptyObject } from 'utils';
import CoinInfoCol from './CoinInfoCol';
import PercentNumber from './PercentNumber';

interface TopMoversProps {
  currencies: Map<string, Currency>;
  chartMini24h: Map<string, MiniChartImage>;
}

interface TopMoverItem {
  coin: string;
  name: string;
  image: string;
  price: string;
  change24hPercent: number;
  miniChartImage: string;
}

const TopMovers: React.FunctionComponent<TopMoversProps> = ({ currencies, chartMini24h }) => {
  const t = useAppTranslation();
  const { isUserLoggedIn } = useUserDetail();

  const [topMovers, setTopMovers] = useState<TopMoverItem[]>([]);
  const marketPrices = useAppSelector(selectMarketPrices);

  useEffect(() => {
    if (isEmptyObject(marketPrices) || isEmptyObject(currencies)) return;
    setTopMovers(
      Object.keys(marketPrices)
        .map((key) => marketPrices[key])
        .filter((o) => currencies.get(o[0]))
        .filter(
          (o) =>
            currencies.get(o[0]) &&
            currencies.get(o[0])?.enabled &&
            currencies.get(o[0])?.type === 'CRYPTO'
        )
        .sort((a, b) => Math.abs(Number(b[4])) - Math.abs(Number(a[4])))
        .slice(0, 4)
        .map((o) => ({
          coin: o[0],
          name: currencies.get(o[0])?.fullName || o[0],
          image: currencies.get(o[0])?.image || '',
          price: Number(o[2]).toFixed(2),
          change24hPercent: Number(o[4]),
          miniChartImage: chartMini24h.get(o[0])?.imageUrl ?? '',
        }))
    );
  }, [marketPrices, currencies, chartMini24h]);

  return (
    <div className="top-movers">
      <span className="top-movers__title">{t('landing.topMovers')}</span>
      <div className="top-movers__list-items">
        {topMovers &&
          topMovers.map((topMover, index) => (
            <div className="top-movers__item" key={index}>
              <div className="top-movers__item-header">
                <CoinInfoCol image={topMover.image} title={topMover.coin} detail={topMover.name} />
                {topMover.change24hPercent > 0 ? <IncreaseIcon /> : <DecreaseIcon />}
              </div>
              <Divider />
              <div className="top-movers__item-content">
                <div className="top-movers__item-valuation">
                  <span>{topMover.price}</span>
                  <PercentNumber data={topMover.change24hPercent} />
                </div>
                <img
                  src={topMover.miniChartImage}
                  style={{
                    filter: `${
                      topMover.change24hPercent >= 0
                        ? 'invert(50%) sepia(50%) saturate(445%) hue-rotate(94deg) brightness(96%) contrast(90%)'
                        : 'invert(28%) sepia(23%) saturate(5671%) hue-rotate(342deg) brightness(102%) contrast(86%)'
                    } `,
                  }}
                  alt={IMG_ALT}
                />
              </div>
            </div>
          ))}
      </div>
      {isUserLoggedIn && (
        <Link to={'my/market?tab=topMover'}>
          <span className="more-btn">{t('landing.seeAllCoins')}</span>
        </Link>
      )}
      {!isUserLoggedIn && (
        <Link to={'market?tab=topMover'}>
          <span className="more-btn">{t('landing.seeAllCoins')}</span>
        </Link>
      )}
    </div>
  );
};

export default TopMovers;
