export interface LoginInformation {
  email: string;
  password: string;
  platform?: 'WEB';
  countryCode?: string;
  languageCode?: string;
  twoFaCode?: string | null;
  destroySession?: boolean;
}
