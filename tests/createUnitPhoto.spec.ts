import { expect } from "@playwright/test";
import { test } from "../fixtures/fixtures";
import { Endpoints } from "../constants/enums_endpoints.constant";
import path from "path";

test.describe("test create unit photo section", () => {
  test.beforeEach(async ({ signInHelper, signinPage }) => {
    await signinPage.open(Endpoints.CREATEUNIT);
    await signInHelper.login(
      process.env.USER_EMAIL ?? "",
      process.env.USER_PASSWORD ?? ""
    );
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

  test("TC-405 Verify uploading of invalid size file", async ({
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
        path.join(__dirname, "..", "data", "images", "invalid_size_30mb.jpg")
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
    await expect(
      createUnitPage.getSelectWithSearchManufacturer()
    ).toBeVisible();
    await expect(createUnitPage.getNazvaModeliInput()).toBeVisible();
    await expect(
      createUnitPage.getTechnicalCharacteristicTextArea()
    ).toBeVisible();
    await expect(createUnitPage.getDetailedDescriptionTextArea()).toBeVisible();
    await expect(createUnitPage.getMapLabel()).toBeVisible();
  });
});
