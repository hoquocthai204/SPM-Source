import React from 'react';
import { Result, Button } from 'antd';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';

interface NotFoundPageProps {}

const NotFoundPage: React.FunctionComponent<NotFoundPageProps> = (props) => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  return (
    <>
      <Result
        status="404"
        title="404"
        subTitle={t('404')}
        extra={
          <Button type="primary" onClick={() => navigate('/')}>
            {t('backHome')}
          </Button>
        }
      />
    </>
  );
};

export default NotFoundPage;
