import { expect } from "@playwright/test";
import { test } from "../fixtures/fixtures";
import { AlertMsgColors } from "../constants/enums_colors.constant";
import error_msg from "../data/errors_msg.json"
import success_msg from "../data/success_msg.json"

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
      error_msg.fieldCantBeEmpty
    );
    await expect(mainPage.getConsultingInputName()).toHaveCSS(
      "border-bottom-color",
      AlertMsgColors.RED
    );
    await expect(mainPage.getPhoneNumberFieldCannotBeEmptyError()).toHaveText(
      error_msg.fieldCantBeEmpty
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
      error_msg.phoneNotvalidated
    );
    await mainPage.clearConsultingInputPhoneNumber();

    await mainPage.fillConsultingInputPhoneNumber(
      process.env.VALID_PHONE_NUMBER ?? ""
    );

    const [dialog] = await Promise.all([
      mainPage.page.waitForEvent("dialog"),
      mainPage.clickOrderConsultationBtn(),
    ]);
    expect(dialog.message()).toBe(success_msg.successSubmittedApplication);
    await dialog.accept();
    expect(
      await apiHelper.getListOfFeedback(process.env.VALID_PHONE_NUMBER ?? "")
    ).toBe(true);
  });
});
