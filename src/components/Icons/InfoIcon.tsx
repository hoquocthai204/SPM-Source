import React from 'react';

interface InfoIconProps {}

const InfoIcon: React.FunctionComponent<InfoIconProps> = (props) => {
  return (
    <span>
      <svg
        width="16"
        height="17"
        viewBox="0 0 16 17"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M16 8.90698C16 13.3253 12.4183 16.907 8 16.907C3.58172 16.907 0 13.3253 0 8.90698C0 4.4887 3.58172 0.906982 8 0.906982C12.4183 0.906982 16 4.4887 16 8.90698ZM9 4.90698C9 5.45927 8.55228 5.90698 8 5.90698C7.44772 5.90698 7 5.45927 7 4.90698C7 4.3547 7.44772 3.90698 8 3.90698C8.55228 3.90698 9 4.3547 9 4.90698ZM7 7.90698C6.44772 7.90698 6 8.3547 6 8.90698C6 9.45927 6.44772 9.90698 7 9.90698V12.907C7 13.4593 7.44772 13.907 8 13.907H9C9.55228 13.907 10 13.4593 10 12.907C10 12.3547 9.55228 11.907 9 11.907V8.90698C9 8.3547 8.55228 7.90698 8 7.90698H7Z"
          fill="#F0B90B"
        />
      </svg>
    </span>
  );
};

export { InfoIcon };
