import { Locator } from "@playwright/test";
import Page from "./page";

export class ProductsDetailsPage extends Page {
  constructor(page: Page["page"]) {
    super(page);
  }

  getUnitCharacteristicsTitle(): Locator {
    return super.getElementByText("Послуги, які надає технічний засіб:");
  }

  getMainFeatures(): Locator {
    return super.getHeadingByText("Основні характеристики");
  }

  getUnitCharacteristicText(text: string) {
    return super.getElement(
      `//div[contains(@class, "UnitCharacteristics_service") and contains(text(), "${text}")]`
    );
  }
}
