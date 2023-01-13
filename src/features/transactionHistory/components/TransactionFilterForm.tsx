import { useAppTranslation } from 'app/hooks';
import React, { ChangeEvent } from 'react';
import { InputFilter } from './InputFilter';
import SelectBoxFilter from './SelectBoxFilter';

interface TransactionFilerProps {
  txID?: string;
  optionCoin: { key: number; value: string }[];
  coinSelect?: number;
  optionsStatus: { key: string; value: string }[];
  statusSelect: string;
  optionsType: { key: string; value: string }[];
  typeSelect?: string;
  optionsTime: { key: number; value: string }[];
  timeSelect: number;
  handleChangeCoin?: (value: number) => void;
  handleChangeStatus?: (value: string) => void;
  handleChangeType?: (value: string) => void;
  handleChangeTxID?: (value: ChangeEvent<HTMLInputElement>) => void;
  handleChangeTime?: (value: number) => void;
}

const TransactionFilterForm: React.FunctionComponent<TransactionFilerProps> = ({
  txID,
  optionCoin,
  coinSelect,
  optionsStatus,
  statusSelect,
  optionsType,
  typeSelect,
  optionsTime,
  timeSelect,
  handleChangeCoin,
  handleChangeStatus,
  handleChangeType,
  handleChangeTxID,
  handleChangeTime,
}) => {
  const t = useAppTranslation();
  return (
    <>
      <SelectBoxFilter
        data={optionsType}
        value={typeSelect}
        onChange={handleChangeType}
        label={t('transaction-history.type')}
      />
      <SelectBoxFilter
        data={optionsTime}
        value={timeSelect}
        onChange={handleChangeTime}
        label={t('transaction-history.time')}
      />
      <SelectBoxFilter
        data={optionCoin}
        value={coinSelect}
        onChange={handleChangeCoin}
        label={t('transaction-history.coin')}
      />
      <SelectBoxFilter
        data={optionsStatus}
        value={statusSelect}
        onChange={handleChangeStatus}
        label={t('transaction-history.status')}
      />
      <InputFilter
        onChange={handleChangeTxID}
        placeholder={t('transaction-history.placeholder')}
        value={txID}
        label={t('transaction-history.table.txnID')}
      />
    </>
  );
};

export default TransactionFilterForm;
