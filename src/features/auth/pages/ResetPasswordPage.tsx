import React from 'react';

import { useAppTranslation, useErrTranslation } from 'app/hooks';
import ResetPassword from '../components/ResetPassword';
import { usePreventLoggedIn } from 'hooks/usePreventLoggedIn';

interface IResetPasswordPageProps {}

const ResetPasswordPage: React.FunctionComponent<IResetPasswordPageProps> = (props) => {
  const t = useAppTranslation();
  usePreventLoggedIn();

  return (
    <>
      <div className="reset-ui">
        <div className="reset-ui-head">
          <div className="reset-ui-head__title text-sb-32-30">{t('resetPassword.title')}</div>
        </div>
        <div className="reset-ui-form">
          <ResetPassword />
        </div>
      </div>
    </>
  );
};

export default ResetPasswordPage;
