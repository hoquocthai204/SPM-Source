export interface ResetPasswordParams {
  params: {
    email: string;
  };
  headers: {
    'X-Recaptcha': string;
  };
}
