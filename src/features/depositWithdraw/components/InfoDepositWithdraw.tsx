import React, { CSSProperties } from 'react';
import { InfoBanner } from 'components/AlertBanners';

interface InfoDepositWithdrawProps {
  description: Array<{ des: string; cleft?: string }>;
  style?: CSSProperties
}

const InfoDepositWithdraw: React.FunctionComponent<InfoDepositWithdrawProps> = ({
  description,
  style
}) => {
  return (
    <>
      <div style={{...style }}>
        <InfoBanner
          description={
            <>
              <ul>
                {description.map((ele) => {
                  if (ele.cleft) {
                    return (
                      <li className="text-r-12-18">
                        {ele.des} <span className="bold-text">{ele.cleft}</span>
                      </li>
                    );
                  } else {
                    return (
                      <li className="text-r-12-18">
                        <div
                          dangerouslySetInnerHTML={{
                            __html: ele.des,
                          }}
                        ></div>
                        {/* {ele.des} <span className="bold-text" >{ele.cleft}</span>
                         */}
                      </li>
                    );
                  }
                })}
              </ul>
            </>
          }
        />
      </div>
    </>
  );
};

export default InfoDepositWithdraw;
