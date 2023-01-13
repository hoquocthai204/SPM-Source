import { InitBigNumber } from 'config/bignumber';
import { formatNumber } from './formatNumber';

export const formatBigNumber = (number: number, type?: 'fiat' | 'crypto', roudDecimal?: number) => {
  const BN = InitBigNumber();
  const n = new BN(number);
  if (type === 'fiat') {
    // Format THB with 2 decimal
    return Number(number) === number && number % 1 === 0
      ? new BN(+n.toFixed(8)).toFormat()
      : formatNumber(+n.toFixed(2), false);
  } else {
    return new BN(+n.toFixed(8)).toFormat(); // Format crypto with 8 decimal
  }
};
