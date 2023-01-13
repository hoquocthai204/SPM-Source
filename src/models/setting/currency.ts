import { Network } from './network';

export interface Currency {
  id: number;
  decimals: number;
  displayOrder: number;
  enabled: boolean;
  fullName: string;
  shortName: string;
  image?: string;
  type: 'FIAT' | 'CRYPTO';
  networks?: Network[];
  comingSoon?: boolean;
}
