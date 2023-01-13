import { Alert } from 'antd';
import React, { useState } from 'react';
import Marquee from 'react-fast-marquee';

interface NewsBannerProps {}

const message: string[] = ['Notice message one', 'Notice message two', 'Notice message three'];

export const NewsBanner: React.FunctionComponent<NewsBannerProps> = (props) => {
  const [msgIndex, setMsgIndex] = useState<number>(0);
  return (
    <>
      <Alert
        className="news-banner"
        banner
        closable
        showIcon={false}
        type="info"
        message={
          <Marquee
            speed={150}
            gradient={false}
            onFinish={() => {
              if (msgIndex === message.length - 1) setMsgIndex(0);
              else setMsgIndex(msgIndex + 1);
            }}
          >
            <div style={{ textAlign: 'center' }}>
              <span>
                XLM and SIX Withdrawal are Back in Service from 14/12/2021 at 05:10 AM (GMT+7)
                onwards
              </span>
            </div>
          </Marquee>
        }
      />
    </>
  );
};
