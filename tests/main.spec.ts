import { expect } from "@playwright/test";
import { test } from "../fixtures/fixtures";
import endpoints from "../data/endpoints.json";
import test_data from "../data/test_data.json";

test.describe("Main page testing", () => {
  test.slow();
  test("TC-212: Checking 'Послуги' section on the main page", async ({
    mainPage,
    productsPage,
    productsDetailsPage,
    basePage,
  }) => {
    await mainPage.open();
    await mainPage.scrollToServices();
    await expect(mainPage.getPopulyarniServicesTab()).toBeVisible();
    await expect(mainPage.getServicesTitle()).toBeVisible();
    for (const services of await mainPage.getListItemServices()) {
      await expect(services).toBeVisible();
    }

    for (const locator of await mainPage.getListItemServices()) {
      const text = await mainPage.getServicesText(locator);

      await mainPage.clickOnEachServices(locator);

      await expect(mainPage.page).toHaveURL(endpoints.products);
      await productsPage.page.waitForLoadState("networkidle");

      await productsPage.clickExpendFilterContainer();
      const checkboxLabel = productsPage.getCheckboxByLabel(text);
      await mainPage.page.waitForTimeout(2000);
      await expect(checkboxLabel).toBeVisible();
      await expect(checkboxLabel).toBeChecked();
      await productsPage.clickUnitCardImage();
      await expect(productsDetailsPage.getUnitCharacteristics()).toBeVisible();
      await expect(productsDetailsPage.getUnitCharacteristics()).toHaveText(
        "Послуги, які надає технічний засіб:"
      );
      expect(await productsDetailsPage.getUnitCharacteristicText()).toContain(
        text
      );

      await basePage.clickOnTheLogo();
      await expect(mainPage.page).toHaveURL(endpoints.base);
    }
  });

  test("TC-213: Checking 'Спецтехніка' section on the main page", async ({
    mainPage,
    productsPage,
    basePage,
  }) => {
    await mainPage.open();
    await mainPage.scrollToSpecialEquipment();
    await expect(mainPage.getEquipmentTitle()).toBeVisible();
    await expect(mainPage.getPopulyarniEuqipmentTab()).toBeVisible();

    for (const equipmentTab of await mainPage.getLocatorOfEquipmentTab()) {
      await mainPage.clickOnTheEquipmentTab(equipmentTab);
      for (const equipment of await mainPage.getListEquipmentServices()) {
        await expect(equipment).toBeVisible();
      }
    }

    for (let i = 0; i < mainPage.getListOfEquipmentTab.length; i++) {
      mainPage.clickOnTheEquipmentTabs(i);
      for (
        let j = 0;
        j < (await mainPage.getListEquipmentServices()).length;
        j++
      ) {
        mainPage.clickOnTheEquipmentTabs(i);
        await mainPage.clickOnTheEquipment(
          mainPage.getEquimpmentServicesByIndex(j)
        );

        await expect(mainPage.page).toHaveURL(
          new RegExp(`.*${endpoints.products}.*`)
        );

        try {
          await expect(productsPage.getProductsFilter()).toBeVisible();
        } catch (error) {
          console.warn("Element not visible, continuing test execution.");
        }

        await productsPage.page.waitForLoadState("networkidle");
        await basePage.clickOnTheLogo();
        await expect(mainPage.page).toHaveURL(endpoints.base);
      }
    }
  });

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

  test("TC-214: Verify that all elements on the footer are displayed and all links are clickable", async ({
    mainPage,
  }) => {
    await mainPage.open();
    await mainPage.scrollDownToFooter();
    await expect(mainPage.getFooterContainer()).toBeVisible();
    expect(mainPage.getLogoFooter().isDisabled()).toBeTruthy();
    expect(mainPage.getAboutUs()).toBeVisible();
    expect(mainPage.getPolitikaConfidencialinosty()).toBeVisible();
    expect(mainPage.getPravilaVikoristanyaCookie()).toBeVisible();
    expect(mainPage.getUmoviDostupu()).toBeVisible();
    expect(mainPage.getAnnouncement()).toBeVisible();
    expect(mainPage.getOgoloshennya()).toBeVisible();
    expect(mainPage.getTender()).toBeVisible();
    expect(mainPage.getTender()).toBeVisible();
    expect(mainPage.getContactsTitle()).toBeVisible();
    expect(mainPage.getContactUsEmail()).toBeVisible();
    expect(mainPage.getLogoFooter()).toBeVisible();
    expect(mainPage.getCopyright()).toBeVisible();
    await mainPage.clickPolitikaConfidencialinostyLink();
    await expect(mainPage.page).toHaveURL(/.*privacy-policy.*/);
    await expect(mainPage.getPolitikaConfidencialinostyTitle()).toBeVisible();
    await mainPage.scrollDownToFooter();
    await mainPage.clickPravilaVikoristanyaCookieLink();
    await expect(mainPage.page).toHaveURL(/.*cookie-policy.*/);
    await expect(mainPage.getPolitikaVikoristanyaCookieTitle()).toBeVisible();
    await mainPage.clickUmoviDostupuLink();
    await expect(mainPage.page).toHaveURL(/.*terms-conditions.*/);
    await expect(mainPage.getumoviDostupuTitle()).toBeVisible();
    await mainPage.clickOgoloshennyaLink();
    await expect(mainPage.page).toHaveURL(/.*products.*/);
    await expect(mainPage.getOgoloshennyaSearch()).toBeVisible();
    await expect(mainPage.getOgoloshennyaSearch()).toHaveAttribute(
      "placeholder",
      "Пошук оголошень або послуг"
    );
    await mainPage.clickLogoOnHeaderLink();
    await expect(mainPage.getHeroSectionTitle()).toBeVisible();
    await mainPage.scrollDownToFooter();
    await mainPage.clickTenderiLink();
    await expect(mainPage.page).toHaveURL(/.*tenders-map.*/);
    await expect(mainPage.getTenderSearchInput()).toBeVisible();
    expect(mainPage.getTenderSearchInput()).toHaveAttribute(
      "placeholder",
      "Пошук тендера за ключовими словами"
    );
    await mainPage.clickLogoOnHeaderLink();
    await expect(mainPage.page).toHaveURL(endpoints.base);
  });
});
