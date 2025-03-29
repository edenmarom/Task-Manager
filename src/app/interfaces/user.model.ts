export interface User {
  id?: string;
  name: string;
  email: string;
  password?: string;
  phone: string;
  dob: string;
  imgUrl: string;
  token?: string;
  loggedIn?: boolean;
}

export interface UserCredentials {
  email: string;
  password: string;
}

export interface UserAuthData {
  userId: string;
  token: string;
}

export interface AuthResponse {
  success: boolean;
  data: UserAuthData;
}