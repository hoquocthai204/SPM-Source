import walletAPI from 'api/walletApi';
import { useAppSelector, useAppTranslation } from 'app/hooks';
import { selectBestPrices, selectMarketPrices } from 'features/socket/socketSlice';
import React, { useCallback, useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import {
  calculatePriceToTHB,
  formatBigNumber,
  formatNumber,
  formatPercent,
  isEmptyObject,
} from 'utils';
import { setFiatBalance, setTotalValueSnapshotInThb, setUserWallets } from '../walletSlice';
import routeConstants from 'routes';
import Chart from 'react-apexcharts';
import LoadingPlaceHolder from 'components/UIElements/LoadingPlaceHolder/LoadingPlaceHolder';
import HideIcon from 'components/Icons/HideIcon';
import UnHideIcon from 'components/Icons/UnHideIcon';

const { WALLET } = routeConstants;
const CharColor = ['#08A19C', '#317674', '#2C675C', '#63CCC9', '#0CE6DF'];
interface WalletOverViewProps {
  eyeHide: boolean;
  onChangeHide: (value: boolean) => void;
  userId?: number;
}

const WalletOverView: React.FunctionComponent<WalletOverViewProps> = (props) => {
  const { eyeHide, onChangeHide } = props;
  const t = useAppTranslation();
  const dispatch = useDispatch();

  const [percentChange24H, setPercentChange24H] = useState<number>(0);
  const [totalChange24h, setTotalChange24h] = useState<number>(0);
  const [statusTag, setStatusTag] = useState<boolean>(false);
  const bestPrice = useAppSelector(selectBestPrices);
  const userWallets = useAppSelector((state) => state.wallet.userWallets);

  const marketPrices = useAppSelector(selectMarketPrices);

  const [series, setSeries] = React.useState<[any]>();
  const [labels, setLabels] = React.useState<[any]>();
  const [configChart, setConfigChart] = React.useState<any>();

  const [loaded, setLoaded] = React.useState<boolean>(true);
  const [loadedChart, setLoadedChart] = React.useState<boolean>(true);
  const getAllUsersWallets = useCallback(async () => {
    const { body } = await walletAPI.getAllUserWallet();
    setLoaded(true);
    if (body) {
      dispatch(setUserWallets(body));
    }
  }, []);

  const fiatBalance = useAppSelector((state) => state.wallet.fiatBalance);
  const cryptoBalance = useAppSelector((state) => state.wallet.cryptoBalance);
  const totalValueSnapshotInThb = useAppSelector((state) => state.wallet.totalValueSnapshotInThb);

  const getTotalValueSnapshotInThb = async () => {
    const dtByOneDay = new Date().setDate(new Date().getDate() - 1);
    const dtYesterday = new Date(dtByOneDay);

    const resultYesterday = await walletAPI.getChange24hBalance({
      dt: dtYesterday,
    });
    if (resultYesterday.ok) {
      const totalValueSnapshotInThb = resultYesterday.body.reduce(
        (previousValue: any, currentValue: any) => {
          const valuation = currentValue.valuation ? currentValue.valuation : 1;
          const availableBalance = currentValue.availableBalance
            ? currentValue.availableBalance
            : 0;
          const blockedBalance = currentValue.blockedBalance ? currentValue.blockedBalance : 0;
          return previousValue + valuation * (availableBalance + blockedBalance);
        },
        0
      );
      setLoaded(true);
      dispatch(setTotalValueSnapshotInThb(totalValueSnapshotInThb));
    }
  };
  useEffect(() => {
    getAllUsersWallets();
    getTotalValueSnapshotInThb();
  }, []);

  useEffect(() => {
    if (fiatBalance) {
      const totalValueInThb = fiatBalance + cryptoBalance;
      const change24h = totalValueInThb - totalValueSnapshotInThb;
      const percentChange24h = (change24h / totalValueSnapshotInThb) * 100;

      setTotalChange24h(change24h);
      if (!isNaN(percentChange24h)) {
        setPercentChange24H(Math.abs(percentChange24h));
      }

      const statusTag = change24h >= 0;
      setStatusTag(statusTag);
      setLoaded(false);
    }
  }, [cryptoBalance, fiatBalance]);

  useEffect(() => {
    if (userWallets) {
      // fiat balance
      const _currencyTHB = userWallets.find((wallet) => wallet.currency === 'THB');
      let _fiatBalance = 0;
      if (_currencyTHB) {
        _fiatBalance = calculatePriceToTHB(
          _currencyTHB.availableBalance,
          _currencyTHB.blockedBalance,
          _currencyTHB.valuation
        );
      }
      dispatch(setFiatBalance(_fiatBalance));
    }
  }, [userWallets]);
  useEffect(() => {
    // if exist wallets
    if (userWallets) {
      // fiat balance
      const dataChart = new Map();

      userWallets.forEach((wallet, index) => {
        if (wallet.type === 'CRYPTO') {
          dataChart.set(
            wallet.currency,
            (wallet.valuation ?? 1) * (wallet.availableBalance + wallet.blockedBalance)
          );
        }
      });
      setLoaded(false);

      // handle data chart
      const dataChartSortAsc = new Map([...dataChart.entries()].sort((a, b) => b[1] - a[1]));

      const seriesChart: any = [];
      const labelsChart: any = [];
      let totalOther = 0;

      Array.from(dataChartSortAsc).map((v: any, index) => {
        if (index < 5) {
          if (v[1] !== 0) {
            seriesChart.push(v[1]);
            labelsChart.push(v[0]);
          }
        } else {
          totalOther = totalOther + v[1];
        }
      });

      setSeries(seriesChart);
      setLabels(labelsChart);
    }
  }, [userWallets, marketPrices, bestPrice]);

  //   //Config Chart
  React.useEffect(() => {
    if (labels || series) {
      const config = {
        series: series,
        options: {
          chart: {
            offsetY: -3,
            offsetX: 8,
          },
          labels: labels,
          legend: {
            show: true,
            formatter: (legendName: string, opts?: any) => {
              const val = opts.w.globals.series[opts.seriesIndex];
              const total = opts.w.globals.series.reduce((a: number, b: number) => a + b, 0)
                ? opts.w.globals.series.reduce((a: number, b: number) => a + b, 0)
                : 1;
              return (
                '<div class="legend__right">' +
                '<div>' +
                legendName +
                '</div>' +
                '<div>' +
                ((val / total) * 100).toFixed(2) +
                '%' +
                '</div>' +
                '</div>'
              );
            },
            position: 'right',
          },
          dataLabels: {
            enabled: false,
          },
          fill: {
            colors: CharColor,
          },
          colors: CharColor,
          stroke: {
            show: false,
          },
        },
      };
      setConfigChart(config);
      setLoadedChart(false);
    }
  }, [series, labels]);

  return (
    <div className="wallet-overview">
      <div className="wallet-overview-info">
        {/* Estimated portfolio balance */}
        <div className="wallet-overview-info__estimated">
          <div className="wallet-overview-info__estimated-title">
            <div className="text-md-16-30">{t('wallet.estimatedTitle')}</div>
            <div className="wallet-overview-info__estimated-title-icon">
              {eyeHide ? (
                <HideIcon onChangeHide={onChangeHide} />
              ) : (
                <UnHideIcon onChangeHide={onChangeHide} />
              )}
            </div>
          </div>
          <div className="wallet-overview-info__estimated-total text-sb-24-30">
            {loaded ? (
              <LoadingPlaceHolder
                extraStyles={{ width: '80%', height: '10px', borderRadius: '10px' }}
              />
            ) : eyeHide ? (
              '*******'
            ) : (
              `${formatBigNumber(fiatBalance + cryptoBalance, 'fiat')} THB`
            )}
          </div>
          <div className="text-md-16-30">
            {t('wallet.estimatedChange24H')}
            {/* <div className="wallet-overview-info__estimated-amount-increase text-sb-16-30">ad</div> */}
            <div
              className={
                'wallet-overview-info__estimated-amount-' +
                `${totalChange24h >= 0 ? 'increase' : 'decrease'}`
              }
            >
              {loaded ? (
                <LoadingPlaceHolder
                  extraStyles={{ width: '80%', height: '10px', borderRadius: '10px' }}
                />
              ) : eyeHide ? (
                '*******'
              ) : (
                `${
                  statusTag
                    ? `+${formatBigNumber(totalChange24h, 'fiat')} THB / ${formatPercent(
                        percentChange24H,
                        totalChange24h
                      )}%`
                    : `${formatBigNumber(totalChange24h, 'fiat')} THB / ${formatPercent(
                        percentChange24H,
                        totalChange24h
                      )}%`
                }`
              )}
            </div>
          </div>
        </div>
        {/* Fiat balance */}
        <div className="wallet-overview-info__fiat">
          <div className="wallet-overview-info__fiat-title">
            <div className="text-md-16-30">{t('wallet.fiatBalance')}</div>
          </div>
          <div className="wallet-overview-info__fiat-total text-sb-20-20">
            {loaded ? (
              <LoadingPlaceHolder
                extraStyles={{ width: '80%', height: '10px', borderRadius: '10px' }}
              />
            ) : eyeHide ? (
              '*******'
            ) : (
              `${formatBigNumber(fiatBalance, 'fiat')} THB`
            )}
          </div>
          <div className="wallet-overview-info__fiat-actions text-md-14-20">
            <Link to={WALLET.DEPOSIT.fiat.thb.route}>{t('wallet.fiatActions.deposit')}</Link>/
            <Link to={WALLET.WITHDRAW.fiat.thb.route}>{t('wallet.fiatActions.withdraw')}</Link>
          </div>
        </div>
        {/* Crypto balance */}
        <div className="wallet-overview-info__crypto">
          <div className="wallet-overview-info__crypto-title">
            <div className="text-md-16-30">{t('wallet.cryptoBalance')}</div>
          </div>
          <div className="wallet-overview-info__crypto-total text-sb-20-20">
            {loaded ? (
              <LoadingPlaceHolder
                extraStyles={{ width: '80%', height: '10px', borderRadius: '10px' }}
              />
            ) : eyeHide ? (
              '*******'
            ) : (
              `${formatBigNumber(cryptoBalance, 'fiat')} THB`
            )}
          </div>
          <div className="wallet-overview-info__crypto-actions text-md-14-20">
            <Link to={WALLET.MANAGE_ADDRESS_BOOK.route}> {t('wallet.cryptoActions')}</Link>
          </div>
        </div>
        {/* Chart */}
        <div id="chart" className="wallet-overview-info__piechart">
          {loadedChart ? (
            <LoadingPlaceHolder
              extraStyles={{
                width: '127.51px',
                height: '127.51px',
                borderRadius: '50%',
                marginLeft: '10%',
              }}
            />
          ) : (
            <Chart
              options={configChart.options}
              series={configChart.series}
              type="pie"
              width={322.04}
              height="100%"
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default WalletOverView;
