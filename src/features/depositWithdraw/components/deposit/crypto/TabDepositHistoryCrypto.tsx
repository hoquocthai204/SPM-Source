import React, { useCallback, useEffect, useState } from 'react';
import { TableCommon } from 'components/Tables/TableCommon';
import { useAppDispatch, useAppSelector, useAppTranslation } from 'app/hooks';
import cryptoApi from 'api/cryptoApi';
import { formatBigNumber, formatNumber, formatNumberExponential, isEmptyObject } from 'utils';
import Paragraph from 'antd/lib/typography/Paragraph';
import { cutString } from 'utils/cutString';
import date from 'date-and-time';
import { DATE_TIME_FORMAT } from 'consts';
import Badge from 'components/UIElements/Badge/Badge';
import { setConfirmationsDepositCrypto } from '../../../depositWithdrawCryptoSlice';
import { useHandleResponseError } from 'hooks';
import { useSearchParams } from 'react-router-dom';

interface TabDepositHistoryCryptoProps {}

const TabDepositHistoryCrypto: React.FunctionComponent<TabDepositHistoryCryptoProps> = ({}) => {
  const t = useAppTranslation();
  const dispatch = useAppDispatch();
  const handleResponseError = useHandleResponseError();
  const [searchParams, setSearchParams] = useSearchParams();
  const getTypeParams = searchParams.get('type');
  const columnsDepositCrypto = [
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
      // responsive: ["sm"]
    },
    {
      title: t('depositWithdraw.table.col.amount'),
      dataIndex: 'amount',
      key: 'amount',
      render: (amount: number) => {
        return (
          <div className="text-r-14-20" style={{ color: '#5A6689' }}>
            {/* {formatNumber(amount, false)} */}
            {formatBigNumber(amount)}
          </div>
        );
      },
    },
    {
      title: 'FEE',
      dataIndex: 'chargedFee',
      key: 'chargedFee',
      render: (chargedFee: number) => {
        return (
          <div className="text-r-14-20" style={{ color: '#5A6689' }}>
            {formatNumberExponential(chargedFee)}
          </div>
        );
      },
    },
    {
      title: t('depositWithdraw.table.col.txid'),
      dataIndex: 'toAddress',
      key: 'toAddress',
      render: (toAddress: string) => {
        return (
          <Paragraph copyable={{ text: toAddress }} style={{ color: '#357CE1' }}>
            {cutString({
              start: 10,
              end: 10,
              originalString: toAddress,
              replaceBy: '....',
            })}
          </Paragraph>
        );
      },
    },
    {
      title: t('depositWithdraw.table.col.confirmations'),
      dataIndex: 'confirmations',
      key: 'confirmations',
      render: (confirmations: number) => {
        return (
          <div
            dangerouslySetInnerHTML={{
              __html: confirmations.toString().bold() + '/' + confirmationsDepositCrypto,
            }}
          ></div>
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
  const paramsCryto = useAppSelector((state) => state.depositWithdrawCrypto.paramsCryto);
  const [dataTableDepositHistory, setDataTableDepositHistory] = useState<any>({});
  const [currentPage, setCurrentPage] = useState<number>(1);
  const confirmationsDepositCrypto = useAppSelector(
    (state) => state.depositWithdrawCrypto.confirmationsDepositCrypto
  );

  const searchTransactionCryptoForUser = async (currencyId: number) => {
    const res = await cryptoApi.searchTransactionCrypto({
      'currency.equals': currencyId,
      size: 10,
      page: currentPage - 1,
      sort: 'createdDate,desc',
      'type.in': ['DEPOSIT', 'DEPOSIT_INTERNAL'],
    });
    if (res.ok) {
      setDataTableDepositHistory({
        data: res.body,
        total: res.pagination?.total,
      });
    } else if (res.error) {
      handleResponseError(res.error);
    }
  };

  // get setting deposit crypto
  const getSettingDepositCrypto = useCallback(
    async (idCrypto: number) => {
      const res = await cryptoApi.getCryptoDepositSetting(idCrypto);
      if (res.ok) {
        dispatch(setConfirmationsDepositCrypto(res.body.confirmations));
      } else if (res.error) {
        handleResponseError(res.error);
      }
    },
    [paramsCryto?.currencyId]
  );

  // on change table
  const handleOnChangePage = (page: number) => {
    setCurrentPage(page);
  };

  useEffect(() => {
    if (getTypeParams === 'v-depositHistory') {
      if (!isEmptyObject(paramsCryto) && paramsCryto?.currencyId) {
        searchTransactionCryptoForUser(paramsCryto?.currencyId);
        getSettingDepositCrypto(paramsCryto?.currencyId);
      }
    }
  }, [paramsCryto, currentPage]);

  return (
    <>
      <TableCommon
        currentPage={currentPage}
        columns={columnsDepositCrypto}
        dataSource={dataTableDepositHistory.data}
        size="middle"
        total={dataTableDepositHistory.total}
        classNamePagination="pagination"
        showTotal
        onChange={handleOnChangePage}
        scroll={{ x: 'calc(800px + 16%)' }}
        // scroll={{ x: 1500 }}
      />
    </>
  );
};

export default TabDepositHistoryCrypto;
