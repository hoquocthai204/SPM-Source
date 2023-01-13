export interface BankInfo {
  accountHolderName: string;
  accountNumber: string;
  bankId: number | null;
  file: any;
  twoFaCode?: string;
}
