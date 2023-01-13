/* eslint-disable eqeqeq */
/* eslint-disable react-hooks/exhaustive-deps */
import { ExportOutlined } from '@ant-design/icons';
import { Tabs } from 'antd';
import Paragraph from 'antd/lib/typography/Paragraph';
import currencyApi from 'api/currencyApi';
import transactionApi from 'api/transactionApi';
import { useAppTranslation } from 'app/hooks';
import { Breadcrumb } from 'components/Commons';
import { TableCommon } from 'components/Tables/TableCommon';
import { DATE_TIME_FORMAT } from 'consts';
import date from 'date-and-time';
import PrivateRoute from 'PrivateRoute';
import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { exportToCSV } from 'utils';
import { cutString } from 'utils/cutString';
import TransactionFilterForm from '../components/TransactionFilterForm';

interface TransactionHistoryProps {}

interface ObjectFilter {
  page?: number;
  sort?: string;
  'currency.equals'?: string | null;
  'status.in'?: string | null;
  'type.in'?: string | null;
  'transactionHash.equals'?: string | null;
  'toDateDate.lessThanOrEqual'?: string | null;
  'fromDate.greaterThanOrEqual'?: string | null;
}

interface TransactionData {
  total?: number;
  data?: any[];
}

const TransactionHistory: React.FunctionComponent<TransactionHistoryProps> = (props) => {
  const { TabPane } = Tabs;

  const now = new Date();
  const past_month = date.addMonths(now, -1);

  const t = useAppTranslation();

  const initializeFilter: ObjectFilter = {
    page: 0,
    sort: 'createdDate,desc',
    'type.in': 'DEPOSIT,DEPOSIT_INTERNAL',
    'toDateDate.lessThanOrEqual': now?.toISOString(),
    'fromDate.greaterThanOrEqual': past_month?.toISOString(),
  };

  const [keyTab, setKeyTab] = useState<number>();

  const [cryptoTransactions, setCryptoTransactions] = useState<TransactionData>({
    total: 0,
    data: [],
  });

  const [fiatTransactions, setFiatTransactions] = useState<TransactionData>({
    total: 0,
    data: [],
  });

  const [currencies, setCurrencies] = useState<any[]>([]);

  const [dataFilterCrypto, setDataFilterCrypto] = useState(initializeFilter);

  const [dataFilterFiat, setDataFilterFiat] = useState(initializeFilter);

  const [dataExportCrypto, setDataExportCrypto] = useState<any[]>([]);
  const [dataExportFiat, setDataExportFiat] = useState<any[]>([]);

  const [typeSelect, setTypeSelect] = useState<string>(t('transaction-history.filter.deposit'));
  const [typeSelectFiat, setTypeFiatSelect] = useState<string>(
    t('transaction-history.filter.deposit')
  );

  const [statusSelect, setStatusSelect] = useState<string>(t('transaction-history.filter.all'));
  const [statusFiatSelect, setStatusFiatSelect] = useState<string>(
    t('transaction-history.filter.all')
  );

  const [timeSelect, setTimeSelect] = useState<number>(1);
  const [timeFiatSelect, setTimeFiatSelect] = useState<number>(1);

  const [coinSelect, setCoinSelect] = useState<number>(0);

  const [txID, setTxID] = useState<string>('');
  const [pageCrypto, setPageCrypto] = useState<number>(0);
  const [pageFiat, setPageFiat] = useState<number>(0);

  const copyText = (entryText: string) => {
    navigator.clipboard.writeText(entryText);
  };

  const handleOnChangePageCrypto = (page: any) => {
    setPageCrypto(page);
    setDataFilterCrypto({
      ...dataFilterCrypto,
      page: page - 1,
    });
  };

  const handleOnChangePageFiat = (page: any) => {
    setPageFiat(page);
    setDataFilterFiat({
      ...dataFilterFiat,
      page: page - 1,
    });
  };

  const callback = (key: any) => {
    setKeyTab(key);
    if (key && key == 2) {
      setTypeFiatSelect(t('transaction-history.filter.deposit'));
      setTimeFiatSelect(1);
      setStatusFiatSelect(t('transaction-history.filter.all'));
      setDataFilterFiat(initializeFilter);
      if (pageFiat !== 0) {
        setPageFiat(1);
      }
    } else {
      setTxID('');
      setTypeSelect(t('transaction-history.filter.deposit'));
      setTimeSelect(1);
      setStatusSelect(t('transaction-history.filter.all'));
      setCoinSelect(0);
      setDataFilterCrypto(initializeFilter);
      if (pageCrypto !== 0) {
        setPageCrypto(1);
      }
    }
  };

  const columnsCrypto = useMemo(
    () => [
      {
        title: t('transaction-history.table.time'),
        dataIndex: 'time',
      },
      {
        title: t('transaction-history.table.type'),
        dataIndex: 'type',
        render: (text: any) => (
          <span>{text[0].toUpperCase() + text.substring(1).toLowerCase()}</span>
        ),
      },
      {
        title: t('transaction-history.table.coin'),
        dataIndex: 'coin',
      },
      {
        title: t('transaction-history.table.network'),
        dataIndex: 'network',
      },
      {
        title: t('transaction-history.table.amount'),
        dataIndex: 'amount',
      },
      {
        title: t('transaction-history.table.destination'),
        dataIndex: 'destination',
        render: (text: any, record: any) =>
          record.destination ? (
            <Paragraph copyable onClick={() => copyText(record.destination)}>
              {cutString({
                start: 6,
                end: 6,
                replaceBy: '...',
                originalString: record.destination,
              })}
            </Paragraph>
          ) : (
            <Paragraph>- - -</Paragraph>
          ),
      },
      {
        title: t('transaction-history.table.txnID'),
        dataIndex: 'txnID',
        render: (text: any, record: any) =>
          record.txnID ? (
            <Paragraph copyable onClick={() => copyText(record.txnID)}>
              {cutString({
                start: 6,
                end: 6,
                replaceBy: '...',
                originalString: record.txnID.toString(),
              })}
            </Paragraph>
          ) : (
            <Paragraph>- - -</Paragraph>
          ),
      },
      {
        title: t('transaction-history.table.txID'),
        dataIndex: 'txid',
      },
      {
        title: t('transaction-history.table.status'),
        dataIndex: 'status',
        render: (text: any) => (
          <span>{text[0].toUpperCase() + text.substring(1).toLowerCase()}</span>
        ),
      },
    ],
    [t]
  );
  const columnsFiat = useMemo(
    () => [
      {
        title: t('transaction-history.table.time'),
        dataIndex: 'time',
      },
      {
        title: t('transaction-history.table.type'),
        dataIndex: 'type',
      },
      {
        title: t('transaction-history.table.amount'),
        dataIndex: 'amount',
      },
      {
        title: t('transaction-history.table.fee'),
        dataIndex: 'fee',
      },
      {
        title: t('transaction-history.table.destination'),
        dataIndex: 'destination',
        render: (text: any, record: any) =>
          record.accountNumber ? (
            <span>
              {cutString({
                start: 2,
                end: 4,
                replaceBy: '****',
                originalString: record.accountNumber ? record.accountNumber.toString() : '',
              })}
            </span>
          ) : (
            <span>- - -</span>
          ),
      },
      {
        title: t('transaction-history.table.status'),
        dataIndex: 'status',
      },
    ],
    [t]
  );

  useEffect(() => {
    if (keyTab && keyTab == 2) {
      const cloneCryptoFilter = (({ page, ...o }) => o)(dataFilterFiat);
      const cloneFiatFilter = (({ page, ...x }) => x)(prevDataFilterFiat);
      if (JSON.stringify(cloneCryptoFilter) !== JSON.stringify(cloneFiatFilter)) {
        if (pageFiat === 0) {
          getFiatTransactions(dataFilterFiat);
        } else {
          setPageFiat(1);
          setDataFilterFiat({
            ...dataFilterFiat,
            page: 0,
          });
        }
      } else {
        getFiatTransactions(dataFilterFiat);
      }
    } else {
      const cloneCryptoFilter = (({ page, ...o }) => o)(dataFilterCrypto);
      const cloneFiatFilter = (({ page, ...x }) => x)(prevDataFilter);
      if (JSON.stringify(cloneCryptoFilter) !== JSON.stringify(cloneFiatFilter)) {
        if (pageCrypto === 0) {
          getCryptoTransaction(dataFilterCrypto);
        } else {
          setPageCrypto(1);
          setDataFilterCrypto({
            ...dataFilterCrypto,
            page: 0,
          });
        }
      } else {
        getCryptoTransaction(dataFilterCrypto);
      }
    }
  }, [keyTab, dataFilterCrypto, dataFilterFiat]);

  const getCryptoTransaction = useCallback(async (dataFilterCrypto) => {
    const { body, pagination } = await transactionApi.getCryptoTransactions(dataFilterCrypto);
    if (body) {
      setCryptoTransactions({
        total: pagination?.total ?? 0,
        data: body.map((item, index) => ({
          ...item,
          key: index + 1,
          txid: item.id,
          time: item.createdDate
            ? date.format(new Date(item.createdDate), DATE_TIME_FORMAT)
            : '- - -',
          coin: item.currencySN,
          network: item.networkSN,
          destination: item.toAddress,
          txnID: item.transactionHash,
          status: item.status,
        })),
      });
    } else {
      setCryptoTransactions({});
    }
  }, []);
  const getFiatTransactions = useCallback(async (dataFilterFiat) => {
    const { body, pagination } = await transactionApi.getFiatTransactions(dataFilterFiat);
    if (body) {
      setFiatTransactions({
        total: pagination?.total ?? 0,
        data: body.map((item, index) => ({
          ...item,
          key: item.id,
          time: item.createdDate
            ? date.format(new Date(item.createdDate), DATE_TIME_FORMAT)
            : '- - -',
          type: item.type,
          amount: item.amount,
          fee: item.chargedFee,
          destination: item.accountNumber ? item.accountNumber : '- - -',
          status: item.status,
        })),
      });
    } else {
      setCryptoTransactions({});
    }
  }, []);

  // Get currencies
  useEffect(() => {
    getCurrencies();
  }, []);

  const getCurrencies = useCallback(async () => {
    const { body } = await currencyApi.getAllCurrency({ size: 99999999 });
    const allOptionsCoin = [{ key: 0, value: t('transaction-history.filter.all') }];
    if (body) {
      body.map((data, index) => {
        const obj = {
          key: data.id,
          value: data.shortName,
        };
        allOptionsCoin.push(obj);
      });
    }
    setCurrencies(allOptionsCoin);
  }, []);

  const optionsStatusCryptoDeposit = [
    { value: t('transaction-history.filter.all'), key: 'ALL' },
    { value: t('transaction-history.filter.completed'), key: 'COMPLETED' },
    { value: t('transaction-history.filter.confirming'), key: 'CONFIRMING' },
    { value: t('transaction-history.filter.failed'), key: 'FAILED' },
  ];

  const optionsStatusCryptoWithdraw = [
    { value: t('transaction-history.filter.all'), key: 'ALL' },
    { value: t('transaction-history.filter.completed'), key: 'COMPLETED' },
    { value: t('transaction-history.filter.processing'), key: 'PENDING_APPROVAL,QUEUED,SUBMITTED' },
    { value: t('transaction-history.filter.confirming'), key: 'CONFIRMING' },
    { value: t('transaction-history.filter.failed'), key: 'FAILED' },
    { value: t('transaction-history.filter.rejected'), key: 'REJECTED' },
  ];

  const optionsStatusFiatDeposit = [
    { value: t('transaction-history.filter.all'), key: 'ALL' },
    { value: t('transaction-history.filter.completed'), key: 'COMPLETED' },
    { value: t('transaction-history.filter.cancelled'), key: 'CANCELLED' },
    { value: t('transaction-history.filter.expired'), key: 'EXPIRED' },
    { value: t('transaction-history.filter.pending'), key: 'PENDING,INITIALIZED' },
  ];

  const optionsStatusFiatWithdraw = [
    { value: t('transaction-history.filter.all'), key: 'ALL' },
    { value: t('transaction-history.filter.completed'), key: 'COMPLETED' },
    { value: t('transaction-history.filter.failed'), key: 'FAILED' },
    { value: t('transaction-history.filter.processing'), key: 'PENDING_APPROVAL,HANDLE_MANUALLY' },
    { value: t('transaction-history.filter.pending'), key: 'PENDING' },
    { value: t('transaction-history.filter.rejected'), key: 'REJECTED' },
  ];

  const optionsTime = [
    { key: 1, value: t('transaction-history.filter.past30Days') },
    { key: 2, value: t('transaction-history.filter.past7Days') },
    { key: 3, value: t('transaction-history.filter.yesterday') },
  ];

  const optionsType = [
    { value: t('transaction-history.filter.deposit'), key: 'DEPOSIT,DEPOSIT_INTERNAL' },
    { value: t('transaction-history.filter.withdraw'), key: 'WITHDRAW,WITHDRAW_INTERNAL' },
  ];

  const handleChangeCoin = (value: any) => {
    setCoinSelect(value);
    setDataFilterCrypto({ ...dataFilterCrypto, 'currency.equals': value !== 0 ? value : null });
  };

  const handleChangeStatus = (value: any) => {
    if (keyTab == 2) {
      setStatusFiatSelect(value);
      setDataFilterFiat({ ...dataFilterFiat, 'status.in': value !== 'ALL' ? value : null });
    } else {
      setStatusSelect(value);
      setDataFilterCrypto({ ...dataFilterCrypto, 'status.in': value !== 'ALL' ? value : null });
    }
  };

  const handleChangeType = (value: any) => {
    if (keyTab == 2) {
      setTypeFiatSelect(value);
      setDataFilterFiat({ ...dataFilterFiat, 'type.in': value });
    } else {
      setTypeSelect(value);
      setDataFilterCrypto({ ...dataFilterCrypto, 'type.in': value });
    }
  };

  const handleChangeTxID = (value: any) => {
    setTxID(value.target.value);
    setDataFilterCrypto({
      ...dataFilterCrypto,
      'transactionHash.equals': value.target.value || undefined,
    });
  };

  const handleChangeTime = (value: number) => {
    const now = new Date();
    if (keyTab == 2) {
      setTimeFiatSelect(value);
    } else {
      setTimeSelect(value);
    }
    if (value == 1) {
      const past_month = date.addMonths(now, -1);
      if (keyTab == 2) {
        setDataFilterFiat({
          ...dataFilterFiat,
          'toDateDate.lessThanOrEqual': now?.toISOString(),
          'fromDate.greaterThanOrEqual': past_month?.toISOString(),
        });
      } else {
        setDataFilterCrypto({
          ...dataFilterCrypto,
          'toDateDate.lessThanOrEqual': now?.toISOString(),
          'fromDate.greaterThanOrEqual': past_month?.toISOString(),
        });
      }
    } else if (value == 2) {
      const past_week = date.addDays(now, -7);
      if (keyTab == 2) {
        setDataFilterFiat({
          ...dataFilterFiat,
          'toDateDate.lessThanOrEqual': now?.toISOString(),
          'fromDate.greaterThanOrEqual': past_week?.toISOString(),
        });
      } else {
        setDataFilterCrypto({
          ...dataFilterCrypto,
          'toDateDate.lessThanOrEqual': now?.toISOString(),
          'fromDate.greaterThanOrEqual': past_week?.toISOString(),
        });
      }
    } else if (value == 3) {
      const yesterday = date.addDays(now, -1);
      if (keyTab == 2) {
        setDataFilterFiat({
          ...dataFilterFiat,
          'toDateDate.lessThanOrEqual': now?.toISOString(),
          'fromDate.greaterThanOrEqual': yesterday?.toISOString(),
        });
      } else {
        setDataFilterCrypto({
          ...dataFilterCrypto,
          'toDateDate.lessThanOrEqual': now?.toISOString(),
          'fromDate.greaterThanOrEqual': yesterday?.toISOString(),
        });
      }
    } else {
      if (keyTab == 2) {
        setDataFilterFiat({
          ...dataFilterFiat,
          'toDateDate.lessThanOrEqual': undefined,
          'fromDate.greaterThanOrEqual': undefined,
        });
      } else {
        setDataFilterCrypto({
          ...dataFilterCrypto,
          'toDateDate.lessThanOrEqual': undefined,
          'fromDate.greaterThanOrEqual': undefined,
        });
      }
    }
  };

  // Call API export data
  const handleExportCryptoTransaction = useCallback(async () => {
    const { body } = await transactionApi.getDataExportCryptoTransaction({
      ...dataFilterCrypto,
      sort: 'desc',
    });
    if (body) {
      setDataExportCrypto(body);
    }
  }, [dataFilterCrypto]);

  const handleExportFiatTransaction = useCallback(async () => {
    const { body } = await transactionApi.getDataExportFiatTransaction({
      ...dataFilterFiat,
      sort: 'desc',
    });
    if (body) {
      setDataExportFiat(body);
    }
  }, [dataFilterFiat]);

  useEffect(() => {
    const dataExport: { [header: string]: any }[] = [];
    if (dataExportCrypto.length > 0) {
      // eslint-disable-next-line array-callback-return
      dataExportCrypto.map((data, index) => {
        const obj = {
          Time: data.createdDate
            ? date.format(new Date(data.createdDate), DATE_TIME_FORMAT)
            : '- - -',
          Type: data.type,
          Coin: data.currencySN,
          Network: data.networkSN,
          Amount: data.amount,
          Destination: data.toAddress,
          TxID: data.transactionHash,
          Status: data.status,
        };
        dataExport.push(obj);
      });
      exportToCSV(dataExport, 'Crypto Transaction');
    }
  }, [dataExportCrypto]);

  useEffect(() => {
    const dataExport: { [header: string]: any }[] = [];
    if (dataExportFiat.length > 0) {
      // eslint-disable-next-line array-callback-return
      dataExportFiat.map((data, index) => {
        const obj = {
          Time: data.createdDate
            ? date.format(new Date(data.createdDate), DATE_TIME_FORMAT)
            : '- - -',
          Type: data.type,
          Amount: data.amount,
          Fee: data.chargedFee,
          Destination: data.accountNumber,
          Status: data.status,
        };
        dataExport.push(obj);
      });
      exportToCSV(dataExport, 'Fiat Transaction');
    }
  }, [dataExportFiat]);

  // Function clear filter
  const clear = () => {
    if (keyTab && keyTab == 2) {
      setTypeFiatSelect(t('transaction-history.filter.deposit'));
      setTimeFiatSelect(1);
      setStatusFiatSelect(t('transaction-history.filter.all'));
      setDataFilterFiat(initializeFilter);
      if (pageFiat !== 0) {
        setPageFiat(1);
      }
    } else {
      setTxID('');
      setTypeSelect(t('transaction-history.filter.deposit'));
      setTimeSelect(1);
      setStatusSelect(t('transaction-history.filter.all'));
      setCoinSelect(0);
      setDataFilterCrypto(initializeFilter);
      if (pageCrypto !== 0) {
        setPageCrypto(1);
      }
    }
  };

  // Function get previous state
  const FindPreviousState = (value: ObjectFilter) => {
    const ref = useRef({} as ObjectFilter);
    useEffect(() => {
      ref.current = value;
    });
    return ref.current;
  };

  const prevDataFilter = FindPreviousState(dataFilterCrypto);
  const prevDataFilterFiat = FindPreviousState(dataFilterFiat);

  return (
    <>
      <div className="transaction-history">
        <div className="transaction-history__title">
          <Breadcrumb backUrl={'/my/setting'} title={t('transaction-history.title')} />
        </div>
        <div className="transaction-history__tab-pane">
          <Tabs tabPosition="top" type="card" onChange={callback}>
            <TabPane tab="Crypto" key="1">
              <div className="transaction-history__filter">
                <TransactionFilterForm
                  txID={txID}
                  optionCoin={currencies}
                  coinSelect={coinSelect}
                  optionsStatus={
                    typeSelect === 'Deposit' || typeSelect === 'DEPOSIT,DEPOSIT_INTERNAL'
                      ? optionsStatusCryptoDeposit
                      : optionsStatusCryptoWithdraw
                  }
                  statusSelect={statusSelect}
                  optionsType={optionsType}
                  typeSelect={typeSelect}
                  optionsTime={optionsTime}
                  timeSelect={timeSelect}
                  handleChangeCoin={handleChangeCoin}
                  handleChangeStatus={handleChangeStatus}
                  handleChangeType={handleChangeType}
                  handleChangeTxID={handleChangeTxID}
                  handleChangeTime={handleChangeTime}
                />
              </div>
              <div className="transaction-history__export">
                <span onClick={clear} className="clear-all">
                  {t('transaction-history.clearAll')}
                </span>
                <ExportOutlined />
                <span onClick={handleExportCryptoTransaction}>
                  {t('transaction-history.exporthistory')}
                </span>
              </div>
              <div className="transaction-history__table">
                <TableCommon
                  columns={columnsCrypto}
                  dataSource={cryptoTransactions.data ?? []}
                  size="small"
                  currentPage={pageCrypto || 1}
                  total={cryptoTransactions.total}
                  showTotal
                  onChange={handleOnChangePageCrypto}
                />
              </div>
            </TabPane>
            <TabPane tab="Fiat" key="2">
              <div className="transaction-history__filter transaction-history__filter--fiat">
                <TransactionFilterForm
                  optionCoin={currencies}
                  optionsStatus={
                    typeSelectFiat === 'Deposit' || typeSelectFiat === 'DEPOSIT,DEPOSIT_INTERNAL'
                      ? optionsStatusFiatDeposit
                      : optionsStatusFiatWithdraw
                  }
                  optionsType={optionsType}
                  optionsTime={optionsTime}
                  handleChangeStatus={handleChangeStatus}
                  handleChangeType={handleChangeType}
                  handleChangeTime={handleChangeTime}
                  statusSelect={statusFiatSelect}
                  timeSelect={timeFiatSelect}
                  typeSelect={typeSelectFiat}
                />
              </div>
              <div className="transaction-history__export">
                <span onClick={clear} className="clear-all">
                  {t('transaction-history.clearAll')}
                </span>
                <ExportOutlined />
                <span onClick={handleExportFiatTransaction}>
                  {t('transaction-history.exporthistory')}
                </span>
              </div>
              <div className="transaction-history__table">
                <TableCommon
                  columns={columnsFiat}
                  dataSource={fiatTransactions.data ?? []}
                  size="small"
                  currentPage={pageFiat || 1}
                  total={fiatTransactions.total}
                  showTotal
                  onChange={handleOnChangePageFiat}
                />
              </div>
            </TabPane>
          </Tabs>
        </div>
      </div>
    </>
  );
};

export default PrivateRoute(TransactionHistory);
