import { Button, Input } from 'antd';
import lpApi from 'api/lpApi';
import { useAppDispatch, useAppSelector, useAppTranslation, useErrTranslation } from 'app/hooks';
import BigNumber from 'bignumber.js';
import { showErrorModal } from 'components/Modals';
import {
  DEFAULT_MAX_AMOUNT,
  DEFAULT_MAX_MOVEMENT_FOR_CURRENCY,
  DEFAULT_MIN_MOVEMENT_FOR_FIAT,
} from 'consts';
import { BestPriceResponse, TradeSettingResponse } from 'models';
import React, { ChangeEvent, useCallback, useEffect, useState } from 'react';
import { formatAmount } from 'utils';
import { formatAmountForInput, formatCurrency } from 'utils/formatCurrencyOrFiat';
import { cryptoActions, cryptoStates } from '../cryptoSlice';
import { tradeActions } from '../TradeSlice';
import AmountByPercentButtons from './AmountByPercentButtons';

interface BuyProps {
  orderSide: 'BUY';
  settingCurrency?: TradeSettingResponse;
  availableBalance: number | undefined;
  coinBase: string;
  coinQuote: string;
}
interface Error {
  isError: boolean;
  message?: string;
}
BigNumber.config({
  DECIMAL_PLACES: 8,
});

