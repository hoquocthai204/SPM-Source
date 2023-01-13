import * as React from 'react';
import data_not_found from 'assets/images/data_not_found.png';
import { DepositWithdrawFailedIcon } from 'components/Icons';
interface DisableDepositOrWithdrawProps {
  message?: string;
}

export const DisableDepositOrWithdraw: React.FunctionComponent<DisableDepositOrWithdrawProps> = ({
  message,
}) => {
  return (
    <>
      <div className="flex-col flex-jt-space-bettween flex-ai-center">
        <DepositWithdrawFailedIcon />
        <div className="text-sb-20-20">{message}</div>
      </div>
    </>
  );
};
