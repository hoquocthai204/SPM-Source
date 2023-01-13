import { Button, Input } from 'antd';
import lpApi from 'api/lpApi';
import { useAppDispatch, useAppSelector, useAppTranslation, useErrTranslation } from 'app/hooks';
import BigNumber from 'bignumber.js';
import { showErrorModal } from 'components/Modals';
import { DEFAULT_MAX_AMOUNT, DEFAULT_MIN_MOVEMENT_FOR_FIAT } from 'consts';
import { BestPriceResponse, TradeSettingResponse } from 'models';
import React, { ChangeEvent, useCallback, useEffect, useState } from 'react';
import { formatAmount } from 'utils';
import { formatAmountForInput, formatCurrency } from 'utils/formatCurrencyOrFiat';
import { cryptoActions, cryptoStates } from '../cryptoSlice';
import { tradeActions } from '../TradeSlice';
import AmountByPercentButtons from './AmountByPercentButtons';

interface SellProps {
  orderSide: 'SELL';
  settingCurrency?: TradeSettingResponse;
  availableBalance: number | undefined;
  coinBase: string;
  coinQuote: string;
}

interface Error {
  isError: boolean;
  message?: string;
}
const Sell: React.FunctionComponent<SellProps> = ({
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
  const [bestPriceResponse, setBestPriceResponse] = useState<BestPriceResponse | undefined>();

  useEffect(() => {
    if (!!isNaN(amountSpend) || !!isNaN(amountReceive)) {
      dispatch(cryptoActions.setAmountSpend(undefined));
      dispatch(cryptoActions.setAmountReceive(null));
    }
    dispatch(cryptoActions.setPrice(bestPriceResponse?.price));
  }, [amountSpend, dispatch, amountReceive, bestPriceResponse?.price]);

  useEffect(() => {
    getBestPrice();
    dispatch(cryptoActions.setDefault());
    dispatch(tradeActions.setIsDisabledButtonAmount(false));
  }, [coinBase, coinQuote, dispatch]);

  const getBestPrice = useCallback(async () => {
    const { body } = await lpApi.postBestPrice({
      amount: amountSpend || null,
      baseAsset: coinBase,
      orderSide: orderSide,
      quoteAsset: coinQuote,
    });
    setBestPriceResponse(body);
  }, [amountSpend, coinBase, coinQuote, orderSide]);

  useEffect(() => {
    const intervalId = setInterval(async () => {
      const { body } = await lpApi.postBestPrice({
        amount: amountSpend || null,
        baseAsset: coinBase,
        orderSide: orderSide,
        quoteAsset: coinQuote,
      });
      setBestPriceResponse(body);
    }, 3000);
    return () => clearInterval(intervalId);
  }, [coinBase, coinQuote, amountSpend, orderSide]);

  useEffect(() => {
    if (amountSpend > (settingCurrency?.maxSell || 0)) {
      setError({
        isError: true,
        message: `${et('trade.lesserThanMax')} ${settingCurrency?.maxSell}`,
      });
    } else if (amountSpend < (settingCurrency?.minSell || 0)) {
      setError({
        isError: true,
        message: `${et('trade.largerThanMin')} ${settingCurrency?.minSell}`,
      });
    } else if (availableBalance && amountSpend > availableBalance) {
      setError({
        isError: true,
        message: `${et('trade.lesserThanAvailable')} `,
      });
    } else {
      setError({ isError: false });
    }
  }, [
    amountSpend,
    availableBalance,
    et,
    settingCurrency?.maxSell,
    settingCurrency?.minAmountMovement,
    settingCurrency?.minSell,
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
    dispatch(cryptoActions.setAmountReceive(amount));
    dispatch(
      cryptoActions.setAmountSpend(
        bestPriceResponse
          ? formatCurrency(
              new BigNumber(amount).dividedBy(bestPriceResponse?.price || 1),
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
                ? new BigNumber(
                    new BigNumber(new BigNumber(parseFloat(event.target.value))).multipliedBy(
                      settingCurrency?.percentSellFee || 0
                    )
                  ).dividedBy(100)
                : 0,
              DEFAULT_MIN_MOVEMENT_FOR_FIAT
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
    dispatch(cryptoActions.setAmountSpend(amount));
    dispatch(
      cryptoActions.setAmountReceive(
        bestPriceResponse
          ? formatCurrency(
              new BigNumber(amount).times(bestPriceResponse?.price || 0),
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
                ? new BigNumber(amount)
                    .times(bestPriceResponse?.price || 0)
                    .times(settingCurrency?.percentSellFee || 0)
                    .div(100)
                : 0,
              DEFAULT_MIN_MOVEMENT_FOR_FIAT
            )
          : 0
      )
    );
  };

  const onChange = async (value: number) => {
    const newAmount = formatCurrency(
      new BigNumber(availableBalance || 0).times(value),
      settingCurrency?.minAmountMovement
    );

    dispatch(cryptoActions.setAmountSpend(newAmount));
    dispatch(
      cryptoActions.setAmountReceive(
        bestPriceResponse
          ? formatCurrency(
              new BigNumber(newAmount).times(bestPriceResponse?.price || 0),
              DEFAULT_MIN_MOVEMENT_FOR_FIAT
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
                    .times(bestPriceResponse?.price || 0)
                    .times(settingCurrency?.percentSellFee || 0)
                    .div(100)
                : 0,
              DEFAULT_MIN_MOVEMENT_FOR_FIAT
            )
          : 0
      )
    );
  };

  const handleOnClick = () => {
    if (!bestPriceResponse) {
      showErrorModal({ message: et('trade.noResponse') });
    } else if (settingCurrency?.enabledSell) {
      if (!error.isError && amountReceive !== null && !isNaN(amountReceive)) {
        dispatch(tradeActions.setStepTrade(1));
      } else if (amountReceive === null || isNaN(amountReceive)) {
        setError({ isError: true, message: et('trade.enterAmount') });
      }
    } else showErrorModal({ message: et('trade.disableCurrency') });
  };

  return (
    <>
      <div className="sell-crypto">
        <div className="sell-crypto__tag text-md-12-20">
          <div className="sell-crypto__tag-market">{t('trade.sellCrypto.market')}</div>
        </div>
        <div className="sell-crypto__available">
          <div className="text-rg-14-24">{t('trade.sellCrypto.available')}</div>
          <div className="text-sb-14-24">
            {formatAmount((availableBalance || 0).toString()) + ' ' + coinBase}
          </div>
        </div>
        <div className="sell-crypto__amount">
          <Input
            className="text-rg-14-24"
            suffix={coinBase}
            placeholder={t('trade.sellCrypto.placeholderAmountSpend')}
            onChange={handleOnChangeCurrency}
            value={amountSpend}
            style={error.isError ? { color: 'red', borderColor: 'red' } : {}}
          />
          {error.isError ? <div style={{ color: 'red' }}>{error.message}</div> : <></>}
        </div>
        <div className="sell-crypto__group-btn-amount">
          <AmountByPercentButtons onChange={onChange} />
        </div>
        <div className="sell-crypto__receive">
          <Input
            className="text-rg-14-24"
            suffix={'THB'}
            placeholder={t('trade.sellCrypto.placeholderAmountReceive')}
            value={amountReceive}
            onChange={handleOnChangeFiat}
          />
        </div>
        <div className="sell-crypto__description-info">
          <div className="sell-crypto__estimated">
            <div className="text-rg-14-24">{t('trade.sellCrypto.estimate')}</div>
            <div className="text-sb-14-24">
              {formatAmount((bestPriceResponse?.price || 0).toString()) + ' ' + coinQuote}
            </div>
          </div>
          <div className="sell-crypto__fee">
            <div className="text-rg-14-24">{t('trade.sellCrypto.fee')}</div>
            <div className="text-sb-14-24">
              {/* {(bestPriceResponse ? (fee ? fee : 0) : 0) + ' ' + coinQuote} */}
              {`${settingCurrency?.percentSellFee}%`}
            </div>
          </div>
        </div>

        <Button className="sell-crypto__btn-sell" type="primary" onClick={handleOnClick}>
          {t('trade.sellCrypto.btnSell')}
        </Button>
      </div>
    </>
  );
};

export default Sell;
