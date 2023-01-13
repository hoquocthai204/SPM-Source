export interface OrderTransactions {
  quoteAsset: string;
  id: number;
  createdDate: Date;
  orderSide: string;
  baseAsset: string;
  quantity: number;
  price: number;
  fee: number;
  orderStatus: string;
  internalOrderId: string;
  userId: number;
  unitFee: string;
  instrument: string;
  executedPrice: number;
  executedQuantity: number;
  ipAddress: string;
  location: string;
  userAgent: string;
  transferKey: string;
}
