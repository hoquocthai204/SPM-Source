import React from 'react';

interface HideIconProps {
  onChangeHide: (value: boolean) => void;
}

const HideIcon: React.FunctionComponent<HideIconProps> = (props) => {
  return (
    <>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="none"
        onClick={() => {
          props.onChangeHide(false);
        }}
      >
        <path
          fill-rule="evenodd"
          clip-rule="evenodd"
          d="M2.94 5.06l16 16 2.12-2.12-2.446-2.447L23 12l-5.555-5.69a7.566 7.566 0 00-9.883-.87L5.06 2.94 2.939 5.06zm6.747 2.506a5 5 0 016.747 6.747L9.687 7.566z"
          fill="currentColor"
        ></path>
        <path
          d="M1 12l2.29-2.346 10.198 10.198a7.574 7.574 0 01-6.933-2.162L1 12z"
          fill="currentColor"
        ></path>
      </svg>
    </>
  );
};

export default HideIcon;
