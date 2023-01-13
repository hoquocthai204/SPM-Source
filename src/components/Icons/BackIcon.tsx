import React from 'react';
import { useNavigate } from 'react-router-dom';

interface BackIconProps {
  url?: string;
}

const BackIcon: React.FunctionComponent<BackIconProps> = (props) => {
  const navigate = useNavigate();
  return (
    <span style={{ cursor: 'pointer' }}>
      <svg
        width="15"
        height="24"
        viewBox="0 0 15 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        style={{ verticalAlign: 'middle' }}
        onClick={() => {
          props.url ? navigate(props.url) : navigate(-1);
        }}
      >
        <path
          d="M13.2892 0.988474L14.435 2.12296C14.8116 2.5161 15 2.97527 15 3.49941C15 4.03435 14.8116 4.48807 14.435 4.86128L7.01105 12.2142L14.4348 19.5671C14.8114 19.9403 14.9998 20.3941 14.9998 20.9288C14.9998 21.4532 14.8114 21.9123 14.4348 22.3055L13.289 23.4251C12.9022 23.8084 12.4387 24 11.899 24C11.3491 24 10.8909 23.8082 10.5244 23.4252L0.580378 13.576C0.193565 13.2127 0 12.7591 0 12.2143C0 11.6797 0.193511 11.2207 0.580378 10.8377L10.5244 0.988527C10.9012 0.61531 11.3594 0.42857 11.899 0.42857C12.4287 0.428517 12.8919 0.615257 13.2892 0.988474Z"
          fill="#1E2329"
        />
      </svg>
    </span>
  );
};

export default BackIcon;
