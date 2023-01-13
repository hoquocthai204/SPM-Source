import React from 'react';

interface TradingChartProps {}

const TradingChart: React.FunctionComponent<TradingChartProps> = (props) => {
  return (
    <>
      <div
        style={{ width: '100%', height: '500px', border: '1px solid #E1E3E7', borderRadius: '5px' }}
      >
        {/* <img src={tradingChart} alt="" style={{ width: '100%' }} /> */}
      </div>
    </>
  );
};

export default TradingChart;
