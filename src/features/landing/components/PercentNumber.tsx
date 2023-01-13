import React from 'react';

interface PercentNumberProps {
  data: number;
}

const PercentNumber: React.FunctionComponent<PercentNumberProps> = (props) => {
  return (
    <span
      className="percent-number"
      style={props.data > 0 ? { color: '#419E6A' } : { color: '#D83232' }}
    >
      {props.data}%
    </span>
  );
};

export default PercentNumber;
