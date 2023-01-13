import { Radio } from 'antd';
import { useAppDispatch, useAppSelector } from 'app/hooks';
import React, { useCallback, useState } from 'react';
import { isDisabledButtonAmountState, tradeActions } from '../TradeSlice';
interface AmountByPercentButtonsProps {
  onChange?: any;
  disabledRadio?: number | undefined;
}
const AmountByPercentButtons: React.FunctionComponent<AmountByPercentButtonsProps> = ({
  onChange,
}) => {
  const isDisabledButtonAmount = useAppSelector(isDisabledButtonAmountState);
  const dispatch = useAppDispatch();
  const [currentValue, setCurrentValue] = useState('');
  const onClick = useCallback(
    ({ target: { value } }) => {
      const newValue = currentValue !== value ? value : '';
      setCurrentValue(newValue);
      dispatch(tradeActions.setIsDisabledButtonAmount(true));
      if (onChange) onChange(newValue);
    },
    [currentValue, dispatch, onChange]
  );

  return (
    <>
      <Radio.Group value={isDisabledButtonAmount ? currentValue : 0} buttonStyle="solid">
        <Radio.Button value="0.25" onClick={onClick}>
          25%
        </Radio.Button>
        <Radio.Button value="0.5" onClick={onClick}>
          50%
        </Radio.Button>
        <Radio.Button value="0.75" onClick={onClick}>
          75%
        </Radio.Button>
        <Radio.Button value="1" onClick={onClick}>
          100%
        </Radio.Button>
      </Radio.Group>
    </>
  );
};
export default AmountByPercentButtons;
