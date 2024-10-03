import { expect } from "@playwright/test";
import { test } from "../fixtures/fixtures";
import { Endpoints } from "../constants/enums_endpoints.constant";
import path from "path";
import { AlertMsgColors } from "../constants/enums_colors.constant";

test.describe("test create unit photo section", () => {
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
      await createUnitPage.typeNazvaOgolochenyaInput(
        randomValueHelper.generateStringWithLength(10)
      );
      await createUnitPage.typeSelectedManufacturerInput("Abc");
      await createUnitPage.clickSelectedManufacturerOptions();
      await createUnitPage.clickAddressSelectionBtn();
      await createUnitPage.getMapPopUp().waitFor({ state: "visible" });
      await createUnitPage.clickMapPopUpSubmitChoice();
      await createUnitPage.getNextBtn().waitFor({ state: "visible" });
      await createUnitPage.clickNextBtn();
    }
  );
  test("TC-384 Verify same images uploading", async ({ createUnitPage }) => {
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
  }) => {
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
  }) => {
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

  test("TC-390 Verify 'Назад' button", async ({ createUnitPage }) => {
    await expect(createUnitPage.getPrevioudBtn()).toBeVisible();
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

  test("TC-393 Verify 'Далі' button", async ({ createUnitPage }) => {
    await expect(createUnitPage.getNextBtn()).toHaveText("Далі");
    await createUnitPage.clickNextBtn();
    await expect(createUnitPage.getPhotoSectionClue()).toHaveCSS(
      "color",
      AlertMsgColors.RED
    );
    const fileChooserPromise = createUnitPage.page.waitForEvent("filechooser");
    await createUnitPage.clickImageBlock();
    const fileChooser = await fileChooserPromise;
    await createUnitPage.setElementFilesinPhotoSection(
      fileChooser,
      path.join(__dirname, "..", "data", "images", "jpgimage.jpg")
    );
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
    await expect(createUnitPage.getServiceUnitInput()).toBeVisible();
  });

  test("TC-593 Verify image uploading", async ({ createUnitPage }) => {
    await expect(createUnitPage.getPhotoSectionTitle()).toBeVisible();
    await expect(createUnitPage.getPhotoSectionTitle()).toHaveText(
      /^Фото технічного засобу.*\*$/
    );
    await expect(createUnitPage.getPhotoSectionClue()).toBeVisible();
    await expect(createUnitPage.getPhotoSectionClue()).toHaveText(
      "Додайте в оголошення від 1 до 12 фото технічного засобу розміром до 20 МВ у форматі .jpg, .jpeg, .png. Перше фото буде основним."
    );
    for (
      let i = 0;
      i < (await createUnitPage.getAllClickImageBlock()).length;
      i++
    ) {
      const fileChooserPromise =
        createUnitPage.page.waitForEvent("filechooser");
      await createUnitPage.clickImageBlock(i);
      await fileChooserPromise;
    }
    const arrayImages = [
      "1.jpg",
      "2.jpg",
      "3.jpg",
      "4.jpg",
      "5.jpg",
      "6.jpg",
      "7.jpg",
      "8.jpg",
      "9.jpg",
      "10.jpg",
      "11.jpg",
      "12.jpg",
    ];
    for (let i = 0; i < 12; i++) {
      const fileChooserPromise =
        createUnitPage.page.waitForEvent("filechooser");
      await createUnitPage.clickImageBlock(i);
      const fileChooser = await fileChooserPromise;
      await createUnitPage.setElementFilesinPhotoSection(
        fileChooser,
        path.join(__dirname, "..", "data", "images", arrayImages[i])
      );
    }
    await expect(createUnitPage.getMainImageLabel()).toHaveText("Головне");
  });

  test("TC-594 Verify image moving", async ({
    createUnitPage,
    randomValueHelper,
  }) => {
    const arrayImages = [
      "1.jpg",
      "2.jpg",
      "3.jpg",
      "4.jpg",
      "5.jpg",
      "6.jpg",
      "7.jpg",
      "8.jpg",
      "9.jpg",
      "10.jpg",
      "11.jpg",
      "12.jpg",
    ];
    for (let i = 0; i < 12; i++) {
      const fileChooserPromise =
        createUnitPage.page.waitForEvent("filechooser");
      await createUnitPage.clickImageBlock(i);
      const fileChooser = await fileChooserPromise;
      await createUnitPage.setElementFilesinPhotoSection(
        fileChooser,
        path.join(__dirname, "..", "data", "images", arrayImages[i])
      );
    }
    await createUnitPage
      .getImageBlockByindex(
        randomValueHelper.randomIndexForImagesArray(arrayImages)
      )
      .dragTo(createUnitPage.getImageBlockByindex(0));
  });

  test("TC-595 Verify image deleting", async ({ createUnitPage }) => {
    const arrayImages = [
      "1.jpg",
      "2.jpg",
      "3.jpg",
      "4.jpg",
      "5.jpg",
      "6.jpg",
      "7.jpg",
      "8.jpg",
      "9.jpg",
      "10.jpg",
      "11.jpg",
      "12.jpg",
    ];
    for (let i = 0; i < 12; i++) {
      const fileChooserPromise =
        createUnitPage.page.waitForEvent("filechooser");
      await createUnitPage.clickImageBlock(i);
      const fileChooser = await fileChooserPromise;
      await createUnitPage.setElementFilesinPhotoSection(
        fileChooser,
        path.join(__dirname, "..", "data", "images", arrayImages[i])
      );
    }

    for (let i = 0; i < 12; i++) {
      await createUnitPage.hoverOnImageBlockByIndex(i);
      await expect(createUnitPage.getDeleteImageByIndex(i)).toHaveCSS(
        "justify-content",
        "center"
      );
    }

    for (let i = 11; i >= 0; i--) {
      await createUnitPage.hoverOnImageBlockByIndex(i);
      await createUnitPage.clickDeleteIconWrapper(i);
    }

    await expect(createUnitPage.getImageBlock()).toHaveCount(4);
  });
});
