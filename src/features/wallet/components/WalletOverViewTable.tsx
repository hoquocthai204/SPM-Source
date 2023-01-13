import React, { ChangeEvent } from 'react';
import SearchField from 'components/FormFields/SearchField';
import { TableCommon } from 'components/Tables/TableCommon';
import { CheckBox } from 'components/Commons/';
import bg_table from 'assets/images/bg_table.png';
import { getAllCurriencesExtra, setDataCurrenciesTable } from '../walletSlice';
import { useAppDispatch, useAppSelector, useAppTranslation } from 'app/hooks';
import { CheckboxChangeEvent } from 'antd/lib/checkbox';
import FormatRowColCoinTable from './FormatRowColCoinTable';
import { formatBigNumber, formatNumberExponential, useWindowDimensions } from 'utils';
import FormatRowColActionsTable from './FormatRowColActionsTable';
import FormatPercenChange24H from './FormatPercenChange24H';
import FormatPriceThbValue from './FormatPriceThbValue';
import BigNumber from 'bignumber.js';

interface IWalletOverViewTableProps {
  isHide: boolean;
  userId?: number;
}
interface RowTableProps {
  nameCoin: string;
  logoCoin: string;
  netWork: string;
}
const WalletOverViewTable: React.FunctionComponent<IWalletOverViewTableProps> = (props) => {
  const { isHide } = props;
  const t = useAppTranslation();

  const windowSize = useWindowDimensions();
  const columns = [
    {
      title: t('wallet.table.colCoin'),
      dataIndex: 'coin',
      key: 'coin',
      width: '25%',
      render: (coin: RowTableProps) => {
        return (
          <>
            <FormatRowColCoinTable
              image={coin.logoCoin}
              nameCoin={coin.nameCoin}
              netWork={coin.netWork}
            />
          </>
        );
      },
      hidden: true,
    },
    {
      title: 'CHANGE 24H',
      dataIndex: 'change24H',
      width: '15%',
      render: (_: any, row: any) => {
        return isHide ? (
          '*******'
        ) : row.shortName === 'THB' ? (
          <></>
        ) : (
          <FormatPercenChange24H
            available={row.available}
            blockedBalance={row.inOrder}
            valuation={row.valuation}
            shorName={row.shortName}
          />
        );
      },
    },
    {
      title: t('wallet.table.colTotal'),
      dataIndex: 'total',
      key: 'total',
      width: '15%',
      render: (total: number, row: any) => {
        return isHide
          ? '*******'
          : total
          ? row.shortName === 'THB'
            ? formatBigNumber(total, 'fiat')
            : formatBigNumber(total)
          : 0;
      },
    },
    {
      title: t('wallet.table.colAvailable'),
      dataIndex: 'available',
      key: 'available',
      width: '20%',
      render: (available: number, row: any) => {
        return isHide
          ? '*******'
          : available
          ? formatNumberExponential(available, row.shortName)
          : 0;
      },
    },
    {
      title: t('wallet.table.colInorder'),
      dataIndex: 'inOrder',
      key: 'inOrder',
      width: '15%',
      render: (inOrder: number) => {
        return isHide ? '*******' : inOrder ? formatNumberExponential(inOrder) : 0;
      },
    },
    {
      title: t('wallet.table.colThbValue'),
      dataIndex: 'thbValue',
      key: 'thbValue',
      width: '15%',
      render: (thbValue: number, row: any) => {
        return isHide ? (
          '*******'
        ) : row.shortName === 'THB' ? (
          <>{thbValue ? formatBigNumber(thbValue, 'fiat') : 0}</>
        ) : (
          <FormatPriceThbValue
            available={row.available}
            blockedBalance={row.inOrder}
            valuation={row.valuation}
            shorName={row.shortName}
          />
        );
      },
    },
    {
      title: t('wallet.table.colActions'),
      dataIndex: 'actions',
      key: 'actions',
      render: (_: any, row: any) => {
        return (
          <FormatRowColActionsTable
            idUserWallet={row.idUserWallet}
            currencyId={row.currencyId}
            shortName={row.shortName}
            userId={props.userId}
            coin={row.coin}
            networks={row.networks}
          />
        );
      },
    },
  ];

  const dispatch = useAppDispatch();
  const currenciesData = useAppSelector((state) => state.wallet.currenciesData);
  const userWallets = useAppSelector((state) => state.wallet.userWallets);
  const dataCurrenciesTable = useAppSelector((state) => state.wallet.dataCurrenciesTable);
  const [currentPage, setCurrentPage] = React.useState(1);
  const [dataTableFilter, setDataTableFilter] = React.useState<any>({
    total: 0,
    data: [],
  });

  const getAllCurrencies = React.useCallback(async () => {
    const additionalData = {
      size: 99999,
      sort: 'displayOrder,asc',
    };
    dispatch(getAllCurriencesExtra(additionalData));
  }, []);

  React.useEffect(() => {
    getAllCurrencies();
  }, []);

  // Maping user wallet and curriences
  React.useEffect(() => {
    if (userWallets && currenciesData) {
      const dt: any = [];
      const _cloneCurrenciesData = [...currenciesData];
      _cloneCurrenciesData.map((currencyData, index) => {
        userWallets.map((wallet, index) => {
          if (wallet.currency === currencyData.shortName) {
            dt.push({
              idUserWallet: wallet.id,
              currencyId: currencyData.id,
              shortName: currencyData.shortName,
              fullName: currencyData.fullName,
              key: index,
              coin: {
                logoCoin: currencyData.image,
                nameCoin: currencyData.shortName,
                netWork: currencyData.fullName,
              },
              networks: currencyData.networks,
              total: wallet.availableBalance + wallet.blockedBalance,
              available: wallet.availableBalance,
              inOrder: wallet.blockedBalance,
              valuation: wallet.valuation,
              thbValue: BigNumber.sum(wallet.availableBalance, wallet.blockedBalance)
                .multipliedBy(wallet.valuation ?? 1)
                .toNumber(),
            });
          }
        });
      });

      setDataTableFilter({
        total: currenciesData.length,
        data: dt,
      });
      dispatch(
        setDataCurrenciesTable({
          total: currenciesData.length,
          data: dt,
        })
      );
    }
  }, [userWallets, currenciesData]);

  // CHANGE PAGE OF TABLE
  const hanldeOnChangeTable = (page: number) => {
    setCurrentPage(page);
  };

  // HANDLE SEARCH TABLE
  const handleSearch = (event: ChangeEvent<HTMLInputElement>) => {
    const v = event.target.value;
    if (v === '') {
      setDataTableFilter({
        total: dataCurrenciesTable.total,
        data: dataCurrenciesTable.data,
      });
    } else {
      const res = dataTableFilter.data.filter((row: any) => {
        return (
          row.shortName.toUpperCase().includes(v.toUpperCase()) ||
          row.fullName.toUpperCase().includes(v.toUpperCase())
        );
      });
      setDataTableFilter({
        total: res.length,
        data: res,
      });
    }
  };

  // HIDE SMALL BALANCE
  const onChangeCheckBox = (event: CheckboxChangeEvent) => {
    const _checked = event.target.checked;
    if (_checked) {
      const res = dataCurrenciesTable.data.filter((row: any) => row.thbValue > 0);
      setDataTableFilter({
        total: res.length,
        data: res,
      });
    } else {
      setDataTableFilter({
        total: dataCurrenciesTable.total,
        data: dataCurrenciesTable.data,
      });
    }
  };

  return (
    <>
      <div className="wallet-table">
        <div className="wallet-table-head">
          <SearchField
            name="search"
            onChange={handleSearch}
            placeholder={t('form.placeholder.searchCoin')}
          />
          <CheckBox
            name="checkBoxBalances"
            label={t('form.label.hideSmallAmount')}
            onChangeCheckBox={onChangeCheckBox}
          />
          <span className="wallet-table-head__bg">
            <img src={bg_table} alt="" />
          </span>
        </div>

        <div className="wallet-table-container">
          <TableCommon
            currentPage={currentPage}
            dataSource={dataTableFilter.data}
            columns={columns}
            size="middle"
            total={dataTableFilter.length}
            classNamePagination="pagination"
            onChange={hanldeOnChangeTable}
            showTotal
            scroll={{ x: windowSize.width < 740 ? windowSize.width : 0 }}
          />
        </div>
      </div>
    </>
  );
};

export default WalletOverViewTable;
