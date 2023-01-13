export interface MarketPrice {
  [symbol: string]: string[];
}

export interface CompetitorBuyDetailPrices {
  price: number;
  providerName: string;
  quantity: number;
}

export interface BestPrice {
  buyGap: number;
  coinPair: string;
  competitorBuyPrice: number;
  competitorSellPrice: number;
  lpBuyPrice: number;
  lpSellPrice: number;
  sellGap: number;
  competitorBuyDetailPrices: CompetitorBuyDetailPrices[];
  competitorSellDetailPrices: CompetitorBuyDetailPrices[];
}
