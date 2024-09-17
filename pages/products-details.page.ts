import { Locator } from "@playwright/test";
import Page from "./page";

const productFilter = ".UnitCharacteristics_service__aTyk2"

export class ProductsDetailsPage extends Page {
  constructor(page: Page["page"]) {
    super(page);
  }

  getUnitCharacteristics(): Locator {
    return this.page.getByText("Послуги, які надає технічний засіб:");
  }

  getMainFeatures(): Locator {
    return this.page.getByRole("heading", { name: "Основні характеристики" });
  }

 async  getUnitCharacteristicText(){
    const characteristicList:string[] = []
    for(const locator of await this.page.locator(productFilter).all()){
      const text = await locator.textContent()
      characteristicList.push((text ?? "").trim())
    }
   return characteristicList
  }
}
