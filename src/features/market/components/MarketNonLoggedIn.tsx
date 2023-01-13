import Search from 'antd/lib/input/Search';
import userFavoriteCurrenciesApi from 'api/userFavoriteCurrencies';
import { useAppTranslation } from 'app/hooks';
import { TableCommon } from 'components/Tables/TableCommon';
import { usePreventLoggedIn } from 'hooks/usePreventLoggedIn';
import { Currency, MiniChartImage, UserFavoriteCurrency } from 'models';
import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import { uniqueId } from 'utils';
import { GetInfoMarket } from '../GetInfoMarket';

interface MarketNonLoggedInProps {
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

const MarketNonLoggedIn: React.FunctionComponent<MarketNonLoggedInProps> = ({
  currencies,
  chartMini24hs,
}) => {
  const t = useAppTranslation();
  const navigate = useNavigate();
  usePreventLoggedIn();
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
    const tab = searchParams.get('tab');
    if (tab) {
      const isExistTab = ArrayTab.filter((x) => x.label === tab).length > 0;
      if (!isExistTab) return navigate('/market/404');
    }
  }, [navigate, searchParams]);

  useEffect(() => {
    getUserFavoriteCurrencies();
  }, []);

  const getUserFavoriteCurrencies = useCallback(async () => {
    const { body } = await userFavoriteCurrenciesApi.getAllUserFavoriteCurrencies({
      size: 99999999,
    });
    if (body) setUserFavoriteCurrencies(body);
  }, []);

  const handleOnChangePage = useCallback((page: number) => {
    setCurrentPage(page);
  }, []);

  const handleOnClickTrade = useCallback(
    (coinBase: string, coinQuote: string, orderSide: string) => {
      navigate(`/my/trade?orderSide=${orderSide}&coinBase=${coinBase}&coinQuote=${coinQuote}`);
    },
    [navigate]
  );

  const { data, dataTopMover, dataCompare } = GetInfoMarket({
    currencies,
    chartMini24hs,
    userFavoriteCurrencies,
  });

  const getDataFromTab = () => {
    switch (activeTab) {
      case TabIndex.watchList:
        return;
      case TabIndex.topMover:
        return dataTopMover;
      case TabIndex.compare:
        return dataCompare;
      default:
        return data;
    }
  };

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
        (fullName || [])[1].toUpperCase().includes(filterInput.toUpperCase()) ||
        (fullName || [])[1].toLowerCase().includes(filterInput.toLowerCase()) ||
        (fullName || [])[2].toUpperCase().includes(filterInput.toUpperCase()) ||
        (fullName || [])[2].toLowerCase().includes(filterInput.toLowerCase());
      return coinNameFilter;
    });
  }, [activeTab, getDataFromTab, filterInput]);

  const columns = useMemo(
    () =>
      activeTab === TabIndex.compare
        ? [
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
              width: '15%',
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
                  {lpBuyPrice ?? '--'}
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
                  {changePercent >= 0 ? '+' + changePercent + '%' : changePercent + '%'}
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
    [handleOnClickTrade, t, activeTab]
  );

  return (
    <>
      <div className="market-non-login">
        <div className="market-non-login__table">
          <div className="market-non-login__table__header">
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

          {activeTab === TabIndex.watchList ? (
            <div className="market-non-login__table__user-favorites">
              <div className="user-favorites__header">
                <p>{t('market.watchList.title')}</p>
              </div>
              <div className="user-favorites__link">
                <Link to="/login">{t('market.watchList.login')}</Link>
                <p>{t('market.watchList.or')}</p>
                <Link to="/register">{t('market.watchList.register')}</Link>
              </div>
            </div>
          ) : (
            <TableCommon
              columns={columns}
              dataSource={filterData || []}
              size="small"
              currentPage={currentPage}
              total={filterData?.length}
              showTotal
              scroll={{ x: 768 }}
              onChange={handleOnChangePage}
              classNamePagination="pagination"
            />
          )}
        </div>
      </div>
    </>
  );
};

export default MarketNonLoggedIn;
