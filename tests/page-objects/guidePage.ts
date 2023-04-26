import { Locator, Page } from "@playwright/test";

export class GuidePage {

  readonly page: Page;

  readonly getLeftPane: Locator;
  readonly getCreateNewOption: Locator;
  readonly getGuideOption: Locator;
  readonly getGuideModal: Locator;
  readonly getGuideName: Locator;
  readonly getSaveButton: Locator;
  readonly getSideBarGuideTitle: Locator;
  readonly getCancelButton: Locator;

  constructor(page: Page) {
    this.page = page;

    this.getLeftPane = page.locator('.item-folder-pane-wrapper');
    this.getCreateNewOption = this.getLeftPane.getByText('Create New');
    this.getGuideOption = this.getLeftPane.getByText('Guide');
    this.getGuideModal = page.locator('.modal-dialog:visible');
    this.getGuideName = this.getGuideModal.locator("input[placeholder='Enter a name']");
    this.getSaveButton = this.getGuideModal.locator("//a[text()='Save']");
    this.getSideBarGuideTitle = page.locator('.guide-sidebar-title-block');
    this.getCancelButton = this.getGuideModal.locator("//a[contains(text(), 'Cancel')]");

  }

  async clickOnCreateNewGuide() {
    await this.getCreateNewOption.click();
    await this.getGuideOption.click();
  }

  async createGuide(name: string) {
    await this.getGuideName.fill(name);
    await this.getSaveButton.click();
  }

  async cancelCreateGuide() {
    await this.getCancelButton.click();
  }

}
