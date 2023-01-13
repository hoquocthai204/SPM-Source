import BackIcon from 'components/Icons/BackIcon';
import React from 'react';

interface BreadcrumbProps {
  backUrl?: string;
  title: string;
  size?: 'small';
}

export const Breadcrumb: React.FunctionComponent<BreadcrumbProps> = (props) => {
  const { backUrl, title, size = 'default' } = props;
  return (
    <span className={`breadcrumb ${size}`}>
      {backUrl && <BackIcon url={backUrl} />}
      <span style={{ cursor: 'context-menu' }}>{title}</span>
    </span>
  );
};
