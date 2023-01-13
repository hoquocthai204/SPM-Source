import { useAppDispatch } from 'app/hooks';
import { resetLoading, setLoading } from 'components/UIElements/Loading/loadingSlice';
import { useCallback } from 'react';

export const useLoadingSubmitForm = (callback: any) => {
  const dispatch = useAppDispatch();
  return useCallback(
    async (...args) => {
      dispatch(setLoading());
      await callback(...args);
      dispatch(resetLoading());
    },
    [dispatch, callback]
  );
};
