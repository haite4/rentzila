import { Locator} from "@playwright/test"; 
import Page from "./page";

const services = `[data-testid="services"]`;
const equipment = `[data-testid="specialEquipment"]`;
const populyarniServices = `[data-testid="services__populyarni"]`;
const populyarniEquipment = `[data-testid="specialEquipment__populyarna"]`;
const itemServices = ".RentzilaProposes_proposes_item__sY_h2";
const title = `[data-testid="title"]`;
const servicesText = ".RentzilaProposes_name__DTnwr";
const footer = ".Footer_footer__Dhw_9";
const logo = `[data-testid="logo"]`;
const aboutUsTitle = ".RentzilaAbout_title__vI_3A";
const forBuyersTitle = ".RentzilaForBuyers_title__k3tHn";
const contactsTitle = ".RentzilaContacts_title__SxcO7";
const politikaConfidencialinosty = `[data-testid="politika-konfidenciinosti"]`;
const pravilaVikoristanyaCookie = `[data-testid="pravila-vikoristannya-failiv-cookie"]`;
const umoviDostupu = `[data-testid="umovi-dostupu-ta-koristuvannya"]`;
const zapitiNaRoboru = `[data-testid="zapiti-na-robotu"]`;
const copyright = `[data-testid="copyright"]`;
const contactUsEmail = ".RentzilaContacts_email__jlzWc";
const politikaConfidencialinostyTitle = "h1.PrivacyPolicy_title__FEiRV";
const politikaVikoristanyaCookieTitle = "h1.Cookies_title__BVLFo";
const tenderSearchInput = `[data-testid="search"]`;
const heroSectionTitle = ".HeroSection_title__QIzpM";
const ogoloshennyaSearch = `[data-testid="searchInput"]`;
const consultingInputName = ".ConsultationForm_name__3bVcz input";
const consultingInputPhoneNumber = ".ConsultationForm_phone__vEOS9 input";
const specialEquipmentText = "specialEquipment";

export class MainPage extends Page {
  constructor(page: Page["page"]) {
    super(page);
  }

  getPopulyarniServicesTab(): Locator {
    return this.page.locator(populyarniServices);
  }

  getPopulyarniEuqipmentTab(): Locator {
    return this.page.locator(populyarniEquipment);
  }

  getListItemServices(): Promise<Locator[]> {
    const servicesItem = this.page.locator(services);
    return servicesItem.locator(itemServices).all();
  }

  getListEquipmentServices(): Promise<Locator[]> {
    const equipmentItem = this.page.locator(equipment);
    return equipmentItem.locator(itemServices).all();
  }

  getServicesTitle(): Locator {
    const servicesItem = this.page.locator(services);
    return servicesItem.locator(title);
  }

  getEquipmentTitle(): Locator {
    const equipmentItem = this.page.locator(equipment);
    return equipmentItem.locator(title);
  }

  getFooterContainer(): Locator {
    return this.page.locator(footer);
  }

  getLogoFooter(): Locator {
    return this.page.locator(logo).nth(1);
  }

  getAboutUs(): Locator {
    return this.page.locator(aboutUsTitle);
  }

  getPolitikaConfidencialinosty(): Locator {
    return this.page.locator(politikaConfidencialinosty);
  }

  getAnnouncement(): Locator {
    return this.page.locator(forBuyersTitle);
  }

  getContactsTitle(): Locator {
    return this.page.locator(contactsTitle);
  }

  getPravilaVikoristanyaCookie(): Locator {
    return this.page.locator(pravilaVikoristanyaCookie);
  }

  getUmoviDostupu(): Locator {
    return this.page.locator(umoviDostupu);
  }

  getOgoloshennya(): Locator {
    const ogoloshenya = this.page.getByRole('list').getByRole('link', { name: 'Оголошення' })
    return ogoloshenya;
  }

  getTender(): Locator {
    return this.page.getByRole('list').getByRole('link', { name: 'Тендери' });
  }

  getZapitiNaRobotu(): Locator {
    return this.page.locator(zapitiNaRoboru);
  }

  getCopyright(): Locator {
    return this.page.locator(copyright);
  }

  getContactUsEmail(): Locator {
    return this.page.locator(contactUsEmail);
  }

  getPolitikaConfidencialinostyTitle(): Locator {
    return this.page.locator(politikaConfidencialinostyTitle);
  }

  getPolitikaVikoristanyaCookieTitle(): Locator {
    return this.page.locator(politikaVikoristanyaCookieTitle);
  }

  getumoviDostupuTitle(): Locator {
    return this.page.locator(umoviDostupu);
  }

