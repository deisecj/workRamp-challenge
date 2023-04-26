import { test, expect } from '@playwright/test';
import { Config } from './page-objects/Config';
import { ForgotPasswordPage } from './page-objects/forgotPasswordPage';

test.describe('Recover Log In', () => {
  test('Recover password', async ({ page }) => {
    const forgotPasswordPage = new ForgotPasswordPage(page);
    await forgotPasswordPage.goto();

    const email = Config.LOGIN_EMAIL;

    await forgotPasswordPage.recoverPassword(email);
    await expect(page.getByText(
      `An email with instructions to reset your password has been sent to ${email}. Contact support@workramp.com if you have issues.`
    )).toBeTruthy();
  });
  
  test('Back to Log In page after recovered password', async ({ page }) => {
    const forgotPasswordPage = new ForgotPasswordPage(page);
    await forgotPasswordPage.goto();

    await forgotPasswordPage.recoverPassword(Config.LOGIN_EMAIL);

    await forgotPasswordPage.goToHomePage();
    await expect(page).toHaveURL(Config.LOGIN_URL);
  }); 

});
