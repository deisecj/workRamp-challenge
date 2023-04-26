import { expect, Locator, Page } from "@playwright/test";
import { Config } from "./config";

export class LoginPage {

  readonly page: Page;

  private email: string;
  private password: string;

  readonly getEmailAddressField: Locator;
  readonly getPasswordField: Locator;
  readonly getLogInButton: Locator;
  readonly getGoogleButton: Locator;
  readonly getValidationErrors: Locator;
  readonly getForgotPasswordLink: Locator;

  constructor(page: Page) {
    this.page = page;
    this.email = process.env.EMAIL as string;
    this.password = process.env.PASSWORD as string;

    this.getEmailAddressField = page.getByPlaceholder("Email Address");
    this.getPasswordField = page.getByPlaceholder("Password");
    this.getLogInButton = page.getByRole('button', { name: 'Log In' });
    this.getGoogleButton = page.locator('.user-invitation-register-google');
    this.getValidationErrors = page.locator('.login-msg');
    this.getForgotPasswordLink = page.getByRole('link', { name: 'Forgot password?' });
  }

  async goto() {
    await this.page.goto(Config.LOGIN_URL);
  }

  async logInByEmailAndPassword(email: string, password: string) {
    await this.getEmailAddressField.fill(email);
    await this.getPasswordField.fill(password);
    await this.getLogInButton.click();
  }

  async logInByGoogle() {
    await this.getGoogleButton.click();
  }

  async clickOnForgotPassword() {
    await this.getForgotPasswordLink.click();
  }

  listenAlert(message: string) {
    this.page.on('dialog', async dialog => {
      expect(dialog.message()).toBe(message);
      await dialog.dismiss();
    });
  }
  
}
