import { PlusOutlined } from '@ant-design/icons';
import manageAddressBookApi from 'api/manageAddressBook';
import { useAppTranslation } from 'app/hooks';
import { Breadcrumb } from 'components/Commons';
import { showConfirmModal } from 'components/Modals';
import { TableCommon } from 'components/Tables/TableCommon';
import PrivateRoute from 'PrivateRoute';
import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { cutString } from 'utils';

interface ManageAddressBookProps {}
interface AddressBookData {
  total?: number;
  data?: any[];
}
const initializeFilter = {
  page: 0,
};
const ManageAddressBook: React.FunctionComponent<ManageAddressBookProps> = (props) => {
  const t = useAppTranslation();
  const navigate = useNavigate();
  const [page, setPage] = useState<number>(0);

  const [addressBook, setAddressBook] = useState<AddressBookData>({
    total: 0,
    data: [],
  });
  const [dataFilter, setDataFilter] = useState(initializeFilter);
  const columns = useMemo(
    () => [
      {
        title: t('address-book.table.name'),
        dataIndex: 'shortName',
      },
      {
        title: t('address-book.table.coin'),
        dataIndex: 'coin',
      },
      {
        title: t('address-book.table.network'),
        dataIndex: 'network',
      },
      {
        title: t('address-book.table.address'),
        dataIndex: 'address',
        render: (text: any, record: any) => (
          <span>
            {cutString({
              start: 17,
              end: 14,
              replaceBy: '....',
              originalString: record.address ? record.address.toString() : '',
            })}
          </span>
        ),
      },
      {
        title: t('address-book.table.tagMemo'),
        dataIndex: 'tagMemo',
      },
      {
        title: t('address-book.table.action'),
        dataIndex: 'action',
        render: (record: any) => (
          <>
            <span
              onClick={() =>
                showConfirmModal({
                  message: t('address-book.confirmModal'),
                  onOk: () => handleDeleteById(record.key),
                })
              }
            >
              {record.value}
            </span>
          </>
        ),
      },
    ],
    [t]
  );
  useEffect(() => {
    getAddressBook(dataFilter);
  }, [dataFilter]);
  const getAddressBook = useCallback(async (dataFilter) => {
    const { body, pagination } = await manageAddressBookApi.getAddressBook(dataFilter);
    if (body) {
      setAddressBook({
        total: pagination?.total ?? 0,
        data: body.map((item, index) => ({
          ...item,
          key: index + 1,
          shortName: item.name,
          coin: item.currencySN,
          network: item.networkSN,
          address: item.address,
          tagMemo: item.tag ? item.tag : '- - -',
          action: {
            key: item.id,
            value: t('address-book.table.remove'),
          },
        })),
      });
    } else {
      setAddressBook({});
    }
  }, []);

  const handleOnChangePage = (page: number) => {
    setPage(page);
    setDataFilter({
      ...dataFilter,
      page: page - 1,
    });
  };

  const handleDeleteById = useCallback((id: string) => {
    manageAddressBookApi.deleteAddressBook(id);
    setTimeout(() => {
      setPage(0);
      getAddressBook(initializeFilter);
    }, 500);
  }, []);
  return (
    <div className="manage-address-book">
      <div className="manage-address-book__head">
        <div className="manage-address-book__head__title">
          <Breadcrumb backUrl={'/my/setting'} title={t('address-book.title')} />
        </div>
        <div
          className="manage-address-book__head__add-new"
          onClick={() => navigate('/my/add-address-book')}
        >
          <PlusOutlined />
          <span className="add-new-bank">{t('address-book.addNew')}</span>
        </div>
      </div>
      <div className="manage-address-book__table">
        <TableCommon
          columns={columns}
          dataSource={addressBook.data ?? []}
          size="small"
          currentPage={page || 1}
          total={addressBook.total}
          showTotal
          onChange={handleOnChangePage}
        />
      </div>
    </div>
  );
};

export default PrivateRoute(ManageAddressBook);
