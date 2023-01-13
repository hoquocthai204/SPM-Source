import { useAppDispatch } from 'app/hooks';
import { setDataNotification } from 'features/notification/notificationSlice';
import { useUserDetail } from 'hooks';
import React, { useEffect } from 'react';
import useWebSocket, { ReadyState } from 'react-use-websocket';

interface NotificationSocketProps {}

const WEB_NOTIFICATION_SOCKET_URL = process.env.REACT_APP_NOTIFICATION_WEB_SOCKET as string;

const NotificationSocket: React.FunctionComponent<NotificationSocketProps> = (props) => {
  const dispatch = useAppDispatch();
  const { isUserLoggedIn, currentUser } = useUserDetail();

  const { sendJsonMessage, lastJsonMessage, readyState } = useWebSocket(
    WEB_NOTIFICATION_SOCKET_URL,
    {
      shouldReconnect: () => true,
    }
  );

  useEffect(() => {
    if (readyState === ReadyState.OPEN && isUserLoggedIn && currentUser && currentUser.sessionId) {
      sendJsonMessage({
        messageType: 'SUBSCRIBE_USER',
        sessionId: currentUser.sessionId,
      });
    }
  }, [isUserLoggedIn, currentUser, readyState, sendJsonMessage]);

  useEffect(() => {
    if (!lastJsonMessage) return;
    const { count } = lastJsonMessage;
    if (count) {
      dispatch(setDataNotification(count));
    }
  }, [lastJsonMessage, dispatch]);

  return <></>;
};

export default NotificationSocket;
