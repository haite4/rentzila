import { Locator } from "@playwright/test";
import Page from "./page";

const selectedFilter = '[class*="ResetFilters_selectedCategory"]';
const unitCardImage = '[class*=UnitCard_imageBlock]';
const productsQuantity = '[class*=MapPagination_count]';
const expandedClassSelector = '[class*=ServiceCategory_clicked]';
const rightArrowSelector = '[data-testid="rightArrow"]';

export class ProductsPage extends Page {
  constructor(page: Page["page"]) {
    super(page);
  }

  getCheckboxByLabel(text: string): Locator{
    return super.getElementByLabel(text)
  }

  getProductsFilter(){
    return super.getElement(selectedFilter)
  }

  async getCheckedLabelByText(text: string): Promise<string | null>{
      return super.getElementTextContent(super.getElementByText(text).nth(1))
  }

  async clickExpendFilterContainer(): Promise<void> {

    const isExpanded =
      (await super.getElement(expandedClassSelector).isVisible());

    if (!isExpanded) {
      const rightArrowElements = super.getElement(rightArrowSelector);

      for (let i = 0; i < (await rightArrowElements.count()); i++) {
        const element = rightArrowElements.nth(i);
        await element.waitFor({ state: "visible", timeout: 5000 });
        await element.click();

        await 
          super.getElement(expandedClassSelector)
          .waitFor({ state: "attached", timeout: 5000 });

        if ((await super.getElement(expandedClassSelector).isVisible())) {
          break;
        }
      }
    } else {
      console.log("Element is already expanded.");
    }
  }

  async getSelectedFilterText():Promise<string | null>{
   return super.getElementTextContent(super.getElement(selectedFilter))
  }

  async clickUnitCardImage(): Promise<void>{
    await super.clickLocator(super.getElement(unitCardImage).first())
  }

  async getMyPaginationCountText(): Promise<string | null>{
    return super.getElementTextContent(super.getElement(productsQuantity).nth(1))
  }

  async getProductFilterText(){
    return super.getElementTextContent(super.getElement(selectedFilter))
  }
}
