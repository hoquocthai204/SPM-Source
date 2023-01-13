import React from 'react';

interface BitcoinIconProps {}

export const BitcoinIcon: React.FunctionComponent<BitcoinIconProps> = (props) => {
  return (
    <span style={{ alignItems: 'center', display: 'flex', marginRight: '0.6em' }}>
      <svg
        width="36"
        height="36"
        viewBox="0 0 21 20"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M10.5 20C16.0228 20 20.5 15.5228 20.5 10C20.5 4.47715 16.0228 0 10.5 0C4.97715 0 0.5 4.47715 0.5 10C0.5 15.5228 4.97715 20 10.5 20Z"
          fill="#F7931A"
        />
        <path
          d="M16.7361 12.3459L16.3955 13.7103L15.4861 13.4841L15.8261 12.1191L14.4618 11.7791L14.6886 10.8697L16.053 11.2097L16.3936 9.8453L17.303 10.0722L16.963 11.4366L18.3274 11.7766L18.1005 12.6866L16.7361 12.3459ZM13.3818 8.59968C13.2549 9.44343 12.7949 9.85343 12.1868 9.99968C13.0186 10.4391 13.4399 11.1166 13.0293 12.2978C12.5193 13.7647 11.3255 13.8947 9.74051 13.5978L9.34676 15.1741L8.41801 14.9428L8.80613 13.3866C8.55877 13.3253 8.31208 13.2614 8.06613 13.1947L7.67613 14.7572L6.74863 14.5259L7.14238 12.9459C6.92488 12.8903 6.70488 12.8316 6.47988 12.7753L5.27051 12.4734L5.73801 11.3847C5.73801 11.3847 6.42238 11.5666 6.41301 11.5534C6.67676 11.6178 6.79426 11.4422 6.84113 11.3253L7.46238 8.8328L7.56113 8.85718C7.52958 8.84459 7.49722 8.83415 7.46426 8.82593L7.90801 7.04655C7.92051 6.84468 7.85363 6.59093 7.47676 6.49655C7.49176 6.48718 6.80238 6.32905 6.80238 6.32905L7.05551 5.31405L8.33676 5.63405L8.33551 5.63843C8.52801 5.68655 8.72676 5.73218 8.92926 5.7778L9.31863 4.21655L10.2474 4.4478L9.86551 5.97905C10.1149 6.0353 10.3655 6.0928 10.6093 6.15405L10.9886 4.63343L11.918 4.86468L11.5286 6.42655C12.7011 6.8328 13.5568 7.44718 13.3818 8.59968V8.59968ZM11.2399 11.6528C11.5468 10.4216 9.52613 10.1153 8.89613 9.9578L8.37551 12.0497C9.00551 12.2059 10.9474 12.8328 11.2411 11.6522L11.2399 11.6528ZM11.5443 8.5928C11.823 7.47218 10.133 7.23218 9.60863 7.10155L9.13551 8.99968C9.65988 9.13093 11.2761 9.66655 11.5443 8.5928Z"
          fill="white"
        />
      </svg>
    </span>
  );
};
