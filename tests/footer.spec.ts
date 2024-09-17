import { expect } from "@playwright/test";
import { test } from "../fixtures/fixtures";
import endpoints from "../data/endpoints.json";

test.describe("Footer functionality", () => {
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
