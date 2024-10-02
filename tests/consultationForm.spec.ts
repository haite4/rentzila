import { expect } from "@playwright/test";
import { test } from "../fixtures/fixtures";
import { AlertMsgColors } from "../constants/enums_colors.constant";

test.describe("Consulting form functionality", () => {
  test("TC-226: Verify 'У Вас залишилися питання?' form", async ({
    mainPage,
    apiHelper,
    randomValueHelper,
  }) => {
    await mainPage.open();
    await mainPage.scrollDownToFooter();
    await expect(mainPage.getYouStillHaveQuestion()).toBeVisible();
    await mainPage.clickOrderConsultationBtn();
    await expect(mainPage.getNameFieldCannotBeEmptyError()).toHaveText(
      "Поле не може бути порожнім"
    );
    await expect(mainPage.getConsultingInputName()).toHaveCSS(
      "border-bottom-color",
      AlertMsgColors.RED
    );
    await expect(mainPage.getPhoneNumberFieldCannotBeEmptyError()).toHaveText(
      "Поле не може бути порожнім"
    );
    await expect(mainPage.getConsultingInputPhoneNumber()).toHaveCSS(
      "border-bottom-color",
      AlertMsgColors.RED
    );
    await mainPage.fillConsultingInputName(randomValueHelper.randomName());
    await mainPage.clickOrderConsultationBtn();
    await expect(mainPage.getConsultingInputName()).toHaveCSS(
      "border-bottom-color",
      AlertMsgColors.BLACK
    );
    await expect(mainPage.getConsultingInputPhoneNumber()).toHaveCSS(
      "border-bottom-color",
      AlertMsgColors.RED
    );
    await mainPage.clickOnPhoneNumberInput();
    await expect(mainPage.getConsultingInputPhoneNumber()).toHaveAttribute(
      "value",
      "+380"
    );
    await mainPage.fillConsultingInputPhoneNumber(
      process.env.VALID_PHONE_NUMBER ?? ""
    );
    await mainPage.clearConsultingInputName();
    await mainPage.clickOrderConsultationBtn();
    await expect(mainPage.getConsultingInputName()).toHaveCSS(
      "border-bottom-color",
      AlertMsgColors.RED
    );
    await expect(mainPage.getConsultingInputPhoneNumber()).toHaveCSS(
      "border-bottom-color",
      AlertMsgColors.BLACK
    );
    await mainPage.fillConsultingInputName(randomValueHelper.randomName());
    await mainPage.clearConsultingInputPhoneNumber();

    await mainPage.fillConsultingInputPhoneNumber(
      randomValueHelper.generateIncorrectPhoneNumber()
    );
    await mainPage.clickOrderConsultationBtn();
    await expect(mainPage.getConsultingInputName()).toHaveCSS(
      "border-bottom-color",
      AlertMsgColors.BLACK
    );
    await expect(mainPage.getConsultingInputPhoneNumber()).toHaveCSS(
      "border-bottom-color",
      AlertMsgColors.RED
    );
    await expect(mainPage.getValidateFieldFailure()).toHaveText(
      "Телефон не пройшов валідацію"
    );
    await mainPage.clearConsultingInputPhoneNumber();

    await mainPage.fillConsultingInputPhoneNumber(
      process.env.VALID_PHONE_NUMBER ?? ""
    );

    const [dialog] = await Promise.all([
      mainPage.page.waitForEvent("dialog"),
      mainPage.clickOrderConsultationBtn(),
    ]);
    expect(dialog.message()).toBe("Ви успішно відправили заявку");
    await dialog.accept();
    expect(
      await apiHelper.getListOfFeedback(process.env.VALID_PHONE_NUMBER ?? "")
    ).toBe(true);
  });
});
