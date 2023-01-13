import React from 'react';

interface HistorySiderIconProps {
  style?: React.CSSProperties;
  active?: boolean;
}

const HistorySiderIcon: React.FunctionComponent<HistorySiderIconProps> = (props) => {
  return (
    <span>
      {props.active ? (
        <svg
          width="18"
          height="18"
          viewBox="0 0 18 18"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <g clipPath="url(#clip0_14941_334603)">
            <path d="M15.2295 4.44V0L0.21949 0V4.44L15.2295 4.44Z" fill="#291CCB" />
            <path d="M3.21973 0H0.219727V4.44H3.21973V0Z" fill="#8981EF" />
            <path d="M15.2295 17.9498V13.5098L0.219494 13.5098V17.9498H15.2295Z" fill="#291CCB" />
            <path d="M3.21973 13.5195H0.219727V17.9595H3.21973V13.5195Z" fill="#8981EF" />
            <path d="M18.2295 11.2798V6.83984L3.21949 6.83984V11.2798H18.2295Z" fill="#291CCB" />
            <path d="M15.2197 11.2803H18.2197V6.84027H15.2197V11.2803Z" fill="#8981EF" />
          </g>
          <defs>
            <clipPath id="clip0_14941_334603">
              <rect width="18" height="18" fill="white" />
            </clipPath>
          </defs>
        </svg>
      ) : (
        <svg
          width="19"
          height="19"
          viewBox="0 0 19 19"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          style={props?.style}
        >
          <path
            d="M15.2297 4.73004V0.290039L0.219742 0.290039V4.73004L15.2297 4.73004Z"
            fill="#9199B1"
          />
          <path d="M3.21973 0.290039H0.219727V4.73004H3.21973V0.290039Z" fill="#5A6689" />
          <path d="M15.2297 18.2501V13.8101L0.219734 13.8101V18.2501H15.2297Z" fill="#9199B1" />
          <path d="M3.21973 13.8101H0.219727V18.2501H3.21973V13.8101Z" fill="#5A6689" />
          <path d="M18.2397 11.58V7.14001L3.22974 7.14001V11.58H18.2397Z" fill="#9199B1" />
          <path d="M15.2297 11.5701H18.2297V7.13007H15.2297V11.5701Z" fill="#5A6689" />
        </svg>
      )}
    </span>
  );
};

export { HistorySiderIcon };
