import React from 'react';

interface DecreaseIconProps {}

const DecreaseIcon: React.FunctionComponent<DecreaseIconProps> = (props) => {
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
          d="M31.4453 21.0752L30.7382 30.2676M30.7382 30.2676L21.5459 30.9747M30.7382 30.2676L17.2616 16.7909"
          stroke="#B6B6B6"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </span>
  );
};

export { DecreaseIcon };
