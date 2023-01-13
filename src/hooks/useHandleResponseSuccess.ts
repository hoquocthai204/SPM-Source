import { showSuccessModal } from 'components/Modals';
// import { HttpResponse } from 'models';
import { useErrTranslation } from 'app/hooks';

import { useCallback } from 'react';

export const useHandleResponseSuccess = () => {
  const et = useErrTranslation();
  return useCallback((response: boolean, message: string, onOk: any) => {
    if (!response) return;
    if (response) {
      showSuccessModal({ message: et(message), onOk: onOk });
    }
  }, []);
};
