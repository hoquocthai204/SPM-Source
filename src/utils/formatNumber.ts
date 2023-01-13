import { SPLIT_NUMBER_REGEX } from 'consts';

export const formatNumber = (value: number | undefined, isRound?: true | false): string => {
  if (value) {
    const twoDecimal = isRound ? value.toFixed(2) : value;
    let num_split = twoDecimal.toString().split('.');
    if (num_split[1] === '00') {
      return num_split[0].replace(SPLIT_NUMBER_REGEX, ',');
    } else {
      num_split[0] = num_split[0].replace(SPLIT_NUMBER_REGEX, ',');
      return num_split.join('.');
    }
  } else {
    return '0';
  }
};
