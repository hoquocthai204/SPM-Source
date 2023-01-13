import { useAppSelector } from 'app/hooks';
import { selectBestPrices, selectMarketPrices } from 'features/socket/socketSlice';
import { BestPrice, Currency, MiniChartImage, UserFavoriteCurrency } from 'models';
import { useEffect, useState } from 'react';
import { formatAmount } from 'utils';

interface MarketInfo {
  base?: string | undefined;
  createdDate?: string | undefined;
  decimals?: number | undefined;
  displayOrder?: number | undefined;
  enabled?: boolean | undefined;
  fullName?: string | undefined;
  id?: number | undefined;
  image?: string | undefined;
  imageUrl?: string | undefined;
  infomationEn?: string | undefined;
  infomationTh?: string | undefined;
  isFavorite?: any[] | undefined;
  networks?: any[] | undefined;
  quote?: string | undefined;
  shortName?: string | undefined;
  type?: string | undefined;
  marketPrice?: number | undefined;
  changeCash?: number | undefined;
  changePercent?: number | undefined;
  comingSoon?: boolean | undefined;
  bitkub?: number | undefined | string;
  zipmex?: number | undefined | string;
  bitazza?: number | undefined | string;
  binance?: number | undefined | string;
  satang?: number | undefined | string;
  buyGap?: number | undefined;
  sellGap?: number | undefined;
  coinPair?: string | undefined;
  competitorBuyDetailPrices?: any[] | undefined;
  competitorBuyPrice?: number | undefined;
  competitorSellDetailPrices?: any[] | undefined;
  competitorSellPrice?: number | undefined;
  lpBuyPrice?: number | undefined;
  lpSellPrice?: number | undefined;
}

interface InfoParams {
  currencies?: Currency[];
  chartMini24hs?: MiniChartImage[];
  userFavoriteCurrencies?: UserFavoriteCurrency[];
}

export const GetInfoMarket = ({
  currencies,
  chartMini24hs,
  userFavoriteCurrencies,
}: InfoParams) => {
  const bestPrices: BestPrice[] | null = useAppSelector(selectBestPrices);
  const marketPrices = useAppSelector(selectMarketPrices);
  const [marketPriceToArray, setMarketPriceToArray] = useState<any[]>();

  const [data, setData] = useState<MarketInfo[]>([]);
  const [dataWatchList, setDataWatchList] = useState<MarketInfo[]>([]);
  const [dataTopMover, setDataTopMover] = useState<MarketInfo[]>([]);
  const [dataCompare, setDataCompare] = useState<MarketInfo[]>([]);

  useEffect(() => {
    setMarketPriceToArray(Object.keys(marketPrices).map((x) => marketPrices[x]));
  }, [marketPrices]);

  useEffect(() => {
    const result: MarketInfo[] = (currencies || [])
      .filter((x) => x.enabled)
      .sort((x, y) => Number(x.comingSoon) - Number(y.comingSoon))
      .filter((o) => o.type === 'CRYPTO')
      .map((x) => {
        const chartMini24h = (chartMini24hs || []).find((y) => y.base === x.shortName);
        const marketPrice = (marketPriceToArray || []).find((q: any[]) => q[0] === x.shortName);
        const bestPrice = (Array.isArray(bestPrices) ? bestPrices : []).find(
          (t) => (t.coinPair.split('_') || [])[0] === x.shortName
        );
        const userFavoriteCurrency = (userFavoriteCurrencies || []).find(
          (z) => z.base === chartMini24h?.base
        );

        return {
          ...bestPrice,
          ...chartMini24h,
          ...x,
          marketPrice: (marketPrice || [])[2],
          changeCash: (marketPrice || [])[3],
          changePercent: (marketPrice || [])[4],
          isFavorite: [!!userFavoriteCurrency, x.shortName, chartMini24h?.quote],
          bitkub:
            formatAmount(
              (
                bestPrice?.competitorBuyDetailPrices.filter((x) => x.providerName === 'BITKUB')[0]
                  .price || ''
              ).toString()
            ) || '--',
          zipmex:
          formatAmount(
            (
              bestPrice?.competitorBuyDetailPrices.filter((x) => x.providerName === 'ZIPMEX')[0]
                .price || ''
            ).toString()
          ) || '--',
          bitazza:
          formatAmount(
            (
              bestPrice?.competitorBuyDetailPrices.filter((x) => x.providerName === 'BITAZZA')[0]
                .price || ''
            ).toString()
          ) || '--',
          binance:
          formatAmount(
            (
              bestPrice?.competitorBuyDetailPrices.filter((x) => x.providerName === 'BINANCE')[0]
                .price || ''
            ).toString()
          ) || '--',
          satang:
          formatAmount(
            (
              bestPrice?.competitorBuyDetailPrices.filter((x) => x.providerName === 'SATANG')[0]
                .price || ''
            ).toString()
          ) || '--',
        };
      });
    setData(result);

    setDataWatchList(result.filter((x) => (x.isFavorite || [])[0] === true));

    setDataTopMover(
      [...result]
        .sort((a, b) => Math.abs(Number(b.changePercent)) - Math.abs(Number(a.changePercent)))
        .filter((x) => !x.comingSoon)
    );

    let newArr: any[] = [];
    result.map((x) => {
      newArr = newArr.concat([
        {
          ...x,
          gap: x.buyGap,
          typeTransaction: 'buy',
        },
        {
          ...x,
          gap: x.sellGap,
          typeTransaction: 'sell',
        },
      ]);
    });
    setDataCompare(newArr.filter((x) => !x.comingSoon && x.gap >= 0));
  }, [chartMini24hs, marketPriceToArray, currencies, bestPrices, userFavoriteCurrencies]);
  return { data, dataTopMover, dataCompare, dataWatchList };
};
