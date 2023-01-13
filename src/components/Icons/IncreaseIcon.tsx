import React from 'react';

interface IncreaseIconProps {}

const IncreaseIcon: React.FunctionComponent<IncreaseIconProps> = (props) => {
  return (
    <span>
      <svg
        width="48"
        height="48"
        viewBox="0 0 48 48"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <rect opacity="0.05" x="7" y="7" width="34" height="34" rx="17" fill="white" />
        <path
          d="M21.5459 16.0839L30.7383 16.7911M30.7383 16.7911L31.4454 25.9834M30.7383 16.7911L17.2616 30.2677"
          stroke="#B6B6B6"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </span>
  );
};

export { IncreaseIcon };
