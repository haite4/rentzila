import Page from "./page";
import valid_creds from "../data/valid_creds.json";

const headerAuthBtn = ".NavbarAuthBlock_buttonEnter__c9siH";
const loginPopup = `[data-testid="loginPopup"]`;
const emailErrorMsgBlock = `//*[@id="__next"]/div[1]/div/div[2]/form/div[1]/p`;
const passwordErrorMsgBlock = `//*[@id="__next"]/div[1]/div/div[2]/form/div[2]/div[1]/p`;
const loginEmailInput = "#email";
const loginPasswordInput = "#password";
const hiddenIcon = ".CustomReactHookInput_icon__XAlK2";
const userIcon = `[data-testid="avatarBlock"]`;
const dropdownMenuContainer = ".ProfileDropdownMenu_container__kb2vM";
const profileDropdownEmail = ".ProfileDropdownMenu_email__D5ylo";
const logoutBtn = `[data-testid="logout"]`;
const profileBtn = `[data-testid="profile"]`;
const mobileInput = "#mobile";
const logoutBtnOnTheProfile = `[data-testid="logOut"]`;

export class SigninPage extends Page {
  constructor(page: Page["page"]) {
    super(page);
  }

  getLoginPopUp() {
    return this.page.locator(loginPopup);
  }

  getEmailInput() {
    return this.page.locator(loginEmailInput);
  }

  getPasswordInput() {
    return this.page.locator(loginPasswordInput);
  }

  getDropDownMenuContainer() {
    return this.page.locator(dropdownMenuContainer);
  }

  getUserIcon() {
    return this.page.locator(userIcon);
  }

  getMobileInput() {
    return this.page.locator(mobileInput).first();
  }

  validPhoneNumberOptions() {
    const validOptionsList: string[] = [];
    const phoneNumber = valid_creds[0].phone_number;
    const phoneNumberWithoutPlus = phoneNumber.replace(/^\+/, "");
    const cleanedPhoneNumber = phoneNumberWithoutPlus.replace(/^38/, "");
    validOptionsList.push(phoneNumber);
    validOptionsList.push(phoneNumberWithoutPlus);
    validOptionsList.push(cleanedPhoneNumber);
    return validOptionsList;
  }

  invalidPhoneNumberOptions() {
    const invalidOptionsList: string[] = [];
    const countryCodes = ["+1", "+44", "+33", "+49", "+61", "+105"];
    const phoneNumber = valid_creds[0].phone_number;
    const phoneNumberWithoutFirstDigits = phoneNumber.replace(/^\+38/, "");
    const phoneNumberWithoutPrefix = phoneNumber.replace(/^\+380/, "");
    const phoneNumberWithoutLastNumber = phoneNumberWithoutPrefix.slice(0, -1);
    const randomNumber = Math.floor(Math.random() * 10);
    const areaCode = phoneNumberWithoutPrefix.slice(0, 2);
    const firstPart = phoneNumberWithoutPrefix.slice(2, 5);
    const secondPart = phoneNumberWithoutPrefix.slice(5, 9);
    const numberWithDash = `+380-${areaCode}-${firstPart}-${secondPart}`;
    const numberWithSpace = `+380 ${areaCode} ${firstPart} ${secondPart}`;
    const numberWithBraces = `+380(${areaCode})${firstPart}${secondPart}`;
    const numberWithouPrefixWithBraces = ` (${areaCode})${firstPart}${secondPart}`;
    const phoneNumberWithRedundantDigit = `${phoneNumberWithoutFirstDigits}${randomNumber}`;
    const randomCountryCode =
      countryCodes[Math.floor(Math.random() * countryCodes.length)];
    const phoneNumberWithDifferentCountryCode = `${randomCountryCode}${areaCode}${firstPart}${secondPart}`;
    const phoneNumberWithoutFirstDigit = `+${phoneNumberWithoutFirstDigits}`;

    invalidOptionsList.push(
      numberWithDash,
      phoneNumberWithoutLastNumber,
      numberWithSpace,
      numberWithBraces,
      numberWithouPrefixWithBraces,
      phoneNumberWithRedundantDigit,
      phoneNumberWithDifferentCountryCode,
      phoneNumberWithoutFirstDigit
    );
    return invalidOptionsList;
  }

