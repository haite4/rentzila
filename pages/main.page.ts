import { Locator } from "@playwright/test";
import Page from "./page";

const equipment = `[data-testid="specialEquipment"]`;
const popularServices = 'section[data-testid="services"]';
const populyarniEquipment = 'section[data-testid*="specialEquipment"]';
const itemServices = '[class*="RentzilaProposes_proposes_item"]';
const title = `[data-testid="title"]`;
const servicesText = '[class*="RentzilaProposes_name"]';
const footer = '[class*="Footer_footer"]';
const logo = `[data-testid="logo"]`;
const aboutUsTitle = '[class*="RentzilaAbout_title"]';
const forBuyersTitle = '[class*="RentzilaForBuyers_title"]';
const contactsTitle = '[class*="RentzilaContacts_title"]';
const privacyPolicy = `[data-testid="politika-konfidenciinosti"]`;
const cookieUsagePolicy = `[data-testid="pravila-vikoristannya-failiv-cookie"]`;
const accessTerms = `[data-testid="umovi-dostupu-ta-koristuvannya"]`;
const jobRequests = `[data-testid="zapiti-na-robotu"]`;
const copyright = `[data-testid="copyright"]`;
const contactUsEmail = '[class*="RentzilaContacts_email"]';
const privacyPolicyTitle = 'h1[class*="PrivacyPolicy_title"]';
const cookieUsagePolicyTitle = 'h1[class*="Cookies_title"]';
const tenderSearchInput = `[data-testid="search"]`;
const heroSectionTitle = '[class*="HeroSection_title"]';
const advertisementSearch = `[data-testid="searchInput"]`;
const consultingInputName = '[class*="ConsultationForm_name"] input';
const consultingInputPhoneNumber = '[class*="ConsultationForm_phone"] input';
const specialEquipmentText = "specialEquipment";
const cosultationFormTitleFooter = '[class*="ConsultationForm_title"]';
const listOfEuipmentTab =
  '//section[@data-testid = "specialEquipment"]//h3[contains(@data-testid, "specialEquipment")]';

export class MainPage extends Page {
  constructor(page: Page["page"]) {
    super(page);
  }

  getPopularServicesTab(): Locator {
    return super.getElement(popularServices);
  }

  getPopularEquipmentTab(): Locator {
    return super.getElement(populyarniEquipment);
  }

  getListItemServices(): Promise<Locator[]> {
    return super.getElementAll(super.getElement(popularServices, itemServices));
  }

  getListEquipmentServices(): Promise<Locator[]> {
    return super.getElementAll(super.getElement(equipment, itemServices));
  }

  getServicesTitle(): Locator {
    return super.getElement(popularServices, title);
  }

  getEquipmentTitle(): Locator {
    return super.getElement(equipment, title);
  }

  getFooterContainer(): Locator {
    return super.getElement(footer);
  }

  getLogoFooter(): Locator {
    return super.getElement(logo).nth(1);
  }

  getAboutUs(): Locator {
    return super.getElement(aboutUsTitle);
  }

  getPrivacyPolicy(): Locator {
    return super.getElement(privacyPolicy);
  }

  getAnnouncement(): Locator {
    return super.getElement(forBuyersTitle);
  }

  getContactsTitle(): Locator {
    return super.getElement(contactsTitle);
  }

  getCookieUsagePolicy(): Locator {
    return super.getElement(cookieUsagePolicy);
  }

  getAccessTerms(): Locator {
    return super.getElement(accessTerms);
  }

  getAdvertisement(): Locator {
    return super.getElementByRole("Оголошення");
  }

  getTender(): Locator {
    return super.getElementByRole("Тендери");
  }

  getJobRequests(): Locator {
    return super.getElement(jobRequests);
  }

  getCopyright(): Locator {
    return super.getElement(copyright);
  }

  getContactUsEmail(): Locator {
    return super.getElement(contactUsEmail);
  }

  getPrivacyPolicyTitle(): Locator {
    return super.getElement(privacyPolicyTitle);
  }

  getCookieUsagePolicyTitle(): Locator {
    return super.getElement(cookieUsagePolicyTitle);
  }

  getAccessTermsTitle(): Locator {
    return super.getElement(accessTerms);
  }

