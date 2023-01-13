import * as React from 'react';

interface UnHideIconProps {
  onChangeHide: (value: boolean) => void;
}

const UnHideIcon: React.FunctionComponent<UnHideIconProps> = (props) => {
  return (
    <>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="none"
        onClick={() => {
          props.onChangeHide(true);
        }}
      >
        <path
          fill-rule="evenodd"
          clip-rule="evenodd"
          d="M12 14.5a2.5 2.5 0 100-5 2.5 2.5 0 000 5zm4.5-2.5a4.5 4.5 0 11-9 0 4.5 4.5 0 019 0z"
          fill="currentColor"
        ></path>
        <path
          fill-rule="evenodd"
          clip-rule="evenodd"
          d="M18 6l6 6-6 6a8.486 8.486 0 01-12 0l-6-6 6-6a8.486 8.486 0 0112 0zm-1.414 1.415a6.486 6.486 0 00-9.172 0L2.828 12l4.586 4.586a6.486 6.486 0 009.172 0L21.172 12l-4.586-4.585z"
          fill="currentColor"
        ></path>
      </svg>
    </>
  );
};

export default UnHideIcon;
