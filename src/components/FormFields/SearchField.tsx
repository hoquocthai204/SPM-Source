import * as React from 'react';
import { BaseInputFieldProps } from './BaseInputFieldProps';

import { Input } from 'antd';

const { Search } = Input;
interface ISearchFieldProps {
  name: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder: string;
}

const SearchField: React.FunctionComponent<ISearchFieldProps> = ({
  onChange,
  placeholder,
  name,
}) => {
  return (
    <>
      <div className="search-input-container">
        <span>
          <svg
            width="20"
            height="21"
            viewBox="0 0 20 21"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M7.77344 13.9932C8.5026 14.7223 9.38802 15.0869 10.4297 15.0869C11.4714 15.0869 12.3568 14.7223 13.0859 13.9932C13.8151 13.264 14.1797 12.3786 14.1797 11.3369C14.1797 10.2952 13.8151 9.40983 13.0859 8.68066C12.3568 7.9515 11.4714 7.58691 10.4297 7.58691C9.38802 7.58691 8.5026 7.9515 7.77344 8.68066C7.04427 9.40983 6.67969 10.2952 6.67969 11.3369C6.67969 12.3786 7.04427 13.264 7.77344 13.9932ZM15.4297 15.0869L19.5703 19.2275L18.3203 20.4775L14.1797 16.3369V15.6729L13.9453 15.4385C12.9557 16.2979 11.7839 16.7275 10.4297 16.7275C8.91927 16.7275 7.63021 16.2067 6.5625 15.165C5.52083 14.1234 5 12.8473 5 11.3369C5 9.8265 5.52083 8.55046 6.5625 7.50879C7.63021 6.44108 8.91927 5.90723 10.4297 5.90723C11.9401 5.90723 13.2161 6.44108 14.2578 7.50879C15.2995 8.55046 15.8203 9.8265 15.8203 11.3369C15.8203 11.8838 15.6901 12.5088 15.4297 13.2119C15.1693 13.889 14.8698 14.4359 14.5312 14.8525L14.7656 15.0869H15.4297Z"
              fill="#5B6488"
            />
          </svg>
        </span>
        <span className="search-input-container__wrapper">
          <input
            type="text"
            placeholder={placeholder}
            className="search-input-container__input text-r-16-24"
            onChange={onChange}
            name={name}
          />
        </span>
      </div>
    </>
  );
};

export default SearchField;
