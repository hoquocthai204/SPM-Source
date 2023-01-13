import sessionHistoryApi from 'api/sessionHistoryApi';
import { useAppTranslation } from 'app/hooks';
import ImgCoinBackground from 'assets/images/some_coin.png';
import { showConfirmModal } from 'components/Modals';
import { TableCommon } from 'components/Tables/TableCommon';
import { DATE_TIME_FORMAT, IMG_ALT } from 'consts';
import date from 'date-and-time';
import React, { useCallback, useEffect, useMemo, useState } from 'react';

interface CurrentSessionComponentProps {
  onTerminateSession: any;
}

const CurrentSessionComponent: React.FunctionComponent<CurrentSessionComponentProps> = ({
  onTerminateSession,
}) => {
  const t = useAppTranslation();
  const [currentSessions, setCurrentSessions] = useState<any[]>([]);

  useEffect(() => {
    getCurrentSessions();
  }, []);

  const getCurrentSessions = useCallback(async () => {
    const { body } = await sessionHistoryApi.getAllCurrentSession();
    if (body) {
      setCurrentSessions(
        body.map((session, index) => ({
          key: index,
          platform: session.sessionId.slice(0, session.sessionId.indexOf('.')).toUpperCase(),
          ip: session.ipAddress,
          time: date.format(new Date(session.dateTime), DATE_TIME_FORMAT),
          location: session.location,
          current: session,
        }))
      );
    } else {
      setCurrentSessions([]);
    }
  }, []);

  const handleDeleteById = useCallback((id: string) => {
    sessionHistoryApi.deletePastSessionById(id);
    setTimeout(() => {
      if (onTerminateSession) onTerminateSession();
      getCurrentSessions();
    }, 500);
  }, []);

  const handleDeleteAll = useCallback(() => {
    sessionHistoryApi.deleteAllPastSession();
    setTimeout(() => {
      if (onTerminateSession) onTerminateSession();
      getCurrentSessions();
    }, 500);
  }, []);

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
      {
        title: () => (
          <p
            onClick={() =>
              showConfirmModal({
                message: t('setting.sessionHistory.buttonPopupTerminalAll'),
                onOk: handleDeleteAll,
              })
            }
          >
            {t('setting.sessionHistory.terminateAll')}
          </p>
        ),
        dataIndex: 'current',
        render: (item: any) => (
          <>
            {item.isCurrentSession ? (
              <p style={{ color: '#00632B', marginBottom: '0' }}>
                {t('setting.sessionHistory.current')}
              </p>
            ) : (
              <p
                style={{ color: '#B01212', marginBottom: '0' }}
                onClick={() =>
                  showConfirmModal({
                    message: t('setting.sessionHistory.buttonPopupTerminalById'),
                    onOk: () => handleDeleteById(item.sessionId),
                  })
                }
              >
                {t('setting.sessionHistory.terminate')}
              </p>
            )}
          </>
        ),
      },
    ],
    [t, handleDeleteById, handleDeleteAll]
  );

  return (
    <>
      <div className="current-session">
        <div className="current-session__table">
          <div className="current-session__table__title">
            <div className="current-session__title__text">
              {t('setting.sessionHistory.currentTitle')}
            </div>
            <div className="current-session__title__img">
              <img src={ImgCoinBackground} alt={IMG_ALT} />
            </div>
          </div>
          <TableCommon
            columns={columns}
            dataSource={currentSessions}
            size="small"
            scroll={{ x: 768 }}
          />
        </div>
      </div>
    </>
  );
};

export default CurrentSessionComponent;
