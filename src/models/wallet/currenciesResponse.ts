export interface CurrenciesResponse {
  decimals: number;
  displayOrder: number;
  enabled: boolean;
  fullName: string;
  id: number;
  image: string;
  networks: Array<NetworkCurrencies>;
  shortName: string;
  type: string;
}
export interface NetworkCurrencies {
  addressRegex: string;
  enabled: boolean;
  id: number;
  isDefault: boolean;
  name: string;
  network: string;
  scanUrl: string;
  tagRegex: string;
}
