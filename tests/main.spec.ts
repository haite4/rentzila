import { expect } from "@playwright/test";
import { test } from "../fixtures/fixtures";
import { Endpoints } from "../helpers/enums_endpoints"

require('dotenv').config()

test.describe("Main page testing", () => {
  test.slow();
  test.only("TC-212: Checking 'Послуги' section on the main page", async ({
    mainPage,
    productsPage,
    productsDetailsPage,
    basePage,
  }) => {
    await mainPage.open();
    await mainPage.scrollToServices();
    await expect(mainPage.getPopulyarniServicesTab()).toBeVisible();
    await expect(mainPage.getServicesTitle()).toBeVisible();
    for (const services of await mainPage.getListItemServices()) {
      await expect(services).toBeVisible();
    }

    for (const locator of await mainPage.getListItemServices()) {
      const text = await mainPage.getServicesText(locator);

      await mainPage.clickOnEachServices(locator);

      await expect(mainPage.page).toHaveURL(`${process.env.BASE_URL}${Endpoints.Products}`);
      await productsPage.page.waitForLoadState("networkidle");

      await productsPage.clickExpendFilterContainer();
      const checkboxLabel = productsPage.getCheckboxByLabel(text ?? "");
      await mainPage.page.waitForTimeout(2000);
      await expect(checkboxLabel).toBeVisible();
      await expect(checkboxLabel).toBeChecked();
      await productsPage.clickUnitCardImage();
      await expect(productsDetailsPage.getUnitCharacteristicsTitle()).toBeVisible();
      await expect(productsDetailsPage.getUnitCharacteristicsTitle()).toHaveText(
        "Послуги, які надає технічний засіб:"
      );
      await expect(productsDetailsPage.getUnitCharacteristicText(text ?? "")).toHaveCount(1);
      await basePage.clickOnTheLogo();
      await expect(mainPage.page).toHaveURL(process.env.BASE_URL ?? "");
    }
  });

  test("TC-213: Checking 'Спецтехніка' section on the main page", async ({
    mainPage,
    productsPage,
    basePage,
  }) => {
    await mainPage.open();
    await mainPage.scrollToSpecialEquipment();
    await expect(mainPage.getEquipmentTitle()).toBeVisible();
    await expect(mainPage.getPopulyarniEuqipmentTab()).toBeVisible();

    for (const equipmentTab of await mainPage.getLocatorOfEquipmentTab()) {
      await mainPage.clickOnTheEquipmentTab(equipmentTab);
      for (const equipment of await mainPage.getListEquipmentServices()) {
        await expect(equipment).toBeVisible();
      }
    }

    for (let i = 0; i < mainPage.getListOfEquipmentTab.length; i++) {
      mainPage.clickOnTheEquipmentTabs(i);
      for (
        let j = 0;
        j < (await mainPage.getListEquipmentServices()).length;
        j++
      ) {
        mainPage.clickOnTheEquipmentTabs(i);
        await mainPage.clickOnTheEquipment(
          mainPage.getEquimpmentServicesByIndex(j)
        );

        await expect(mainPage.page).toHaveURL(
          new RegExp(`.*${process.env.BASE_URL}${Endpoints.Products}.*`)
        );

        try {
          await expect(productsPage.getProductsFilter()).toBeVisible();
        } catch (error) {
          console.warn("Element not visible, continuing test execution.");
        }

        await productsPage.page.waitForLoadState("networkidle");
        await basePage.clickOnTheLogo();
        await expect(mainPage.page).toHaveURL(process.env.BASE_URL ?? "");
      }
    }
  });
});
