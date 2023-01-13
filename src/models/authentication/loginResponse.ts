export interface LoginResponse {
  email: string;
  emailVerified: boolean;
  fullName: string;
  mobile: number;
  mobileCode: string;
  phoneVerified: boolean;
  preferredLanguage: string;
  roleId: number;
  sessionId: string;
  twoFaType: 'GOOGLE' | 'NONE' | 'SKIP' | 'SMS';
}
