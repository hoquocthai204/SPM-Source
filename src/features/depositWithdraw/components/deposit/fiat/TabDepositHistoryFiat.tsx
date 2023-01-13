import React, { useCallback, useEffect, useState } from 'react';
import { TableCommon } from 'components/Tables/TableCommon';
import { useAppDispatch, useAppSelector, useAppTranslation } from 'app/hooks';
import Badge from 'components/UIElements/Badge/Badge';
import date from 'date-and-time';
import { DATE_TIME_FORMAT } from 'consts';
import { searchTransactionForUser } from 'features/depositWithdraw/depositWithdrawSlice';
import { useSearchParams } from 'react-router-dom';
import { formatAmount, isEmptyObject, useWindowDimensions } from 'utils';
import Loading from 'components/UIElements/Loading/Loading';
import { InforCurrencyState } from 'models';
import { useHandleResponseError } from 'hooks';
import cryptoApi from 'api/cryptoApi';

interface TabDepositHistoryFiatProps {}
const TabDepositHistoryFiat: React.FunctionComponent<TabDepositHistoryFiatProps> = (props) => {
  const t = useAppTranslation();
  const dispatch = useAppDispatch();
  const windowSize = useWindowDimensions();

  const dataDepositHistory = useAppSelector((state) => state.depositWithdraw.dataDepositHistory);
  const [searchParams, setSearchParams] = useSearchParams();
  const getTypeParams = searchParams.get('type');
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [loadingTableState, setLoadingTableState] = useState(false);
  const [inforCurrency, setInforCurrency] = React.useState<InforCurrencyState | any>({});
  const handleResponseError = useHandleResponseError();
  const getCurrency = searchParams.get('currency');

  //format col
  const columnsDeposit = [
    {
      title: t('depositWithdraw.table.col.date'),
      dataIndex: 'createdDate',
      key: 'createdDate',
      render: (createdDate: string) => {
        return (
          <div className="text-md-14-20" style={{ color: '#1E2329' }}>
            {date.format(new Date(createdDate), DATE_TIME_FORMAT)}
          </div>
        );
      },
    },
    {
      title: t('depositWithdraw.table.col.bank'),
      dataIndex: 'exchangeBank',
      key: 'exchangeBank',
      width: '30%',
      render: (exchangeBank: string) => {
        return (
          <div className="text-r-14-20" style={{ color: '#5A6689' }}>
            {exchangeBank}
          </div>
        );
      },
    },
    {
      title: t('depositWithdraw.table.col.amount'),
      dataIndex: 'amount',
      key: 'amount',
      width: '25%',
      render: (amount: number) => {
        const amountFormat = formatAmount(amount.toFixed(2).toString());
        let num_split = amountFormat.split('.');
        return (
          <div className="text-r-14-20" style={{ color: '#5A6689' }}>
            {num_split[1] === '00' ? num_split[0] : amountFormat}
          </div>
        );
      },
    },
    {
      title: t('depositWithdraw.table.col.status'),
      dataIndex: 'status',
      key: 'status',
      render: (status: string, row: any) => {
        return <Badge style={row.type} type={status} />;
      },
    },
  ];

  // call api for tab deposit history  here
  useEffect(() => {
    if (getTypeParams === 'v-depositHistory') {
      if (!isEmptyObject(inforCurrency)) {
        const additionalData = {
          'currency.equals': inforCurrency.id,
          size: 10,
          page: currentPage - 1,
          sort: 'createdDate,desc',
          'type.equals': 'DEPOSIT',
        };
        dispatch(searchTransactionForUser(additionalData));
        setLoadingTableState(true);
      }
    }
  }, [inforCurrency, getTypeParams, currentPage]);

  const handleOnChangePage = (page: number) => {
    setCurrentPage(page);
  };

  // toggle loading
  useEffect(() => {
    if (dataDepositHistory.length !== 0 && dataDepositHistory.data.length !== 0) {
      setLoadingTableState(false);
    }
  }, [dataDepositHistory]);

  const getInformationCurrency = useCallback(
    async (shortName: string) => {
      const res = await cryptoApi.getInformationOfCurrency(shortName);

      if (res.ok) {
        setInforCurrency(res.body);
      } else if (res.error) {
        handleResponseError(res.error);
      }
    },
    [getCurrency]
  );

  useEffect(() => {
    if (getCurrency) {
      getInformationCurrency(getCurrency);
    }
  }, [getCurrency]);

  return (
    <>
      <TableCommon
        currentPage={currentPage}
        columns={columnsDeposit}
        dataSource={dataDepositHistory.data}
        size="middle"
        total={dataDepositHistory.total}
        classNamePagination="pagination"
        showTotal
        onChange={handleOnChangePage}
        loading={{
          spinning: loadingTableState,
          indicator: <Loading style={{ height: '100%', backgroundColor: '#ffffff' }} />,
        }}
        scroll={{ x: windowSize.width < 740 ? windowSize.width : '100%' }}
      />
    </>
  );
};

export default TabDepositHistoryFiat;
