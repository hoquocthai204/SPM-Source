import * as React from 'react';

interface IFormatRowColCoinTableProps {
  image: string;
  nameCoin: string;
  netWork: string;
  percent?: number;
}

const FormatRowColCoinTable: React.FunctionComponent<IFormatRowColCoinTableProps> = (props) => {
  const { image, nameCoin, netWork } = props;
  return (
    <>
      <div className="currency-detail">
        <span>
          <img src={image} alt="" width="35" height="35" />
        </span>
        <div
          style={{
            fontSize: '16px',
            fontWeight: '600',
            lineHeight: '24px',
            color: '#1E2329',
          }}
        >
          {nameCoin}
        </div>
        <div style={{ fontSize: '16px', fontWeight: '400', lineHeight: '24px', color: '#848E9C' }}>
          {netWork}
        </div>
      </div>
    </>
  );
};

export default FormatRowColCoinTable;
