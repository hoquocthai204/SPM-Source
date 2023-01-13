import React, { useEffect, useState } from 'react';

interface CountDownTimerProps {
  initialSeconds: number;
  onFinish?: () => void;
}

export const CountDownTimer: React.FunctionComponent<CountDownTimerProps> = ({
  initialSeconds,
  onFinish,
}) => {
  const [seconds, setSeconds] = useState(initialSeconds);

  useEffect(() => {
    const interval = setInterval(() => {
      if (seconds > 0) {
        setSeconds(seconds - 1);
      } else {
        if (onFinish) onFinish();
        clearInterval(interval);
      }
    }, 1000);

    return () => clearInterval(interval);
  });

  return <>{seconds}s</>;
};
