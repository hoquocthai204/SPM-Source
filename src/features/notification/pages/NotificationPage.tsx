import { CheckOutlined, DeleteOutlined, DownOutlined, SettingOutlined } from '@ant-design/icons';
import { Collapse } from 'antd';
import notificationApi from 'api/notificationApi';
import { useAppDispatch, useAppSelector, useAppTranslation } from 'app/hooks';
import { Breadcrumb } from 'components/Commons';
import { showSuccessModal } from 'components/Modals';
import { TableCommon } from 'components/Tables/TableCommon';
import { DATE_TIME_FORMAT } from 'consts';
import date from 'date-and-time';
import {
  SelectIsReadAllNotification,
  setDetailNotification,
  setIsReadAllNotification,
} from 'features/notification/notificationSlice';
import { useHandleResponseError } from 'hooks';
import { Notification } from 'models';
import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { SelectDataNotificationSocket } from '../notificationSlice';
import PrivateRoute from 'PrivateRoute';

interface NotificationPageProps {}
interface NotificationData {
  total?: number;
  data?: any[];
}
const initializeFilter = {
  page: 0,
};
const NotificationPage: React.FunctionComponent<NotificationPageProps> = (props) => {
  const t = useAppTranslation();
  const dispatch = useAppDispatch();
  const handleResponseError = useHandleResponseError();
  const navigate = useNavigate();

  const dataNotificationSocket = useAppSelector(SelectDataNotificationSocket);

  const [detailNoti, setDetailNoti] = useState<Notification>();
  const isReadAll = useAppSelector(SelectIsReadAllNotification);

  const [rowID, setRowID] = useState<number[]>([]);
  const [duplicate, setDuplicate] = useState<number>();
  const [dataFilter, setDataFilter] = useState(initializeFilter);
  const [page, setPage] = useState<number>(0);
  const [listNotification, setListNotification] = useState<NotificationData>({
    data: [],
    total: 0,
  });

  const handleChangeRow = (key: any, isSeen: boolean) => {
    setRowID([...rowID, key]);
    if (!isSeen) {
      makeReadNotification(key);
    }
  };
  useEffect(() => {
    const findElementDuplicate = rowID.filter((item, index) => rowID.indexOf(item) !== index);
    if (findElementDuplicate && findElementDuplicate.length > 0) {
      setDuplicate(findElementDuplicate[0]);
    }
  }, [rowID]);

  useEffect(() => {
    const index = rowID.indexOf(duplicate || 0);
    if (index > -1) {
      const removeDuplicate = rowID.filter((item) => item !== rowID[index]);
      setRowID(removeDuplicate);
      setDuplicate(0);
    }
  }, [duplicate]);

  const columns = useMemo(
    () => [
      {
        title: t('notification.title'),
        dataIndex: 'notification',
        render: (contents: any[]) => (
          <>
            {contents.map((content) => {
              return (
                <div
                  className="noti-head"
                  onClick={() => handleChangeRow(content.key, content.isSeen)}
                >
                  <div className="noti-head__content">
                    <div className="noti-head__content--detail">
                      <div className="noti-head__content--detail__head">
                        <span
                          className="point"
                          style={
                            content.isSeen
                              ? { backgroundColor: 'gray' }
                              : { backgroundColor: 'green' }
                          }
                        />
                        <span className="subject">{content.header}</span>
                      </div>
                      <p className="summary">
                        {rowID.includes(content.key)
                          ? content.content
                          : content.content.substring(0, 100) + '...'}
                      </p>
                    </div>
                  </div>
                  <div className="noti-head__date-time">
                    {date.format(new Date(content.createdDate), DATE_TIME_FORMAT)}
                    <br />
                    <DownOutlined rotate={rowID.includes(content.key) ? 180 : 0} />
                  </div>
                </div>
              );
            })}
          </>
        ),
      },
    ],
    [t, rowID]
  );

  useEffect(() => {
    getNotification(dataFilter);
  }, [dataFilter, dataNotificationSocket, detailNoti]);

  const getNotification = useCallback(async (dataFilter) => {
    const { body, pagination } = await notificationApi.getNotification(dataFilter);
    if (body) {
      setListNotification({
        total: pagination?.total ?? 0,
        data: body.map((item, index) => ({
          ...item,
          key: index + 1,
          notification: [
            {
              key: item.id,
              header: item.subject,
              content: item.message,
              isSeen: item.isSeen,
              createdDate: item.createdDate,
            },
          ],
        })),
      });
    } else {
      setListNotification({});
    }
  }, []);

  const makeReadNotification = useCallback(async (id: string) => {
    const { body } = await notificationApi.readNotification(id);
    if (body) {
      setDetailNoti(body);
      dispatch(setDetailNotification(body));
    }
  }, []);

  const handleOnChangePage = (page: number) => {
    setPage(page);
    setDataFilter({
      ...dataFilter,
      page: page - 1,
    });
  };
  const handleOk = () => {
    getNotification(dataFilter);
  };
  const handleReadAllNotification = async () => {
    const { ok, error } = await notificationApi.markReadAllNotification({});
    if (ok) {
      dispatch(setIsReadAllNotification(true));
      showSuccessModal({ message: t('notification.readAll'), onOk: handleOk });
    } else if (error) handleResponseError(error);
  };
  return (
    <>
      <div className="notification">
        <div className="notification__function">
          <div className="notification__title">
            <Breadcrumb backUrl={'/my/setting'} title={t('notification.title')} />
          </div>
          <div className="notification__function__group-function">
            <CheckOutlined title="Seen All" onClick={handleReadAllNotification} />
          </div>
        </div>
        <div className="notification__table">
          <TableCommon
            columns={columns}
            dataSource={listNotification.data ?? []}
            size="small"
            currentPage={page || 1}
            total={listNotification.total}
            showTotal
            onChange={handleOnChangePage}
          />
        </div>
      </div>
    </>
  );
};

export default PrivateRoute(NotificationPage);
