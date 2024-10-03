import { expect } from "@playwright/test";
import { test } from "../fixtures/fixtures";
import { Endpoints } from "../constants/enums_endpoints.constant";
import { AlertMsgColors } from "../constants/enums_colors.constant";

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
    await expect(createUnitPage.getCategoryBodyTitle()).toBeVisible();
    await expect(createUnitPage.getCategoryBodyTitle()).toHaveText(
      "Створити оголошення"
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
    await expect(createUnitPage.getCategorySelectTitle()).toBeVisible();
    await expect(createUnitPage.getCategorySelectTitle()).toHaveText(
      /^Категорія.*\*$/
    );
    await expect(createUnitPage.getCategorySelectContent()).toHaveText(
      "Виберіть категорію"
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
      "Це поле обов’язкове"
    );
    await createUnitPage.clickCategorySelectBtn();
    await expect(createUnitPage.getCategoryPopUp()).toBeVisible();
    await expect(createUnitPage.getCategoryPopUpTitle()).toHaveText(
      "Вибір категорії технічного засобу"
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
    await expect(createUnitPage.getNazvaOgolochenyaTitie()).toBeVisible();
    await expect(createUnitPage.getNazvaOgolochenyaTitie()).toHaveText(
      /^Назва оголошення.*\*$/
    );
    await expect(createUnitPage.getNazvaOgolochenyaInput()).toHaveAttribute(
      "placeholder",
      "Введіть назву оголошення"
    );
    await createUnitPage.clickNextBtn();
    await expect(createUnitPage.getNazvaOgolochenyaInput()).toHaveCSS(
      "border-color",
      AlertMsgColors.RED
    );
    await expect(createUnitPage.getErrorMessage()).toHaveText(
      "Це поле обов’язкове"
    );
    await expect(createUnitPage.getErrorMessage()).toHaveCSS(
      "color",
      AlertMsgColors.RED
    );
    await createUnitPage.typeNazvaOgolochenyaInput(
      randomValueHelper.randomWord()
    );
    await createUnitPage.clickNextBtn();
    await expect(createUnitPage.getErrorMessage()).toHaveText(
      "У назві оголошення повинно бути не менше 10 символів"
    );
    await expect(createUnitPage.getNazvaOgolochenyaInput()).toHaveCSS(
      "border-color",
      AlertMsgColors.RED
    );
    await createUnitPage.clearNazvaOgolochenyaInput();
    await createUnitPage.fillNazvaOgolochenyaInput(
      randomValueHelper.randomWord()
    );
    await createUnitPage.clickNextBtn();
    await expect(createUnitPage.getErrorMessage()).toHaveText(
      "У назві оголошення повинно бути не менше 10 символів"
    );
    await expect(createUnitPage.getNazvaOgolochenyaInput()).toHaveCSS(
      "border-color",
      AlertMsgColors.RED
    );
    await createUnitPage.clearNazvaOgolochenyaInput();
    await createUnitPage.typeNazvaOgolochenyaInput(
      randomValueHelper.generateStringWithLength(101)
    );
    await createUnitPage.clickNextBtn();
    await expect(createUnitPage.getErrorMessage()).toHaveText(
      "У назві оголошення може бути не більше 100 символів"
    );
    expect(await createUnitPage.getOgolochenyaInputValue()).toHaveLength(100);
    await createUnitPage.clearNazvaOgolochenyaInput();
    await createUnitPage.typeNazvaOgolochenyaInput("<>{};^");
    await expect(createUnitPage.getNazvaOgolochenyaInput()).not.toContainText(
      "<>{};^"
    );
    await createUnitPage.clearNazvaOgolochenyaInput();
    await createUnitPage.typeNazvaOgolochenyaInput(
      randomValueHelper.generateStringWithLength(10)
    );
    await createUnitPage.clickNextBtn();
    await expect(createUnitPage.getNazvaOgolochenyaInput()).toHaveCSS(
      "border",
      AlertMsgColors.BORDERGRAY
    );
    await expect(createUnitPage.getErrorMessage()).not.toBeVisible();
  });

  test("TC-298 Verify vehicle manufacturer section", async ({
    createUnitPage,
    randomValueHelper,
  }) => {
    await expect(createUnitPage.getSelectManufacturerTitle()).toBeVisible();
    await expect(createUnitPage.getSelectManufacturerTitle()).toHaveText(
      /^Виробник транспортного засобу.*\*$/
    );
    await expect(createUnitPage.getSelectedManufacturerInput()).toHaveAttribute(
      "placeholder",
      "Введіть виробника транспортного засобу"
    );
    await createUnitPage.clickNextBtn();
    await expect(createUnitPage.getSelectedManufacturerError()).toHaveText(
      "Це поле обов’язкове"
    );
    await expect(createUnitPage.getSelectedManufacturerError()).toHaveCSS(
      "color",
      AlertMsgColors.RED
    );
    await expect(createUnitPage.getSeletedManufacturerBorder()).toHaveCSS(
      "border",
      AlertMsgColors.BORDERRED
    );
    await createUnitPage.typeSelectedManufacturerInput("A");
    await expect(
      createUnitPage.getSelectedManufacturerDropdownWrapper()
    ).toBeVisible();
    await createUnitPage.clearSelectedManufacturerInput();
    await createUnitPage.typeSelectedManufacturerInput("АТЭК");
    await expect(createUnitPage.getSelectedManufacturerOptions()).toHaveText(
      "АТЭК"
    );
    await createUnitPage.clearSelectedManufacturerInput();
    await createUnitPage.typeSelectedManufacturerInput("Атэк");
    await expect(createUnitPage.getSelectedManufacturerOptions()).toHaveText(
      "АТЭК"
    );
    await createUnitPage.clearSelectedManufacturerInput();
    await createUnitPage.typeSelectedManufacturerInput(" ");
    expect(
      await createUnitPage.getSelectedManufacturerInputValue()
    ).toHaveLength(0);
    await expect(
      createUnitPage.getSelectedManufacturerDropdownWrapper()
    ).not.toBeVisible();
    await createUnitPage.typeSelectedManufacturerInput("<>{};^");
    expect(
      await createUnitPage.getSelectedManufacturerInputValue()
    ).toHaveLength(0);
    await expect(
      createUnitPage.getSelectedManufacturerDropdownWrapper()
    ).not.toBeVisible();
    await createUnitPage.typeSelectedManufacturerInput("123456789");
    await expect(
      createUnitPage.getSelectedManufacuredNotFoundResult()
    ).toHaveText(
      "На жаль, виробника “123456789“ не знайдено в нашій базі. Щоб додати виробника - зв`яжіться із службою підтримки9 / 100"
    );
    await createUnitPage.clearSelectedManufacturerInput();
    await createUnitPage.typeSelectedManufacturerInput(
      randomValueHelper.generateStringWithLength(101)
    );
    expect(
      await createUnitPage.getSelectedManufacturerInputValue()
    ).toHaveLength(100);
    await createUnitPage.clearSelectedManufacturerInput();
    await createUnitPage.typeSelectedManufacturerInput("Abc");
    await createUnitPage.clickSelectedManufacturerOptions();
    await expect(createUnitPage.getSelectedOptionsInput()).toHaveText("ABC");
    await createUnitPage.clickCloseOptionsBtn();
    await createUnitPage.typeSelectedManufacturerInput("Abc");
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
    await expect(createUnitPage.getNazvaModeliTitle()).toBeVisible();
    await expect(createUnitPage.getNazvaModeliTitle()).toHaveText(
      "Назва моделі"
    );
    await expect(createUnitPage.getNazvaModeliInput()).toHaveAttribute(
      "placeholder",
      "Введіть назву моделі"
    );
    for (const invalidVariants of createUnitPage.getListOfInvalidVariant()) {
      await createUnitPage.typeNazvaModeliInput(invalidVariants);
      await expect(createUnitPage.getErrorMessage()).toHaveText(
        "У назві моделі може бути не більше 15 символів"
      );
      await expect(createUnitPage.getNazvaModeliInput()).toHaveCSS(
        "border-color",
        AlertMsgColors.RED
      );
      await createUnitPage.clearNazvaModeliInput();
    }

    for (const invalidSymbols of createUnitPage.getListOfInvalidSymbols(true)) {
      await createUnitPage.typeNazvaModeliInput(invalidSymbols);
      expect(await createUnitPage.getNazvaModeliInputValue()).toHaveLength(0);
    }
    await createUnitPage.typeNazvaModeliInput(
      randomValueHelper.generateStringWithLength(15)
    );
    await expect(createUnitPage.getErrorMessage()).not.toBeVisible();
  });

  test("TC-317 Verify technical characteristics section", async ({
    createUnitPage,
    randomValueHelper,
  }) => {
    test.setTimeout(200000);
    await expect(
      createUnitPage.getTechnicalCharacteristicTitle()
    ).toBeVisible();
    await expect(createUnitPage.getTechnicalCharacteristicTitle()).toHaveText(
      "Технічні характеристики"
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
      "Детальний опис"
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
    await expect(createUnitPage.getAddressSelectionTitle()).toBeVisible();
    await expect(createUnitPage.getAddressSelectionTitle()).toHaveText(
      /^Місце розташування технічного засобу.*\*$/
    );
    await expect(createUnitPage.getMapLabel()).toHaveText("Виберіть на мапі");
    await expect(createUnitPage.getMapLabel()).not.toHaveClass(
      "AddressSelectionBlock_mapLabelChosen__PBJoF"
    );
    await createUnitPage.clickNextBtn();
    await expect(createUnitPage.getMapLabel()).toHaveCSS(
      "border",
      AlertMsgColors.BORDERRED
    );
    await expect(createUnitPage.getAddressSelectionError()).toHaveText(
      "Виберіть коректне місце на мапі України"
    );
    await expect(createUnitPage.getAddressSelectionError()).toHaveCSS(
      "color",
      AlertMsgColors.RED
    );
    await createUnitPage.clickAddressSelectionBtn();
    await expect(createUnitPage.getMapPopUpWrapper()).toBeVisible();
    await expect(createUnitPage.getMapPopUpTitle()).toHaveText(
      "Техніка на мапі"
    );
    await expect(createUnitPage.getMapPopUpCloseBtn()).toBeVisible();
    await expect(createUnitPage.getMapPopUpAddress()).toHaveText(
      "Київ, вулиця Володимирська 21/20 Україна, Київська область"
    );
    await createUnitPage.clickMapPopUpSubmitChoice();
    await expect(createUnitPage.getMapPopUpWrapper()).not.toBeVisible();
    await expect(createUnitPage.getMapLabel()).toHaveText(
      "Київ, вулиця Володимирська 21/20 Україна, Київська область"
    );
    await createUnitPage.clickAddressSelectionBtn();
    const { x, y } = await createUnitPage.getMapPopupBoundingBox();
    await createUnitPage.getMapPopUp().waitFor({ state: "visible" });
    await createUnitPage.clickOnThePopUpMap(x, y);
    await createUnitPage.page.waitForTimeout(500);
    await createUnitPage.getMapPopUpAddressText();
    const addressText = await createUnitPage.getMapPopUpAddressText();
    await createUnitPage.clickMapPopUpSubmitChoice();
    await expect(createUnitPage.getMapLabel()).toHaveText(addressText ?? "");
    await expect(createUnitPage.getMapPopUpWrapper()).not.toBeVisible();
  });

  test("TC-326 Verify 'Скасувати'  button", async ({
    createUnitPage,
    mainPage,
  }) => {
    await expect(createUnitPage.getPreventBtn()).toHaveText("Скасувати");
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
    await expect(createUnitPage.getNextBtn()).toHaveText("Далі");
    await createUnitPage.clickNextBtn();
    for (const requiredFields of createUnitPage.getListOfLocatorRequiredFieldsError()) {
      await expect(requiredFields).toBeVisible();
    }
    await createUnitPage.clickCategorySelectBtn();
    await createUnitPage.clickFirstCategoryLocator(0);
    await createUnitPage.clickSecondCategoryLocator(0);
    await createUnitPage.clickThirdCategoryLocator(0);
    await createUnitPage.typeNazvaOgolochenyaInput(
      randomValueHelper.generateStringWithLength(10)
    );
    await createUnitPage.typeSelectedManufacturerInput("Abc");
    await createUnitPage.clickSelectedManufacturerOptions();
    await createUnitPage.clickAddressSelectionBtn();
    const { x, y } = await createUnitPage.getMapPopupBoundingBox();
    await createUnitPage.getMapPopUp().waitFor({ state: "visible" });
    await createUnitPage.clickOnThePopUpMap(x, y);
    await createUnitPage.clickMapPopUpSubmitChoice();
    await createUnitPage.clickNextBtn();
    await expect(createUnitPage.getCategoryBodyTitle()).toHaveText(
      "Створити оголошення"
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
        await expect(createUnitPage.getCategoryTabBtn(i)).toHaveAttribute(
          "aria-selected",
          "false"
        );
      }
    }
  });
});
