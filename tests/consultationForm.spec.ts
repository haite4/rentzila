import { expect } from "@playwright/test";
import { test } from "../fixtures/fixtures";
import test_data from "../data/test_data.json";

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
      "rgb(247, 56, 89)"
    );
    await expect(mainPage.getPhoneNumberFieldCannotBeEmptyError()).toHaveText(
      "Поле не може бути порожнім"
    );
    await expect(mainPage.getConsultingInputPhoneNumber()).toHaveCSS(
      "border-bottom-color",
      "rgb(247, 56, 89)"
    );
    await mainPage.fillConsultingInputName(randomValueHelper.randomName());
    await mainPage.clickOrderConsultationBtn();
    await expect(mainPage.getConsultingInputName()).toHaveCSS(
      "border-bottom-color",
      "rgb(0, 0, 0)"
    );
    await expect(mainPage.getConsultingInputPhoneNumber()).toHaveCSS(
      "border-bottom-color",
      "rgb(247, 56, 89)"
    );
    await mainPage.clickOnPhoneNumberInput();
    await expect(mainPage.getConsultingInputPhoneNumber()).toHaveAttribute(
      "value",
      "+380"
    );
    await mainPage.fillConsultingInputPhoneNumber(test_data.phone_number);
    await mainPage.clearConsultingInputName();
    await mainPage.clickOrderConsultationBtn();
    await expect(mainPage.getConsultingInputName()).toHaveCSS(
      "border-bottom-color",
      "rgb(247, 56, 89)"
    );
    await expect(mainPage.getConsultingInputPhoneNumber()).toHaveCSS(
      "border-bottom-color",
      "rgb(0, 0, 0)"
    );
    await mainPage.fillConsultingInputName(randomValueHelper.randomName());
    await mainPage.clearConsultingInputPhoneNumber();

    for (let i = 0; i < 2; i++) {
      await mainPage.fillConsultingInputPhoneNumber(
        randomValueHelper.generateIncorrectPhoneNumber()
      );
      await mainPage.clickOrderConsultationBtn();
      await expect(mainPage.getConsultingInputName()).toHaveCSS(
        "border-bottom-color",
        "rgb(0, 0, 0)"
      );
      await expect(mainPage.getConsultingInputPhoneNumber()).toHaveCSS(
        "border-bottom-color",
        "rgb(247, 56, 89)"
      );
      await expect(mainPage.getValidateFieldFailure()).toHaveText(
        "Телефон не пройшов валідацію"
      );
      await mainPage.clearConsultingInputPhoneNumber();
    }

    await mainPage.fillConsultingInputPhoneNumber(test_data.phone_number);

    const [dialog] = await Promise.all([
      mainPage.page.waitForEvent("dialog"),
      mainPage.clickOrderConsultationBtn(),
    ]);
    expect(dialog.message()).toBe("Ви успішно відправили заявку");
    await dialog.accept();
    expect(
      apiHelper.isPhoneNumbePresent(
        await apiHelper.getListOfFeedback(),
        test_data.phone_number
      )
    ).toBe(true);
  });
});
