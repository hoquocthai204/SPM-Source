import BigNumber from 'bignumber.js';
import { DEFAULT_MIN_MOVEMENT_FOR_FIAT } from 'consts';

export const roundDown = (value: number | BigNumber, minMovement?: number) => {
  

  if (!value) return value;
  const movement = minMovement ? minMovement : DEFAULT_MIN_MOVEMENT_FOR_FIAT;
  const slitValue = new BigNumber(Number(value)).toFixed().split('.');

  if (slitValue.length === 1) return value;
  const arr = new BigNumber(movement).toFixed().split('.');
  return Number(`${slitValue[0]}.${slitValue[1].substring(0, arr[1].length)}`);
};

export const formatCurrency = (value: number | BigNumber, minMovement?: number) => {
  if (value === 0) return '0';
  if (value) {
    const splitValue = new BigNumber(roundDown(value, minMovement)).toFixed().split('.');
    if (splitValue.length === 1) return splitValue[0];
    return `${splitValue[0]}.${splitValue[1].slice(0, minMovement?.toString()?.split(".")[1]?.length)}`;
  }
  return '0';
};



export const formatAmountForInput = (
  prev = '',
  next = '',
  { maxDecimals, maxAmount } = { maxDecimals: 2, maxAmount: 999999999999 }
) => {
  

  if (!next) return ""

  const regex = {
    replaceCommas: /\,/g,
    onlyNumber: /^[0-9]*$/,
  }
  // if the first character is not a number then return
  if (!regex.onlyNumber.test(next.charAt(0))) {
    return prev
  }

  //if the input number has decimals greater than maxDecimals then cut
  if(next.split(".")[1]?.length > maxDecimals) {
    return next.split(".")[0] + "." + next.split(".")[1].slice(0, maxDecimals)
  }

  if(Number(next.split(".")[0]) > maxAmount) {
    return next.split(".")[0]?.slice(0, 12) + "." + next.split(".")[1].slice(0, maxDecimals)
  }


  // if the beginning of the character is 0 and the character adjacent to it is a number and the new value is > 1, remove the leading 0
  if (next.charAt(0) === "0" && regex.onlyNumber.test(next.charAt(1)) && next.length > 1) {
    return next.slice(1, next.length)
  }

  // replace all "," by "."
  next = next.replace(regex.replaceCommas, ".")

  if (Number(next.split(".")[0]) > maxAmount) {
    return prev
  }


  if (
    (!prev.includes(".") && next.includes(".")) ||
    (next.charAt(next.length - 1) === "." && next.length < prev.length)
  ) {
    return next
  }

  let matched = false

  // rely on max decimals to get the corresponding regex
  switch (maxDecimals) {
    case 1:
      matched = Boolean(next.match(/^-?\d+(\.\d{1})?$/))
      break
    case 2:
      matched = Boolean(next.match(/^-?\d+(\.\d{1,2})?$/))
      break
    case 3:
      matched = Boolean(next.match(/^-?\d+(\.\d{1,3})?$/))
      break
    case 4:
      matched = Boolean(next.match(/^-?\d+(\.\d{1,4})?$/))
      break
    case 5:
      matched = Boolean(next.match(/^-?\d+(\.\d{1,5})?$/))
      break
    case 6:
      matched = Boolean(next.match(/^-?\d+(\.\d{1,6})?$/))
      break
    case 7:
      matched = Boolean(next.match(/^-?\d+(\.\d{1,7})?$/))
      break
    case 8:
      matched = Boolean(next.match(/^-?\d+(\.\d{1,8})?$/))
      break
  }

  return matched ? next : prev
};
