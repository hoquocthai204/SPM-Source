import { useAppDispatch } from 'app/hooks';
import { useUserDetail } from 'hooks';
import React, { useEffect } from 'react';
import useWebSocket, { ReadyState } from 'react-use-websocket';
import { isEmptyObject } from 'utils';
import { pushUpdateBalanceSignal, setBestPrices, setMarketPrices } from '../socketSlice';

interface SocketProps {}

const WEB_SOCKET_URL = process.env.REACT_APP_WEB_SOCKET as string;

const Socket: React.FunctionComponent<SocketProps> = (props) => {
  const dispatch = useAppDispatch();
  const { isUserLoggedIn, currentUser } = useUserDetail();

  const { sendJsonMessage, lastJsonMessage, readyState } = useWebSocket(WEB_SOCKET_URL, {
    shouldReconnect: () => true,
  });

  useEffect(() => {
    if (readyState === ReadyState.OPEN) {
      sendJsonMessage({ messageType: 'SUBSCRIBE_STREAM_MARKET_PRICE' });
      sendJsonMessage({ messageType: 'SUBSCRIBE_STREAM_BEST_PRICE' });

      if (isUserLoggedIn && currentUser && currentUser.sessionId) {
        sendJsonMessage({
          messageType: 'SUBSCRIBE_USER',
          params: { sessionId: currentUser.sessionId },
        });
      }
    }
  }, [isUserLoggedIn, currentUser, readyState, sendJsonMessage]);

  useEffect(() => {
    if (isEmptyObject(lastJsonMessage)) return;

    const { messageType, data } = lastJsonMessage;

    if (messageType === 'STREAM_MARKET_PRICE_UPDATE') {
      dispatch(setMarketPrices(data));
    }

    if (messageType === 'STREAM_BEST_PRICE_UPDATE') {
      dispatch(setBestPrices(data));
    }

    if (messageType === 'USER_BALANCE_UPDATE') {
      dispatch(pushUpdateBalanceSignal());
    }
  }, [lastJsonMessage, dispatch]);

  return <></>;
};

export default Socket;
