export type Status_IN =
  | 'CANCELLED'
  | 'COMPLETED'
  | 'EXPIRED'
  | 'FAILED'
  | 'HANDLE_MANUALLY'
  | 'INITIALIZED'
  | 'PENDING'
  | 'PENDING_APPROVAL'
  | 'REJECTED';
export type TYPE_EQUALS =
  | 'DEPOSIT'
  | 'DEPOSIT_INTERNAL'
  | 'EXCHANGE_TRANSFER'
  | 'HOT_TO_COLD'
  | 'HOT_TO_FEE'
  | 'TOPUP'
  | 'WITHDRAW'
  | 'WITHDRAW_INTERNAL';
export interface ParamsCryptoTransaction {
  'currency.equals'?: number;
  size?: number;
  page?: number;
  sort?: string;
  'type.in'?: Array<string>;
  'status.in'?: Status_IN;
  'type.equals'?: TYPE_EQUALS;
}
