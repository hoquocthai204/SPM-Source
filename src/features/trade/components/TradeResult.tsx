import { Button } from 'antd';
import { useAppDispatch, useAppTranslation } from 'app/hooks';
import BigNumber from 'bignumber.js';
import { TransactionFailedIcon, TransactionSuccessIcon } from 'components/Icons';
import { DATE_TIME_FORMAT } from 'consts';
import date from 'date-and-time';
import { PlaceOrderResponse } from 'models';
import React from 'react';
import { cryptoActions } from '../cryptoSlice';
import { tradeActions } from '../TradeSlice';

interface TradeResultProps {
  result: Boolean;
  orderSide: 'BUY' | 'SELL';
  infoTrade?: PlaceOrderResponse;
}

const TradeResult: React.FunctionComponent<TradeResultProps> = ({
  result,
  orderSide,
  infoTrade,
}) => {
  const t = useAppTranslation();
  const dispatch = useAppDispatch();

  let color: string;
  if (orderSide === 'BUY') {
    color = '#00632B';
  } else color = '#D83232';

  const handleOnClick = () => {
    dispatch(cryptoActions.setAmountSpend(undefined));
    dispatch(cryptoActions.setPrice(0));
    dispatch(cryptoActions.setFee(0));
    dispatch(cryptoActions.setAmountReceive(undefined));
    dispatch(tradeActions.setStepTrade(0));
  };

  return (
    <>
      {result ? (
        <div className="crypto-success">
          <TransactionSuccessIcon />
          <span className="success__title">
            {infoTrade?.orderSide === 'BUY'
              ? t('trade.tradeCryptoResult.titleBuySuccess')
              : t('trade.tradeCryptoResult.titleSellSuccess')}
          </span>
          <div className="success__description">
            <div className="crypto-preview__content">
              <div className="crypto-preview__content__item ">
                <div className="text-rg-14-24">{t('trade.tradeCryptoResult.time')}</div>
                <div className="text-md-14-24">
                  {date.format(new Date(infoTrade?.createdDate || ''), DATE_TIME_FORMAT)}
                </div>
              </div>
              <div className="crypto-preview__content__item">
                <div className="text-rg-14-24">{t('trade.tradeCryptoResult.id')}</div>
                <div className="text-md-14-24">{infoTrade?.orderId}</div>
              </div>
              <div className="crypto-preview__content__item">
                <div className="text-rg-14-24">{t('trade.tradeCryptoResult.instrument')}</div>
                <div className="text-md-14-24">{infoTrade?.orderType}</div>
              </div>
              <div className="crypto-preview__content__item">
                <div className="text-rg-14-24">{t('trade.tradeCryptoResult.direction')}</div>
                <div className="text-md-14-24" style={{ color: color }}>
                  {infoTrade?.orderSide}
                </div>
              </div>
              <div className="crypto-preview__content__item">
                <div className="text-rg-14-24">{t('trade.tradeCryptoResult.amount')}</div>
                <div className="text-md-14-24">
                  {infoTrade?.executedQuantity + ' ' + infoTrade?.instrument.split('_')[0]}
                </div>
              </div>
              <div className="crypto-preview__content__item">
                <div className="text-rg-14-24">{t('trade.tradeCryptoResult.price')}</div>
                <div className="text-md-14-24">
                  {infoTrade?.executedPrice + ' ' + infoTrade?.instrument.split('_')[1]}
                </div>
              </div>
              <div className="crypto-preview__content__item">
                <div className="text-rg-14-24">{t('trade.tradeCryptoResult.fee')}</div>
                <div className="text-md-14-24">{infoTrade?.fee + ' ' + infoTrade?.unitFee}</div>
              </div>
              <div className="crypto-preview__content__item">
                <div className="text-rg-14-24">{t('trade.tradeCryptoResult.receive')}</div>
                <div className="text-md-14-24">
                  {infoTrade?.orderSide === 'BUY' &&
                    new BigNumber(infoTrade?.executedQuantity).minus(
                      new BigNumber(infoTrade?.fee)
                    ) +
                      ' ' +
                      infoTrade?.instrument.split('_')[0]}{' '}
                  {infoTrade?.orderSide === 'SELL' &&
                    new BigNumber(infoTrade?.executedPrice)
                      .times(new BigNumber(infoTrade?.executedQuantity))
                      .minus(new BigNumber(infoTrade?.fee)) +
                      ' ' +
                      infoTrade?.instrument.split('_')[1]}
                </div>
              </div>
            </div>
          </div>
          <Button
            className="crypto-result__btn"
            type="primary"
            onClick={handleOnClick}
            style={{ backgroundColor: color, borderColor: color }}
          >
            {t('trade.tradeCryptoResult.btn')}
          </Button>
        </div>
      ) : (
        <div className="crypto-failed">
          <TransactionFailedIcon />
          <span className="failed__title">
            {infoTrade?.orderSide === 'BUY'
              ? t('trade.tradeCryptoResult.titleBuyFailed')
              : t('trade.tradeCryptoResult.titleSellFailed')}
          </span>
          <div className="failed__description">
            {infoTrade?.orderSide === 'BUY'
              ? t('trade.tradeCryptoResult.descriptionBuyFailed')
              : t('trade.tradeCryptoResult.descriptionSellFailed')}
          </div>
          <Button
            className="crypto-result__btn"
            type="primary"
            onClick={handleOnClick}
            style={{ backgroundColor: color, borderColor: color }}
          >
            {t('trade.tradeCryptoResult.btn')}
          </Button>
        </div>
      )}
    </>
  );
};

export default TradeResult;
