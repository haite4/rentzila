import { test } from "../fixtures/fixtures";
import { expect } from "@playwright/test";
import general_msg from "../data/general_msg.json";
import { Endpoints } from "../constants/enums_endpoints.constant";
import { AlertMsgColors } from "../constants/enums_colors.constant";

test.describe("tests for unit services section", () => {
  test.beforeEach(
    async ({ signInHelper, signinPage, createUnitPage, randomValueHelper }) => {
      await signinPage.open(Endpoints.CREATEUNIT);
      await signInHelper.login(
        process.env.USER_EMAIL ?? "",
        process.env.USER_PASSWORD ?? ""
      );
      await createUnitPage.clickCategorySelectBtn();
      await createUnitPage.clickFirstCategoryLocator(0);
      await createUnitPage.clickSecondCategoryLocator(0);
      await createUnitPage.clickThirdCategoryLocator(0);
      await createUnitPage.typeAdvertisementNameInput(
        randomValueHelper.generateStringWithLength(10)
      );
      await createUnitPage.typeSelectedManufacturerInput(
        general_msg.abcLowerCase
      );
      await createUnitPage.clickSelectedManufacturerOptions();
      await createUnitPage.clickAddressSelectionBtn();

      const { x, y } = await createUnitPage.getMapPopupBoundingBox();
      await createUnitPage.getMapPopUp().waitFor({ state: "visible" });
      await createUnitPage.clickOnThePopUpMap(x, y);
      await createUnitPage.page.waitForTimeout(3000);
      await createUnitPage.clickMapPopUpSubmitChoice();

      await createUnitPage.clickNextBtn();

      await createUnitPage.fileChoser("images", "jpgimage.jpg");
      await createUnitPage.clickNextBtn();
    }
  );

  test("TC-410 Verify creating new service", async ({
    createUnitPage,
    randomValueHelper,
  }) => {
    const randomValue = randomValueHelper.generateStringWithLength(10);
    await createUnitPage.fillServiceUnitInput(randomValue);
    await expect(createUnitPage.getServicesParagraphNotExist()).toBeVisible();
    await expect(createUnitPage.getAddNewServicesBtn()).toBeVisible();
    await expect(createUnitPage.getServicesParagraphNotExist()).toHaveText(
      `На жаль, послугу “${randomValue}“ не знайдено в нашій базі.
Ви можете додати послугу в категорію “Користувацькі”:`
    );
    await expect(createUnitPage.getAddNewServicesIconPlus()).toHaveClass(
      "AddNewItem_iconWrapper__0bE78"
    );
    await expect(createUnitPage.getAddNewServicesBtn()).toHaveText(
      general_msg.createService
    );
    await createUnitPage.clickAddNewServicesBtn();
    await expect(createUnitPage.getSelectedServices()).toBeVisible();
  });

  test("TC-411 Verify choosing multiple services", async ({
    createUnitPage,
  }) => {
    await createUnitPage.fillServiceUnitInput(general_msg.letterG);

    for (const [index, services] of (
      await createUnitPage.getAllSearchItemServicesResult()
    ).entries()) {
      await expect(services).toContainText(
        new RegExp(general_msg.letterG, "i")
      );
      if (index < 3) {
        await createUnitPage.clickSearchItemServicesResulByIndex(index);
      }
    }
    await expect(createUnitPage.getSelectedServices()).toHaveCount(3);
  });

  test("TC-412 Verify removing variants from choosed list", async ({
    createUnitPage,
  }) => {
    await createUnitPage.fillServiceUnitInput(general_msg.letterG);

    for (let i = 0; i < 2; i++) {
      if (i < 2) {
        await createUnitPage.clickSearchItemServicesResulByIndex(i);
      }
    }
    await expect(createUnitPage.getSelectedServices()).toHaveCount(2);
    await expect(createUnitPage.getTechnicalServiceDescription()).toBeVisible();
    for (let i = 1; i >= 0; i--) {
      await createUnitPage.clickRemoveServicesBtnByIndex(i);
    }

    await expect(createUnitPage.getSelectedServices()).toHaveCount(0);
    await expect(
      createUnitPage.getTechnicalServiceDescription()
    ).not.toBeVisible();
  });

  test("TC-413 Verify 'Назад' button", async ({ createUnitPage }) => {
    await expect(createUnitPage.getPrevioudBtn()).toHaveText(general_msg.back);
    await createUnitPage.clickPreviousBtn();
    for (let i = 0; i < (await createUnitPage.categoryTabTitlesCount()); i++) {
      expect(await createUnitPage.getCategorysTabTitlesLocatorText(i)).toBe(
        createUnitPage.getListOfCategorysTabTitle()[i]
      );

      if (i === 1) {
        await expect(createUnitPage.getCategoryTabBtn(1)).toHaveAttribute(
          "aria-selected",
          "true"
        );
      } else {
        await expect(createUnitPage.getCategoryTabBtn(i)).toHaveAttribute(
          "aria-selected",
          "false"
        );
      }
    }
  });

  test("TC-414 Verify 'Далі' button", async ({ createUnitPage }) => {
    await expect(createUnitPage.getNextBtn()).toHaveText(general_msg.next);
    await createUnitPage.clickNextBtn();
    await expect(createUnitPage.getServicesInfoClue()).toHaveCSS(
      "color",
      AlertMsgColors.RED
    );
    await createUnitPage.fillServiceUnitInput(general_msg.letterG);
    await createUnitPage.clickSearchItemServicesResulByIndex(0);
    await createUnitPage.clickNextBtn();
    for (let i = 0; i < (await createUnitPage.categoryTabTitlesCount()); i++) {
      expect(await createUnitPage.getCategorysTabTitlesLocatorText(i)).toBe(
        createUnitPage.getListOfCategorysTabTitle()[i]
      );

      if (i === 3) {
        await expect(createUnitPage.getCategoryTabBtn(3)).toHaveAttribute(
          "aria-selected",
          "true"
        );
      } else {
        await expect(createUnitPage.getCategoryTabBtn(i)).toHaveAttribute(
          "aria-selected",
          "false"
        );
      }
    }
  });

  test("TC-632 Verify entering special characters in the 'Послуги' input", async ({
    createUnitPage,
  }) => {
    await createUnitPage.fillServiceUnitInput(general_msg.invalidSymbols);
    await expect(createUnitPage.getServiceUnitInput()).toHaveValue(
      general_msg.empty
    );
    await createUnitPage.fillServiceUnitInput(
      general_msg.drillingwithinvalidSymbols
    );
    await expect(createUnitPage.getServiceUnitInput()).toHaveValue(
      general_msg.drilling
    );
    await expect(createUnitPage.getSearchedServicesWrapper()).toBeVisible();
  });

  test("TC-633 Verify data length for 'Послуги' input field", async ({
    createUnitPage,
    randomValueHelper,
  }) => {
    await createUnitPage.fillServiceUnitInput(general_msg.dot);
    for (const services of await createUnitPage.getAllSearchItemServicesResult()) {
      await expect(services).toContainText(general_msg.dot);
    }
    await createUnitPage.clearServiceUnitInput();
    await expect(createUnitPage.getServiceUnitInput()).toHaveValue(
      general_msg.empty
    );
    await createUnitPage.fillServiceUnitInput(
      randomValueHelper.generateStringWithLength(101)
    );
    expect(await createUnitPage.getServiceUnitInputValue()).toHaveLength(100);
  });

  test("TC-634 Verify the search function is not sensetive to upper or lower case", async ({
    createUnitPage,
  }) => {
    await createUnitPage.fillServiceUnitInput(general_msg.diggingInLowwerCase);
    for (const services of await createUnitPage.getAllSearchItemServicesResult()) {
      await expect(services).toContainText(
        new RegExp(general_msg.diggingInLowwerCase, "i")
      );
    }
    await createUnitPage.fillServiceUnitInput(general_msg.diggingInUpperCase);
    for (const services of await createUnitPage.getAllSearchItemServicesResult()) {
      await expect(services).toContainText(
        new RegExp(general_msg.diggingInLowwerCase, "i")
      );
    }
  });

  test("TC-591 Verify 'Послуги' input with invalid data", async ({
    createUnitPage,
  }) => {
    await createUnitPage.fillServiceUnitInput(general_msg.invalidSymbols);
    await expect(createUnitPage.getServiceUnitInput()).toHaveValue(
      general_msg.empty
    );
  });

  test("TC-592 Verify 'Послуги' input choosing of existing service", async ({
    createUnitPage,
  }) => {
    await expect(createUnitPage.getServicesInputTitle()).toHaveText(
      /^Знайдіть послуги, які надає Ваш технічний засіб.*\*$/
    );
    await expect(createUnitPage.getServicesInfoClue()).toBeVisible();
    await expect(createUnitPage.getServicesInfoClue()).toHaveText(
      general_msg.addAtLeastOneService
    );
    await expect(createUnitPage.getServiceUnitInput()).toHaveAttribute(
      "placeholder",
      general_msg.servicesInputPlaceholder
    );
    await createUnitPage.fillServiceUnitInput(general_msg.B);
    await expect(createUnitPage.getSearchedServicesWrapper()).toBeVisible();
    await createUnitPage.clearServiceUnitInput();
    await createUnitPage.fillServiceUnitInput(general_msg.diggingInLowwerCase);
    const resultsForDiggingInLowwerCase = await createUnitPage.servicesSearchResultText()
    await createUnitPage.fillServiceUnitInput(general_msg.diggingInUpperCase);
    const resultsForDiggingInUpperCase = await createUnitPage.servicesSearchResultText()
    expect(resultsForDiggingInLowwerCase).toEqual(resultsForDiggingInUpperCase);
    await createUnitPage.clickSearchItemServicesResulByIndex(0);
    await expect(createUnitPage.getSelectedServices()).toBeVisible();
    await expect(createUnitPage.getSelectedServices()).toHaveText(
      general_msg.excavationForFoundations
    );
    await expect(createUnitPage.getTechnicalServiceDescription()).toHaveText(
      general_msg.servicesProvidedByTechnicalMeans
    );
    await expect(createUnitPage.getRemoveServicesBtnByIndex(0)).toBeVisible();
  });
});
