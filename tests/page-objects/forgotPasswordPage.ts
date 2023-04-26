import { Locator, Page } from "@playwright/test";
import { Config } from "./Config";

export class ForgotPasswordPage {

  readonly page: Page;

  readonly getEmailAddressField: Locator;
  readonly getPasswordButton: Locator;
  readonly getBackToLoginButton: Locator;


  constructor(page: Page) {
    this.page = page;

    this.getEmailAddressField = page.getByPlaceholder("Email Address");
    this.getPasswordButton = page.getByRole('button', { name: 'Send Password Reset Email' });

    this.getBackToLoginButton = page.getByRole('link', { name: 'Back to login' });
  }

  async goto() {
    await this.page.goto(Config.FORGOT_PASSWORD_URL);
  }

  async recoverPassword(email: string) {
    await this.getEmailAddressField.fill(email);
    await this.getPasswordButton.click();
  }

  async goToHomePage() {
    await this.getBackToLoginButton.click();
  }

}
