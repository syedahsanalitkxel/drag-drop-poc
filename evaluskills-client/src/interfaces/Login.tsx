export default interface LoginInterface {
  loginName: string;
  password: string;
}

export interface ResetPasswordInterface {
  password: string;
  resetPassword: string;
  token?: string;
  email?: string;
}