  getTenderSearchInput(): Locator {
    return this.page.locator(tenderSearchInput);
  }

  getOgoloshennyaSearch(): Locator {
    return this.page.locator(ogoloshennyaSearch);
  }

  getHeroSectionTitle(): Locator {
    return this.page.locator(heroSectionTitle);
  }

  getNameFieldCannotBeEmptyError(): Locator {
    return this.page.getByText("Поле не може бути порожнім").first();
  }

  getPhoneNumberFieldCannotBeEmptyError(): Locator {
    return this.page.getByText("Поле не може бути порожнім").nth(1);
  }

  getValidateFieldFailure(): Locator {
    return this.page.getByText("Телефон не пройшов валідацію");
  }

  getConsultingInputName(): Locator {
    return this.page.locator(consultingInputName);
  }

  getConsultingInputPhoneNumber(): Locator {
    return this.page.locator(consultingInputPhoneNumber);
  }

  getYouStillHaveQuestion(): Locator {
    return this.page
      .locator("section")
      .filter({ hasText: "У Вас залишилися питання?Замовити консультацію" });
  }

  getEquimpmentServicesByIndex(index){
    const equipmentItem = this.page.locator(equipment);
    const item = equipmentItem.locator(itemServices).nth(index)
    return item

  }

  async scrollToServices(): Promise<void> {
    await this.page.locator(services).scrollIntoViewIfNeeded();
  }

  async getServicesText(locator: Locator): Promise<string | null> {
    return await locator.locator(servicesText).textContent();
  }

  async scrollToSpecialEquipment(): Promise<void> {
    await this.page.getByTestId(specialEquipmentText).scrollIntoViewIfNeeded();
  }

  async clickPolitikaConfidencialinostyLink(): Promise<void> {
    await this.page.locator(politikaConfidencialinosty).click();
  }

  async clickPravilaVikoristanyaCookieLink(): Promise<void> {
    await this.page.locator(pravilaVikoristanyaCookie).click();
  }

  async clickUmoviDostupuLink(): Promise<void> {
    await this.page.locator(umoviDostupu).click();
  }

  async clickLogoOnHeaderLink(): Promise<void> {
    await this.page.locator(logo).click();
  }

  async clickTenderiLink(): Promise<void> {
    const tenderi = this.page.getByRole('list').getByRole('link', { name: 'Тендери' })
    await tenderi.click();
  }

  async clickOnTheEquipmentTab(locator: Locator): Promise<void> {
    await locator.click();
  }

  async clickOnPhoneNumberInput(): Promise<void> {
    await this.page.locator(consultingInputPhoneNumber).click();
  }

  async clickOgoloshennyaLink(): Promise<void> {
    const ogoloshenya = this.page.getByRole('list').getByRole('link', { name: 'Оголошення' })
    await ogoloshenya.click();
  }

  async getLocatorOfEquipmentTab(): Promise<Locator[]> {
    const equipmentList: Locator[] = [];
    const listOfTab = this.getListOfEquipmentTab()
    for (const id of listOfTab) {
      const res = this.page.getByTestId(id);
      equipmentList.push(res);
      
    }
    return  equipmentList
   
  }

  getListOfEquipmentTab(){
    const testId = [
      "specialEquipment__populyarna",
      "specialEquipment__silskogospodarska",
      "specialEquipment__budivelna",
      "specialEquipment__insha",
    ];

    return testId
  }

  async clickOnTheEquipmentTabs(index){
    const tabId = this.getListOfEquipmentTab()[index]
    await this.page.getByTestId(tabId).click()
  }

  async clickOnEachServices(locator: Locator): Promise<void> {
    await locator.click();
  }

  async clickOnTheEquipment(locator: Locator): Promise<void> {
    await locator.click();
  }

  async scrollDownToFooter(): Promise<void> {
    await this.page.locator(footer).scrollIntoViewIfNeeded();
  }

  async clickOrderConsultationBtn(): Promise<void> {
    const orderConsulting = this.page.getByRole("button", {
      name: "Замовити консультацію",
    });
    await orderConsulting.click();
  }

  async fillConsultingInputName(name: string): Promise<void> {
    await this.page.locator(consultingInputName).fill(name);
  }

  async fillConsultingInputPhoneNumber(phoneNumber: string): Promise<void> {
    await this.page.locator(consultingInputPhoneNumber).fill(phoneNumber);
  }

  async clearConsultingInputName(): Promise<void> {
    await this.page.locator(consultingInputName).clear();
  }

  async clearConsultingInputPhoneNumber(): Promise<void> {
    await this.page.locator(consultingInputPhoneNumber).clear();
  }

}
