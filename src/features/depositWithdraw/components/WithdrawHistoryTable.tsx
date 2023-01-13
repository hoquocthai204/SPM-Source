import React from 'react';
import TabWithdrawHistory from './deposit/fiat/TabWithdrawHistory';
import { useAppTranslation } from 'app/hooks';
import TabWithdrawHistoryCrypto from './withdraw/crypto/TabWithdrawHistoryCrypto';
import { PropsDataTable } from 'models';

interface WithdrawHistoryTableProps {
  type?: 'fiat' | 'crypto';
  propsDataTable?: PropsDataTable;
}

const WithdrawHistoryTable: React.FunctionComponent<WithdrawHistoryTableProps> = ({
  type,
  propsDataTable,
}) => {
  const t = useAppTranslation();
  return (
    <>
      {type === 'fiat' && <TabWithdrawHistory propsDataTable={propsDataTable} />}{' '}
      {type === 'crypto' && <TabWithdrawHistoryCrypto />}
    </>
  );
};

export default WithdrawHistoryTable;
