import React from 'react';
import TabDepositHistoryFiat from './deposit/fiat/TabDepositHistoryFiat';
import TabDepositHistoryCrypto from './deposit/crypto/TabDepositHistoryCrypto';

interface DepositHistoryTableProps {
  type?: 'fiat' | 'crypto';
}

const DepositHistoryTable: React.FunctionComponent<DepositHistoryTableProps> = ({ type }) => {
  return (
    <>
      {type === 'fiat' && <TabDepositHistoryFiat />}
      {type === 'crypto' && <TabDepositHistoryCrypto />}
    </>
  );
};

export default DepositHistoryTable;
