export interface EmailInformation {
    emailVerifyCode: string,
    newEmailVerifyCode: string,
    twoFaCode?: string,
    newEmail: string,
}