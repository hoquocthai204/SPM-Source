export const fiatDepositWithdrawStatus = (
  type: string,
  style: 'DEPOSIT' | 'WITHDRAW' | 'DEPOSIT_INTERNAL' | 'WITHDRAW_INTERNAL'
) => {
  if (style === 'DEPOSIT' || style === 'DEPOSIT_INTERNAL') {
    switch (type) {
      case 'PENDING':
        return 'Pending';
      case 'CONFIRMING':
        return 'Processing';
      case 'INITIALIZED':
        return 'Pending';
      case 'COMPLETED':
        return 'Completed';
      case 'CANCELLED':
        return 'Cancelled';
      case 'EXPIRED':
        return 'Expired';
      default:
        return 'Not Applicable';
    }
  } else if (style === 'WITHDRAW' || style === 'WITHDRAW_INTERNAL') {
    switch (type) {
      case 'PENDING':
        return 'Pending';
      case 'SUBMITTED':
        return 'Pending';
      case 'COMPLETED':
        return 'Completed';
      case 'FAILED':
        return 'Failed';
      case 'PENDING_APPROVAL':
        return 'Processing';
      case 'HANDLE_MANUALLY':
        return 'Processing';
      case 'CONFIRMING':
        return 'Processing';
      case 'REJECTED':
        return 'Rejected';
      default:
        return 'Not Applicable';
    }
  }
};

// export const checkStatusFiatDeposit = (type: string) => {
//   switch (type) {
//     case 'PENDING' || 'INITIALIZED':
//       return 'Pending';
//       break;
//     case 'COMPLETED':
//       return 'Completed';
//       break;
//     case 'CANCELLED':
//       return 'Cancelled';
//       break;
//     case 'EXPIRED':
//       return 'Expired';
//       break;
//     default:
//       return 'Not Applicable';
//       break;
//   }
// };
// export const checkStatusFiatWithdraw = (type: string) => {
//   switch (type) {
//     case 'PENDING':
//       return 'Pending';
//       break;
//     case 'COMPLETED':
//       return 'Completed';
//       break;
//     case 'FAILED':
//       return 'Failed';
//       break;
//     case 'PENDING_APPROVAL':
//       return 'Processing';
//       break;
//     case "HANDLE_MANUALLY":
//     return 'Processing';
//       break;
//     case 'REJECTED':
//       return 'Rejected';
//       break;
//     default:
//       return 'Not Applicable';
//       break;
//   }
// };
