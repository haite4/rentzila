import {Locator, Page as PlaywrightPage } from "@playwright/test";

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

  protected getElement(selector: string, subSelector?: string): Locator{
    const element = this.page.locator(selector);
    return subSelector ? element.locator(subSelector) : element
  }

  protected getSubElement(locator: Locator, subLocator: string): Locator {
    return locator.locator(subLocator);
  }

  protected async getElementAll(locator: Locator){
    return locator.all()
  }

  protected async clickLocator(locator: Locator){
    await locator.click()
  }

  protected async fillText(locator: Locator, text: string){
    await locator.fill(text)
  }

  protected async typeText(locator: Locator, text: string){
    await locator.pressSequentially(text)
  }

  protected async scrollToElementIfNeeded(selector: string | Locator){
      if(typeof selector === "string"){
        await this.getElement(selector).scrollIntoViewIfNeeded()
      }else{
        await selector.scrollIntoViewIfNeeded()
      }
  }

  protected async clearInputField(locator: Locator){
    await locator.clear()
  }

  protected async getElementTextContent(locator: Locator){
    return locator.textContent()
  }

  protected getElementByRole(text: string){
    return this.page.getByRole('list').getByRole('link', { name: text })
  }

  protected getButtonByText(text: string, exact: boolean = false) {
    return this.page.getByRole("button", { name: text, exact });
  }

  protected getHeadingByText(text: string) {
    return this.page.getByRole("heading", { name: text });
  }

  protected getElementByText(text: string){
    return this.page.getByText(text)
  }

  protected getElementByTestId(selector: string){
    return this.page.getByTestId(selector)
  }

  protected getElementByLabel(text: string){
    return this.page.getByLabel(text)
  }

  protected async getElementInputValue(locator: Locator){
    return locator.inputValue()
  }

}
