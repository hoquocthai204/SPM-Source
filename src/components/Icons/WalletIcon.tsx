import React from 'react';

interface WalletIconProps {
  style: React.CSSProperties;
}

const WalletIcon: React.FunctionComponent<WalletIconProps> = (props) => {
  return (
    <span>
      <svg
        width="20"
        height="20"
        viewBox="0 0 20 20"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        style={props.style}
      >
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M1.81818 0H18.1818C19.186 0 20 0.994923 20 2.22222V9V11V17.7778C20 19.0051 19.186 20 18.1818 20H1.81818C0.814028 20 0 19.0051 0 17.7778V2.22222C0 0.994923 0.814028 0 1.81818 0ZM18 9V2H2V9H5.41421L7.66269 11.2485L10.7622 4.01627L14.5 9H18ZM2 11H4.58579L8.33731 14.7515L11.2378 7.98373L13.5 11H18V18H2V11Z"
          fill="#FC4F00"
        />
      </svg>
    </span>
  );
};

export { WalletIcon };
