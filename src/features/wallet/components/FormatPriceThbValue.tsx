import { useAppSelector } from 'app/hooks';
import BigNumber from 'bignumber.js';
import * as React from 'react';
import { formatBigNumber } from 'utils';

interface FormatPriceThbValueProps {
  available: number;
  blockedBalance: number;
  valuation: number;
  shorName?: string | undefined;
}

const FormatPriceThbValue: React.FunctionComponent<FormatPriceThbValueProps> = (props) => {
  const { available, blockedBalance, shorName, valuation } = props;
  const [thbValue, setThbValue] = React.useState(0);
  const getTotalValueSnapshotInThb = useAppSelector(
    (state) => state.wallet.getTotalValueSnapshotInThb
  );

  const getPriceTHB = (priceTHB: number) => {
    return priceTHB
      ? setThbValue(BigNumber.sum(available, blockedBalance).multipliedBy(priceTHB).toNumber())
      : 0;
  };
  React.useEffect(() => {
    getPriceTHB(getTotalValueSnapshotInThb(shorName, valuation));
  }, [getTotalValueSnapshotInThb(shorName, valuation)]);
  return <>{formatBigNumber(thbValue, 'fiat')}</>;
};

export default FormatPriceThbValue;
