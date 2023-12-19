export interface SignupFormInputApi {
  email: string;
  firstName: string;
  lastName: string;
  password: string;
  role: string;
}

export interface ResetPasswordFormApi {
  password: string;
  token: string;
}