const Buy: React.FunctionComponent<BuyProps> = ({
  orderSide,
  settingCurrency,
  availableBalance,
  coinBase,
  coinQuote,
}) => {
  const t = useAppTranslation();
  const et = useErrTranslation();

  const dispatch = useAppDispatch();
  const { amountSpend, amountReceive, fee } = useAppSelector(cryptoStates);

  const [error, setError] = useState<Error>({ isError: false });
  const [errorMax, setErrorMax] = useState<Error>({ isError: false });

  const [bestPriceResponse, setBestPriceResponse] = useState<BestPriceResponse | undefined>();

  useEffect(() => {
    if (!!isNaN(amountSpend) || !!isNaN(amountReceive)) {
      dispatch(cryptoActions.setAmountSpend(null));
      dispatch(cryptoActions.setAmountReceive(null));
    }
    dispatch(cryptoActions.setPrice(bestPriceResponse?.price));
  }, [bestPriceResponse?.price, amountReceive, amountSpend, dispatch]);

  useEffect(() => {
    getBestPrice();
    dispatch(cryptoActions.setDefault());
    dispatch(tradeActions.setIsDisabledButtonAmount(false));
  }, [coinBase, coinQuote, dispatch]);

  const getBestPrice = useCallback(async () => {
    const { body } = await lpApi.postBestPrice({
      amount: null,
      baseAsset: coinBase,
      orderSide: orderSide,
      quoteAsset: coinQuote,
    });
    setBestPriceResponse(body);
  }, [coinBase, coinQuote, orderSide]);

  useEffect(() => {
    const intervalId = setInterval(async () => {
      const { body } = await lpApi.postBestPrice({
        amount: amountReceive || null,
        baseAsset: coinBase,
        orderSide: orderSide,
        quoteAsset: coinQuote,
      });
      setBestPriceResponse(body);
    }, 3000);
    return () => clearInterval(intervalId);
  }, [coinBase, coinQuote, orderSide, amountReceive]);

  useEffect(() => {
    if (amountReceive > (settingCurrency?.maxBuy || 0)) {
      setError({
        isError: true,
        message: `${et('trade.lesserThanMax')} ${settingCurrency?.maxBuy}`,
      });
      setErrorMax({ isError: false });
    } else if (amountReceive < (settingCurrency?.minBuy || 0) && amountReceive !== null) {
      setError({
        isError: true,
        message: `${et('trade.largerThanMin')} ${settingCurrency?.minBuy}`,
      });
    } else {
      setError({ isError: false });
    }
    if (availableBalance && amountSpend > availableBalance) {
      setErrorMax({
        isError: true,
        message: `${et('trade.lesserThanAvailable')} `,
      });
    } else {
      setErrorMax({ isError: false });
    }
  }, [
    amountReceive,
    amountSpend,
    availableBalance,
    et,
    settingCurrency?.maxBuy,
    settingCurrency?.minAmountMovement,
    settingCurrency?.minBuy,
  ]);

  const [prevValueInputFiat, setPrevValueInputFiat] = useState<string>('');
  const handleOnChangeFiat = async (event: ChangeEvent<HTMLInputElement>) => {
    const fiat: string = event.target.value;
    setPrevValueInputFiat(fiat);
    const amount = formatAmountForInput(prevValueInputFiat, fiat, {
      maxDecimals: DEFAULT_MIN_MOVEMENT_FOR_FIAT.toString().split('.')[1]?.length,
      maxAmount: DEFAULT_MAX_AMOUNT,
    });

    dispatch(tradeActions.setIsDisabledButtonAmount(false));
    dispatch(cryptoActions.setAmountSpend(amount));
    dispatch(
      cryptoActions.setAmountReceive(
        bestPriceResponse
          ? formatCurrency(
              new BigNumber(amount).div(bestPriceResponse?.price || 1),
              settingCurrency?.minAmountMovement
            )
          : settingCurrency?.minBuy
      )
    );
    dispatch(
      cryptoActions.setFee(
        bestPriceResponse
          ? formatCurrency(
              amount
                ? new BigNumber(amount)
                    .div(bestPriceResponse?.price || 1)
                    .times(settingCurrency?.percentBuyFee || 0)
                    .div(100)
                : 0,
              DEFAULT_MAX_MOVEMENT_FOR_CURRENCY
            )
          : 0
      )
    );
  };

  const [prevValueInputCurrency, setPrevValueInputCurrency] = useState<string>('');
  const handleOnChangeCurrency = async (event: ChangeEvent<HTMLInputElement>) => {
    const currency: string = event.target.value;
    setPrevValueInputCurrency(currency);
    const amount = formatAmountForInput(prevValueInputCurrency, currency, {
      maxDecimals: Number(
        new BigNumber(settingCurrency?.minAmountMovement || 0).e?.toString()?.split('')[1] || 0
      ),
      maxAmount: DEFAULT_MAX_AMOUNT,
    });

    dispatch(tradeActions.setIsDisabledButtonAmount(false));
    dispatch(cryptoActions.setAmountReceive(amount));
    dispatch(
      cryptoActions.setAmountSpend(
        bestPriceResponse
          ? formatCurrency(
              new BigNumber(amount).times(bestPriceResponse?.price || 1),
              DEFAULT_MIN_MOVEMENT_FOR_FIAT
            )
          : settingCurrency?.minBuy
      )
    );
    dispatch(
      cryptoActions.setFee(
        bestPriceResponse
          ? formatCurrency(
              amount
                ? new BigNumber(amount).times(settingCurrency?.percentBuyFee || 0).div(100)
                : 0,
              DEFAULT_MAX_MOVEMENT_FOR_CURRENCY
            )
          : 0
      )
    );
  };

  const onChange = async (value: number) => {
    const newAmount = formatCurrency(
      new BigNumber(availableBalance || 0).times(value),
      DEFAULT_MIN_MOVEMENT_FOR_FIAT
    );
    dispatch(cryptoActions.setAmountSpend(newAmount));
    dispatch(
      cryptoActions.setAmountReceive(
        bestPriceResponse
          ? formatCurrency(
              new BigNumber(newAmount).div(bestPriceResponse?.price || 1),
              settingCurrency?.minAmountMovement
            )
          : settingCurrency?.minBuy
      )
    );

    dispatch(
      cryptoActions.setFee(
        bestPriceResponse
          ? formatCurrency(
              !isNaN(Number(newAmount))
                ? new BigNumber(newAmount)
                    .div(bestPriceResponse?.price || 1)
                    .times(settingCurrency?.percentBuyFee || 0)
                    .div(100)
                : 0,
              DEFAULT_MAX_MOVEMENT_FOR_CURRENCY
            )
          : 0
      )
    );
  };

  const handleOnClick = () => {
    if (!bestPriceResponse) {
      showErrorModal({ message: et('trade.noResponse') });
    } else if (settingCurrency?.enabledBuy) {
      if (!error.isError && amountReceive !== null && !isNaN(amountReceive)) {
        dispatch(tradeActions.setStepTrade(1));
      } else if (amountReceive === null || isNaN(amountReceive)) {
        setError({ isError: true, message: et('trade.enterAmount') });
      }
    } else showErrorModal({ message: et('trade.disableCurrency') });
  };

  return (
    <>
      <div className="buy-crypto">
        <div className="buy-crypto__tag text-md-12-20">
          <div className="buy-crypto__tag-market">{t('trade.buyCrypto.market')}</div>
        </div>
        <div className="buy-crypto__available">
          <div className="text-rg-14-24">{t('trade.buyCrypto.available')}</div>
          <div className="text-sb-14-24">
            {formatAmount((availableBalance || 0).toString()) + ' ' + coinQuote}
          </div>
        </div>
        <div className="buy-crypto__amount">
          <Input
            className="text-rg-14-24"
            suffix={coinQuote}
            placeholder={t('trade.buyCrypto.placeholderAmountSpend')}
            onChange={handleOnChangeFiat}
            value={amountSpend}
            style={errorMax.isError ? { color: 'red', borderColor: 'red' } : {}}
          />
          {errorMax.isError ? <div style={{ color: 'red' }}>{errorMax.message}</div> : <></>}
        </div>
        <div className="buy-crypto__group-btn-amount">
          <AmountByPercentButtons onChange={onChange} disabledRadio={0} />
        </div>
        <div className="buy-crypto__receive">
          <Input
            className="text-rg-14-24"
            suffix={coinBase}
            onChange={handleOnChangeCurrency}
            placeholder={t('trade.buyCrypto.placeholderAmountReceive')}
            value={amountReceive}
            style={error.isError ? { color: 'red', borderColor: 'red' } : {}}
          />
          {error.isError ? <div style={{ color: 'red' }}>{error.message}</div> : <></>}
        </div>
        <div className="buy-crypto__description-info">
          <div className="buy-crypto__estimated">
            <div className="text-rg-14-24">{t('trade.buyCrypto.estimate')}</div>
            <div className="text-sb-14-24">
              {formatAmount((bestPriceResponse?.price || 0).toString()) + ' ' + coinQuote}
            </div>
          </div>
          <div className="buy-crypto__fee">
            <div className="text-rg-14-24">{t('trade.buyCrypto.fee')}</div>
            <div className="text-sb-14-24">
              {/* {(bestPriceResponse ? (fee ? fee : 0) : 0) + ' ' + coinBase} */}
              {`${settingCurrency?.percentBuyFee}%`}
            </div>
          </div>
        </div>

        <Button className="buy-crypto__btn-buy" type="primary" onClick={handleOnClick}>
          {t('trade.buyCrypto.btnBuy')}
        </Button>
      </div>
    </>
  );
};

export default Buy;
