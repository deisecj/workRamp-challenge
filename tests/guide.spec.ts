import { test, expect } from '@playwright/test';
import { faker } from '@faker-js/faker';
import { GuidePage } from './page-objects/guidePage';
import { Config } from './page-objects/config';
import { LoginPage } from './page-objects/loginPage';

test.describe('Guide', () => {
  test.beforeEach(async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.goto();
    
    await loginPage.logInByEmailAndPassword(
      Config.LOGIN_EMAIL,
      Config.LOGIN_PASSWORD
    );
  });

  test('Create a new guide', async ({ page }) => {
    const guidePage = new GuidePage(page);

    await guidePage.clickOnCreateNewGuide();
    
    const guideName = faker.name.jobTitle();
    await guidePage.createGuide(guideName);
    
    await expect(guidePage.getSideBarGuideTitle).toContainText(guideName);
  });

  test('Create a guide using a empty name', async ({ page }) => {
    const guidePage = new GuidePage(page);

    await guidePage.clickOnCreateNewGuide();
    await guidePage.createGuide('');

    await expect(page).toHaveURL(Config.GUIDE_URL);
  });

  test('Cancel the operation to create a new guide', async ({ page }) => {
    const guidePage = new GuidePage(page);

    await guidePage.clickOnCreateNewGuide();
    await guidePage.cancelCreateGuide();
    await expect(page).toHaveURL(Config.GUIDE_URL);
  });
  
});
