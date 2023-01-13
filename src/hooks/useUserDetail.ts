import userApi from 'api/userApi';
import { useAppDispatch, useAppSelector } from 'app/hooks';
import {
  selectCurrentUser,
  selectIsLoggedIn,
  setCurrentUser,
  setIsLoggedIn,
} from 'features/auth/authSlice';
import { useCallback, useMemo } from 'react';

export const useUserDetail = () => {
  const dispatch = useAppDispatch();

  const isUserLoggedIn = useAppSelector(selectIsLoggedIn);
  const currentUser = useAppSelector(selectCurrentUser);

  const getUserDetail = useCallback(async () => {
    const { ok, body } = await userApi.getUserDetail();
    if (!ok || !body) return undefined;
    dispatch(setCurrentUser(body));
    dispatch(setIsLoggedIn(true));
    return body;
  }, [dispatch]);

  return useMemo(() => {
    return {
      getUserDetail,
      isUserLoggedIn,
      currentUser,
    };
  }, [getUserDetail, isUserLoggedIn, currentUser]);
};
