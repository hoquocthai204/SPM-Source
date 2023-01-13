import * as React from 'react';
import { Tag } from 'antd';
import { useAppTranslation } from 'app/hooks';
import { fiatDepositWithdrawStatus } from 'utils';
interface IBadgeProps {
  type?: string | '';
  style?: string | '';
}

const Badge: React.FunctionComponent<IBadgeProps> = ({ type, style }) => {
  const t = useAppTranslation();
  const status = fiatDepositWithdrawStatus(type, style);
  // status pending and processing
  if (status === 'Pending' || status === 'Processing') {
    return (
      <Tag
        style={{
          boxSizing: 'border-box',
          color: '#976400',
          background: '#FFF5D5',
          borderRadius: '10px',
          fontSize: '12px',
          border: 'none',
          fontWeight: '500',
          width: 'calc(100% - 16px)',
          height: '20px',
          margin: '0px',
          padding: '2px 10px',
          display: 'flex',
        }}
      >
        <div
          style={{
            width: status === 'Processing' ? '65px' : '48px',
            height: '16px',
            marginRight: '6px',
            display: 'flex',
            alignItems: 'center',
          }}
        >
          {status}
          {/* {t('depositWithdraw.table.data.status.pending')} */}
        </div>
        <div
          style={{
            boxSizing: 'content-box',
            width: '16px',
            height: '16px',
            lineHeight: '8px',
            letterSpacing: '2px',
            fontSize: '18px',
            fontWeight: '500',
          }}
        >
          ...
        </div>
      </Tag>
    );
  }
  // status completed
  if (status === 'Completed') {
    return (
      <Tag
        style={{
          boxSizing: 'border-box',
          color: '#00632B',
          backgroundColor: '#E8FCF1',
          borderRadius: '10px',
          fontSize: '12px',
          border: 'none',
          fontWeight: '500',
          margin: '0px',
          padding: '2px 10px',
        }}
      >
        {t('depositWithdraw.table.data.status.completed')}
      </Tag>
    );
  }
  // status failed, rejected, cancelled, expired
  if (
    status === 'Expired' ||
    status === 'Cancelled' ||
    status === 'Rejected' ||
    status === 'Failed'
  ) {
    return (
      <Tag
        style={{
          boxSizing: 'border-box',
          color: '#B01212',
          backgroundColor: '#FFEBEB',
          borderRadius: '10px',
          fontSize: '12px',
          border: 'none',
          fontWeight: '500',
          margin: '0px',
          padding: '2px 10px',
        }}
      >
        {status}
      </Tag>
    );
  }
  // status not aplicable
  if (status === 'Not Applicable') {
    return (
      <Tag
        style={{
          boxSizing: 'border-box',
          borderRadius: '10px',
          fontSize: '12px',
          border: 'none',
          fontWeight: '500',
          margin: '0px',
          padding: '2px 10px',
          color: '#6e737a',
          backgroundColor: '#DEE5EF',
        }}
      >
        {/* {status}
         */}
        {type}
      </Tag>
    );
  }
  // return (
  //   <>
  //     {type === 'COMPLETED' ? (
  //       <Tag
  //         style={{
  //           boxSizing: 'border-box',
  //           color: '#00632B',
  //           backgroundColor: '#E8FCF1',
  //           borderRadius: '10px',
  //           fontSize: '12px',
  //           border: 'none',
  //           fontWeight: '500',
  //           margin: '0px',
  //           padding: '2px 10px',
  //         }}
  //       >
  //         {t('depositWithdraw.table.data.status.completed')}
  //       </Tag>
  //     ) : type === 'FAILED' ||
  //       type === 'PENDING_APPROVAL' ||
  //       type === 'REJECTED' ||
  //       type === 'CANCELLED' ||
  //       type === 'EXPIRED' ||
  //       type === 'HANDLE_MANUALLY' ? (
  //       <Tag
  //         style={{
  //           boxSizing: 'border-box',
  //           color: '#B01212',
  //           backgroundColor: '#FFEBEB',
  //           borderRadius: '10px',
  //           fontSize: '12px',
  //           border: 'none',
  //           fontWeight: '500',
  //           margin: '0px',
  //           padding: '2px 10px',
  //         }}
  //       >
  //         {type === 'FAILED' ||
  //         type === 'PENDING_APPROVAL' ||
  //         type === 'REJECTED' ||
  //         type === 'HANDLE_MANUALLY'
  //           ? 'Not Applicable'
  //           : type === 'CANCELLED'
  //           ? 'Cancelled'
  //           : 'Expired'}
  //         {/* {t('depositWithdraw.table.data.status.failed')} */}
  //       </Tag>
  //     ) : (
  //       <Tag
  //         style={{
  //           boxSizing: 'border-box',
  //           color: '#976400',
  //           background: '#FFF5D5',
  //           borderRadius: '10px',
  //           fontSize: '12px',
  //           border: 'none',
  //           fontWeight: '500',
  //           width: '89px',
  //           height: '20px',
  //           margin: '0px',
  //           padding: '2px 10px',
  //           display: 'flex',
  //         }}
  //       >
  //         <div
  //           style={{
  //             width: '47px',
  //             height: '16px',
  //             marginRight: '6px',
  //             display: 'flex',
  //             alignItems: 'center',
  //           }}
  //         >
  //           {t('depositWithdraw.table.data.status.pending')}
  //         </div>
  //         <div
  //           style={{
  //             boxSizing: 'content-box',
  //             width: '16px',
  //             height: '16px',
  //             lineHeight: '8px',
  //             letterSpacing: '2px',
  //             fontSize: '18px',
  //             fontWeight: '500',
  //           }}
  //         >
  //           ...
  //         </div>
  //       </Tag>
  //     )}
  //   </>
  // );
};

export default Badge;
