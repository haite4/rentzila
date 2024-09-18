import { expect } from "@playwright/test";
import { test } from "../fixtures/fixtures";
import valid_creds from "../data/valid_creds.json";
import endpoints from "../data/endpoints.json";

test.describe("Auth page testing", () => {
  test.beforeEach(async ({ signinPage }) => {
    await signinPage.open();
    await signinPage.clickHeaderAuthBtn();
  });
  test("TC-200 Authorization with empty fields", async ({ signinPage }) => {
    await signinPage.clickLoginSubmitBtn();
    await expect(signinPage.getLoginPopUp()).toBeVisible();
    expect(await signinPage.getEmailInpuErrorMsg()).toBe(
      "Поле не може бути порожнім"
    );
    expect(await signinPage.getPasswordInputErrorMsg()).toBe(
      "Поле не може бути порожнім"
    );
    expect(signinPage.getEmailInput()).toHaveCSS(
      "border",
      "0.834783px solid rgb(247, 56, 89)"
    );
    expect(signinPage.getPasswordInput()).toHaveCSS(
      "border",
      "0.834783px solid rgb(247, 56, 89)"
    );
    await signinPage.fillLoginEmailInput(valid_creds[0].email);
    await signinPage.clickLoginSubmitBtn();
    expect(signinPage.getEmailInput()).toHaveCSS(
      "border",
      "0.834783px solid rgb(229, 229, 229)"
    );
    expect(await signinPage.getPasswordInputErrorMsg()).toBe(
      "Поле не може бути порожнім"
    );
    expect(signinPage.getPasswordInput()).toHaveCSS(
      "border",
      "0.834783px solid rgb(247, 56, 89)"
    );
    await signinPage.clearEmailInput();
    expect(signinPage.getEmailInput()).toHaveCSS(
      "border",
      "0.834783px solid rgb(247, 56, 89)"
    );
    expect(await signinPage.getEmailInpuErrorMsg()).toBe(
      "Поле не може бути порожнім"
    );
    await signinPage.fillLoginPasswordInput(valid_creds[0].password);
    await signinPage.clickLoginSubmitBtn();
    expect(signinPage.getPasswordInput()).toHaveCSS(
      "border",
      "0.834783px solid rgb(229, 229, 229)"
    );
  });

  test("TC-201 Authorization with valid email and password", async ({
    signinPage,
  }) => {
    for (let i = 0; i < valid_creds.length; i++) {
      await signinPage.fillLoginEmailInput(valid_creds[i].email);
      await expect(signinPage.getEmailInput()).toHaveValue(
        valid_creds[i].email
      );
      await signinPage.fillLoginPasswordInput(valid_creds[i].password);
      await expect(signinPage.getPasswordInput()).toHaveValue(
        valid_creds[i].password
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
      await expect(signinPage.page).toHaveURL(endpoints.base);
      await signinPage.clickAvatarBlock();
      await expect(signinPage.getDropDownMenuContainer()).toBeVisible();
      expect(await signinPage.getProfileDropdownEmailText()).toBe(
        valid_creds[i].email
      );
      await signinPage.clickLogoutBtn();
      await signinPage.clickHeaderAuthBtn();
    }
  });

  test("TC-202 Authorization with valid phone and password", async ({
    signinPage,
  }) => {
    for (const phoneNumber of signinPage.validPhoneNumberOptions()) {
      await signinPage.fillLoginEmailInput(phoneNumber);
      expect(signinPage.getEmailInput()).toHaveCSS(
        "border",
        "0.834783px solid rgb(229, 229, 229)"
      );
      await signinPage.fillLoginPasswordInput(valid_creds[0].password);
      expect(signinPage.getPasswordInput()).toHaveCSS(
        "border",
        "0.834783px solid rgb(229, 229, 229)"
      );
      await signinPage.clickLoginSubmitBtn();
      await expect(signinPage.page).toHaveURL(endpoints.base);
      await signinPage.clickAvatarBlock();
      await expect(signinPage.getDropDownMenuContainer()).toBeVisible();
      await signinPage.clickProfileBtn();
      await expect(signinPage.page).toHaveURL(endpoints.profile);
      await expect(signinPage.getMobileInput()).toBeVisible();
      expect(await signinPage.getMobileValue()).toBe(
        valid_creds[0].phone_number
      );
      await signinPage.clickLogoutBtnOnTheProfile();
      await signinPage.clickHeaderAuthBtn();
    }
  });

  test("TC-207 Authorization with invalid phone", async ({ signinPage }) => {
    for (const invalidPhoneNumber of signinPage.invalidPhoneNumberOptions()) {
      await signinPage.fillLoginPasswordInput(valid_creds[0].password);
      await signinPage.fillLoginEmailInput(invalidPhoneNumber);
      await signinPage.clickLoginSubmitBtn();
      expect(await signinPage.getEmailInpuErrorMsg()).toBe(
        "Неправильний формат email або номера телефону"
      );
      await signinPage.clearLoginInputs();
    }
  });

  test("TC-576 Authorization with invalid email", async ({ signinPage }) => {
    for (const InvalidEmail of signinPage.invalidEmailOptions()) {
      await signinPage.fillLoginPasswordInput(valid_creds[0].password);
      await signinPage.fillLoginEmailInput(InvalidEmail);
      await signinPage.clickLoginSubmitBtn();
      expect(await signinPage.getEmailInpuErrorMsg()).toBe(
        "Неправильний формат email або номера телефону"
      );
      await signinPage.clearLoginInputs();
    }
  });

  test("TC-577 Authorization with invalid password", async ({
    signinPage,
  }) => {
    for (const invalidPassword of signinPage.invalidEmailOptions()) {
      await signinPage.fillLoginEmailInput(valid_creds[0].email);
      await signinPage.fillLoginPasswordInput(invalidPassword);
      await signinPage.clickLoginSubmitBtn();
      expect(signinPage.getListOfErrorMsg()).toContain(
        await signinPage.getPasswordInputErrorMsg()
      );
      await signinPage.clearLoginInputs();
    }
  });
});