  getTenderSearchInput(): Locator {
    return super.getElement(tenderSearchInput);
  }

  getAdvertisementSearch(): Locator {
    return super.getElement(advertisementSearch);
  }

  getHeroSectionTitle(): Locator {
    return super.getElement(heroSectionTitle);
  }

  getNameFieldCannotBeEmptyError(): Locator {
    return super.getElementByText("Поле не може бути порожнім").first();
  }

  getPhoneNumberFieldCannotBeEmptyError(): Locator {
    return super.getElementByText("Поле не може бути порожнім").nth(1);
  }

  getValidateFieldFailure(): Locator {
    return super.getElementByText("Телефон не пройшов валідацію");
  }

  getConsultingInputName(): Locator {
    return super.getElement(consultingInputName);
  }

  getConsultingInputPhoneNumber(): Locator {
    return super.getElement(consultingInputPhoneNumber);
  }

  getLogoOnHeader() {
    return super.getElement(logo);
  }

  getYouStillHaveQuestion(): Locator {
    return super.getElement(cosultationFormTitleFooter);
  }

  getEquimpmentServicesByIndex(index: number) {
    return super.getElement(equipment, itemServices).nth(index);
  }

  getEquipmentTabLocator() {
    return super.getElement(listOfEuipmentTab);
  }

  async scrollToServices(): Promise<void> {
    await super.scrollToElementIfNeeded(popularServices);
  }

  async getServicesText(locator: Locator): Promise<string | null> {
    return super.getElementTextContent(
      super.getSubElement(locator, servicesText)
    );
  }

  async scrollToSpecialEquipment(): Promise<void> {
    await super.scrollToElementIfNeeded(
      super.getElementByTestId(specialEquipmentText)
    );
  }

  async clickPrivacyPolicyLink(): Promise<void> {
    await super.clickLocator(this.getPrivacyPolicy());
  }

  async clickCookieUsagePolicyLink(): Promise<void> {
    await super.clickLocator(this.getCookieUsagePolicy());
  }

  async clickAccessTermsLink(): Promise<void> {
    await super.clickLocator(this.getAccessTerms());
  }

  async clickLogoOnHeaderLink(): Promise<void> {
    await super.clickLocator(this.getLogoOnHeader());
  }

  async clickTenderiLink(): Promise<void> {
    await super.clickLocator(super.getElementByRole("Тендери"));
  }

  async clickOnEquipmentTabByLocator(locator: Locator): Promise<void> {
    await super.clickLocator(locator);
  }

  async clickOnPhoneNumberInput(): Promise<void> {
    await super.clickLocator(this.getConsultingInputPhoneNumber());
  }

  async clickAdvertisementLink(): Promise<void> {
    await super.clickLocator(super.getElementByRole("Оголошення"));
  }

  async getAllLocatorOfEquipmentTab() {
    return super.getElementAll(this.getEquipmentTabLocator());
  }

  async clickOnTheEquipmentTabByIndex(index: number) {
    await super.clickLocator(super.getElement(listOfEuipmentTab).nth(index));
  }

  async clickOnEachServices(locator: Locator): Promise<void> {
    await super.clickLocator(locator);
  }

  async clickOnTheEquipment(locator: Locator): Promise<void> {
    await super.clickLocator(locator);
  }

  async scrollDownToFooter(): Promise<void> {
    await super.scrollToElementIfNeeded(footer);
  }

  async clickOrderConsultationBtn(): Promise<void> {
    await super.clickLocator(super.getButtonByText("Замовити консультацію"));
  }

  async fillConsultingInputName(name: string): Promise<void> {
    await super.fillText(this.getConsultingInputName(), name);
  }

  async fillConsultingInputPhoneNumber(phoneNumber: string): Promise<void> {
    await super.fillText(this.getConsultingInputPhoneNumber(), phoneNumber);
  }

  async clickOnTheLogo(): Promise<void> {
    await super.clickLocator(super.getElement(logo).first());
  }

  async clearConsultingInputName(): Promise<void> {
    await super.clearInputField(this.getConsultingInputName());
  }

  async clearConsultingInputPhoneNumber(): Promise<void> {
    await super.clearInputField(this.getConsultingInputPhoneNumber());
  }

  async clickLogoFooter() {
    await super.clickLocator(this.getLogoFooter());
  }
}
