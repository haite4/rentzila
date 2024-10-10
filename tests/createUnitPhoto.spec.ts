import { expect } from "@playwright/test";
import { test } from "../fixtures/fixtures";
import { Endpoints } from "../constants/enums_endpoints.constant";
import { AlertMsgColors } from "../constants/enums_colors.constant";
import general_msg from "../data/general_msg.json";
import error_msg from "../data/errors_msg.json";

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
      await createUnitPage.typeAdvertisementNameInput(
        randomValueHelper.generateStringWithLength(10)
      );
      await createUnitPage.typeSelectedManufacturerInput(
        general_msg.abcLowerCase
      );
      await createUnitPage.clickSelectedManufacturerOptions();
      await createUnitPage.clickAddressSelectionBtn();
      await createUnitPage.page.waitForTimeout(1500);
      await createUnitPage.clickMapPopUpSubmitChoice();
      await createUnitPage.clickNextBtn();
    }
  );
  test("TC-384 Verify same images uploading", async ({ createUnitPage }) => {
    for (const action of createUnitPage.getActionsList()) {
      for (let i = 0; i < 2; i++) {
        await createUnitPage.fileChoser("images", "jpgimage.jpg", i);
      }

      await expect(createUnitPage.getErrorPopUp()).toBeVisible();
      switch (action) {
        case "clickCrossBtn":
          await expect(createUnitPage.getErrorPopUp()).toHaveText(
            error_msg.duplicateFileDownloadError
          );
          await createUnitPage.clickClosePopUpBtn();
          await expect(createUnitPage.getErrorPopUp()).not.toBeVisible();
          expect(await createUnitPage.countDraggableElements()).toBe(1);
          await createUnitPage.deleteUploadedImage();
          break;
        case "clickSaveBtn":
          await expect(createUnitPage.getPopUpBtn()).toHaveText(
            general_msg.understood
          );
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
    for (const action of createUnitPage.getActionsList()) {
      await createUnitPage.fileChoser("files", "uploading_invalid_type.txt");
      await expect(createUnitPage.getErrorPopUp()).toBeVisible();
      switch (action) {
        case "clickCrossBtn":
          await expect(createUnitPage.getErrorPopUp()).toHaveText(
            error_msg.unsupportedImageFormatError
          );
          await createUnitPage.clickClosePopUpBtn();
          await expect(createUnitPage.getErrorPopUp()).not.toBeVisible();
          expect(await createUnitPage.countDraggableElements()).toBe(0);
          break;
        case "clickSaveBtn":
          await expect(createUnitPage.getPopUpBtn()).toHaveText(
            general_msg.understood
          );
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
    for (const action of createUnitPage.getActionsList()) {
      await createUnitPage.fileChoser("images", "invalid_size_30mb.jpg");
      await expect(createUnitPage.getErrorPopUp()).toBeVisible();
      switch (action) {
        case "clickCrossBtn":
          await expect(createUnitPage.getErrorPopUp()).toHaveText(
            error_msg.unsupportedImageFormatError
          );
          await createUnitPage.clickClosePopUpBtn();
          await expect(createUnitPage.getErrorPopUp()).not.toBeVisible();
          expect(await createUnitPage.countDraggableElements()).toBe(0);
          break;
        case "clickSaveBtn":
          await expect(createUnitPage.getPopUpBtn()).toHaveText(
            general_msg.understood
          );
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
    await expect(createUnitPage.getPrevioudBtn()).toHaveText(general_msg.back);
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
    await expect(createUnitPage.getAdvertisementInput()).toBeVisible();
    await expect(
      createUnitPage.getSelectWithSearchManufacturer()
    ).toBeVisible();
    await expect(createUnitPage.getNameModelInput()).toBeVisible();
    await expect(
      createUnitPage.getTechnicalCharacteristicTextArea()
    ).toBeVisible();
    await expect(createUnitPage.getDetailedDescriptionTextArea()).toBeVisible();
    await expect(createUnitPage.getMapLabel()).toBeVisible();
  });

  test("TC-393 Verify 'Далі' button", async ({ createUnitPage }) => {
    await expect(createUnitPage.getNextBtn()).toHaveText(general_msg.next);
    await createUnitPage.clickNextBtn();
    await expect(createUnitPage.getPhotoSectionClue()).toHaveCSS(
      "color",
      AlertMsgColors.RED
    );

    await createUnitPage.fileChoser("images", "jpgimage.jpg");
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
      general_msg.addPhotosInstruction
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

    for (let i = 0; i < 12; i++) {
      await createUnitPage.fileChoser(
        "images",
        createUnitPage.getArrayImages()[i],
        i
      );
    }
    await expect(createUnitPage.getMainImageLabel()).toHaveText(
      general_msg.main
    );
  });

  test("TC-594 Verify image moving", async ({
    createUnitPage,
    randomValueHelper,
  }) => {
    for (let i = 0; i < 12; i++) {
      await createUnitPage.fileChoser(
        "images",
        createUnitPage.getArrayImages()[i],
        i
      );
    }
    await createUnitPage
      .getImageBlockByindex(
        randomValueHelper.randomIndexForImagesArray(
          createUnitPage.getArrayImages()
        )
      )
      .dragTo(createUnitPage.getImageBlockByindex(0));
  });

  test("TC-595 Verify image deleting", async ({ createUnitPage }) => {
    for (let i = 0; i < 12; i++) {
      await createUnitPage.fileChoser(
        "images",
        createUnitPage.getArrayImages()[i],
        i
      );
    }

    for (let i = 0; i < 12; i++) {
      await createUnitPage.hoverOnImageBlockByIndex(i, 1000);
      await expect(createUnitPage.getDeleteImageByIndex(i)).toHaveCSS(
        "justify-content",
        "center"
      );
    }

    for (let i = 11; i >= 0; i--) {
      await createUnitPage.hoverOnImageBlockByIndex(i, 1000);
      await createUnitPage.clickDeleteIconWrapper(i);
    }

    await expect(createUnitPage.getImageBlock()).toHaveCount(4);
  });
});
