import sessionHistoryApi from 'api/sessionHistoryApi';
import { useAppTranslation } from 'app/hooks';
import { TableCommon } from 'components/Tables/TableCommon';
import { DATE_TIME_FORMAT, IMG_ALT } from 'consts';
import date from 'date-and-time';
import React, { useCallback, useEffect, useMemo, useState } from 'react';
import ImgCoinBackground from '../../../assets/images/some_coin.png';

interface PastSessionComponentProps {
  reloadSignal?: string;
}

interface PastSessionData {
  total?: number;
  data?: any[];
}

const initializeFilter = {
  page: 0,
  sort: 'id,desc',
};

const PastSessionComponent: React.FunctionComponent<PastSessionComponentProps> = ({
  reloadSignal,
}) => {
  const t = useAppTranslation();
  const [page, setPage] = useState<number>(0);
  const [pastSessions, setPastSessions] = useState<PastSessionData>({
    total: 0,
    data: [],
  });
  const [filter, setFiler] = useState(initializeFilter);

  useEffect(() => {
    getPastSessions(filter);
  }, [filter]);

  useEffect(() => {
    if (reloadSignal && page === 0) {
      getPastSessions(initializeFilter);
    }
    setPage(0);
    setFiler(initializeFilter);
  }, [reloadSignal]);

  const getPastSessions = useCallback(async (filter) => {
    const { body, pagination } = await sessionHistoryApi.getAllPastSession(filter);
    if (body) {
      setPastSessions({
        total: pagination?.total ?? 0,
        data: body.map((session, index) => ({
          key: index,
          platform: session.sessionId.slice(0, session.sessionId.indexOf('.')).toUpperCase(),
          ip: session.ipAddress,
          time: date.format(new Date(session.dateTime), DATE_TIME_FORMAT),
          location: session.location,
        })),
      });
    } else {
      setPastSessions({});
    }
  }, []);

  const handleOnChangePage = (page: number) => {
    setPage(page);
    setFiler({
      ...filter,
      page: page - 1,
    });
  };

  const columns = useMemo(
    () => [
      {
        title: t('setting.sessionHistory.platform'),
        dataIndex: 'platform',
      },
      {
        title: t('setting.sessionHistory.ip'),
        dataIndex: 'ip',
      },
      {
        title: t('setting.sessionHistory.time'),
        dataIndex: 'time',
      },
      {
        title: t('setting.sessionHistory.location'),
        dataIndex: 'location',
      },
    ],
    [t]
  );

  return (
    <>
      <div className="past-session">
        <div className="past-session__table">
          <div className="past-session__table__title">
            <div className="past-session__title__text">{t('setting.sessionHistory.pastTitle')}</div>
            <div className="past-session__title__img">
              <img src={ImgCoinBackground} alt={IMG_ALT} />
            </div>
          </div>

          <TableCommon
            columns={columns}
            dataSource={pastSessions.data ?? []}
            size="small"
            currentPage={page || 1}
            total={pastSessions.total ?? 0}
            showTotal
            onChange={handleOnChangePage}
            scroll={{ x: 768 }}
          />
        </div>
      </div>
    </>
  );
};

export default PastSessionComponent;
