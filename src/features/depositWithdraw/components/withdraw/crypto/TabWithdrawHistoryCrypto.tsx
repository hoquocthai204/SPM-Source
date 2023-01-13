import { useAppDispatch, useAppSelector, useAppTranslation } from 'app/hooks';
import * as React from 'react';
import {
  cutString,
  formatBigNumber,
  formatNumber,
  formatNumberExponential,
  isEmptyObject,
} from 'utils';
import Paragraph from 'antd/lib/typography/Paragraph';
import cryptoApi from 'api/cryptoApi';
import { TableCommon } from 'components/Tables/TableCommon';
import date from 'date-and-time';
import { DATE_TIME_FORMAT } from 'consts';
import { setConfirmationsWithdrawCrypto } from 'features/depositWithdraw/depositWithdrawCryptoSlice';
import Badge from 'components/UIElements/Badge/Badge';
import { useHandleResponseError } from 'hooks';
import { useSearchParams } from 'react-router-dom';

interface TabWithdrawHistoryCryptoProps {}

const TabWithdrawHistoryCrypto: React.FunctionComponent<TabWithdrawHistoryCryptoProps> = (
  props
) => {
  const t = useAppTranslation();

  const columnsWithdrawCrypto = [
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
      title: t('depositWithdraw.table.col.amount'),
      dataIndex: 'amount',
      key: 'amount',
      render: (amount: number) => {
        return (
          <div className="text-r-14-20" style={{ color: '#5A6689' }}>
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
              __html: confirmations
                ? confirmations?.toString().bold() + '/' + confirmationsWithdrawCrypto
                : '0'.bold() + '/' + confirmationsWithdrawCrypto,
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
  const handleResponseError = useHandleResponseError();
  const [currentPage, setCurrentPage] = React.useState<number>(1);
  const [dataTableDepositHistory, setDataTableDepositHistory] = React.useState<any>({});
  const [searchParams, setSearchParams] = useSearchParams();
  const getTypeParams = searchParams.get('type');
  const paramsCryto = useAppSelector((state) => state.depositWithdrawCrypto.paramsCryto);
  const confirmationsWithdrawCrypto = useAppSelector(
    (state) => state.depositWithdrawCrypto.confirmationsWithdrawCrypto
  );

  const dispatch = useAppDispatch();

  const searchTransactionCryptoForUser = React.useCallback(
    async (currencyId: number) => {
      const res = await cryptoApi.searchTransactionCrypto({
        'currency.equals': currencyId,
        size: 10,
        page: currentPage - 1,
        sort: 'createdDate,desc',
        'type.in': ['WITHDRAW', 'WITHDRAW_INTERNAL'],
      });
      if (res.ok) {
        setDataTableDepositHistory({
          data: res.body,
          total: res.pagination?.total,
        });
      } else if (res.error) {
        handleResponseError(res.error);
      }
    },
    [paramsCryto?.currencyId, currentPage]
  );

  // get setting withdraw crypto
  const getSettingWithdrawCrypto = React.useCallback(
    async (idCrypto: number) => {
      const res = await cryptoApi.getCryptoWithdrawSetting(idCrypto);
      if (res.ok) {
        dispatch(setConfirmationsWithdrawCrypto(res.body.confirmations));
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

  React.useEffect(() => {
    if (getTypeParams === 'v-withdrawHistory') {
      if (!isEmptyObject(paramsCryto) && paramsCryto?.currencyId) {
        searchTransactionCryptoForUser(paramsCryto?.currencyId);
        getSettingWithdrawCrypto(paramsCryto?.currencyId);
      }
    }
  }, [paramsCryto, currentPage]);

  return (
    <>
      <TableCommon
        currentPage={currentPage}
        columns={columnsWithdrawCrypto}
        dataSource={dataTableDepositHistory.data}
        size="middle"
        total={dataTableDepositHistory.total}
        classNamePagination="pagination"
        showTotal
        onChange={handleOnChangePage}
      />
    </>
  );
};

export default TabWithdrawHistoryCrypto;
