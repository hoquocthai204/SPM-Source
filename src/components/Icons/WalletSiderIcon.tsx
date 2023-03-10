import React from 'react';

interface WalletSiderIconProps {
  style?: React.CSSProperties;
  active?: boolean;
}

const WalletSiderIcon: React.FunctionComponent<WalletSiderIconProps> = (props) => {
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
          <g clipPath="url(#clip0_14941_334605)">
            <path d="M-0.0400391 7.36V5.35L13.46 0V7.36H-0.0400391Z" fill="#291CCB" />
            <path
              d="M-0.0400391 5.34961V17.9496H17.96V5.34961H-0.0400391ZM9.15994 13.6196L7.15994 11.6196L9.15994 9.61961L11.1599 11.6196L9.15994 13.6196Z"
              fill="#8981EF"
            />
            <path
              d="M9.16032 7.36036C8.30944 7.36037 7.47768 7.61281 6.77034 8.08574C6.06299 8.55868 5.51188 9.23084 5.18672 10.0171C4.86156 10.8034 4.77698 11.6685 4.94371 12.5029C5.11044 13.3373 5.52097 14.1035 6.12334 14.7045C6.7257 15.3054 7.49281 15.7142 8.32759 15.879C9.16237 16.0437 10.0273 15.9572 10.8128 15.6302C11.5984 15.3032 12.2692 14.7505 12.7405 14.042C13.2118 13.3336 13.4623 12.5012 13.4603 11.6504C13.4603 11.0862 13.349 10.5275 13.1328 10.0063C12.9166 9.4852 12.5997 9.01183 12.2003 8.61333C11.8009 8.21484 11.3268 7.89905 10.8051 7.68404C10.2835 7.46904 9.72453 7.35905 9.16032 7.36036ZM9.16032 13.6204L7.16032 11.6204L9.16032 9.62036L11.1603 11.6204L9.16032 13.6204Z"
              fill="#291CCB"
            />
          </g>
          <defs>
            <clipPath id="clip0_14941_334605">
              <rect width="18" height="18" fill="white" />
            </clipPath>
          </defs>
        </svg>
      ) : (
        <svg
          width="18"
          height="18"
          viewBox="0 0 18 18"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          style={props?.style}
        >
          <g clipPath="url(#clip0_398_7406)">
            <path
              d="M-0.0400391 6.87001V4.86001L13.46 -0.48999V6.87001H-0.0400391Z"
              fill="#5A6689"
            />
            <path
              d="M-0.0400391 4.82007V17.4201H17.96V4.82007H-0.0400391ZM9.15994 13.0901L7.15994 11.0901L9.15994 9.09007L11.1599 11.0901L9.15994 13.0901Z"
              fill="#9199B1"
            />
            <path
              d="M9.15986 6.87001C8.31181 6.87198 7.48339 7.12527 6.77922 7.59786C6.07505 8.07045 5.52673 8.74114 5.20356 9.52521C4.8804 10.3093 4.79689 11.1715 4.96354 12.0031C5.1302 12.8346 5.53957 13.598 6.13994 14.197C6.7403 14.796 7.50472 15.2036 8.33662 15.3683C9.16853 15.533 10.0306 15.4475 10.8139 15.1225C11.5972 14.7975 12.2666 14.2476 12.7376 13.5424C13.2085 12.8371 13.4599 12.0081 13.4599 11.16C13.4599 10.5958 13.3486 10.0371 13.1324 9.51598C12.9161 8.99484 12.5993 8.52147 12.1998 8.12297C11.8004 7.72448 11.3263 7.40869 10.8047 7.19368C10.283 6.97868 9.72408 6.86869 9.15986 6.87001ZM9.15986 13.13L7.15986 11.13L9.15986 9.13L11.1599 11.13L9.15986 13.13Z"
              fill="#5A6689"
            />
          </g>
          <defs>
            <clipPath id="clip0_398_7406">
              <rect width="18" height="18" fill="white" />
            </clipPath>
          </defs>
        </svg>
      )}
    </span>
  );
};

export { WalletSiderIcon };
