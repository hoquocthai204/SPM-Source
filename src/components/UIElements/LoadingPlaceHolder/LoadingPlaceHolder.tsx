import React from 'react';

interface LoadingPlaceHolderProps {
    extraStyles: any,
    container?: any
}

const LoadingPlaceHolder: React.FunctionComponent<LoadingPlaceHolderProps> = (props) => {
  return <>
    <div className='loader' style={{
        position: props.container ? 'absolute' : 'relative',
        ...props.extraStyles
    }}>
        <div className='loader--swipe'></div>
    </div>
  </>;
};

export default LoadingPlaceHolder;
