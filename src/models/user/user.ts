export type KycStatus =
  | 'ACCEPTED'
  | 'EKYC_VERIFICATION_CANCELLED'
  | 'EKYC_VERIFICATION_FAIL'
  | 'EKYC_VERIFICATION_INPROCESS'
  | 'EKYC_VERIFICATION_SUCCESS'
  | 'EKYC_VERIFICATION_TIMEOUT'
  | 'INPROGRESS'
  | 'L1_APPROVED'
  | 'NDID_VERIFICATION_CANCEL'
  | 'NDID_VERIFICATION_FAIL'
  | 'NDID_VERIFICATION_SUCCESS'
  | 'REJECTED'
  | 'RESETKYC'
  | 'SUBMITTED'
  | 'WAITING_FOR_APPROVAL'
  | 'WAITING_FOR_EKYC'
  | 'WAITING_FOR_NDID';

export type TwoFaType = 'GOOGLE' | 'NONE' | 'SKIP' | 'SMS';

export type UserStatus =
  | 'ACTIVE'
  | 'BLOCK'
  | 'PENDING'
  | 'REJECTED'
  | 'UNVERIFIED'
  | 'WAITING_FOR_APPROVAL';

export interface UserInformation {
  email: string;
  fullName: string;
  kycStatus: KycStatus;
  language: string;
  phoneNumber: string;
  referralCode: string;
  roleId: number;
  sessionId: string;
  twoFaType: TwoFaType;
  userId: number;
  userStatus: UserStatus;
}
