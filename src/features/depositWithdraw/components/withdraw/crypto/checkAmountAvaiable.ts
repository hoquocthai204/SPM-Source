import { useAppSelector } from 'app/hooks';
import { selectMarketPrices } from 'features/socket/socketSlice';
import { formatBigNumber } from 'utils';
import BigNumber from 'bignumber.js';

interface AmountProps {
  amount: number;
  fee: number;
  maxWithdraw: number;
  minWithdraw: number;
  availableBalance: number;
  valuation: number;
  userTodayWithdrawalAmount: number;
  dailyWithdrawToday: number;
  lpBuyPrice: number;
}

interface ErrorProps {
  message?: any;
  isError: boolean;
}
export const CheckAmountAvaiable = ({
  amount,
  fee,
  maxWithdraw,
  minWithdraw,
  availableBalance,
  valuation,
  userTodayWithdrawalAmount,
  dailyWithdrawToday,
  lpBuyPrice,
}: AmountProps) => {
  let result: ErrorProps = {
    isError: true,
    message: [],
  };
  const availableBalanceOther = new BigNumber(dailyWithdrawToday)
    .minus(userTodayWithdrawalAmount)
    .dividedBy(lpBuyPrice)
    .toNumber();

  if (amount <= fee) {
    return { ...result, message: ['input.validation.amount.checkErrorAmount.largerFee', fee] };
  }

  if (amount < minWithdraw) {
    return {
      ...result,
      message: ['input.validation.amount.checkErrorAmount.largerThan', minWithdraw],
    };
  }

  if (amount > maxWithdraw) {
    return {
      ...result,
      message: ['input.validation.amount.checkErrorAmount.smallerThan', maxWithdraw],
    };
  }

  if (amount > availableBalance) {
    return {
      ...result,
      message: ['input.validation.amount.checkErrorAmount.smallerAvaiable', availableBalance],
    };
  }

  if (amount > availableBalanceOther) {
    return {
      ...result,
      message: [
        'input.validation.amount.checkErrorAmount.dailyWithdrawToday',
        formatBigNumber(availableBalanceOther, 'crypto'),
      ],
    };
  }
  return { ...result, isError: false };
};
