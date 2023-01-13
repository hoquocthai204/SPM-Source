import { useAppTranslation, useTitle } from 'app/hooks';
import { Breadcrumb } from 'components/Commons';
import React, { useCallback } from 'react';
import CurrentSessionComponent from '../components/CurrentSessionComponent';
import PastSessionComponent from '../components/PastSessionComponent';
import { useState } from 'react';
import { uniqueId } from 'utils';
import PrivateRoute from 'PrivateRoute';

interface SessionHistoryPageProps {}

const SessionHistoryPage: React.FunctionComponent<SessionHistoryPageProps> = (props) => {
  const t = useAppTranslation();
  useTitle(t('title.sessionHistory'));
  const [refetchPastSessions, setRefetchPastSessions] = useState<string | undefined>(undefined);

  const onRefetchPastSessions = useCallback(() => {
    setRefetchPastSessions(uniqueId());
  }, []);

  return (
    <>
      <div className="session-history-page">
        <Breadcrumb title={t('setting.sessionHistory.title')} backUrl={'/my/setting'} />
        <CurrentSessionComponent onTerminateSession={onRefetchPastSessions} />
        <PastSessionComponent reloadSignal={refetchPastSessions} />
      </div>
    </>
  );
};

export default PrivateRoute(SessionHistoryPage);
