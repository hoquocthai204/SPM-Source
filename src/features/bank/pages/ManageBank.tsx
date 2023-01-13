import { PlusOutlined } from '@ant-design/icons';
import { Tag } from 'antd';
import bankApi from 'api/bankApi';
import { useAppTranslation } from 'app/hooks';
import { Breadcrumb } from 'components/Commons';
import { showConfirmModal, showInfoModal } from 'components/Modals';
import { TableCommon } from 'components/Tables/TableCommon';
import { IMG_ALT } from 'consts';
import { useUserDetail } from 'hooks';
import PrivateRoute from 'PrivateRoute';
import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';

interface ManageBankProps {}
interface BankData {
  total?: number;
  data?: any[];
}
const initializeFilter = {
  page: 0,
};

const ManageBank: React.FunctionComponent<ManageBankProps> = (props) => {
  const t = useAppTranslation();
  const navigate = useNavigate();
  const { currentUser } = useUserDetail();

  const [page, setPage] = useState<number>(0);

  const [bank, setBank] = useState<BankData>({
    total: 0,
    data: [],
  });
  const [dataFilter, setDataFilter] = useState(initializeFilter);

  useEffect(() => {
    getBanks(dataFilter);
  }, [dataFilter]);

  const handleOK = () => {
    navigate('/my/setting');
  };
  useEffect(() => {
    if (currentUser && currentUser.kycStatus !== 'ACCEPTED') {
      showInfoModal({ message: t('manage-bank.popUpInfoAccessBank'), onOk: handleOK });
    }
  }, []);

  const getBanks = useCallback(async (dataFilter) => {
    const { body, pagination } = await bankApi.getAllUserBanks(dataFilter);
    if (body) {
      setBank({
        total: pagination?.total ?? 0,
        data: body.map((item, index) => ({
          ...item,
          key: index + 1,
          bankname: {
            name: item.bankNameEn,
            image: item.bankImage,
          },
          banknumber: item.accountNumber,
          status: item.bankStatus,
          action: {
            key: item.id,
            value: 'Remove',
          },
        })),
      });
    } else {
      setBank({});
    }
  }, []);

  const handleDeleteById = useCallback((id: string) => {
    bankApi.deleteUserBankById(id);
    setTimeout(() => {
      setPage(0);
      getBanks(initializeFilter);
    }, 500);
  }, []);

  const columns = useMemo(
    () => [
      {
        title: t('manage-bank.bankName'),
        dataIndex: 'bankname',
        render: (bank: any) => (
          <div className="bank-name">
            <img src={bank?.image} alt={IMG_ALT} width="30px" height="30px" />
            <p>{bank.name}</p>
          </div>
        ),
      },
      {
        title: t('manage-bank.bankNumber'),
        dataIndex: 'banknumber',
      },
      {
        title: t('manage-bank.status'),
        dataIndex: 'status',
        render: (status: string) => (
          <>
            {status === 'VERIFIED' ? (
              <Tag color="success" key={status}>
                {status[0].toUpperCase() + status.substring(1).toLowerCase()}
              </Tag>
            ) : status === 'REJECTED' ? (
              <Tag color="error" key={status}>
                {status[0].toUpperCase() + status.substring(1).toLowerCase()}
              </Tag>
            ) : (
              <Tag color="warning" key={status}>
                {status[0].toUpperCase() + status.substring(1).toLowerCase()}
              </Tag>
            )}
          </>
        ),
      },
      {
        title: t('manage-bank.action'),
        dataIndex: 'action',
        render: (record: any) => (
          <>
            <span
              onClick={() =>
                showConfirmModal({
                  message: t('manage-bank.popUpConfirmDelete'),
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

  const handleOnChangePage = (page: number) => {
    setPage(page);
    setDataFilter({
      ...dataFilter,
      page: page - 1,
    });
  };

  return (
    <>
      <div className="manage-bank">
        <div className="manage-bank__head">
          <div className="manage-bank__goback">
            <Breadcrumb backUrl={'/my/setting'} title={t('manage-bank.title')} />
          </div>
          <div className="manage-bank__add-new" onClick={() => navigate('/my/add-user-bank')}>
            <PlusOutlined />
            <p className="add-new-bank">{t('manage-bank.addNewBank')}</p>
          </div>
        </div>
        <div className="manage-bank__table">
          <TableCommon
            columns={columns}
            dataSource={bank.data ?? []}
            size="small"
            currentPage={page || 1}
            total={bank.total}
            showTotal
            onChange={handleOnChangePage}
          />
        </div>
      </div>
    </>
  );
};

export default PrivateRoute(ManageBank);
