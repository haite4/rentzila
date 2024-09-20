import { expect } from "@playwright/test";
import { test } from "../fixtures/fixtures";
import endpoints from "../data/endpoints.json";
import user_creds from "../data/user_creds.json";

test.describe("Create unit functionality", () => {
  test.beforeEach(async ({ signInHelper, signinPage }) => {
    await signinPage.open(endpoints.createUnit);
    await signInHelper.login(user_creds.email, user_creds.password);
  });

  test("TC-296 Verify category (Категорія) section", async ({
    createUnitPage,
  }) => {
    test.setTimeout(120000);
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
      "0.834783px solid rgb(247, 56, 89)"
    );
    await expect(createUnitPage.getCategorySelectErrorText()).toHaveCSS(
      "color",
      "rgb(247, 56, 89)"
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
    await createUnitPage.clickOutsidePopUp();
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
        expect(await createUnitPage.getCategoryTabBtn(0)).toHaveAttribute(
          "aria-selected",
          "true"
        );
      } else {
        expect(await createUnitPage.getCategoryTabBtn(i)).toHaveAttribute(
          "aria-selected",
          "false"
        );
      }
    }
  });

});
