import React from 'react';

export interface CoinInfoColProps {
  image: string;
  title: string;
  detail: string;
}

const CoinInfoCol: React.FunctionComponent<CoinInfoColProps> = (props) => {
  return (
    <div className="coin-info">
      <img src={props.image} alt="" />
      <div className="coin-info__detail">
        <span className="coin-info__name">{props.title}</span>
        <span className="coin-info__code">{props.detail}</span>
      </div>
    </div>
  );
};

export default CoinInfoCol;
