import { useAppTranslation } from 'app/hooks';
import React from 'react';
import SelectBoxOrderFilter from './SelectBoxOrderFilter';

interface OrderProps {
  optionsCoin: { key: string; value: string}[];
  coinSelect: string;
  optionsSide: { key: string; value: string}[];
  sideSelect: string;
  optionsTime: { key: number; value: string}[];
  timeSelect: number;
  handleChangeCoin?: (value: string) => void;
  handleChangeSide?: (value: string) => void;
  handleChangeTime?: (value: number) => void;
}

const OrderSearchForm: React.FunctionComponent<OrderProps> = ({ 
  optionsCoin,
  coinSelect,
  optionsTime,
  timeSelect,
  optionsSide,
  sideSelect,
  handleChangeCoin,
  handleChangeSide,
  handleChangeTime,
 }) => {
  const t = useAppTranslation();
  return (
    <>
      <SelectBoxOrderFilter
        data={optionsTime}
        value={timeSelect}
        onChange={handleChangeTime}
        label={t('order-history.time')}
      />
      <SelectBoxOrderFilter
        data={optionsCoin}
        value={coinSelect}
        onChange={handleChangeCoin}
        label={t('order-history.coin')}
      />
      <SelectBoxOrderFilter
        data={optionsSide}
        value={sideSelect}
        onChange={handleChangeSide}
        label={t('order-history.side')}
      />
    </>
  );
};

export default OrderSearchForm;
