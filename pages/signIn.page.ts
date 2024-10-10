import Page from "./page";
import error_msg from "../data/errors_msg.json";

const headerAuthBtn = '[class*="NavbarAuthBlock_buttonEnter"]';
const loginPopup = `[data-testid="loginPopup"]`;
const emailErrorMsgBlock = `//*[@id="__next"]/div[1]/div/div[2]/form/div[1]/p`;
const passwordErrorMsgBlock = `//*[@id="__next"]/div[1]/div/div[2]/form/div[2]/div[1]/p`;
const loginEmailInput = "#email";
const loginPasswordInput = "#password";
const hiddenIcon = '[class*="CustomReactHookInput_icon"]';
const userIcon = `[data-testid="avatarBlock"]`;
const dropdownMenuContainer = '[class*="ProfileDropdownMenu_container"]';
const profileDropdownEmail = '[class*="ProfileDropdownMenu_email"]';
const logoutBtn = `[data-testid="logout"]`;
const profileBtn = `[data-testid="profile"]`;
const mobileInput = "#mobile";
const logoutBtnOnTheProfile = `[data-testid="logOut"]`;
const loginFormError = '[class*="LoginForm_error"]';

export class SigninPage extends Page {
  constructor(page: Page["page"]) {
    super(page);
  }

  getLoginPopUp() {
    return super.getElement(loginPopup);
  }

  getEmailInput() {
    return super.getElement(loginEmailInput);
  }

  getPasswordInput() {
    return super.getElement(loginPasswordInput);
  }

  getDropDownMenuContainer() {
    return super.getElement(dropdownMenuContainer);
  }

  getUserIcon() {
    return super.getElement(userIcon);
  }

  getMobileInput() {
    return super.getElement(mobileInput).first();
  }

  getLoginFormErrorText() {
    return super.getElement(loginFormError);
  }

  getPasswordInputErrorMsgLocator() {
    return super.getElement(passwordErrorMsgBlock);
  }

  getEmailInpuErrorMsg() {
    return super.getElement(emailErrorMsgBlock);
  }

  getListOfErrorMsg() {
    const errorMsg = [
      error_msg.passwordRequirements,
      error_msg.minimumCharacterRequirement,
    ];
    return errorMsg;
  }

  async clickHeaderAuthBtn() {
    await super.clickLocator(super.getElement(headerAuthBtn));
  }

  async clickLoginSubmitBtn() {
    await super.clickLocator(super.getButtonByText("Увійти", true));
  }

  async clickLogoutBtnOnTheProfile() {
    await super.clickLocator(super.getElement(logoutBtnOnTheProfile));
  }

  async fillLoginEmailInput(email: string) {
    await super.fillText(super.getElement(loginEmailInput), email);
  }

  async fillLoginPasswordInput(password: string) {
    await super.fillText(super.getElement(loginPasswordInput), password);
  }

  async getMobileValue() {
    const phoneNumberValue = await super.getElementInputValue(
      super.getElement(mobileInput).first()
    );
    return phoneNumberValue.replace(/\s+/g, "");
  }

  async getPasswordInputErrorMsgText() {
    return super.getElementTextContent(super.getElement(passwordErrorMsgBlock));
  }

  async clearEmailInput() {
    await super.clearInputField(super.getElement(loginEmailInput));
  }

  async clickHiddenIcon() {
    await super.clickLocator(super.getElement(hiddenIcon));
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
    await super.clickLocator(super.getElement(userIcon));
  }

  async getProfileDropdownEmailText() {
    return super.getElementTextContent(super.getElement(profileDropdownEmail));
  }

  async clickLogoutBtn() {
    await super.clickLocator(super.getElement(logoutBtn));
  }

  async clickProfileBtn() {
    await super.clickLocator(super.getElement(profileBtn));
  }

  async clearLoginInputs() {
    await super.clearInputField(this.getEmailInput());
    await super.clearInputField(this.getPasswordInput());
  }
}
