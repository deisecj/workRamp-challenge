import { test, expect } from '@playwright/test';
import { Config } from './page-objects/Config';
import { LoginPage } from './page-objects/loginPage';

test.describe('Log In', () => {

  test('Log In using a valid username and password', async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.goto();
    
    await loginPage.logInByEmailAndPassword(
      Config.LOGIN_EMAIL,
      Config.LOGIN_PASSWORD
    );

    await expect(page).toHaveURL(Config.GUIDE_URL);
  });
  
  test('Log In using a Google account', async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.goto();
    
    await loginPage.logInByGoogle();
    
    await expect(page.getByText(
      'To continue, Google will share your name, email address, language preference, and profile picture with workramp.com.'
    )).toBeTruthy();
  });
  
  test('Try Log In using an invalid username', async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.goto();

    await loginPage.logInByEmailAndPassword(
      'incorrectusername@test.com',
      Config.LOGIN_PASSWORD
    )

    await expect(loginPage.getValidationErrors).toContainText('Invalid Login Credentials');
  });
  
  test('Try Log In using an invalid password', async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.goto();
    await loginPage.logInByEmailAndPassword(
      Config.LOGIN_EMAIL,
      'incorrectpassword'
    )

    await expect(loginPage.getValidationErrors).toContainText('Invalid Login Credentials');
  });
  
  test('Try Log In without credentials', async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.goto();
    
    loginPage.listenAlert('Please enter in an email address');
    
    await loginPage.logInByEmailAndPassword('', '');  
    
    await page.close({ runBeforeUnload: true });
  });

  test('Go to Forgot password page', async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.goto();

    await loginPage.clickOnForgotPassword();

    await expect(page).toHaveURL(Config.FORGOT_PASSWORD_URL);
  });
  
});
