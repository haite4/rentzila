import { Locator} from "@playwright/test"; 
import Page from "./page";

const equipment = `[data-testid="specialEquipment"]`;
const populyarniServices = 'section[data-testid*="services"]';
const populyarniEquipment = 'section[data-testid*="specialEquipment"]';
const itemServices = '[class*="RentzilaProposes_proposes_item"]';
const title = `[data-testid="title"]`;
const servicesText = '[class*="RentzilaProposes_name"]';
const footer = '[class*="Footer_footer"]';
const logo = `[data-testid="logo"]`;
const aboutUsTitle = '[class*="RentzilaAbout_title"]';
const forBuyersTitle = '[class*="RentzilaForBuyers_title"]';
const contactsTitle = '[class*="RentzilaContacts_title"]';
const politikaConfidencialinosty = `[data-testid="politika-konfidenciinosti"]`;
const pravilaVikoristanyaCookie = `[data-testid="pravila-vikoristannya-failiv-cookie"]`;
const umoviDostupu = `[data-testid="umovi-dostupu-ta-koristuvannya"]`;
const zapitiNaRoboru = `[data-testid="zapiti-na-robotu"]`;
const copyright = `[data-testid="copyright"]`;
const contactUsEmail = '[class*="RentzilaContacts_email"]';
const politikaConfidencialinostyTitle = 'h1[class*="PrivacyPolicy_title"]';
const politikaVikoristanyaCookieTitle = 'h1[class*="Cookies_title"]';
const tenderSearchInput = `[data-testid="search"]`;
const heroSectionTitle = '[class*="HeroSection_title"]';
const ogoloshennyaSearch = `[data-testid="searchInput"]`;
const consultingInputName = '[class*="ConsultationForm_name"] input';
const consultingInputPhoneNumber = '[class*="ConsultationForm_phone"] input';
const specialEquipmentText = "specialEquipment";
const cosultationFormTitleFooter = '[class*="ConsultationForm_title"]'
const listOfEuipmentTab = '//*[contains(@class, "RentzilaProposes_service")]'

export class MainPage extends Page {
  constructor(page: Page["page"]) {
    super(page);
  }

  getPopulyarniServicesTab(): Locator {
    return super.getElement(populyarniServices);
  }

  getPopulyarniEuqipmentTab(): Locator {
    return super.getElement(populyarniEquipment);
  }

  getListItemServices(): Promise<Locator[]> {
   return super.getElementAll(super.getElement(populyarniServices, itemServices))
  }

  getListEquipmentServices(): Promise<Locator[]> {
    return super.getElementAll(super.getElement(equipment, itemServices))
  }

  getServicesTitle(): Locator {
    return super.getElement(populyarniServices, title)
  }

  getEquipmentTitle(): Locator {
    return super.getElement(equipment, title)
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

  getPolitikaConfidencialinosty(): Locator {
    return super.getElement(politikaConfidencialinosty);
  }

  getAnnouncement(): Locator {
    return super.getElement(forBuyersTitle);
  }

  getContactsTitle(): Locator {
    return super.getElement(contactsTitle);
  }

  getPravilaVikoristanyaCookie(): Locator {
    return super.getElement(pravilaVikoristanyaCookie);
  }

  getUmoviDostupu(): Locator {
    return super.getElement(umoviDostupu);
  }

  getOgoloshennya(): Locator {
   return super.getElementByRole("Оголошення")
  }

  getTender(): Locator {
    return super.getElementByRole("Тендери")
  }

  getZapitiNaRobotu(): Locator {
    return super.getElement(zapitiNaRoboru);
  }

  getCopyright(): Locator {
    return super.getElement(copyright);
  }

  getContactUsEmail(): Locator {
    return super.getElement(contactUsEmail);
  }

  getPolitikaConfidencialinostyTitle(): Locator {
    return super.getElement(politikaConfidencialinostyTitle);
  }

  getPolitikaVikoristanyaCookieTitle(): Locator {
    return super.getElement(politikaVikoristanyaCookieTitle);
  }

  getumoviDostupuTitle(): Locator {
    return super.getElement(umoviDostupu);
  }

  getTenderSearchInput(): Locator {
    return super.getElement(tenderSearchInput);
  }

  getOgoloshennyaSearch(): Locator {
    return super.getElement(ogoloshennyaSearch);
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

  getLogoOnHeader(){
    return super.getElement(logo)
  }

  getYouStillHaveQuestion(): Locator {
    return super.getElement(cosultationFormTitleFooter)
  }

  getEquimpmentServicesByIndex(index: number){
    return super.getElement(equipment, itemServices).nth(index)
  }

  async scrollToServices(): Promise<void> {
    await super.scrollToElementIfNeeded(populyarniServices);
  }

  async getServicesText(locator: Locator): Promise<string | null> {
    return super.getElementTextContent(super.getSubElement(locator, servicesText))
  }

  async scrollToSpecialEquipment(): Promise<void> {
    await super.scrollToElementIfNeeded(super.getElementByTestId(specialEquipmentText))
  }

  async clickPolitikaConfidencialinostyLink(): Promise<void> {
    await super.clickLocator(super.getElement(politikaConfidencialinosty));
  }

  async clickPravilaVikoristanyaCookieLink(): Promise<void> {
    await super.clickLocator(this.getPravilaVikoristanyaCookie());
  }

  async clickUmoviDostupuLink(): Promise<void> {
    await super.clickLocator(this.getUmoviDostupu())
  }

  async clickLogoOnHeaderLink(): Promise<void> {
    await super.clickLocator(this.getLogoOnHeader())
  }

  async clickTenderiLink(): Promise<void> {
    await super.clickLocator(super.getElementByRole("Тендери"))
  }

  async clickOnTheEquipmentTab(locator: Locator): Promise<void> {
    await super.clickLocator(locator);
  }

  async clickOnPhoneNumberInput(): Promise<void> {
    await super.clickLocator(this.getConsultingInputPhoneNumber());
  }

  async clickOgoloshennyaLink(): Promise<void> {
    await super.clickLocator(super.getElementByRole("Оголошення"))
  }

  async getLocatorOfEquipmentTab(): Promise<Locator[]> {

    const equpmentTabElement = this.getListOfEquipmentTab()
    const count = await equpmentTabElement.count()
    const elementsArray: Locator[] = [];

    for (let i = 0; i < count; i++) {
        elementsArray.push(equpmentTabElement.nth(i));
    }

    return elementsArray; 
   
  }

  getListOfEquipmentTab(){
    return super.getElement(listOfEuipmentTab)
  }

  async clickOnTheEquipmentTabs(index: number){
   await super.clickLocator(super.getElement(listOfEuipmentTab)[index])
  }

  async clickOnEachServices(locator: Locator): Promise<void> {
    await super.clickLocator(locator);
  }

  async clickOnTheEquipment(locator: Locator): Promise<void> {
    await super.clickLocator(locator)
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

  async clearConsultingInputName(): Promise<void> {
    await super.clearInputField(this.getConsultingInputName());
  }

  async clearConsultingInputPhoneNumber(): Promise<void> {
    await super.clearInputField(this.getConsultingInputPhoneNumber());
  }

  async clickLogoFooter(){
    await super.clickLocator(this.getLogoFooter())
  }

}
