import React from 'react';

interface MarketSiderIconProps {
  style?: React.CSSProperties;
  active?: Boolean;
}

const MarketSiderIcon: React.FunctionComponent<MarketSiderIconProps> = (props) => {
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
          <g clipPath="url(#clip0_14941_334597)">
            <path d="M4.44 11.3398H0V17.9998H4.44V11.3398Z" fill="#291CCB" />
            <path d="M11.2203 0H6.78027V18H11.2203V0Z" fill="#291CCB" />
            <path d="M18.0001 5.98047H13.5601V18.0005H18.0001V5.98047Z" fill="#291CCB" />
            <path d="M4.44 14.6699H0V17.9999H4.44V14.6699Z" fill="#8981EF" />
            <path d="M11.2203 9H6.78027V18H11.2203V9Z" fill="#8981EF" />
            <path d="M18.0001 11.9902H13.5601V18.0002H18.0001V11.9902Z" fill="#8981EF" />
          </g>
          <defs>
            <clipPath id="clip0_14941_334597">
              <rect width="18" height="18" fill="white" />
            </clipPath>
          </defs>
        </svg>
      ) : (
        <svg
          width="18"
          height="19"
          viewBox="0 0 18 19"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          style={props?.style}
        >
          <path d="M4.44 12.2101H0V18.8701H4.44V12.2101Z" fill="#9199B1" />
          <path d="M11.22 0.870117H6.78003V18.8701H11.22V0.870117Z" fill="#9199B1" />
          <path d="M18.0001 6.8501H13.5601V18.8701H18.0001V6.8501Z" fill="#9199B1" />
          <path d="M4.44 15.5402H0V18.8702H4.44V15.5402Z" fill="#5A6689" />
          <path d="M11.22 9.87012H6.78003V18.8701H11.22V9.87012Z" fill="#5A6689" />
          <path d="M18.0001 12.8601H13.5601V18.8701H18.0001V12.8601Z" fill="#5A6689" />
        </svg>
      )}
    </span>
  );
};

export { MarketSiderIcon };
