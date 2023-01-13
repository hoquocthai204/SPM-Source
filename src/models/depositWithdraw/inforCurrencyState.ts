export interface InforCurrencyState {
  comingSoon: boolean;
  createdDate: string;
  decimals: number;
  displayOrder: number;
  enabled: boolean;
  fullName: string;
  id: number;
  image: string;
  shortName: string;
  type: string;
  networks: Array<{
    addressRegex: string;
    enabled: boolean;
    id: number;
    isDefault: boolean;
    name: string;
    network: string;
    tagRegex: string;
  }>;
}
