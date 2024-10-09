import { expect } from "@playwright/test";
import { test } from "../fixtures/fixtures";
import { Endpoints } from "../constants/enums_endpoints.constant";
import { AlertMsgColors } from "../constants/enums_colors.constant";
import general_msg from "../data/general_msg.json"
import error_msg from "../data/errors_msg.json"

test.describe("Create unit functionality", () => {
  test.beforeEach(async ({ signInHelper, signinPage }) => {
    await signinPage.open(Endpoints.CREATEUNIT);
    await signInHelper.login(
      process.env.USER_EMAIL ?? "",
      process.env.USER_PASSWORD ?? ""
    );
  });

  test("TC-294 Verify body title and tab titles", async ({
    createUnitPage,
  }) => {
    await createUnitPage.page.waitForTimeout(2000)
    await expect(createUnitPage.getCategoryBodyTitle()).toBeVisible();
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
      if (i === 0) {
        expect(createUnitPage.getCategoryTabBtn(0)).toHaveAttribute(
          "aria-selected",
          "true"
        );
      } else {
        expect(createUnitPage.getCategoryTabBtn(i)).toHaveAttribute(
          "aria-selected",
          "false"
        );
      }
    }
  });

  test("TC-296 Verify category (Категорія) section", async ({
    createUnitPage,
  }) => {
    test.setTimeout(160000);
    await createUnitPage.getCategorySelectTitle().waitFor({state:"visible"})
    await expect(createUnitPage.getCategorySelectTitle()).toBeVisible();
    await expect(createUnitPage.getCategorySelectTitle()).toHaveText(
      /^Категорія.*\*$/
    );
    await expect(createUnitPage.getCategorySelectContent()).toHaveText(
      general_msg.selectCategory
    );
    await expect(createUnitPage.getCategorySelectBtn()).toHaveCSS(
      "justify-content",
      "space-between"
    );
    await expect(createUnitPage.getArrowDown()).toBeVisible();
    await createUnitPage.clickNextBtn();
    await expect(createUnitPage.getCategorySelectError()).toHaveCSS(
      "border",
      AlertMsgColors.BORDERRED
    );
    await expect(createUnitPage.getCategorySelectErrorText()).toHaveCSS(
      "color",
      AlertMsgColors.RED
    );
    await expect(createUnitPage.getCategorySelectErrorText()).toHaveText(
      error_msg.fieldRequired
    );
    await createUnitPage.clickCategorySelectBtn();
    await expect(createUnitPage.getCategoryPopUp()).toBeVisible();
    await expect(createUnitPage.getCategoryPopUpTitle()).toHaveText(
      general_msg.selectTechnicalCategory
    );
    await createUnitPage.clickCategoryPopUpCloseBtn();
    await expect(createUnitPage.getCategoryPopUp()).toBeHidden();
    await createUnitPage.clickCategorySelectBtn();
    await createUnitPage.clickOutsideCategoryPopUp();
    await expect(createUnitPage.getCategoryPopUp()).toBeHidden();
    await createUnitPage.clickCategorySelectBtn();

    for (
      let i = 0;
      i < (await createUnitPage.firstCategoryLocatorCount());
      i++
    ) {
      await createUnitPage.clickFirstCategoryLocator(i);
      for (
        let j = 0;
        j < (await createUnitPage.secondCategoryLocatorCount());
        j++
      ) {
        await createUnitPage.clickSecondCategoryLocator(j);
        for (
          let k = 0;
          k < (await createUnitPage.thirdCategoryLocatorCount());
          k++
        ) {
          const text = await createUnitPage.thirdCategoryLocatorText(k);
          await createUnitPage.clickThirdCategoryLocator(k);
          await expect(createUnitPage.getCategoryPopUp()).toBeHidden();
          await expect(createUnitPage.getCategorySelectContent()).toHaveText(
            text ?? ""
          );
          await createUnitPage.clickCategorySelectBtn();
        }
      }
    }
  });

  test("TC-297 Verify unit name section", async ({
    createUnitPage,
    randomValueHelper,
  }) => {
    await createUnitPage.getAdvertisementTitle().waitFor({state:"visible"})
    await expect(createUnitPage.getAdvertisementTitle()).toBeVisible();
    await expect(createUnitPage.getAdvertisementTitle()).toHaveText(
      /^Назва оголошення.*\*$/
    );
    await expect(createUnitPage.getAdvertisementInput()).toHaveAttribute(
      "placeholder",
      general_msg.enterTheNameOfTheAd
    );
    await createUnitPage.clickNextBtn();
    await expect(createUnitPage.getAdvertisementInput()).toHaveCSS(
      "border-color",
      AlertMsgColors.RED
    );
    await expect(createUnitPage.getErrorMessage()).toHaveText(
      error_msg.fieldRequired
    );
    await expect(createUnitPage.getErrorMessage()).toHaveCSS(
      "color",
      AlertMsgColors.RED
    );
    await createUnitPage.typeAdvertisementNameInput(
      randomValueHelper.randomWord()
    );
    await createUnitPage.clickNextBtn();
    await expect(createUnitPage.getErrorMessage()).toHaveText(
      error_msg.adTitlShouldAtleast10CharactersLong
    );
    await expect(createUnitPage.getAdvertisementInput()).toHaveCSS(
      "border-color",
      AlertMsgColors.RED
    );
    await createUnitPage.clearAdvertisementInput();
    await createUnitPage.fillAdvertisementNameInput(
      randomValueHelper.randomWord()
    );
    await createUnitPage.clickNextBtn();
    await expect(createUnitPage.getErrorMessage()).toHaveText(
      error_msg.adTitlShouldAtleast10CharactersLong
    );
    await expect(createUnitPage.getAdvertisementInput()).toHaveCSS(
      "border-color",
      AlertMsgColors.RED
    );
    await createUnitPage.clearAdvertisementInput();
    await createUnitPage.typeAdvertisementNameInput(
      randomValueHelper.generateStringWithLength(101)
    );
    await createUnitPage.clickNextBtn();
    await expect(createUnitPage.getErrorMessage()).toHaveText(
      error_msg.adTitleCanHaveNoMoreThan100Characters
    );
    expect(await createUnitPage.getAdvertisementInputValue()).toHaveLength(100);
    await createUnitPage.clearAdvertisementInput();
    await createUnitPage.typeAdvertisementNameInput(general_msg.invalidSymbols);
    await expect(createUnitPage.getAdvertisementInput()).not.toContainText(
      general_msg.invalidSymbols
    );
    await createUnitPage.clearAdvertisementInput();
    await createUnitPage.typeAdvertisementNameInput(
      randomValueHelper.generateStringWithLength(10)
    );
    await createUnitPage.clickNextBtn();
    await expect(createUnitPage.getAdvertisementInput()).toHaveCSS(
      "border",
      AlertMsgColors.BORDERGRAY
    );
    await expect(createUnitPage.getErrorMessage()).not.toBeVisible();
  });

  test("TC-298 Verify vehicle manufacturer section", async ({
    createUnitPage,
    randomValueHelper,
  }) => {
    await createUnitPage.getSelectManufacturerTitle().waitFor({state: "visible"})
    await expect(createUnitPage.getSelectManufacturerTitle()).toBeVisible();
    await expect(createUnitPage.getSelectManufacturerTitle()).toHaveText(
      /^Виробник транспортного засобу.*\*$/
    );
    await expect(createUnitPage.getSelectedManufacturerInput()).toHaveAttribute(
      "placeholder",
      general_msg.enterVehicleManufacturer
    );
    await createUnitPage.clickNextBtn();
    await expect(createUnitPage.getSelectedManufacturerError()).toHaveText(
      error_msg.fieldRequired
    );
    await expect(createUnitPage.getSelectedManufacturerError()).toHaveCSS(
      "color",
      AlertMsgColors.RED
    );
    await expect(createUnitPage.getSeletedManufacturerBorder()).toHaveCSS(
      "border",
      AlertMsgColors.BORDERRED
    );
    await createUnitPage.typeSelectedManufacturerInput(general_msg.A);
    await expect(
      createUnitPage.getSelectedManufacturerDropdownWrapper()
    ).toBeVisible();
    await createUnitPage.clearSelectedManufacturerInput();
    await createUnitPage.typeSelectedManufacturerInput(general_msg.manufacturerInUpperCase);
    await expect(createUnitPage.getSelectedManufacturerOptions()).toHaveText(
      general_msg.manufacturerInUpperCase
    );
    await createUnitPage.clearSelectedManufacturerInput();
    await createUnitPage.typeSelectedManufacturerInput(general_msg.manufacturerInLowerCase);
    await expect(createUnitPage.getSelectedManufacturerOptions()).toHaveText(
      general_msg.manufacturerInUpperCase
    );
    await createUnitPage.clearSelectedManufacturerInput();
    await createUnitPage.typeSelectedManufacturerInput(general_msg.emptyString);
    expect(
      await createUnitPage.getSelectedManufacturerInputValue()
    ).toHaveLength(0);
    await expect(
      createUnitPage.getSelectedManufacturerDropdownWrapper()
    ).not.toBeVisible();
    await createUnitPage.typeSelectedManufacturerInput(general_msg.invalidSymbols);
    expect(
      await createUnitPage.getSelectedManufacturerInputValue()
    ).toHaveLength(0);
    await expect(
      createUnitPage.getSelectedManufacturerDropdownWrapper()
    ).not.toBeVisible();
    await createUnitPage.typeSelectedManufacturerInput(general_msg.numberOneThroughnine);
    await expect(
      createUnitPage.getSelectedManufacuredNotFoundResult()
    ).toHaveText(
      error_msg.manufacturerNotFoundMsg
    );
    await createUnitPage.clearSelectedManufacturerInput();
    await createUnitPage.typeSelectedManufacturerInput(
      randomValueHelper.generateStringWithLength(101)
    );
    expect(
      await createUnitPage.getSelectedManufacturerInputValue()
    ).toHaveLength(100);
    await createUnitPage.clearSelectedManufacturerInput();
    await createUnitPage.typeSelectedManufacturerInput(general_msg.abcLowerCase);
    await createUnitPage.clickSelectedManufacturerOptions();
    await expect(createUnitPage.getSelectedOptionsInput()).toHaveText(general_msg.abcUpperCase);
    await createUnitPage.clickCloseOptionsBtn();
    await createUnitPage.typeSelectedManufacturerInput(general_msg.abcLowerCase);
    await createUnitPage.clickSelectedManufacturerOptions();
    await expect(createUnitPage.getCloseOptionsBtn()).toBeVisible();
    await createUnitPage.clickCloseOptionsBtn();
    expect(
      await createUnitPage.getSelectedManufacturerInputValue()
    ).toHaveLength(0);
  });

  test("TC-299 Verify model name input field", async ({
    createUnitPage,
    randomValueHelper,
  }) => {
    await createUnitPage.getNameModelTitle().waitFor({state:"visible"})
    await expect(createUnitPage.getNameModelTitle()).toBeVisible();
    await expect(createUnitPage.getNameModelTitle()).toHaveText(
      general_msg.modelName
    );
    await expect(createUnitPage.getNameModelInput()).toHaveAttribute(
      "placeholder",
      general_msg.enterModelName
    );
    for (const invalidVariants of createUnitPage.getListOfInvalidVariant()) {
      await createUnitPage.typeModelNameiInput(invalidVariants);
      await expect(createUnitPage.getErrorMessage()).toHaveText(
        general_msg.modelNameLengthLimitMessage
      );
      await expect(createUnitPage.getNameModelInput()).toHaveCSS(
        "border-color",
        AlertMsgColors.RED
      );
      await createUnitPage.clearModelNameiInput();
    }

    for (const invalidSymbols of createUnitPage.getListOfInvalidSymbols(true)) {
      await createUnitPage.typeModelNameiInput(invalidSymbols);
      expect(await createUnitPage.getModelNameiInputValue()).toHaveLength(0);
    }
    await createUnitPage.typeModelNameiInput(
      randomValueHelper.generateStringWithLength(15)
    );
    await expect(createUnitPage.getErrorMessage()).not.toBeVisible();
  });

  test("TC-317 Verify technical characteristics section", async ({
    createUnitPage,
    randomValueHelper,
  }) => {
    test.setTimeout(200000);
    await createUnitPage.getTechnicalCharacteristicTitle().waitFor({state: "visible"})
    await expect(
      createUnitPage.getTechnicalCharacteristicTitle()
    ).toBeVisible();
    await expect(createUnitPage.getTechnicalCharacteristicTitle()).toHaveText(
      general_msg.technicalSpecifications
    );
    await createUnitPage.clickTechnicalCharacteristicTextArea();
    expect(
      await createUnitPage.getTechnicalCharacteristicTextAreaValue()
    ).toHaveLength(0);
    for (const invalidSymbols of createUnitPage.getListOfInvalidSymbols(
      false
    )) {
      await createUnitPage.typeTechnicalCharacteristicTextArea(invalidSymbols);
      expect(
        await createUnitPage.getTechnicalCharacteristicTextAreaValue()
      ).toHaveLength(0);
    }
    await createUnitPage.typeTechnicalCharacteristicTextArea(
      randomValueHelper.generateStringWithLength(9001)
    );
    expect(
      await createUnitPage.getTechnicalCharacteristicTextAreaValue()
    ).toHaveLength(9000);
  });

  test("TC-318 Verify description section", async ({
    createUnitPage,
    randomValueHelper,
  }) => {
    test.setTimeout(200000);
    await expect(createUnitPage.getDetailedDescriptionTitle()).toBeVisible();
    await expect(createUnitPage.getDetailedDescriptionTitle()).toHaveText(
      general_msg.detailedDescription
    );
    await createUnitPage.clickDetailedDescriptionTextArea();
    expect(
      await createUnitPage.getDetailedDescriptionTextAreaValue()
    ).toHaveLength(0);
    for (const invalidSymbols of createUnitPage.getListOfInvalidSymbols(
      false
    )) {
      await createUnitPage.typeDetailedDescriptionTextArea(invalidSymbols);
      expect(
        await createUnitPage.getDetailedDescriptionTextAreaValue()
      ).toHaveLength(0);
    }

    await createUnitPage.typeDetailedDescriptionTextArea(
      randomValueHelper.generateStringWithLength(9001)
    );
    expect(
      await createUnitPage.getDetailedDescriptionTextAreaValue()
    ).toHaveLength(9000);
  });

  test("TC-319 Verify vehicle location division", async ({
    createUnitPage,
  }) => {
    await createUnitPage.getAddressSelectionTitle().waitFor({state: "visible"})
    await expect(createUnitPage.getAddressSelectionTitle()).toBeVisible();
    await expect(createUnitPage.getAddressSelectionTitle()).toHaveText(
      /^Місце розташування технічного засобу.*\*$/
    );
    await expect(createUnitPage.getMapLabel()).toHaveText(general_msg.selectOnMap);
    await expect(createUnitPage.getMapLabel()).not.toHaveClass(
      "AddressSelectionBlock_mapLabelChosen__PBJoF"
    );
    await createUnitPage.clickNextBtn();
    await expect(createUnitPage.getMapLabel()).toHaveCSS(
      "border",
      AlertMsgColors.BORDERRED
    );
    await expect(createUnitPage.getAddressSelectionError()).toHaveText(
      general_msg.selectCorrectLocationOnMapOfUkraine
    );
    await expect(createUnitPage.getAddressSelectionError()).toHaveCSS(
      "color",
      AlertMsgColors.RED
    );
    await createUnitPage.clickAddressSelectionBtn();
    await expect(createUnitPage.getMapPopUpWrapper()).toBeVisible();
    await expect(createUnitPage.getMapPopUpTitle()).toHaveText(
      general_msg.equipmentOnMap
    );
    await expect(createUnitPage.getMapPopUpCloseBtn()).toBeVisible();
    await expect(createUnitPage.getMapPopUpAddress()).toHaveText(
      general_msg.defaultAddress
    );
    await createUnitPage.clickMapPopUpSubmitChoice();
    await expect(createUnitPage.getMapPopUpWrapper()).not.toBeVisible();
    await expect(createUnitPage.getMapLabel()).toHaveText(
      general_msg.defaultAddress
    );
    await createUnitPage.clickAddressSelectionBtn();
    const { x, y } = await createUnitPage.getMapPopupBoundingBox();
    await createUnitPage.getMapPopUp().waitFor({ state: "visible" });
    await createUnitPage.clickOnThePopUpMap(x, y);
    await createUnitPage.page.waitForTimeout(500);
    const addressText = await createUnitPage.getMapPopUpAddressText();
    await createUnitPage.page.waitForTimeout(1500);
    await createUnitPage.clickMapPopUpSubmitChoice();
    await expect(createUnitPage.getMapLabel()).toHaveText(addressText ?? "");
    await expect(createUnitPage.getMapPopUpWrapper()).not.toBeVisible();
  });

  test("TC-326 Verify 'Скасувати'  button", async ({
    createUnitPage,
    mainPage,
  }) => {
    await expect(createUnitPage.getPreventBtn()).toHaveText(general_msg.cancel);
    const [dialog] = await Promise.all([
      createUnitPage.page.waitForEvent("dialog"),
      await mainPage.clickOnTheLogo(),
    ]);
    await dialog.accept();
    await expect(createUnitPage.page).toHaveURL(process.env.BASE_URL ?? "");
  });

  test("TC-329 Verify 'Далі' button", async ({
    createUnitPage,
    randomValueHelper,
  }) => {
    await createUnitPage.getNextBtn().waitFor({state:"visible"})
    await expect(createUnitPage.getNextBtn()).toHaveText(general_msg.next);
    await createUnitPage.clickNextBtn();
    for (const requiredFields of createUnitPage.getListOfLocatorRequiredFieldsError()) {
      await expect(requiredFields).toBeVisible();
    }
    await createUnitPage.clickCategorySelectBtn();
    await createUnitPage.clickFirstCategoryLocator(0);
    await createUnitPage.clickSecondCategoryLocator(0);
    await createUnitPage.clickThirdCategoryLocator(0);
    await createUnitPage.typeAdvertisementNameInput(
      randomValueHelper.generateStringWithLength(10)
    );
    await createUnitPage.typeSelectedManufacturerInput(general_msg.abcLowerCase);
    await createUnitPage.clickSelectedManufacturerOptions();
    await createUnitPage.clickAddressSelectionBtn();
    const { x, y } = await createUnitPage.getMapPopupBoundingBox();
    await createUnitPage.getMapPopUp().waitFor({ state: "visible" });
    await createUnitPage.clickOnThePopUpMap(x, y);
    await createUnitPage.clickMapPopUpSubmitChoice();
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
      if (i === 1) {
        await expect(createUnitPage.getCategoryTabBtn(1)).toHaveAttribute(
          "aria-selected",
          "true"
        );
      } else {
        await createUnitPage.page.waitForTimeout(1500)
        await expect(createUnitPage.getCategoryTabBtn(i)).toHaveAttribute(
          "aria-selected",
          "false"
        );
      }
    }
  });
});
