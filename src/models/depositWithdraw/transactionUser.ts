export interface TransactionUser {
  accountNumber: string | null;
  amount: number | null;
  chargedFee: number | null;
  createdBy: string;
  createdDate: string;
  currencyId: number | null;
  currencySN: string | null;
  customerBankName: string | null;
  customerName: string | null;
  exchangeBank: string | null;
  id: number | null;
  lastModifiedBy: string | null;
  lastModifiedDate: string | null;
  paymentType: string | null;
  phoneNo: string | null;
  qrCode: string | null;
  qrExpiry: string | null;
  reason: string | null;
  remarks: string | null;
  status: string | null;
  subType: string | null;
  thaiCustomerName: string | null;
  transactionReference: string | null;
  type: string;
  userEmail: string;
  userId: number;
}
