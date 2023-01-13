export interface BodySendRequest2FA {
  countryCode: string;
  email: string;
  languageCode: string;
  twoFaType: 'GOOGLE' | 'NONE' | 'SKIP' | 'SMS';
}
