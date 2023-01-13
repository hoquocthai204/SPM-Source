import userApi from 'api/userApi';
import React from 'react';
import { useEffect } from 'react';
import { useAppDispatch } from 'app/hooks';
import { setCurrentUser, setIsLoggedIn } from '../authSlice';

interface LoadUserDetailProps {}

const LoadUserDetail: React.FunctionComponent<LoadUserDetailProps> = (props) => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    (async () => {
      const { ok, body } = await userApi.getUserDetail();
      if (ok) {
        dispatch(setIsLoggedIn(true));
        dispatch(setCurrentUser(body));
      }
    })();
  });
  return <></>;
};

export default LoadUserDetail;
