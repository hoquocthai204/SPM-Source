import { Button, Table } from 'antd';
import { useAppSelector, useAppTranslation } from 'app/hooks';
import maxbitLogo from 'assets/images/maxbit_logo_2.png';
import { IMG_ALT } from 'consts';
import { selectBestPrices } from 'features/socket/socketSlice';
import { useUserDetail } from 'hooks';
import { BestPrice, Currency } from 'models';
import React, { useEffect, useMemo, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import CoinInfoCol from './CoinInfoCol';

interface MarketComparisonProps {
  currencies: Map<string, Currency>;
}

interface gapsType {
  value: number;
  type: string;
}

const MarketComparison: React.FunctionComponent<MarketComparisonProps> = ({ currencies }) => {
  const t = useAppTranslation();
  const navigate = useNavigate();
  const { isUserLoggedIn } = useUserDetail();

  const bestPrices = useAppSelector(selectBestPrices);
  const [sortBestPrices, setSortBestPrices] = useState<BestPrice[] | null>(null);

  const sortedCurrencies = useMemo(
    () => Array.from(currencies.values()).filter((e) => e.enabled && !e.comingSoon),
    [currencies]
  );

  useEffect(() => {
    if (!Array.isArray(bestPrices)) return;
    setSortBestPrices([...bestPrices]);
  }, [bestPrices]);

  const data = useMemo(() => {
    let newMarkets: any[] = [];
    if (sortBestPrices !== null) {
      sortedCurrencies.forEach((currency) => {
        const bestPrice = sortBestPrices.find(
          (value) => value.coinPair.split('_')[0] === currency.shortName
        );
        newMarkets = newMarkets.concat([
          {
            name: {
              image: currency?.image,
              title: currency?.fullName,
              detail: currency?.shortName,
            },
            maxbit: bestPrice?.lpBuyPrice || '--',
            competition: bestPrice?.competitorBuyPrice || '--',
            gaps: { value: bestPrice?.buyGap, type: 'buy' },
            action: 'buy',
          },
          {
            name: {
              image: currency?.image,
              title: currency?.fullName,
              detail: currency?.shortName,
            },
            maxbit: bestPrice?.lpSellPrice || '--',
            competition: bestPrice?.competitorSellPrice || '--',
            gaps: { value: bestPrice?.sellGap, type: 'sell' },
            action: 'sell',
          },
        ]);
      });
    }

    return newMarkets
      .filter((e) => e.gaps.value >= 0)
      .sort((a, b) => Math.abs(b.gaps.value) - Math.abs(a.gaps.value))
      .splice(0, 7)
      .map((val: any, index) => ({ key: index + 1, ...val }));
  }, [sortedCurrencies, sortBestPrices]);

  const handleBuyOrSell = (data: string, row: any) => {
    const coinBase = row.name.detail;
    const coinQuote = 'THB';
    navigate(`my/trade?orderSide=${data}&coinBase=${coinBase}&coinQuote=${coinQuote}`);
  };

  const columns = useMemo(
    () => [
      {
        title: t('landing.no'),
        dataIndex: 'key',
        key: 'key',
        width: '6%',
        ellipsis: true,
        align: 'center' as 'center',
      },
      {
        title: t('landing.name'),
        dataIndex: 'name',
        key: 'name',
        width: '20%',
        ellipsis: true,
        render: (data: any) => (
          <CoinInfoCol image={data.image} title={data.title} detail={data.detail} />
        ),
      },
      {
        title: () => <img style={{ width: '124px' }} src={maxbitLogo} alt={IMG_ALT} />,
        dataIndex: 'maxbit',
        key: 'maxbit',
        width: '20%',
        align: 'center' as 'center',
      },
      {
        title: t('landing.competition'),
        key: 'competition',
        dataIndex: 'competition',
        width: '20%',
        align: 'center' as 'center',
      },
      {
        title: t('landing.gaps'),
        key: 'gaps',
        dataIndex: 'gaps',
        width: '10%',
        align: 'center' as 'center',
        render: (data: gapsType) => (
          <span
            className="percent-number"
            style={data.type === 'buy' ? { color: '#419E6A' } : { color: '#D83232' }}
          >
            {data.value ? `${(data.value * 100).toFixed(2)}%` : '--'}
          </span>
        ),
      },
      {
        title: t('landing.action'),
        key: 'action',
        dataIndex: 'action',
        width: '15%',
        align: 'center' as 'center',
        render: (data: string, row: any) => (
          <div className="market-comparison__options-box">
            {data === 'buy' && (
              <Button
                size="large"
                className="market-comparison__buy-button"
                onClick={() => handleBuyOrSell(data, row)}
              >
                {t('landing.buy')}
              </Button>
            )}

            {data === 'sell' && (
              <Button
                size="large"
                className="market-comparison__sell-button"
                onClick={() => handleBuyOrSell(data, row)}
              >
                {t('landing.sell')}
              </Button>
            )}
          </div>
        ),
      },
    ],
    [t]
  );

  return (
    <div className="market-comparison">
      <span className="market-comparison__title">{t('landing.marketComparison')}</span>
      <Table columns={columns} dataSource={data} pagination={false} scroll={{ x: 1000 }} />
      {isUserLoggedIn && (
        <Link to={'my/market?tab=compare'}>
          <span className="more-btn">{t('landing.seeAllCoins')}</span>
        </Link>
      )}
      {!isUserLoggedIn && (
        <Link to={'market?tab=compare'}>
          <span className="more-btn">{t('landing.seeAllCoins')}</span>
        </Link>
      )}
    </div>
  );
};

export default MarketComparison;
