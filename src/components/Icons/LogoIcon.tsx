import React from 'react';

interface LogoIconProps {}

export const LogoIcon: React.FunctionComponent<LogoIconProps> = (props) => {
  return (
    <>
      <svg
        width="261"
        height="256"
        viewBox="0 0 261 256"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <g filter="url(#filter0_d_2189_23442)">
          <rect
            x="10"
            y="10"
            width="241"
            height="235"
            rx="117.5"
            fill="#08A19C"
            shape-rendering="crispEdges"
          />
          <path
            d="M163.981 78.5C153.011 78.5 143.794 82.4438 136.937 89.0664C136.175 89.8106 135.261 90.1826 134.195 90.1826C133.128 90.1826 132.214 89.8106 131.452 89.0664C124.748 82.3694 115.53 78.5744 104.865 78.5744C96.2567 78.5744 87.8768 81.9229 81.7824 86.9829C80.792 87.8014 79.5731 88.0991 78.2781 87.8014C76.983 87.5038 76.0688 86.6853 75.6117 85.4947L74.8499 83.3368C74.2405 81.8485 72.8692 80.8812 71.1932 80.8812H59.3852C57.2522 80.8812 55.5 82.5926 55.5 84.6761V172.705C55.5 174.789 57.2522 176.5 59.3852 176.5H76.8306C78.9637 176.5 80.7159 174.789 80.7159 172.705V120.617C80.7159 109.827 88.4863 101.642 99.5325 101.642C116.064 101.642 117.816 115.036 117.816 120.617V172.705C117.816 174.789 119.568 176.5 121.701 176.5H139.223C141.356 176.5 143.108 174.789 143.108 172.705V120.617C143.108 109.827 150.878 101.642 162.153 101.642C178.532 101.642 180.437 115.036 180.437 120.617V172.705C180.437 174.789 182.189 176.5 184.322 176.5H201.615C203.748 176.5 205.5 174.789 205.5 172.705V120.617C205.424 95.5402 190.264 78.5 163.981 78.5Z"
            fill="#FAFAFA"
          />
          <rect
            x="8.5"
            y="8.5"
            width="244"
            height="238"
            rx="119"
            stroke="#EEEEEE"
            stroke-width="3"
            shape-rendering="crispEdges"
          />
        </g>
        <defs>
          <filter
            id="filter0_d_2189_23442"
            x="3"
            y="7"
            width="255"
            height="249"
            filterUnits="userSpaceOnUse"
            color-interpolation-filters="sRGB"
          >
            <feFlood flood-opacity="0" result="BackgroundImageFix" />
            <feColorMatrix
              in="SourceAlpha"
              type="matrix"
              values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
              result="hardAlpha"
            />
            <feOffset dy="4" />
            <feGaussianBlur stdDeviation="2" />
            <feComposite in2="hardAlpha" operator="out" />
            <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0" />
            <feBlend
              mode="normal"
              in2="BackgroundImageFix"
              result="effect1_dropShadow_2189_23442"
            />
            <feBlend
              mode="normal"
              in="SourceGraphic"
              in2="effect1_dropShadow_2189_23442"
              result="shape"
            />
          </filter>
        </defs>
      </svg>
    </>
  );
};
