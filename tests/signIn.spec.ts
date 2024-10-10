import { expect } from "@playwright/test";
import { test } from "../fixtures/fixtures";
import { Endpoints } from "../constants/enums_endpoints.constant"
import { AlertMsgColors } from "../constants/enums_colors.constant"
import error_msg from "../data/errors_msg.json"

test.describe("Auth page testing", () => {
  test.beforeEach(async ({ signinPage }) => {
    await signinPage.open();
    await signinPage.clickHeaderAuthBtn();
  });
  test("TC-200 Authorization with empty fields", async ({ signinPage }) => {
    await signinPage.clickLoginSubmitBtn();
    await expect(signinPage.getLoginPopUp()).toBeVisible();
    await expect(signinPage.getEmailInpuErrorMsg()).toHaveText(
      error_msg.fieldCantBeEmpty
    );
    await expect(signinPage.getPasswordInputErrorMsgLocator()).toHaveText(
      error_msg.fieldCantBeEmpty
    );
    await expect(signinPage.getEmailInput()).toHaveCSS(
      "border",
      AlertMsgColors.BORDERRED
    );
    await expect(signinPage.getPasswordInput()).toHaveCSS(
      "border",
      AlertMsgColors.BORDERRED
    );
    await signinPage.fillLoginEmailInput(process.env.USER_EMAIL ?? "");
    await signinPage.clickLoginSubmitBtn();
    await expect(signinPage.getEmailInput()).toHaveCSS(
      "border",
      AlertMsgColors.BORDERGRAY
    );
    await expect(signinPage.getPasswordInputErrorMsgLocator()).toHaveText(
      error_msg.fieldCantBeEmpty
    );
    await expect(signinPage.getPasswordInput()).toHaveCSS(
      "border",
      AlertMsgColors.BORDERRED
    );
    await signinPage.clearEmailInput();
    await expect(signinPage.getEmailInput()).toHaveCSS(
      "border",
      AlertMsgColors.BORDERRED
    );
    await expect(signinPage.getEmailInpuErrorMsg()).toHaveText(
      error_msg.fieldCantBeEmpty
    );
    await signinPage.fillLoginPasswordInput(process.env.USER_PASSWORD ?? "");
    await signinPage.clickLoginSubmitBtn();
    await expect(signinPage.getPasswordInput()).toHaveCSS(
      "border",
      AlertMsgColors.BORDERGRAY
    );
  });

  test("TC-201 Authorization with valid email and password", async ({
    signinPage,
  }) => {
      await signinPage.fillLoginEmailInput(process.env.USER_EMAIL ?? "");
      await expect(signinPage.getEmailInput()).toHaveValue(
        process.env.USER_EMAIL ?? ""
      );
      await signinPage.fillLoginPasswordInput(process.env.USER_PASSWORD ?? "");
      await expect(signinPage.getPasswordInput()).toHaveValue(
        process.env.USER_PASSWORD ?? ""
      );
      await signinPage.clickHiddenIcon();
      await expect(signinPage.getPasswordInput()).toHaveAttribute(
        "type",
        "text"
      );
      await signinPage.clickHiddenIcon();
      await expect(signinPage.getPasswordInput()).toHaveAttribute(
        "type",
        "password"
      );
      await signinPage.randomSubmitAction();
      await expect(signinPage.page).toHaveURL(process.env.BASE_URL ?? "");
      await signinPage.clickAvatarBlock();
      await expect(signinPage.getDropDownMenuContainer()).toBeVisible();
      expect(await signinPage.getProfileDropdownEmailText()).toBe(
        process.env.USER_EMAIL ?? ""
      );
      await signinPage.clickLogoutBtn();
      await signinPage.clickHeaderAuthBtn();
  });

  test("TC-202 Authorization with valid phone and password", async ({
    signinPage,
    randomValueHelper
  }) => {
    for (const phoneNumber of randomValueHelper.validPhoneNumberOptions()) {
      await signinPage.fillLoginEmailInput(phoneNumber);
      await expect(signinPage.getEmailInput()).toHaveCSS(
        "border",
        AlertMsgColors.BORDERGRAY
      );
      await signinPage.fillLoginPasswordInput(process.env.ADMIN_PASSWORD ?? "");
      await expect(signinPage.getPasswordInput()).toHaveCSS(
        "border",
        AlertMsgColors.BORDERGRAY
      );
      await signinPage.clickLoginSubmitBtn();
      await expect(signinPage.page).toHaveURL(process.env.BASE_URL ?? "");
      await signinPage.clickAvatarBlock();
      await expect(signinPage.getDropDownMenuContainer()).toBeVisible();
      await signinPage.clickProfileBtn();
      await expect(signinPage.page).toHaveURL(`${process.env.BASE_URL}${Endpoints.PROFILE}`);
      await expect(signinPage.getMobileInput()).toBeVisible();
      expect(await signinPage.getMobileValue()).toBe(
        process.env.ADMIN_PHONE_NUMBER
      );
      await signinPage.clickLogoutBtnOnTheProfile();
      await signinPage.clickHeaderAuthBtn();
    }
  });

  test("TC-207 Authorization with invalid phone", async ({ signinPage, randomValueHelper}) => {
    for (const invalidPhoneNumber of randomValueHelper.invalidPhoneNumberOptions()) {
      await signinPage.fillLoginPasswordInput(process.env.ADMIN_PASSWORD ?? "");
      await signinPage.fillLoginEmailInput(invalidPhoneNumber);
      await signinPage.clickLoginSubmitBtn();
      await expect(signinPage.getEmailInpuErrorMsg()).toHaveText(
        error_msg.incorrectPhoneNumberOrEmailFormat
      );
      await signinPage.clearLoginInputs();
    }
  });

  test("TC-576 Authorization with invalid email", async ({ signinPage, randomValueHelper }) => {
    for (const InvalidEmail of randomValueHelper.invalidEmailOptions()) {
      await signinPage.fillLoginPasswordInput(process.env.ADMIN_PASSWORD ?? "");
      await signinPage.fillLoginEmailInput(InvalidEmail);
      await signinPage.clickLoginSubmitBtn();
      await expect(signinPage.getEmailInpuErrorMsg()).toHaveText(
        error_msg.incorrectPhoneNumberOrEmailFormat
      );
      await signinPage.clearLoginInputs();
    }
  });

  test("TC-577 Authorization with invalid password", async ({
    signinPage,
    randomValueHelper
  }) => {
    for (const invalidPassword of randomValueHelper.invalidPasswordOptions()) {
      await signinPage.fillLoginEmailInput(process.env.ADMIN_EMAIL ?? "");
      await signinPage.fillLoginPasswordInput(invalidPassword);
      await signinPage.clickLoginSubmitBtn();

      expect(signinPage.getListOfErrorMsg()).toContain(
          await signinPage.getPasswordInputErrorMsgText()
        );
      await signinPage.clearLoginInputs();
    }
   await signinPage.fillLoginEmailInput(process.env.ADMIN_EMAIL ?? "");
   await signinPage.fillLoginPasswordInput(randomValueHelper.generateRandomPassword(10))
   await signinPage.clickLoginSubmitBtn();
   await expect(signinPage.getLoginFormErrorText()).toHaveText(error_msg.incorrectEmailOrPassword)
  });

});
