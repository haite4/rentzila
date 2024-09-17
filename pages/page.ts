import {Page as PlaywrightPage } from "@playwright/test";

const logo = `[data-testid="logo"]`;

export default class Page {
  public page: PlaywrightPage;

  constructor(page: PlaywrightPage) {
    this.page = page;
  }

  async open(url?: string): Promise<void> {
    const fullUrl = url ? `${url}` : "/";
    await this.page.goto(fullUrl);
  }

  async clickOnTheLogo(): Promise<void> {
    await this.page.locator(logo).first().click();
  }
}
