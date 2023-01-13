import { formatBigNumber } from './formatBigNumber';
export const formatPercent = (percent: number, totalChange24h: number) => {
  return percent < 0.001 || percent < -0.001
    ? '0.00'
    : totalChange24h > 0
    ? '+' + formatBigNumber(percent, 'fiat')
    : '-' + formatBigNumber(percent, 'fiat');
};
