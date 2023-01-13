import React, { useCallback, useEffect, useState } from 'react';
import { TableCommon } from 'components/Tables/TableCommon';
import { useAppDispatch, useAppSelector, useAppTranslation } from 'app/hooks';
import { cutString, formatAmount, useWindowDimensions } from 'utils';
import date from 'date-and-time';
import { DATE_TIME_FORMAT } from 'consts';
import Badge from 'components/UIElements/Badge/Badge';
import { searchTransactionForUser } from 'features/depositWithdraw/depositWithdrawSlice';
import { useSearchParams } from 'react-router-dom';
import Loading from 'components/UIElements/Loading/Loading';
import { isEmptyObject } from 'utils';
import { InforCurrencyState } from 'models';
import cryptoApi from 'api/cryptoApi';
import { useHandleResponseError } from 'hooks';

interface TabWithdrawHistoryProps {
  propsDataTable: any;
}

const TabWithdrawHistory: React.FunctionComponent<TabWithdrawHistoryProps> = ({
  propsDataTable,
}) => {
  const t = useAppTranslation();
  const [dataTable, setDataTable] = useState([]);
  const windowSize = useWindowDimensions();

  // format colum withdraw history
  const columnsWithdrawl = [
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
      render: (exchangeBank: string) => {
        return (
          <div className="text-r-14-20" style={{ color: '#5A6689' }}>
            {exchangeBank}
          </div>
        );
      },
    },
    {
      title: t('depositWithdraw.table.col.accountNumber'),
      dataIndex: 'accountNumber',
      key: 'accountNumber',
      render: (accountNumber: string) => {
        return (
          <div className="text-r-14-20" style={{ color: '#5A6689' }}>
            {cutString({ start: 3, end: 3, originalString: accountNumber, replaceBy: '***' })}
          </div>
        );
      },
    },
    {
      title: t('depositWithdraw.table.col.amount'),
      dataIndex: 'amount',
      key: 'amount',
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
  const [loadingTableState, setLoadingTableState] = useState(false);
  const [inforCurrency, setInforCurrency] = React.useState<InforCurrencyState | any>({});

  const dispatch = useAppDispatch();
  const dataWithdrawHistory = useAppSelector((state) => state.depositWithdraw.dataWithdrawHistory);
  const [searchParams, setSearchParams] = useSearchParams();
  const getTypeParams = searchParams.get('type');
  const [currentPage, setCurrentPage] = useState<number>(1);

  // call api in tab withdraw history  here
  useEffect(() => {
    if (getTypeParams === 'v-withdrawHistory') {
      if (!isEmptyObject(inforCurrency)) {
        const additionalData = {
          'currency.equals': inforCurrency.id,
          size: 10,
          page: currentPage - 1,
          sort: 'createdDate,desc',
          'type.equals': 'WITHDRAW',
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
    if (!isEmptyObject(dataWithdrawHistory)) {
      if (!dataWithdrawHistory.isLoading) {
        setLoadingTableState(false);
      }
    }
  }, [dataWithdrawHistory]);
  const getCurrency = searchParams.get('currency');
  const handleResponseError = useHandleResponseError();

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
        columns={columnsWithdrawl}
        dataSource={dataWithdrawHistory.data}
        size="middle"
        total={dataWithdrawHistory.total}
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

export default TabWithdrawHistory;
