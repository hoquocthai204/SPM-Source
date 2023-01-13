import { useAppDispatch } from 'app/hooks';
import { setIsSubmitting } from 'components/Forms/formSlice';
import { useCallback } from 'react';

export const useSubmitForm = (callbackFn: any) => {
  const dispatch = useAppDispatch();
  return useCallback(
    async (...args) => {
      dispatch(setIsSubmitting(true));
      await callbackFn(...args);
      dispatch(setIsSubmitting(false));
    },
    [dispatch, callbackFn]
  );
};
