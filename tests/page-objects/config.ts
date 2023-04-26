export class Config {
  static BASE_URL = process.env.BASE_URL as string;
  static LOGIN_EMAIL = process.env.EMAIL as string;
  static LOGIN_PASSWORD = process.env.PASSWORD as string;

  static LOGIN_URL = '/login';
  static FORGOT_PASSWORD_URL = '/forgot_password';
  static GUIDE_URL = '/admin/guides';
}
