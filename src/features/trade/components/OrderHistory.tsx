import { Table } from 'antd';
import transactionApi from 'api/transactionApi';
import { useAppSelector, useAppTranslation } from 'app/hooks';
import BigNumber from 'bignumber.js';
import { DATE_TIME_FORMAT } from 'consts';
import date from 'date-and-time';
import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { formatAmount } from 'utils';
import { stepTradeState } from '../TradeSlice';

interface OrderHistoryProps {}

interface OrderHistoryParam {
  'orderSide.in'?: string | null;
  'baseAsset.equals'?: string | null;
  'orderSide.equals'?: string | null;
  'quoteAsset.equals'?: string | null;
  size?: number;
  sort?: string;
}

const checkOrderSide = (side: 'BUY' | 'SELL') => {
  if (side === 'BUY') {
    return '#419E6A';
  } else return '#B01212';
};

const checkStatus = (status: 'CREATED' | 'COMPLETED' | 'REJECTED') => {
  switch (status) {
    case 'CREATED':
      return ['#FFF5D5', '#976400'];
    case 'COMPLETED':
      return ['#00632B', '#E8FCF1'];
    case 'REJECTED':
      return ['#B01212', '#FFEBEB'];
  }
};

const OrderHistory: React.FunctionComponent<OrderHistoryProps> = (props) => {
  const t = useAppTranslation();
  const navigate = useNavigate();
  const stepTrade = useAppSelector(stepTradeState);
  const [searchParams, setSearchParams] = useSearchParams({});

  const pairFromQuery = useMemo(() => {
    const base = searchParams.get('coinBase');
    const quote = searchParams.get('coinQuote');
    if (!base || !quote || quote !== 'THB') return undefined;
    else {
      return { base, quote };
    }
  }, [searchParams]);

  const OrderHistoryParam: OrderHistoryParam = {
    'orderSide.in': 'BUY,SELL',
    'baseAsset.equals': pairFromQuery?.base,
    'quoteAsset.equals': pairFromQuery?.quote,
    size: 10,
    sort: 'internalOrderId,desc',
  };

  useEffect(() => {
    setDataFilterOrder(OrderHistoryParam);
  }, [pairFromQuery?.base, pairFromQuery?.quote]);

  const [dataFilterOrder, setDataFilterOrder] = useState<OrderHistoryParam>(OrderHistoryParam);

  useEffect(() => {
    getOrderTransactions(dataFilterOrder);
  }, [dataFilterOrder, stepTrade]);

  const [orderTransactions, setOrderTransactions] = useState<any[]>([]);

  const getOrderTransactions = useCallback(async (dataFilterOrder) => {
    const { body } = await transactionApi.getOrderTransactions(dataFilterOrder);
    if (body) {
      setOrderTransactions(
        body.map((x, index) => ({
          ...x,
          key: index + 1,
          date: x.createdDate ? date.format(new Date(x.createdDate), DATE_TIME_FORMAT) : '- - -',
          pair: x.baseAsset + ' / THB',
          side: x.orderSide,
          coin: x.baseAsset,
          quantity:
            x.orderStatus === 'REJECTED' ? '--' : formatAmount(x.executedQuantity.toString()),
          price:
            x.orderStatus === 'REJECTED'
              ? 0
              : formatAmount(
                  new BigNumber(x.executedPrice)
                    .times(x.executedQuantity)
                    .decimalPlaces(2, BigNumber.ROUND_DOWN)
                    .toString()
                ),
          fee: x.fee && formatAmount(x.fee.toString()),
          status: x.orderStatus,
        }))
      );
    }
  }, []);

  const RedirectToOrderHistory = useCallback(() => {
    navigate(`/my/history/order?coin=${pairFromQuery?.base}`);
  }, [navigate, pairFromQuery?.base]);

  const columns = useMemo(
    () => [
      {
        title: t('trade.orderHistory.date'),
        dataIndex: 'createdDate',
        render: (createdDate: Date) => (
          <>{createdDate ? date.format(new Date(createdDate), DATE_TIME_FORMAT) : '- - -'}</>
        ),
      },
      {
        title: t('trade.orderHistory.pair'),
        dataIndex: 'baseAsset',
        render: (baseAsset: string) => <>{baseAsset + ' / THB'}</>,
      },
      {
        title: t('trade.orderHistory.side'),
        dataIndex: 'orderSide',
        render: (side: 'BUY' | 'SELL') => (
          <>
            <p style={{ color: checkOrderSide(side), marginBottom: '0' }}>{side}</p>
          </>
        ),
      },
      {
        title: t('trade.orderHistory.price'),
        dataIndex: 'price',
      },
      {
        title: t('trade.orderHistory.amount'),
        dataIndex: 'quantity',
      },
      {
        title: t('trade.orderHistory.status'),
        dataIndex: 'orderStatus',
        align: 'center' as 'center',

        render: (status: 'CREATED' | 'COMPLETED' | 'REJECTED') => (
          <>
            <div style={{ display: 'flex', justifyContent: 'center' }}>
              <div
                className="trade_order-status"
                style={{
                  color: checkStatus(status)[0],
                  backgroundColor: checkStatus(status)[1],
                }}
              >
                {status}
              </div>
            </div>
          </>
        ),
      },
    ],
    [t]
  );

  return (
    <>
      <div className="trade__order-history">
        <div className="trade__order-history__table">
          <div className="trade__order-history__table__header">
            <div className="header-left__tabs">{t('trade.orderHistory.title')}</div>
            <div className="header-right__show-more" onClick={RedirectToOrderHistory}>
              {t('trade.orderHistory.showMore')}
            </div>
          </div>

          <Table
            columns={columns}
            dataSource={orderTransactions.slice(0, 9)}
            size="small"
            pagination={false}
            scroll={{ x: 950 }}
          />
        </div>
      </div>
    </>
  );
};

export default OrderHistory;
