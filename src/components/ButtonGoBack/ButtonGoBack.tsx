import * as React from 'react';

interface IButtonGoBackProps {
  link: string;
  title: string;
}

export const ButtonGoBack: React.FunctionComponent<IButtonGoBackProps> = ({ link, title }) => {
  return <>
    <div className="btn-go-back">
      <a href={link} className="btn-go-back__link">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none">
          <path fill-rule="evenodd" clip-rule="evenodd" d="M11.934 12l3.89 3.89-1.769 1.767L8.398 12l1.768-1.768 3.89-3.889 1.767 1.768-3.889 3.89z" fill="currentColor">
          </path>
        </svg>
        {title}
      </a>
    </div>

  </>;
};

