import { Alert } from 'antd';
import { InfoIcon } from 'components/Icons';
import React from 'react';

interface InfoBannerProps {
  description: React.ReactNode;
}

export const InfoBanner: React.FunctionComponent<InfoBannerProps> = (props) => {
  return (
    <Alert
      icon={<InfoIcon />}
      description={props.description}
      type="warning"
      showIcon
      className="info-banner"
    />
  );
};
