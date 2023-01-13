import { ExportOutlined } from '@ant-design/icons';
import currencyApi from 'api/currencyApi';
import transactionApi from 'api/transactionApi';
import { useAppTranslation } from 'app/hooks';
import BigNumber from 'bignumber.js';
import { Breadcrumb } from 'components/Commons';
import { TableCommon } from 'components/Tables/TableCommon';
import { DATE_TIME_FORMAT } from 'consts';
import date from 'date-and-time';
import PrivateRoute from 'PrivateRoute';
import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { exportToCSV, formatAmount } from 'utils';
import OrderSearchForm from '../components/OrderSearchForm';

interface OrderHistoryProps {}

interface ObjectFilter {
  'baseAsset.equals'?: string | null;
  'orderSide.equals'?: string | null;
  'endTime.lessThanOrEqual'?: string | null;
  'startTime.greaterThanOrEqual'?: string | null;
  page?: number;
  sort?: string;
}
interface TransactionData {
  total?: number;
  data?: any[];
}

const OrderHistoryPage: React.FunctionComponent<OrderHistoryProps> = (props) => {
  const t = useAppTranslation();
  const [searchParams, setSearchParams] = useSearchParams();
  const param: string | null = searchParams.get('coin');

  const now = new Date();
  const past_month = date.addMonths(now, -1);

  const initializeFilter: ObjectFilter = {
    'orderSide.equals': 'SELL',
    'endTime.lessThanOrEqual': now?.toISOString(),
    'startTime.greaterThanOrEqual': past_month?.toISOString(),
    page: 0,
    sort: 'internalOrderId,desc',
  };

  const [dataFilterOrder, setDataFilterOrder] = useState<ObjectFilter>(initializeFilter);

  const [orderTransactions, setOrderTransactions] = useState<TransactionData>({
    total: 0,
    data: [],
  });
  const [dataExportOrderTransactions, setDataExportOrderTransactions] = useState<any[]>([]);

  const [page, setPage] = useState<number>(0);

  const [currencies, setCurrencies] = useState<any[]>([]);
  const [sideSelect, setSideSelect] = useState<string>(
    t(`order-history.filter.${param ? 'all' : 'sell'}`)
  );
  const [coinSelect, setCoinSelect] = useState<string>(param || t('order-history.filter.all'));
  const [timeSelect, setTimeSelect] = useState<number>(param ? 4 : 1);

  const optionsSide = [
    { value: t('order-history.filter.all'), key: 'ALL' },
    { value: t('order-history.filter.buy'), key: 'BUY' },
    { value: t('order-history.filter.sell'), key: 'SELL' },
  ];

  const optionsTime = [
    { key: 1, value: t('order-history.filter.past30Days') },
    { key: 2, value: t('order-history.filter.past7Days') },
    { key: 3, value: t('order-history.filter.yesterday') },
    { key: 4, value: t('order-history.filter.all') },
  ];
  const columns = useMemo(
    () => [
      {
        title: t('order-history.table.time'),
        dataIndex: 'time',
      },
      {
        title: t('order-history.table.side'),
        dataIndex: 'orderSide',
        render: (text: any) => (
          <span>{text[0].toUpperCase() + text.substring(1).toLowerCase()}</span>
        ),
      },
      {
        title: t('order-history.table.coin'),
        dataIndex: 'coin',
      },
      {
        title: t('order-history.table.amount'),
        dataIndex: 'amount',
      },
      {
        title: t('order-history.table.price'),
        dataIndex: 'price',
      },
      {
        title: t('order-history.table.fee'),
        dataIndex: 'fee',
      },
      {
        title: t('order-history.table.status'),
        dataIndex: 'orderStatus',
        render: (text: any) => (
          <span>{text[0].toUpperCase() + text.substring(1).toLowerCase()}</span>
        ),
      },
    ],
    [t]
  );

  const [dataFilterFromQuery, setDataFilterFromQuery] = useState<ObjectFilter>({
    page: 0,
    sort: 'internalOrderId,desc',
    'endTime.lessThanOrEqual': undefined,
    'startTime.greaterThanOrEqual': undefined,
    'orderSide.equals': null,
    'baseAsset.equals': param || null,
  });

  useEffect(() => {
    const cloneOrderFilter = (({ page, ...o }) => o)(dataFilterOrder);
    const cloneDataFilter = (({ page, ...x }) => x)(prevDataFilterOrder);

    if (JSON.stringify(cloneDataFilter) !== JSON.stringify(cloneOrderFilter)) {
      if (page === 0) {
        param ? getOrderTransactions(dataFilterFromQuery) : getOrderTransactions(dataFilterOrder);
      } else {
        setPage(1);
        param
          ? setDataFilterFromQuery({
              ...dataFilterFromQuery,
              page: 0,
            })
          : setDataFilterOrder({
              ...dataFilterOrder,
              page: 0,
            });
      }
    } else {
      param ? getOrderTransactions(dataFilterFromQuery) : getOrderTransactions(dataFilterOrder);
    }
  }, [dataFilterOrder, dataFilterFromQuery]);

  useEffect(() => {
    getCurrencies();
  }, []);

  const getOrderTransactions = useCallback(async (dataFilterOrder) => {
    const { body, pagination } = await transactionApi.getOrderTransactions(dataFilterOrder);
    if (body) {
      setOrderTransactions({
        total: pagination?.total ?? 0,
        data: body.map((item, index) => ({
          ...item,
          key: index + 1,
          time: item.createdDate
            ? date.format(new Date(item.createdDate), DATE_TIME_FORMAT)
            : '- - -',
          side: item.orderSide,
          coin: item.baseAsset,
          amount:
            item.orderStatus === 'REJECTED' ? '--' : formatAmount(item.executedQuantity.toString()),
          price:
            item.orderStatus === 'REJECTED'
              ? 0
              : formatAmount(
                  new BigNumber(item.executedPrice)
                    .times(item.executedQuantity)
                    .decimalPlaces(2, BigNumber.ROUND_DOWN)
                    .toString()
                ),

          fee: item.orderStatus === 'REJECTED' ? '--' : formatAmount(item.fee?.toString()),
          status: item.orderStatus,
        })),
      });
    } else {
      setOrderTransactions({});
    }
  }, []);

  const getCurrencies = useCallback(async () => {
    const { body } = await currencyApi.getAllCurrency({ size: 99999 });

    const allOptionsCoin = [{ key: 'ALL', value: t('order-history.filter.all') }];
    if (body) {
      body.map((data, index) => {
        const obj = {
          key: data.shortName,
          value: data.shortName,
        };
        allOptionsCoin.push(obj);
      });
    }
    setCurrencies(allOptionsCoin);
  }, []);

  const handleExportOrderTransaction = useCallback(async () => {
    const { body } = await transactionApi.getDataExportOrderTransaction(
      param ? { ...dataFilterFromQuery, sort: 'desc' } : { ...dataFilterOrder, sort: 'desc' }
    );
    if (body) {
      setDataExportOrderTransactions(body);
    }
  }, [dataFilterOrder, dataFilterFromQuery]);

  useEffect(() => {
    const dataExport: { [header: string]: any }[] = [];
    if (dataExportOrderTransactions.length > 0) {
      // eslint-disable-next-line array-callback-return
      dataExportOrderTransactions.map((data, index) => {
        const obj = {
          Time: data.createdDate
            ? date.format(new Date(data.createdDate), DATE_TIME_FORMAT)
            : '- - -',
          Side: data.orderSide,
          Coin: data.baseAsset,
          Amount:
            data.orderStatus === 'REJECTED' ? '--' : formatAmount(data.executedQuantity.toString()),
          Price:
            data.orderStatus === 'REJECTED'
              ? 0
              : formatAmount(
                  new BigNumber(data.executedPrice)
                    .times(data.executedQuantity)
                    .decimalPlaces(2, BigNumber.ROUND_DOWN)
                    .toString()
                ),
          Fee: data.orderStatus === 'REJECTED' ? '--' : formatAmount(data.fee?.toString()),
          Status: data.orderStatus,
        };
        dataExport.push(obj);
      });
      exportToCSV(dataExport.reverse(), 'Order Transactions');
    }
  }, [dataExportOrderTransactions]);

  const handleOnChangePage = (page: number) => {
    setPage(page);
    if (param) {
      searchParams.delete('coin');
      setSearchParams(searchParams);
      setDataFilterOrder({
        ...dataFilterFromQuery,
        page: page - 1,
      });
    } else {
      setDataFilterOrder({
        ...dataFilterOrder,
        page: page - 1,
      });
    }
  };
  const handleChangeTime = (value: number) => {
    setTimeSelect(value);
    if (param) {
      searchParams.delete('coin');
      setSearchParams(searchParams);
      if (value === 1) {
        setDataFilterOrder({
          ...dataFilterFromQuery,
          'endTime.lessThanOrEqual': now?.toISOString(),
          'startTime.greaterThanOrEqual': past_month?.toISOString(),
        });
      } else if (value === 2) {
        const past_week = date.addDays(now, -7);
        setDataFilterOrder({
          ...dataFilterFromQuery,
          'endTime.lessThanOrEqual': now?.toISOString(),
          'startTime.greaterThanOrEqual': past_week?.toISOString(),
        });
      } else if (value === 3) {
        const yesterday = date.addDays(now, -1);
        setDataFilterOrder({
          ...dataFilterFromQuery,
          'endTime.lessThanOrEqual': now?.toISOString(),
          'startTime.greaterThanOrEqual': yesterday?.toISOString(),
        });
      } else {
        setDataFilterOrder({
          ...dataFilterFromQuery,
          'endTime.lessThanOrEqual': undefined,
          'startTime.greaterThanOrEqual': undefined,
        });
      }
    } else {
      if (value === 1) {
        setDataFilterOrder({
          ...dataFilterOrder,
          'endTime.lessThanOrEqual': now?.toISOString(),
          'startTime.greaterThanOrEqual': past_month?.toISOString(),
        });
      } else if (value === 2) {
        const past_week = date.addDays(now, -7);
        setDataFilterOrder({
          ...dataFilterOrder,
          'endTime.lessThanOrEqual': now?.toISOString(),
          'startTime.greaterThanOrEqual': past_week?.toISOString(),
        });
      } else if (value === 3) {
        const yesterday = date.addDays(now, -1);
        setDataFilterOrder({
          ...dataFilterOrder,
          'endTime.lessThanOrEqual': now?.toISOString(),
          'startTime.greaterThanOrEqual': yesterday?.toISOString(),
        });
      } else {
        setDataFilterOrder({
          ...dataFilterOrder,
          'endTime.lessThanOrEqual': undefined,
          'startTime.greaterThanOrEqual': undefined,
        });
      }
    }
  };

  const handleChangeSide = (value: string) => {
    setSideSelect(value);
    if (param) {
      searchParams.delete('coin');
      setSearchParams(searchParams);
      setDataFilterOrder({
        ...dataFilterFromQuery,
        'orderSide.equals': value !== 'ALL' ? value : null,
      });
    } else {
      setDataFilterOrder({
        ...dataFilterOrder,
        'orderSide.equals': value !== 'ALL' ? value : null,
      });
    }
  };

  const handleChangeCoin = (value: string) => {
    setCoinSelect(value);
    if (param) {
      searchParams.delete('coin');
      setSearchParams(searchParams);
      setDataFilterOrder({
        ...dataFilterFromQuery,
        'baseAsset.equals': value !== 'ALL' ? value : null,
      });
    } else {
      setDataFilterOrder({
        ...dataFilterOrder,
        'baseAsset.equals': value !== 'ALL' ? value : null,
      });
    }
  };
  const clear = () => {
    setTimeSelect(1);
    if (param) {
      searchParams.delete('coin');
      setSearchParams(searchParams);
    }
    setCoinSelect(t('order-history.filter.all'));
    setSideSelect(t('order-history.filter.sell'));
    setDataFilterOrder(initializeFilter);
    if (page !== 0) {
      setPage(1);
    }
  };
  const FindPreviousState = (value: ObjectFilter) => {
    const ref = useRef({} as ObjectFilter);
    useEffect(() => {
      ref.current = value;
    });
    return ref.current;
  };

  const prevDataFilterOrder = FindPreviousState(dataFilterOrder);
  return (
    <>
      <div className="order-history">
        <div className="order-history__title">
          <Breadcrumb backUrl={'/my/setting'} title={t('order-history.title')} />
        </div>
        <div className="order-history__filter">
          <OrderSearchForm
            optionsSide={optionsSide}
            sideSelect={sideSelect}
            optionsTime={optionsTime}
            timeSelect={timeSelect}
            optionsCoin={currencies}
            coinSelect={coinSelect}
            handleChangeTime={handleChangeTime}
            handleChangeSide={handleChangeSide}
            handleChangeCoin={handleChangeCoin}
          />
        </div>

        <div className="order-history__export">
          <span onClick={clear} className="clear-all">
            {t('order-history.clearAll')}
          </span>
          <ExportOutlined title="export order history" />
          <span onClick={handleExportOrderTransaction}>{t('order-history.exporthistory')}</span>
        </div>

        <div className="order-history__table">
          <TableCommon
            columns={columns}
            dataSource={orderTransactions.data ?? []}
            size="small"
            currentPage={page || 1}
            scroll={{ x: 1000 }}
            total={orderTransactions.total}
            showTotal
            onChange={handleOnChangePage}
          />
        </div>
      </div>
    </>
  );
};

export default PrivateRoute(OrderHistoryPage);
