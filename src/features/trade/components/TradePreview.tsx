import { Button, Form } from 'antd';
import { useAppDispatch, useAppSelector, useAppTranslation } from 'app/hooks';
import { SubmitButton, VerticalForm } from 'components/Forms';
import React from 'react';
import { CountdownCircleTimer } from 'react-countdown-circle-timer';
import { cryptoStates } from '../cryptoSlice';
import { tradeActions } from '../TradeSlice';
import { PreviewField } from './PreviewField';

interface TradePreviewProps {
  initialValues: any;
  onSubmit: any;
  orderSide: 'BUY' | 'SELL';
  value?: object;
  coinBase: string;
  coinQuote: string;
}

const checkOrderSide = (side: 'BUY' | 'SELL') => {
  if (side === 'BUY') {
    return '#00632B';
  } else return '#D83232';
};

const TradePreview: React.FunctionComponent<TradePreviewProps> = ({
  onSubmit,
  initialValues,
  orderSide,
  coinBase,
  coinQuote,
}) => {
  const t = useAppTranslation();
  const dispatch = useAppDispatch();

  const trade = useAppSelector(cryptoStates);
  const [form] = Form.useForm();

  const handleOnClick = () => {
    dispatch(tradeActions.setStepTrade(0));
  };

  return (
    <>
      <div className="crypto-preview">
        <div className="crypto-preview__title">
          {orderSide === 'BUY'
            ? t('trade.cryptoPreview.titleBuy')
            : t('trade.cryptoPreview.titleSell')}
        </div>

        <VerticalForm
          className="crypto-preview__content"
          name="trade-crypto"
          initialValues={initialValues}
          onFinish={onSubmit}
          form={form}
        >
          <div className="crypto-preview__content__item ">
            <div className="text-rg-14-24">{t('trade.cryptoPreview.instrument')}</div>
            <div className="text-md-14-24">Market</div>
          </div>
          <div className="crypto-preview__content__item">
            <div className="text-rg-14-24">{t('trade.cryptoPreview.direction')}</div>
            <div className="text-md-14-24" style={{ color: checkOrderSide(orderSide) }}>
              {orderSide === 'BUY' ? t('trade.cryptoPreview.buy') : t('trade.cryptoPreview.sell')}
            </div>
          </div>
          <PreviewField
            name="amount"
            content={t('trade.cryptoPreview.amount')}
            value={(orderSide === 'BUY' ? trade.amountReceive : trade.amountSpend) + ' ' + coinBase}
            className="crypto-preview__content__item"
            classNameTop="text-rg-14-24"
            classNameBottom="text-md-14-24 text-bottom"
          />
          <PreviewField
            name="price"
            content={t('trade.cryptoPreview.price')}
            value={trade.price + ' ' + coinQuote}
            className="crypto-preview__content__item"
            classNameTop="text-rg-14-24"
            classNameBottom="text-md-14-24 text-bottom"
          />
          <PreviewField
            name="fee"
            content={t('trade.cryptoPreview.fee')}
            value={trade.fee + ' ' + (orderSide === 'BUY' ? coinBase : coinQuote)}
            className="crypto-preview__content__item"
            classNameTop="text-rg-14-24"
            classNameBottom="text-md-14-24 text-bottom"
          />
          <PreviewField
            name="receive"
            content={t('trade.cryptoPreview.receive')}
            value={trade.amountReceive + ' ' + (orderSide === 'BUY' ? coinBase : coinQuote)}
            className="crypto-preview__content__item"
            classNameTop="text-rg-14-24"
            classNameBottom="text-md-14-24 text-bottom"
          />
          <div className="crypto-preview__countdown">
            <div className="crypto-preview__countdown__title text-md-14-24">
              {t('trade.cryptoPreview.time')}
            </div>
            <div
              className={`${orderSide === 'BUY' ? 'buy' : 'sell'}-crypto-preview__countdown__timer`}
            >
              <CountdownCircleTimer
                isPlaying
                duration={20}
                colors={orderSide === 'BUY' ? '#00632B' : '#D83232'}
                size={50}
                strokeWidth={5}
              >
                {({ remainingTime, color }) => remainingTime + 's'}
              </CountdownCircleTimer>
            </div>
          </div>
          <SubmitButton
            name={t('trade.cryptoPreview.btn')}
            type="primary"
            formFieldStyle={{ marginTop: '40px' }}
            buttonStyle={{
              width: '100%',
              fontWeight: '600',
              fontSize: '14px',
              lineHeight: '20px',
              backgroundColor: checkOrderSide(orderSide),
              borderColor: checkOrderSide(orderSide),
            }}
            className="preview__btn"
          />
          <Button className="preview__btn-cancel" onClick={handleOnClick}>
            {t('trade.cryptoPreview.btnCancel')}
          </Button>
        </VerticalForm>
      </div>
    </>
  );
};

export default TradePreview;
