import { SPLIT_NUMBER_REGEX } from "consts";

export const formatAmount= (value: string): string => {
  let num_split = value.split('.')
  num_split[0] = num_split[0].replace(SPLIT_NUMBER_REGEX, ",");
  return num_split.join('.');
}