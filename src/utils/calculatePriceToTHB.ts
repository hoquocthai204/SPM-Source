// args[0]: availableBalance
// args[1]: blockedBalance
// args[2]: price
export const calculatePriceToTHB = (...args: number[]) =>
  (args[2] ?? 1) * (args[0] ?? 0 + args[1] ?? 0);
