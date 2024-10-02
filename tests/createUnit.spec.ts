import { expect } from "@playwright/test";
import { test } from "../fixtures/fixtures";
import valid_creds from "../data/valid_creds.json";
import { Endpoints } from "../helpers/enums_endpoints";
import { AlertMsgColors } from "../helpers/enums_colors";
import path from "path";


require("dotenv").config();

test.describe("Create unit functionality", () => {
  test.beforeEach(async ({ signInHelper, signinPage }) => {
    await signinPage.open(Endpoints.CreateUnit);
    await signInHelper.login(valid_creds.email, valid_creds.password);
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
      AlertMsgColors.BorderRed
    );
    await expect(createUnitPage.getCategorySelectErrorText()).toHaveCSS(
      "color",
      AlertMsgColors.Red
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
      AlertMsgColors.Red
    );
    await expect(createUnitPage.getErrorMessage()).toHaveText(
      "Це поле обов’язкове"
    );
    await expect(createUnitPage.getErrorMessage()).toHaveCSS(
      "color",
      AlertMsgColors.Red
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
      AlertMsgColors.Red
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
      AlertMsgColors.Red
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
      AlertMsgColors.BorderGray
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
      AlertMsgColors.Red
    );
    await expect(createUnitPage.getSeletedManufacturerBorder()).toHaveCSS(
      "border",
      AlertMsgColors.BorderRed
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
        AlertMsgColors.Red
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
      AlertMsgColors.BorderRed
    );
    await expect(createUnitPage.getAddressSelectionError()).toHaveText(
      "Виберіть коректне місце на мапі України"
    );
    await expect(createUnitPage.getAddressSelectionError()).toHaveCSS(
      "color",
      AlertMsgColors.Red
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

  test("TC-384 Verify same images uploading", async ({
    createUnitPage,
    randomValueHelper,
  }) => {
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
    const actions = ["clickCrossBtn", "clickSaveBtn", "clickOutsidePopUp"];

    for (const action of actions) {
      for (let i = 0; i < 2; i++) {
        const fileChooserPromise =
          createUnitPage.page.waitForEvent("filechooser");
        await createUnitPage.clickImageBlock(i);
        const fileChooser = await fileChooserPromise;
        await createUnitPage.setElementFilesinPhotoSection(
          fileChooser,
          path.join(__dirname, "..", "data", "images", "jpgimage.jpg")
        );
      }

      await expect(createUnitPage.getErrorPopUp()).toBeVisible();
      switch (action) {
        case "clickCrossBtn":
          await expect(createUnitPage.getErrorPopUp()).toHaveText(
            "Ви не можете завантажити двічі один файл."
          );
          await createUnitPage.clickClosePopUpBtn();
          await expect(createUnitPage.getErrorPopUp()).not.toBeVisible();
          expect(await createUnitPage.countDraggableElements()).toBe(1);
          await createUnitPage.deleteUploadedImage();
          break;
        case "clickSaveBtn":
          await expect(createUnitPage.getPopUpBtn()).toHaveText("Зрозуміло");
          await createUnitPage.clickSubmitPopUpBtn();
          await expect(createUnitPage.getErrorPopUp()).not.toBeVisible();
          expect(await createUnitPage.countDraggableElements()).toBe(1);
          await createUnitPage.deleteUploadedImage();
          break;
        case "clickOutsidePopUp":
          await createUnitPage.clickOutSidePhotoPopUp();
          await expect(createUnitPage.getErrorPopUp()).not.toBeVisible();
          expect(await createUnitPage.countDraggableElements()).toBe(1);
          await createUnitPage.deleteUploadedImage();
          break;
      }
    }
  });

  test("TC-401 Verify uploading of invalid file type", async ({
    createUnitPage,
    randomValueHelper,
  }) => {
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
    const actions = ["clickCrossBtn", "clickSaveBtn", "clickOutsidePopUp"];
    for (const action of actions) {
      const fileChooserPromise =
        createUnitPage.page.waitForEvent("filechooser");
      await createUnitPage.clickImageBlock();
      const fileChooser = await fileChooserPromise;
      await createUnitPage.setElementFilesinPhotoSection(
        fileChooser,
        path.join(__dirname, "..", "data", "files", "text.txt")
      );
      await expect(createUnitPage.getErrorPopUp()).toBeVisible();
      switch (action) {
        case "clickCrossBtn":
          await expect(createUnitPage.getErrorPopUp()).toHaveText(
            "Формат зображення не підтримується. Допустимі формати: .jpg, .jpeg, .png. Ви не можете завантажити файл більше 20 МВ."
          );
          await createUnitPage.clickClosePopUpBtn();
          await expect(createUnitPage.getErrorPopUp()).not.toBeVisible();
          expect(await createUnitPage.countDraggableElements()).toBe(0);
          break;
        case "clickSaveBtn":
          await expect(createUnitPage.getPopUpBtn()).toHaveText("Зрозуміло");
          await createUnitPage.clickSubmitPopUpBtn();
          await expect(createUnitPage.getErrorPopUp()).not.toBeVisible();
          expect(await createUnitPage.countDraggableElements()).toBe(0);
          break;
        case "clickOutsidePopUp":
          await createUnitPage.clickOutSidePhotoPopUp();
          await expect(createUnitPage.getErrorPopUp()).not.toBeVisible();
          expect(await createUnitPage.countDraggableElements()).toBe(0);
          break;
      }
    }
  });

  test("TC-405 Verify uploading of invalid size file", async({createUnitPage, randomValueHelper}) => {
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
    const actions = ["clickCrossBtn", "clickSaveBtn", "clickOutsidePopUp"];
    for (const action of actions) {
      const fileChooserPromise =
        createUnitPage.page.waitForEvent("filechooser");
      await createUnitPage.clickImageBlock();
      const fileChooser = await fileChooserPromise;
      await createUnitPage.setElementFilesinPhotoSection(
        fileChooser,
        path.join(__dirname, "..", "data", "images", "invalid_size_30mb.jpg")
      );
      await expect(createUnitPage.getErrorPopUp()).toBeVisible();
      switch(action){
        case "clickCrossBtn":
          await expect(createUnitPage.getErrorPopUp()).toHaveText(
            "Формат зображення не підтримується. Допустимі формати: .jpg, .jpeg, .png. Ви не можете завантажити файл більше 20 МВ."
          );
          await createUnitPage.clickClosePopUpBtn();
          await expect(createUnitPage.getErrorPopUp()).not.toBeVisible();
          expect(await createUnitPage.countDraggableElements()).toBe(0);
          break;
        case "clickSaveBtn":
          await expect(createUnitPage.getPopUpBtn()).toHaveText("Зрозуміло");
          await createUnitPage.clickSubmitPopUpBtn();
          await expect(createUnitPage.getErrorPopUp()).not.toBeVisible();
          expect(await createUnitPage.countDraggableElements()).toBe(0);
          break;
        case "clickOutsidePopUp":
          await createUnitPage.clickOutSidePhotoPopUp();
          await expect(createUnitPage.getErrorPopUp()).not.toBeVisible();
          expect(await createUnitPage.countDraggableElements()).toBe(0);
          break;
      }
}})

test("TC-390 Verify 'Назад' button", async ({
  createUnitPage,
  randomValueHelper,
}) => {
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

  await expect(createUnitPage.getPrevioudBtn()).toHaveText("Назад");
  await createUnitPage.clickPreviousBtn();

  for (let i = 0; i < (await createUnitPage.categoryTabTitlesCount()); i++) {
    expect(await createUnitPage.getCategorysTabTitlesLocatorText(i)).toBe(
      createUnitPage.getListOfCategorysTabTitle()[i]
    );

    if (i === 0) {
      await expect(createUnitPage.getCategoryTabBtn(0)).toHaveAttribute(
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

  await expect(createUnitPage.getCategorySelectContent()).toBeVisible();
  await expect(createUnitPage.getNazvaOgolochenyaInput()).toBeVisible();
  await expect(createUnitPage.getSelectWithSearchManufacturer()).toBeVisible();
  await expect(createUnitPage.getNazvaModeliInput()).toBeVisible();
  await expect(
    createUnitPage.getTechnicalCharacteristicTextArea()
  ).toBeVisible();
  await expect(createUnitPage.getDetailedDescriptionTextArea()).toBeVisible();
  await expect(createUnitPage.getMapLabel()).toBeVisible();
});
});
