import { Locator } from "@playwright/test";
import Page from "./page";

const selectedFilter = ".ResetFilters_selectedCategory___D1E6";
const unitCardImage = ".UnitCard_imageBlock__hJgt4";
const productsQuantity = ".MapPagination_count__c_dzg";
const expandedClassSelector = ".ServiceCategory_clicked__Jm6x8";
const rightArrowSelector = '[data-testid="rightArrow"]';

export class ProductsPage extends Page {
  constructor(page: Page["page"]) {
    super(page);
  }

  getCheckboxByLabel(text): Locator{
    return this.page.getByLabel(`${text}`);
  }

  getProductsFilter(){
    return this.page.locator(selectedFilter)
  }

  async getCheckedLabelByText(text): Promise<string | null>{
    return await this.page.getByText(text).nth(1).textContent();
  }

  async clickExpendFilterContainer(): Promise<void> {

    const isExpanded =
      (await this.page.locator(expandedClassSelector).count()) > 0;

    if (!isExpanded) {
      const rightArrowElements = this.page.locator(rightArrowSelector);

      for (let i = 0; i < (await rightArrowElements.count()); i++) {
        const element = rightArrowElements.nth(i);
        await element.waitFor({ state: "visible", timeout: 5000 });
        await element.click();

        await this.page
          .locator(expandedClassSelector)
          .waitFor({ state: "attached", timeout: 5000 });

        if ((await this.page.locator(expandedClassSelector).count()) > 0) {
          break;
        }
      }
    } else {
      console.log("Element is already expanded.");
    }
  }

  async getSelectedFilterText():Promise<string | null>{
    return await this.page.locator(selectedFilter).textContent();
  }

  async clickUnitCardImage(): Promise<void>{
    await this.page.locator(unitCardImage).first().click();
  }

  async getProductQuantity(text):Promise<string>{
    if (typeof text !== "string") {
      console.error("Invalid text value:", text);
      return "";
    }

    const match = text.match(/\d+/);

    if (match) {
      return match[0];
    } else {
      return "";
    }
  }

  async getMyPaginationCountText(): Promise<string | null>{
    return await this.page.locator(productsQuantity).nth(1).textContent();
  }

  async getProductFilterText(){
    await this.page.locator(selectedFilter).textContent()
  }
}
