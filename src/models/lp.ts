export interface TradeSettingResponse {
  pairId: number;
  name: string;
  enabledBuy: boolean;
  enabledSell: boolean;
  percentBuyFee: number;
  percentSellFee: number;
  tradeSettingId: number;
  minBuy: number;
  minSell: number;
  maxBuy: number;
  maxSell: number;
  percentBuySlippage: number;
  minAmountMovement: number;
  minPriceMovement: number;
}

export interface SettingTradeParams {
  symbol: string;
}

export interface BestPriceParams {
  amount: number | null;
  baseAsset: string;
  orderSide: string;
  quoteAsset: string;
}

export interface BestPriceResponse {
  providerName?: string;
  price: number;
  quantity: number;
  fxRate: number;
  originPrice: number;
}

export interface TradeValue {
  amount: number | undefined;
  receive: number | undefined;
  estimatePrice: number;
  fee: number;
}

export interface PlaceOrderParams {
  amount: number;
  coinPair: string;
  orderSide: string;
  orderType: string;
  price: string;
}

export interface PlaceOrderResponse {
  createdDate: string;
  executedPrice: number;
  executedQuantity: number;
  fee: number;
  instrument: string;
  orderId: number;
  orderSide: string;
  orderStatus: string;
  orderType: string;
  quantity: number;
  unitFee: string;
  userId: number;
}
