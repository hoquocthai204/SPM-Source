import BigNumber from 'bignumber.js';

export const InitBigNumber = () => {
  return BigNumber.clone({
    DECIMAL_PLACES: 8,
    FORMAT: {
      prefix: '',
      decimalSeparator: '.',
      groupSeparator: ',',
      groupSize: 3,
      secondaryGroupSize: 0,
      fractionGroupSeparator: ' ',
      fractionGroupSize: 0,
      suffix: '',
    },
    EXPONENTIAL_AT: 1e9,
    RANGE: 1e9,
  });
};
