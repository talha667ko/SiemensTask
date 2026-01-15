export interface LoginData {
  email: string;
  password: string;
}

export interface UserData {
  email: string | undefined;
  display_name: string | undefined;
  last_sign_in_at: string | undefined;
}
