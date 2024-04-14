export interface LoginInterface {
  email?: string;
  password?: string;
}

export interface LoginResponse {
  success?: boolean;
  token?: string;
}
