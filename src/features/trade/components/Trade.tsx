import lpApi from 'api/lpApi';
import { useAppDispatch, useAppSelector, useAppTranslation, useErrTranslation } from 'app/hooks';
import backgroundBottom from 'assets/images/background_buysell.png';
import { showErrorModal } from 'components/Modals';
import { useSubmitForm } from 'hooks';
import { PlaceOrderParams, PlaceOrderResponse, TradeSettingResponse } from 'models';
import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { cryptoActions, cryptoStates } from '../cryptoSlice';
import { stepTradeState, tradeActions } from '../TradeSlice';
import Buy from './Buy';
import Sell from './Sell';
import TradePreview from './TradePreview';
import TradeResult from './TradeResult';

interface TradeProps {
  isTrade?: boolean;
}

const Trade: React.FunctionComponent<TradeProps> = ({ isTrade }) => {
  const t = useAppTranslation();
  const et = useErrTranslation();

  const dispatch = useAppDispatch();

  const stepTrade = useAppSelector(stepTradeState);
  const tradeState = useAppSelector(cryptoStates);

  const initialBuyCryptoFormValues = {
    amount: tradeState.amountReceive,
  };
  const initialSellCryptoFormValues = {
    amount: tradeState.amountSpend,
  };

  const [searchParams, setSearchParams] = useSearchParams({});

  const pairFromQuery = useMemo(() => {
    const base = searchParams.get('coinBase');
    const quote = searchParams.get('coinQuote');
    const side = searchParams.get('orderSide');
    if (!base || !quote || quote !== 'THB') return undefined;
    else {
      return { base, quote, side };
    }
  }, [searchParams]);

  // useEffect(() => {
  //   setSearchParams({ orderSide: pairFromQuery?.side ? 'buy' : 'sell' });
  // }, [pairFromQuery?.side]);

  const [isBuy, setIsBuy] = useState<boolean>(pairFromQuery?.side === 'buy' ? true : false);
  const [settingCurrency, setSettingCurrency] = useState<TradeSettingResponse>();
  const [isError, setIsError] = useState<boolean>(false);
  const [wallets, setWallets] = useState<any[]>();
  const [responseBuyPlaceOrder, setResponseBuyPlaceOrder] = useState<PlaceOrderResponse>();
  const [responseSellPlaceOrder, setResponseSellPlaceOrder] = useState<PlaceOrderResponse>();

  const getAllWallet = useCallback(async () => {
    const { body } = await lpApi.getWallet();
    if (body) {
      setWallets(body);
    }
  }, []);

  const getSettingConfigCurrency = useCallback(async (coinBase, coinQuote) => {
    const { body } = await lpApi.getTradeSetting({ symbol: coinBase + '_' + coinQuote });
    if (body) {
      setSettingCurrency(body);
    }
  }, []);

  useEffect(() => {
    getAllWallet();
  }, [responseBuyPlaceOrder, responseSellPlaceOrder]);

  useEffect(() => {
    getSettingConfigCurrency(pairFromQuery?.base, pairFromQuery?.quote);
    dispatch(tradeActions.setStepTrade(0));
    setSearchParams({
      orderSide: isBuy ? 'buy' : 'sell',
      coinBase: pairFromQuery?.base || '',
      coinQuote: pairFromQuery?.quote || '',
    });
  }, [
    pairFromQuery?.base,
    pairFromQuery?.quote,
    isBuy,
    dispatch,
    getSettingConfigCurrency,
    setSearchParams,
  ]);

  const onSubmitBuyCryptoForm = useSubmitForm(async (value: PlaceOrderParams) => {
    if (isTrade) {
      if (settingCurrency?.enabledBuy) {
        const { ok, error, body } = await lpApi.postPlaceOrder({
          ...value,
          orderSide: 'BUY',
          coinPair: pairFromQuery?.base + '_' + pairFromQuery?.quote,
          price: 'MARKET',
          orderType: 'MARKET',
        });
        dispatch(tradeActions.setStepTrade(2));
        if (ok) dispatch(tradeActions.setStepTrade(2));
        else if (error) setIsError(true);
        if (body) {
          if (body?.orderStatus !== 'COMPLETED') {
            setIsError(true);
          }
          setResponseBuyPlaceOrder(body);
        }
      } else {
        showErrorModal({ message: et('trade.unableToBuy') });
      }
    } else {
      showErrorModal({ message: et('trade.systemDisabled') });
    }
  });

  const onSubmitSellCryptoForm = useSubmitForm(async (value: any) => {
    if (isTrade) {
      if (settingCurrency?.enabledSell) {
        const { ok, error, body } = await lpApi.postPlaceOrder({
          ...value,
          orderSide: 'SELL',
          coinPair: pairFromQuery?.base + '_' + pairFromQuery?.quote,
          price: 'MARKET',
          orderType: 'MARKET',
        });

        dispatch(tradeActions.setStepTrade(2));
        if (ok) dispatch(tradeActions.setStepTrade(2));
        else if (error || body?.orderStatus !== 'COMPLETED') setIsError(true);
        if (body) {
          if (body?.orderStatus !== 'COMPLETED') {
            setIsError(true);
          }
          setResponseSellPlaceOrder(body);
        }
      } else {
        showErrorModal({ message: et('trade.unableToSell') });
      }
    } else {
      showErrorModal({ message: et('trade.systemDisabled') });
    }
  });

  return (
    <>
      <div className="transaction-crypto">
        <div className="transaction-crypto__tabs">
          <button
            className={`tab-item buy-crypto${isBuy ? '' : '--disabled'}`}
            onClick={() => {
              if (!isBuy) {
                setIsBuy(true);
                dispatch(cryptoActions.setDefault());
              }
            }}
            disabled={!!stepTrade ? true : false}
          >
            {t('trade.buyCrypto.tagBuy')}
          </button>
          <button
            className={`tab-item sell-crypto${!isBuy ? '' : '--disabled'}`}
            onClick={() => {
              if (isBuy) {
                setIsBuy(false);
                dispatch(cryptoActions.setDefault());
              }
            }}
            disabled={!!stepTrade ? true : false}
          >
            {t('trade.sellCrypto.tagSell')}
          </button>
        </div>
        <div className="transaction-crypto__container">
          {stepTrade === 0 &&
            (isBuy ? (
              <Buy
                orderSide="BUY"
                settingCurrency={settingCurrency}
                availableBalance={wallets?.find((x) => x?.currency === 'THB').availableBalance}
                coinBase={pairFromQuery?.base || ''}
                coinQuote={pairFromQuery?.quote || ''}
              />
            ) : (
              <Sell
                orderSide="SELL"
                settingCurrency={settingCurrency}
                availableBalance={
                  wallets?.find((x) => x?.currency === pairFromQuery?.base).availableBalance
                }
                coinBase={pairFromQuery?.base || ''}
                coinQuote={pairFromQuery?.quote || ''}
              />
            ))}
          {stepTrade === 1 && (
            <TradePreview
              onSubmit={isBuy ? onSubmitBuyCryptoForm : onSubmitSellCryptoForm}
              initialValues={isBuy ? initialBuyCryptoFormValues : initialSellCryptoFormValues}
              orderSide={isBuy ? 'BUY' : 'SELL'}
              coinBase={pairFromQuery?.base || ''}
              coinQuote={pairFromQuery?.quote || ''}
            />
          )}
          {stepTrade === 2 && (
            <TradeResult
              result={!isError || responseBuyPlaceOrder?.orderStatus === 'COMPLETED'}
              orderSide={isBuy ? 'BUY' : 'SELL'}
              infoTrade={isBuy ? responseBuyPlaceOrder : responseSellPlaceOrder}
            />
          )}
        </div>
        <div className="background__img__bottom">
          <img src={backgroundBottom} alt="" />
        </div>
      </div>
    </>
  );
};

export default Trade;
