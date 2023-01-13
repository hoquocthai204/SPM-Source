import * as React from 'react';

interface  LoadingTableProps {
}

const LoadingTable: React.FunctionComponent<LoadingTableProps> = (props) => {
  return <>
    <div className="loader__overlay--table">
        <div className="logo-container--table">
          <span className="spinner__table"></span>
          <span className="background__table"></span>

          <svg
            width="43"
            height="42"
            viewBox="0 0 43 42"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <rect x="2.5" y="2" width="38" height="38" rx="19" fill="#08A19C" />
            <path
              d="M25.5178 15.5C24.2014 15.5 23.0952 15.9427 22.2725 16.686C22.1811 16.7696 22.0714 16.8113 21.9434 16.8113C21.8154 16.8113 21.7057 16.7696 21.6143 16.686C20.8098 15.9343 19.7037 15.5084 18.4238 15.5084C17.3908 15.5084 16.3852 15.8842 15.6539 16.4522C15.535 16.544 15.3888 16.5774 15.2334 16.544C15.078 16.5106 14.9683 16.4188 14.9134 16.2851L14.822 16.0429C14.7489 15.8759 14.5843 15.7673 14.3832 15.7673H12.9662C12.7103 15.7673 12.5 15.9594 12.5 16.1932V26.074C12.5 26.3079 12.7103 26.5 12.9662 26.5H15.0597C15.3156 26.5 15.5259 26.3079 15.5259 26.074V20.2274C15.5259 19.0163 16.4584 18.0976 17.7839 18.0976C19.7676 18.0976 19.9779 19.601 19.9779 20.2274V26.074C19.9779 26.3079 20.1882 26.5 20.4441 26.5H22.5467C22.8027 26.5 23.013 26.3079 23.013 26.074V20.2274C23.013 19.0163 23.9454 18.0976 25.2984 18.0976C27.2638 18.0976 27.4924 19.601 27.4924 20.2274V26.074C27.4924 26.3079 27.7026 26.5 27.9586 26.5H30.0338C30.2897 26.5 30.5 26.3079 30.5 26.074V20.2274C30.4909 17.4127 28.6717 15.5 25.5178 15.5Z"
              fill="#FAFAFA"
            />
            <rect x="2.5" y="2" width="38" height="38" rx="19" stroke="#EEEEEE" stroke-width="3" />
          </svg>
          {/* <img className="logo" src={logo_maxbit} height="42" /> */}
        </div>
      </div>
  </>;
};

export default LoadingTable;
