import React from 'react';

interface SiderCollapseIconProps {
  collapse?: boolean;
}

const collapseIcon = (
  <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path
      d="M6.46944 13.832L1.63342 8.99593L6.46944 4.15991L7.93693 5.63573L4.57672 8.99593L7.93693 12.3645L6.46944 13.832Z"
      fill="#9199B1"
    />
    <path d="M10.7136 7.96179H3.10101V10.0463H10.7136V7.96179Z" fill="#9199B1" />
    <path d="M16.5 1.5H14.4156V16.5H16.5V1.5Z" fill="#9199B1" />
  </svg>
);

const expandIcon = (
  <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path
      d="M11.5306 13.832L16.3666 8.99593L11.5306 4.15991L10.0631 5.63573L13.4233 8.99593L10.0631 12.3645L11.5306 13.832Z"
      fill="#9199B1"
    />
    <path d="M7.28642 7.96179H14.899V10.0463H7.28642V7.96179Z" fill="#9199B1" />
    <path d="M1.49995 1.5H3.58444V16.5H1.49995V1.5Z" fill="#9199B1" />
  </svg>
);

export const SiderCollapseIcon: React.FunctionComponent<SiderCollapseIconProps> = ({
  collapse,
}) => {
  return <> {collapse ? expandIcon : collapseIcon} </>;
};
