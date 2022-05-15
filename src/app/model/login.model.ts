export interface LoginForm {
  email: string;
  password: string;
  remember: boolean;
}

export interface LoginResponse {
  token: string;
  userId: string;
}