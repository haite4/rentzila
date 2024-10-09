import {FileChooser, Locator, Page as PlaywrightPage } from "@playwright/test";

export default class Page {
  public page: PlaywrightPage;

  constructor(page: PlaywrightPage) {
    this.page = page;
  }

  async open(url?: string): Promise<void> {
    const fullUrl = url ? `${url}` : "/";
    await this.page.goto(fullUrl);
  }

  protected getElement(selector: string, subSelector?: string): Locator {
    const element = this.page.locator(selector);
    return subSelector ? element.locator(subSelector) : element;
  }

  protected getSubElement(locator: Locator, subLocator: string): Locator {
    return locator.locator(subLocator);
  }

  protected async getElementAll(locator: Locator) {
    return locator.all();
  }

  protected async clickLocator(locator: Locator, position?: { x: number, y: number }){
    if (position) {
      await locator.click({ position });
  } else {
      await locator.click();
  }
  }

  protected async clickMouseAtPosition(x: number, y: number){
    await this.page.mouse.click(x, y)
  }

  protected async fillText(locator: Locator, text: string) {
    await locator.fill(text);
  }

  protected async typeText(locator: Locator, text: string) {
    await locator.pressSequentially(text);
  }

  protected async scrollToElementIfNeeded(selector: string | Locator) {
    if (typeof selector === "string") {
      await this.getElement(selector).scrollIntoViewIfNeeded();
    } else {
      await selector.scrollIntoViewIfNeeded();
    }
  }

  protected async clearInputField(locator: Locator) {
    await locator.clear();
  }

  protected async getElementTextContent(locator: Locator) {
    return locator.textContent();
  }

  protected getElementByRole(text: string) {
    return this.page.getByRole("list").getByRole("link", { name: text });
  }

  protected getButtonByText(text: string, exact: boolean = false) {
    return this.page.getByRole("button", { name: text, exact });
  }

  protected getHeadingByText(text: string) {
    return this.page.getByRole("heading", { name: text });
  }

  protected getElementByImg(text: string){
    return this.page.getByRole('img', { name: text })
  }

  protected getElementByText(text: string){
    return this.page.getByText(text)
  }

  protected getElementByTestId(selector: string) {
    return this.page.getByTestId(selector);
  }

  protected getElementByLabel(text: string) {
    return this.page.getByLabel(text);
  }

  protected async getElementInputValue(locator: Locator){
    return locator.inputValue()
  }

  protected getElementCount(locator: Locator){
    return locator.count()
  }

  protected async setElementInputFiles(locator: Locator, filePath: string | string[]){
      await locator.setInputFiles(filePath)
  }

  protected async elementHover(locator: Locator){
    await locator.hover()
  }

  protected async setElementFiles(fileChooser: FileChooser, filePath: string){
    await fileChooser.setFiles(filePath)
  }

  protected async writeTextToClipboard(textToCopy: string){
    await this.page.evaluate((text) => {
      navigator.clipboard.writeText(text)
    }, textToCopy)
  }

  protected async pressBtn(commands: string){
    await this.page.keyboard.press(commands)
  }

}
