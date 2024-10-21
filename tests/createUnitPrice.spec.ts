import { expect } from "@playwright/test";
import { Endpoints } from "../constants/enums_endpoints.constant";
import { AlertMsgColors } from "../constants/enums_colors.constant";
import { test } from "../fixtures/fixtures";
import general_msg from "../data/general_msg.json";
import error_msg from "../data/errors_msg.json";

test.describe("test create unit price section", () => {
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
      await createUnitPage.fillServiceUnitInput("Рихлення");
      await createUnitPage.clickOnFirstServiceSearchResults();
      await createUnitPage.clickNextBtn();
    }
  );
  
  test("TC-417 Verify 'Спосіб оплати' section", async ({ createUnitPage }) => {
    await expect(createUnitPage.getPricePayementMethodUnitTitle()).toHaveText(
      /^Спосіб оплати.*\*$/
    );
    await expect(createUnitPage.getPaymentMethodCustomSelectValue()).toHaveText(
      general_msg.cashOrCard
    );
    await createUnitPage.clickPriceCustomSelect();
    for (const [index, option] of (
      await createUnitPage.getAllPaymentMethodOptions()
    ).entries()) {
      await expect(option).toHaveText(createUnitPage.getOptionsText()[index]);
      await createUnitPage.clickPaymentMethodOptionBlockByIndex(index);
      await expect(
        createUnitPage.getPaymentMethodCustomSelectValue()
      ).toHaveText(createUnitPage.getOptionsText()[index]);
      await createUnitPage.clickPriceCustomSelect();
    }
  });

  test("TC-418 Verify 'Вартість мінімального замовлення' section", async ({
    createUnitPage,
  }) => {
    await expect(createUnitPage.getPriceCostMinimumOrderTitle()).toHaveText(
      /^Вартість мінімального замовлення.*\*$/
    );
    await expect(createUnitPage.getPriceInput()).toHaveAttribute(
      "placeholder",
      general_msg.exampleValue
    );
    await createUnitPage.typePriceInput(general_msg.numberSequence);
    await expect(createUnitPage.getPriceInput()).toHaveValue(
      general_msg.numberOneThroughnine
    );
    await createUnitPage.clearPriceInput();
    await createUnitPage.fillPriceInput(general_msg.numberSequence);
    await expect(createUnitPage.getPriceInput()).toHaveValue(
      general_msg.numberOneThroughnine
    );

    for (const [index, option] of createUnitPage
      .getInvalidDataList()
      .entries()) {
      await createUnitPage.fillPriceInput(option);
      if (index < 2) {
        await expect(createUnitPage.getPriceInput()).toHaveValue(
          general_msg.oneToSix
        );
      } else {
        await expect(createUnitPage.getPriceInput()).toHaveValue("");
      }
    }
    await createUnitPage.typePriceInput(general_msg.numberOneThroughnine);
    await expect(createUnitPage.getPriceInput()).toHaveValue(
      general_msg.numberOneThroughnine
    );
    await expect(createUnitPage.getPriceCurrencyInput()).toHaveAttribute(
      "value",
      general_msg.currencyUAH
    );
  });

  test("TC-482 Verify adding price for service", async ({ createUnitPage }) => {
    await expect(createUnitPage.getCostOfServicesTitle()).toHaveText(
      /^Вартість Ваших послуг.*\*$/
    );
    await expect(createUnitPage.getPriceSectionClue()).toHaveText(
      general_msg.optionalServiceCosts
    );
    await expect(createUnitPage.getAddPriceBtn()).toHaveText(
      general_msg.addCost
    );
    await createUnitPage.clickAddPriceBtn();
    await expect(createUnitPage.getAddPriceBtn()).not.toBeVisible();
    await expect(createUnitPage.getPriceInput(1)).toBeVisible();
    await expect(createUnitPage.getSelectServicePrice()).toBeVisible();
    await createUnitPage.typePriceInput(general_msg.numberSequence, 1);
    await expect(createUnitPage.getPriceInput(1)).toHaveValue(
      general_msg.numberOneThroughnine
    );

    for (const [index, option] of createUnitPage
      .getInvalidDataList()
      .entries()) {
      await createUnitPage.fillPriceInput(option, 1);
      if (index < 2) {
        await expect(createUnitPage.getPriceInput(1)).toHaveValue(
          general_msg.oneToSix
        );
      } else {
        await expect(createUnitPage.getPriceInput(1)).toHaveValue("");
      }
    }

    await createUnitPage.typePriceInput(general_msg.numbersFromOneToEight, 1);
    await expect(createUnitPage.getPriceInput(1)).toHaveValue(
      general_msg.numbersFromOneToEight
    );
    await expect(createUnitPage.getPriceCurrencyInput(1)).toHaveAttribute(
      "value",
      general_msg.currencyUAH
    );
    await expect(
      createUnitPage.getPaymentMethodCustomSelectValue(1)
    ).toHaveText(general_msg.hour);
    await expect(createUnitPage.getArrowImage(1)).toBeVisible();
    await createUnitPage.clickPaymentMethodCustomSelectValue(1);

    for (const [index, variant] of (
      await createUnitPage.getAllPriceTimeSelectOption()
    ).entries()) {
      await expect(variant).toHaveText(
        createUnitPage.getListOfMeasurementUnits()[index]
      );
      await createUnitPage.clickOnPriceCustomSelectOption(variant);
      await expect(
        createUnitPage.getPaymentMethodCustomSelectValue(1)
      ).toHaveText(createUnitPage.getListOfMeasurementUnits()[index]);
      await createUnitPage.clickPaymentMethodCustomSelectValue(1);
    }

    await createUnitPage.clickPriceWorkingShift();
    await expect(
      createUnitPage.getPaymentMethodCustomSelectValue(2)
    ).toHaveText(general_msg.eightHour);
    await expect(createUnitPage.getArrowImage(2)).toBeVisible();

    await createUnitPage.clickPaymentMethodCustomSelectValue(2);

    for (const [index, variant] of (
      await createUnitPage.getAllPriceTimeSelectOption()
    ).entries()) {
      await expect(variant).toHaveText(
        createUnitPage.getListOfPriceTimeVariant()[index]
      );
      await createUnitPage.clickOnPriceCustomSelectOption(variant);
      await expect(
        createUnitPage.getPaymentMethodCustomSelectValue(2)
      ).toHaveText(createUnitPage.getListOfPriceTimeVariant()[index]);
      await createUnitPage.clickPaymentMethodCustomSelectValue(2);
    }

    await createUnitPage.clickRemovePriceBtn();
    await expect(createUnitPage.getPriceInput(1)).not.toBeVisible();
    await expect(createUnitPage.getPriceCurrencyInput(1)).not.toBeVisible();
    await expect(createUnitPage.getAddPriceBtn()).toBeVisible();
  });

  test("TC-488 Verify 'Назад' button", async ({ createUnitPage }) => {
    await expect(createUnitPage.getPrevioudBtn()).toHaveText(general_msg.back);
    await createUnitPage.clickPreviousBtn();

    for (let i = 0; i < (await createUnitPage.categoryTabTitlesCount()); i++) {
      expect(await createUnitPage.getCategorysTabTitlesLocatorText(i)).toBe(
        createUnitPage.getListOfCategorysTabTitle()[i]
      );

      if (i === 2) {
        await expect(createUnitPage.getCategoryTabBtn(2)).toHaveAttribute(
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
    await expect(createUnitPage.getServiceUnitFlowTitle()).toHaveText(
      general_msg.services
    );
  });

  test("TC-489 Verify 'Далі' button", async ({ createUnitPage }) => {
    await expect(createUnitPage.getNextBtn()).toHaveText(general_msg.next);
    await createUnitPage.clickNextBtn();
    await expect(createUnitPage.getPriceUnitInputWrapper()).toHaveCSS(
      "border",
      AlertMsgColors.BORDERRED
    );
    await expect(createUnitPage.getPriceRequiredFieldClue()).toHaveText(
      error_msg.fieldRequired
    );
    await expect(createUnitPage.getPriceRequiredFieldClue()).toHaveCSS(
      "color",
      AlertMsgColors.RED
    );
    await createUnitPage.typePriceInput(general_msg.oneThousand);
    await createUnitPage.clickNextBtn();
    await expect(createUnitPage.getCategoryBodyTitle()).toHaveText(
      general_msg.createAnnouncment
    );
    for (let i = 0; i < (await createUnitPage.categoryTabTitlesCount()); i++) {
      expect(await createUnitPage.getCategorysTabTitlesLocatorText(i)).toBe(
        createUnitPage.getListOfCategorysTabTitle()[i]
      );
      expect(await createUnitPage.getCategoryTabNumberText(i)).toBe(
        createUnitPage.getListOfCategoryTabNumber()[i]
      );

      if (i === 4) {
        await expect(createUnitPage.getCategoryTabBtn(4)).toHaveAttribute(
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

  test("TC-596 Verify adding an invalid price in the 'Вартість мінімального замовлення *' input", async ({
    createUnitPage,
  }) => {
    await createUnitPage.typePriceInput(general_msg.zero);
    await expect(createUnitPage.getPriceInput()).toHaveValue(general_msg.empty);
    await createUnitPage.typePriceInput(general_msg.one);
    await expect(createUnitPage.getPriceInput()).toHaveValue(general_msg.one);
    await createUnitPage.clickNextBtn();
    await expect(createUnitPage.getPriceUnitInputWrapper()).toHaveCSS(
      "border",
      AlertMsgColors.BORDERRED
    );
    await expect(createUnitPage.getPriceMinimumAmountClue()).toHaveText(
      error_msg.minimumPriceRequirement
    );
    await expect(createUnitPage.getPriceMinimumAmountClue()).toHaveCSS(
      "color",
      AlertMsgColors.RED
    );
    await createUnitPage.clearPriceInput();
    await expect(createUnitPage.getPriceUnitInputWrapper()).toHaveCSS(
      "border",
      AlertMsgColors.BORDERRED
    );
    await expect(createUnitPage.getPriceRequiredFieldClue()).toHaveText(
      error_msg.fieldRequired
    );
    await createUnitPage.typePriceInput(general_msg.oneThousand);
    await expect(createUnitPage.getPriceRequiredFieldClue()).not.toBeVisible();
    await expect(createUnitPage.getPriceMinimumAmountClue()).not.toBeVisible();
    await expect(createUnitPage.getPriceUnitInputWrapper()).toHaveCSS(
      "border",
      AlertMsgColors.BORDERGRAY
    );
  });

  test("TC-636 Verify the data entry in the 'Вартість мінімального замовлення *' input", async ({
    createUnitPage,
  }) => {
    for (const [index, option] of createUnitPage
      .getInvalidDataListWithAdditionalValue()
      .entries()) {
      for (const action of createUnitPage.getListOfCopyPasteActions()) {
        switch (action) {
          case "type":
            await createUnitPage.fillPriceInput(option);
            break;
          case "copy-paste":
            await createUnitPage.clearPriceInput();
            await createUnitPage.writeToClipboardSymbols(option);
            await createUnitPage.clickPriceInput();
            await createUnitPage.pressCommand("Control+Shift+V");
            break;
        }

        if (index < 2) {
          await expect(createUnitPage.getPriceInput()).toHaveValue(
            general_msg.oneToSix
          );
        } else if (index == 2) {
          await expect(createUnitPage.getPriceInput()).toHaveValue(
            general_msg.numberOneThroughnine
          );
        } else {
          await expect(createUnitPage.getPriceInput()).toHaveValue(
            general_msg.empty
          );
        }
      }
    }
  });

  test("TC-637 Verify UI of the 'Вартість Ваших послуг *' section", async ({
    createUnitPage,
  }) => {
    await expect(createUnitPage.getCostOfServicesTitle()).toHaveText(
      /^Вартість Ваших послуг.*\*$/
    );
    await expect(createUnitPage.getPriceSectionClue()).toHaveText(
      general_msg.optionalServiceCosts
    );
    await expect(createUnitPage.getAddPriceBtn()).toBeVisible();
    await expect(createUnitPage.getAddPriceBtn()).toHaveText(
      general_msg.addCost
    );
    await expect(createUnitPage.getSelectServicePrice()).toBeVisible();
    await createUnitPage.clickAddPriceBtn();
    await expect(createUnitPage.getAddPriceBtn()).not.toBeVisible();
    await expect(createUnitPage.getPriceInput(1)).toBeVisible();
    await expect(createUnitPage.getSelectServicePrice()).toBeVisible();
    await expect(
      createUnitPage.getPaymentMethodCustomSelectValue(1)
    ).toBeVisible();
    await expect(createUnitPage.getPriceCurrencyInput(1)).toBeVisible();
    await expect(createUnitPage.getPriceInput(1)).toHaveAttribute(
      "placeholder",
      general_msg.exampleValue
    );
    await expect(createUnitPage.getPriceCurrencyInput(1)).toHaveAttribute(
      "value",
      general_msg.currencyUAH
    );
    await expect(
      createUnitPage.getPaymentMethodCustomSelectValue(1)
    ).toHaveText(general_msg.hour);
  });

  test("TC-638 Verify the data entry in the 'Вартість Ваших послуг *' price input", async ({
    createUnitPage,
  }) => {
    await createUnitPage.clickAddPriceBtn();
    await expect(createUnitPage.getPriceInput(1)).toBeVisible();

    for (const [index, option] of createUnitPage
      .getInvalidDataListWithAdditionalValue()
      .entries()) {
      for (const action of createUnitPage.getListOfCopyPasteActions()) {
        switch (action) {
          case "type":
            await createUnitPage.fillPriceInput(option, 1);
            break;
          case "copy-paste":
            await createUnitPage.clearPriceInput(1);
            await createUnitPage.writeToClipboardSymbols(option);
            await createUnitPage.clickPriceInput(1);
            await createUnitPage.pressCommand("Control+V");
            break;
        }

        if (index < 2) {
          await expect(createUnitPage.getPriceInput(1)).toHaveValue(
            general_msg.oneToSix
          );
        } else if (index == 2) {
          await expect(createUnitPage.getPriceInput(1)).toHaveValue(
            general_msg.numberOneThroughnine
          );
        } else {
          await expect(createUnitPage.getPriceInput(1)).toHaveValue(
            general_msg.empty
          );
        }
      }
    }
  });
});
