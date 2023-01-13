import * as React from 'react';

interface TrendingFlagIconProps {
  trendingFlag: string;
  percent: string | number;
}

const TrendingFlagIcon: React.FunctionComponent<TrendingFlagIconProps> = ({
  trendingFlag,
  percent,
}) => {
  return (
    <>
      {trendingFlag === 'trendingUp' ? (
        <span className="flag__trendingUp" style={{ color: '#08A19C' }}>
          <svg
            width="14"
            height="7"
            viewBox="0 0 15 10"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M7.10956 0.488043C7.30973 0.23784 7.69027 0.23784 7.89043 0.488043L14.8501 9.18765C15.112 9.51503 14.8789 10 14.4597 10L0.540313 10C0.12106 10 -0.112027 9.51503 0.149878 9.18765L7.10956 0.488043Z"
              fill="#08A19C"
            />
          </svg>
          {percent} %
        </span>
      ) : (
        <span className="flag__trendingDown" style={{ color: '#E70718' }}>
          <svg
            width="14"
            height="7"
            viewBox="0 0 15 10"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M7.89044 9.51196C7.69027 9.76216 7.30973 9.76216 7.10957 9.51196L0.149878 0.812349C-0.112027 0.484967 0.121059 6.96725e-07 0.540312 6.94931e-07L14.4597 6.35371e-07C14.8789 6.33577e-07 15.112 0.484967 14.8501 0.812348L7.89044 9.51196Z"
              fill="#E74350"
            />
          </svg>
          {percent} %
        </span>
      )}
    </>
  );
};

export default TrendingFlagIcon;
