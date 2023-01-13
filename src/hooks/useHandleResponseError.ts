import { useErrTranslation } from 'app/hooks';
import { setFieldErrors } from 'components/Forms/formSlice';
import { showErrorModal } from 'components/Modals';
import { setClearStateToLogout } from 'features/auth/authSlice';
import { HttpError } from 'models';
import { useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

export const useHandleResponseError = (formName?: string) => {
const dispatch = useDispatch();
  const et = useErrTranslation();
  const navigate = useNavigate();
  const handleOK = () => {
    dispatch(setClearStateToLogout());
    navigate('/login');
  };
  return useCallback(
    (error?: HttpError, onOk?: any) => {
      console.log(error);
      if (!error) return;
      if (error.unauthorized) {
        showErrorModal({ message: et(error.message), onOk: handleOK, title: et(error.title || '')});
      }
      if (error.serverError || (error.badRequest && !error.fieldErrors))
        showErrorModal({ message: et(error.message), onOk: onOk, title: et(error.title || '') });
      if (error.badRequest && error.fieldErrors) dispatch(setFieldErrors(error.fieldErrors));
    },
    [dispatch, et]
  );
};
