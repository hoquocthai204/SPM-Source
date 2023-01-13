import { StarFilled, StarOutlined } from '@ant-design/icons';
import { Button } from 'antd';
import Search from 'antd/lib/input/Search';
import { Breakpoint } from 'antd/lib/_util/responsiveObserve';
import userFavoriteCurrenciesApi from 'api/userFavoriteCurrencies';
import { useAppTranslation } from 'app/hooks';
import { TableCommon } from 'components/Tables/TableCommon';
import { IMG_ALT } from 'consts';
import { Currency, MiniChartImage, UserFavoriteCurrency } from 'models';
import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { formatAmount, uniqueId } from 'utils';
import { GetInfoMarket } from '../GetInfoMarket';

interface MarketProps {
  currencies?: Currency[];
  chartMini24hs?: MiniChartImage[];
}

const TabIndex = {
  all: 0,
  watchList: 1,
  topMover: 2,
  compare: 3,
};

const ArrayTab = [
  {
    label: 'all',
    index: TabIndex.all,
  },
  {
    label: 'watchList',
    index: TabIndex.watchList,
  },
  {
    label: 'topMover',
    index: TabIndex.topMover,
  },
  {
    label: 'compare',
    index: TabIndex.compare,
  },
];

const Market: React.FunctionComponent<MarketProps> = ({ currencies, chartMini24hs }) => {
  const t = useAppTranslation();
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams({});

  const [currentPage, setCurrentPage] = useState<number>(1);
  const [activeTab, setActiveTab] = useState<number>(
    searchParams.get('tab') === 'topMover'
      ? TabIndex.topMover
      : searchParams.get('tab') === 'compare'
      ? TabIndex.compare
      : TabIndex.all
  );
  const [filterInput, setFilterInput] = useState<string>('');
  const [userFavoriteCurrencies, setUserFavoriteCurrencies] = useState<UserFavoriteCurrency[]>([]);

  useEffect(() => {
    getUserFavoriteCurrencies();
  }, []);

  const { data, dataTopMover, dataCompare, dataWatchList } = GetInfoMarket({
    currencies,
    chartMini24hs,
    userFavoriteCurrencies,
  });

  const getDataFromTab = useCallback(() => {
    switch (activeTab) {
      case TabIndex.watchList:
        return dataWatchList;
      case TabIndex.topMover:
        return dataTopMover;
      case TabIndex.compare:
        return dataCompare;
      default:
        return data;
    }
  }, [activeTab, data, dataCompare, dataTopMover, dataWatchList]);

  const getUserFavoriteCurrencies = useCallback(async () => {
    const { body } = await userFavoriteCurrenciesApi.getAllUserFavoriteCurrencies({
      size: 99999999,
    });
    if (body) setUserFavoriteCurrencies(body);
  }, []);

  const handleAddFavorite = useCallback(
    async (coinBase, coinQuote) => {
      const { ok } = await userFavoriteCurrenciesApi.postUserFavoriteCurrencies({
        base: coinBase,
        quote: coinQuote,
      });
      if (ok) {
        setUserFavoriteCurrencies([
          ...userFavoriteCurrencies,
          { base: coinBase, quote: coinQuote, symbol: coinBase + coinQuote },
        ]);
      }
    },
    [userFavoriteCurrencies]
  );

  const handleDeleteFavorite = useCallback(
    async (coinBase, coinQuote) => {
      const { ok } = await userFavoriteCurrenciesApi.deleteUserFavoriteCurrencies({
        base: coinBase,
        quote: coinQuote,
      });
      if (ok) {
        setUserFavoriteCurrencies([...userFavoriteCurrencies].filter((x) => x.base !== coinBase));
      }
    },
    [userFavoriteCurrencies]
  );

  const handleOnChangePage = useCallback((page: number) => {
    setCurrentPage(page);
  }, []);

  const handleOnClickTrade = useCallback(
    (coinBase: string, coinQuote: string, orderSide: string) => {
      navigate(`/my/trade?orderSide=${orderSide}&coinBase=${coinBase}&coinQuote=${coinQuote}`);
    },
    [navigate]
  );
  const handleChangeTab = (index: number) => {
    setActiveTab(index);
    setCurrentPage(1);
    setSearchParams({ tab: ArrayTab.filter((x) => x.index === index)[0].label });
  };

  const filterData = useMemo(() => {
    const fillData = getDataFromTab();
    if (filterInput === '') return fillData;
    return (fillData || []).filter(({ fullName }) => {
      const coinNameFilter =
        fullName &&
        (fullName.toUpperCase().includes(filterInput.toUpperCase()) ||
          fullName.toLowerCase().includes(filterInput.toLowerCase()) ||
          fullName.toUpperCase().includes(filterInput.toUpperCase()) ||
          fullName.toLowerCase().includes(filterInput.toLowerCase()));
      return coinNameFilter;
    });
  }, [activeTab, getDataFromTab, filterInput]);

  const columns = useMemo(
    () =>
      activeTab === TabIndex.compare
        ? [
            {
              title: '',
              key: 'padding',
              dataIndex: 'padding',
              width: '6%',
            },
            {
              title: t('market.coin'),
              key: 'image',
              dataIndex: 'image',
              width: '24%',
              render: (_: any, row: any) => (
                <div className="coin-name" key={uniqueId()}>
                  <img
                    src={row.image}
                    alt="logo"
                    style={{ width: '40px', height: '40px', borderRadius: '50%' }}
                  />
                  <div className="coin-name__name">
                    <p className="coin-name__short-name">{row.shortName}</p>
                    <p className="coin-name__full-name">{row.fullName}</p>
                  </div>
                </div>
              ),
            },
            {
              title: t('market.maxbit'),
              key: 'lpBuyPrice',
              dataIndex: 'lpBuyPrice',
              width: '12%',
              render: (lpBuyPrice: number) => (
                <p key={uniqueId()} style={{ width: '100%', marginBottom: '0' }}>
                  {formatAmount((lpBuyPrice || '').toString()) || ' --'}
                </p>
              ),
            },
            {
              title: 'Bitkub',
              key: 'bitkub',
              dataIndex: 'bitkub',
              width: '15%',
            },
            {
              title: 'Zipmex',
              key: 'zipmex',
              dataIndex: 'zipmex',
              width: '15%',
            },
            {
              title: 'Bitazza',
              key: 'bitazza',
              dataIndex: 'bitazza',
              width: '15%',
            },
            {
              title: t('market.action'),
              key: 'shortName',
              dataIndex: 'shortName',
              width: '10%',
              align: 'center' as 'center',
              render: (_: any, row: any) => (
                <p
                  key={uniqueId()}
                  className="market-action__trade"
                  onClick={
                    !row.comingSoon
                      ? () =>
                          handleOnClickTrade(
                            row.base,
                            row.quote,
                            row.typeTransaction === 'buy' ? 'buy' : 'sell'
                          )
                      : () => null
                  }
                  style={!row.comingSoon ? { color: '#375CE1' } : { color: '#ccc' }}
                >
                  {row.typeTransaction === 'buy' ? t('market.buy') : t('market.sell')}
                </p>
              ),
            },
          ]
        : [
            {
              title: '',
              key: 'isFavorite',
              dataIndex: 'isFavorite',
              align: 'center' as 'center',
              render: (isFavorite: any[]) => (
                <Button
                  style={{ border: 'none', backgroundColor: 'transparent' }}
                  key={uniqueId()}
                  onClick={() => {
                    !isFavorite[0]
                      ? handleAddFavorite(isFavorite[1], isFavorite[2])
                      : handleDeleteFavorite(isFavorite[1], isFavorite[2]);
                  }}
                  icon={
                    isFavorite[0] ? (
                      <StarFilled style={{ color: '#fc4f00', fontSize: '16px' }} />
                    ) : (
                      <StarOutlined style={{ color: '#fc4f00', fontSize: '16px' }} />
                    )
                  }
                ></Button>
              ),
            },
            {
              title: t('market.coin'),
              key: 'image',
              dataIndex: 'image',
              render: (_: any, row: any) => (
                <div className="coin-name" key={uniqueId()}>
                  <img
                    src={row.image}
                    alt="logo"
                    style={{ width: '40px', height: '40px', borderRadius: '50%' }}
                  />
                  <div className="coin-name__name">
                    <p className="coin-name__short-name">{row.shortName}</p>
                    <p className="coin-name__full-name">{row.fullName}</p>
                  </div>
                </div>
              ),
            },
            {
              title: t('market.maxbit'),
              key: 'lpBuyPrice',
              dataIndex: 'lpBuyPrice',

              render: (lpBuyPrice: number) => (
                <p key={uniqueId()} style={{ width: '100%', marginBottom: '0' }}>
                  {formatAmount((lpBuyPrice || '').toString()) || ' --'}
                </p>
              ),
            },
            {
              title: t('market.competitor'),
              key: 'competitorBuyPrice',
              dataIndex: 'competitorBuyPrice',

              render: (competitorBuyPrice: number) => (
                <p key={uniqueId()} style={{ width: '100%', marginBottom: '0' }}>
                  {formatAmount((competitorBuyPrice || '').toString()) || '--'}
                </p>
              ),
            },
            {
              title: t('market.gaps'),
              key: 'buyGap',
              dataIndex: 'buyGap',

              render: (buyGap: number) => (
                <p
                  key={uniqueId()}
                  style={{
                    marginBottom: '0',
                    color: `${buyGap ? (buyGap >= 0 ? '#419E6A' : '#D83232') : ''}`,
                  }}
                >
                  {buyGap
                    ? buyGap >= 0
                      ? '+' + formatAmount(buyGap.toString()) + '%'
                      : formatAmount(buyGap.toString()) + '%'
                    : '--'}
                </p>
              ),
            },
            {
              title: t('market.24hChange'),
              key: 'changePercent',
              dataIndex: 'changePercent',

              render: (changePercent: number) => (
                <p
                  key={uniqueId()}
                  style={{
                    marginBottom: '0',
                    color: `${changePercent >= 0 ? '#419E6A' : '#D83232'}`,
                  }}
                >
                  {changePercent
                    ? changePercent >= 0
                      ? '+' + formatAmount(changePercent.toString()) + '%'
                      : formatAmount(changePercent.toString()) + '%'
                    : '--'}
                </p>
              ),
            },
            {
              title: '',
              key: 'imageUrl',
              dataIndex: 'imageUrl',

              align: 'center' as 'center',
              render: (_: any, row: any) => (
                <img
                  key={uniqueId()}
                  src={row.imageUrl}
                  alt=""
                  style={{
                    width: '136px',
                    height: '40px',
                    filter: `${
                      row.changePercent >= 0
                        ? 'invert(50%) sepia(50%) saturate(445%) hue-rotate(94deg) brightness(96%) contrast(90%)'
                        : 'invert(28%) sepia(23%) saturate(5671%) hue-rotate(342deg) brightness(102%) contrast(86%)'
                    } `,
                  }}
                />
              ),
            },
            {
              title: t('market.action'),
              key: 'shortName',
              dataIndex: 'shortName',

              align: 'center' as 'center',
              render: (_: any, row: any) => (
                <div
                  className=""
                  style={{ display: 'flex', gap: '10px', justifyContent: 'center' }}
                >
                  {[`${t('market.buy')}`, `${t('market.sell')}`].map((x, index) => (
                    <p
                      key={uniqueId()}
                      className="market-action__trade"
                      onClick={
                        !row.comingSoon
                          ? () =>
                              handleOnClickTrade(row.base, row.quote, index === 0 ? 'buy' : 'sell')
                          : () => null
                      }
                      style={!row.comingSoon ? { color: '#375CE1' } : { color: '#ccc' }}
                    >
                      {x}
                    </p>
                  ))}
                </div>
              ),
            },
          ],
    [handleAddFavorite, handleDeleteFavorite, handleOnClickTrade, t, activeTab]
  );

  return (
    <>
      <div className="market">
        <div className="market__table">
          <div className="market__table__header">
            <div className="header-left__tabs">
              {ArrayTab.map((x, index) => (
                <div
                  key={index}
                  className={`${activeTab === x.index ? `tab--active` : `tab`}`}
                  onClick={() => handleChangeTab(x.index)}
                >
                  {t(`market.tab.${x.label}`)}
                </div>
              ))}
            </div>
            <div className="header-right__search">
              <Search
                placeholder={t('market.search')}
                allowClear
                value={filterInput}
                onChange={(e) => setFilterInput(e.target.value)}
              />
            </div>
          </div>

          <TableCommon
            columns={columns}
            dataSource={filterData || []}
            size="small"
            currentPage={currentPage}
            total={filterData?.length}
            showTotal
            scroll={{ x: 1024 }}
            onChange={handleOnChangePage}
            classNamePagination="pagination"
          />
        </div>
      </div>
    </>
  );
};

export default Market;