  invalidEmailOptions() {
    const invalidEmailOptionsList: string[] = [];
    const validEmail = valid_creds[0].email;
    const firstThreeChars = validEmail.slice(0, 3);
    const remainingPart = validEmail.slice(3);
    const emailWithSpace = `${firstThreeChars} ${remainingPart}`;
    const cyrilicText = "еуіегіуккутеяшдф";
    const emailWithoutAt = validEmail.replace("@", "");
    const emailWithoutDot = validEmail.replace(".", "");
    const emailWithoutCom = validEmail.replace(/\.net$/, "");
    const emailWithoutGmail = validEmail.replace(/ukr/, "");
    const emailWithoutDomain = validEmail.replace(/@ukr\.net$/, "");
    const emailWithExtraAt = validEmail.replace(/@/, "@@");
    invalidEmailOptionsList.push(
      emailWithSpace,
      cyrilicText,
      emailWithoutAt,
      emailWithoutDot,
      emailWithoutCom,
      emailWithoutGmail,
      emailWithoutDomain,
      emailWithExtraAt
    );
    return invalidEmailOptionsList;
  }

  invalidPasswordOptions() {
    const invalidPasswordList: string[] = [];
    const validPassword = valid_creds[0].password;
    const passwordWithSpaceAtTheEnd = `${validPassword} `;
    const passwordWithSpaceAtTheStart = ` ${validPassword}`;
    const nonExistinsPassword = this.generateRandomPassword(10);
    const passwordInLowerCase = validPassword.toLowerCase();
    const passwordInUpperCase = validPassword.toUpperCase();
    const passwordInCyrylic = "Йцукен123+";

    invalidPasswordList.push(
      passwordWithSpaceAtTheEnd,
      passwordWithSpaceAtTheStart,
      nonExistinsPassword,
      passwordInLowerCase,
      passwordInUpperCase,
      passwordInCyrylic
    );
  }

  getListOfErrorMsg() {
    const errorMsg = [
      "Пароль повинен містити як мінімум 1 цифру, 1 велику літеру і 1 малу літеру, також не повинен містити кирилицю та пробіли",
      "Будь ласка, введіть як мінімум 8 символів",
    ];
    return errorMsg;
  }

  generateRandomPassword(length) {
    const charset =
      "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()_+[]{}|;:,.<>?";
    let password = "";
    for (let i = 0; i < length; i++) {
      const randomIndex = Math.floor(Math.random() * charset.length);
      password += charset[randomIndex];
    }
    return password;
  }

  async clickHeaderAuthBtn() {
    await this.page.locator(headerAuthBtn).click();
  }

  async clickLoginSubmitBtn() {
    const loginBtnlocator = this.page.getByRole("button", {
      name: "Увійти",
      exact: true,
    });
    await loginBtnlocator.click();
  }

  async clickLogoutBtnOnTheProfile() {
    await this.page.locator(logoutBtnOnTheProfile).click();
  }

  async fillLoginEmailInput(email) {
    await this.page.locator(loginEmailInput).fill(email);
  }

  async fillLoginPasswordInput(password) {
    await this.page.locator(loginPasswordInput).fill(password);
  }

  async getMobileValue() {
    const phoneNumberValue = await this.page
      .locator(mobileInput)
      .first()
      .inputValue();
    return phoneNumberValue.replace(/\s+/g, "");
  }

  async getPasswordInputErrorMsg() {
    const error = this.page.locator(passwordErrorMsgBlock);
    return await error.textContent();
  }

  async getEmailInpuErrorMsg() {
    const error = this.page.locator(emailErrorMsgBlock);
    return await error.textContent();
  }

  async clearEmailInput() {
    await this.page.locator(loginEmailInput).clear();
  }

  async clickHiddenIcon() {
    await this.page.locator(hiddenIcon).click();
  }

  async randomSubmitAction() {
    const randomChoice = Math.random() < 0.5;
    if (randomChoice) {
      await this.clickLoginSubmitBtn();
    } else {
      await this.getEmailInput().press("Enter");
    }
  }

  async clickAvatarBlock() {
    await this.page.locator(userIcon).click();
  }

  async getProfileDropdownEmailText() {
    return await this.page.locator(profileDropdownEmail).textContent();
  }

  async clickLogoutBtn() {
    await this.page.locator(logoutBtn).click();
  }

  async clickProfileBtn() {
    await this.page.locator(profileBtn).click();
  }

  async clearLoginInputs() {
    await this.getEmailInput().clear();
    await this.getPasswordInput().clear();
  }
}
