import walletAPI from 'api/walletApi';
import { useAppSelector, usePrevious } from 'app/hooks';
import TrendingFlagIcon from 'components/Icons/TrendingFlagIcon';
import * as React from 'react';
import { formatBigNumber } from 'utils';
import BigNumber from 'bignumber.js';
import { InitBigNumber } from 'config/bignumber';

interface FormatPercenChange24HProps {
  available: number;
  blockedBalance: number;
  valuation: number;
  shorName?: string | undefined;
}

const FormatPercenChange24H: React.FunctionComponent<FormatPercenChange24HProps> = (props) => {
  const { available, blockedBalance, shorName, valuation } = props;

  const getTotalValueSnapshotInThb = useAppSelector(
    (state) => state.wallet.getTotalValueSnapshotInThb
  );

  const [price, setPrice] = React.useState(0);
  const [percentChange24h, setPercentChange24h] = React.useState(0);
  const [colorChange24h, setColorChange24h] = React.useState('trendingUp');
  const getSnapshotCurrency = async (infoCurrency: {
    currency: string;
    available: number;
    blockedBalance: number;
    valuation: number;
    price: number;
  }) => {
    const dtByOneDay = new Date().setDate(new Date().getDate() - 1);
    const dtYesterday = new Date(dtByOneDay);

    const resultYesterday = await walletAPI.getSnapshotCurrency(infoCurrency.currency, {
      dt: dtYesterday,
    });

    if (resultYesterday.ok) {
      const valueInThb = BigNumber.sum(infoCurrency.available, infoCurrency.blockedBalance)
        .multipliedBy(infoCurrency.price ?? 1)
        .toNumber();
      const valueInThbSnapshot = BigNumber.sum(
        resultYesterday.body.availableBalance,
        resultYesterday.body.blockedBalance
      ).multipliedBy(resultYesterday.body.valuation ?? 1);

      const change24h = new BigNumber(valueInThb).minus(valueInThbSnapshot);
      const percent24h = change24h.dividedBy(valueInThbSnapshot).multipliedBy(100).toNumber();

      const trendingFlag = percent24h >= 0 ? 'trendingUp' : 'trendingDown';
      setColorChange24h(trendingFlag);
      setPercentChange24h(percent24h);

      // check price diffrent
      setPrice((prevState) => {
        return infoCurrency.price;
      });
    }
  };

  React.useEffect(() => {
    if (shorName) {
      getSnapshotCurrency({
        currency: shorName,
        available: available,
        blockedBalance: blockedBalance,
        valuation: valuation,
        price: getTotalValueSnapshotInThb(shorName, valuation),
      });
    }
  }, [shorName, getTotalValueSnapshotInThb(shorName, valuation)]);
  return (
    <>
      <div className="flex-row">
        <TrendingFlagIcon
          trendingFlag={colorChange24h}
          percent={formatBigNumber(Math.abs(percentChange24h), 'fiat')}
        />
      </div>
    </>
  );
};

export default FormatPercenChange24H;
