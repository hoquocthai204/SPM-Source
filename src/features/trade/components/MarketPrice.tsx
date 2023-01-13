import { useAppSelector, useAppTranslation } from 'app/hooks';
import { selectBestPrices, selectMarketPrices } from 'features/socket/socketSlice';
import { BestPrice } from 'models';
import React, { useEffect, useState } from 'react';
import { formatAmount } from 'utils';

interface MarketPriceProps {
  base?: string;
  quote?: string;
}
interface priceMarket {
  price: string;
  change: number;
}

const MarketPrice: React.FunctionComponent<MarketPriceProps> = ({ base, quote }) => {
  const t = useAppTranslation();
  const [marketPrice, setMarketPrice] = useState<priceMarket>();

  const marketPrices = useAppSelector(selectMarketPrices);
  const bestPrices: BestPrice[] | null = useAppSelector(selectBestPrices);
  
  useEffect(() => {
    const marketPricesFromBase = marketPrices[(base || '') + (quote || '')];
    const bestPricesFromBase =
      (bestPrices || []).length > 0 &&
      bestPrices?.find((x) => x.coinPair === base + '_' + quote)?.lpBuyPrice;

    setMarketPrice({
      price: bestPricesFromBase ? formatAmount(bestPricesFromBase?.toString()) : '---',
      change: Number((marketPricesFromBase || [])[4]),
    });
  }, [base, marketPrices, quote]);

  return (
    <>
      <div className="trade__header__description">
        <div className="last__price">
          <div style={(marketPrice?.change || 0) > 0 ? { color: '#419e6a' } : { color: '#d83232' }}>
            {marketPrice?.price}
          </div>
          <span>{t('trade.header.lastMarket')}</span>
        </div>
        <div className="change">
          <div style={(marketPrice?.change || 0) > 0 ? { color: '#419e6a' } : { color: '#d83232' }}>
            {(marketPrice?.change || 0) >= 0 ? '+' + marketPrice?.change : marketPrice?.change}%
          </div>
          <span>{t('trade.header.change')}</span>
        </div>
      </div>
    </>
  );
};

export default MarketPrice;
