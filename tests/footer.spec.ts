import { expect } from "@playwright/test";
import { test } from "../fixtures/fixtures";
import general_msg from "../data/general_msg.json";
import { Endpoints } from "../constants/enums_endpoints.constant";

test.describe("Footer functionality", () => {
  test("TC-214: Verify that all elements on the footer are displayed and all links are clickable", async ({
    mainPage,
  }) => {
    await mainPage.open();
    await mainPage.scrollDownToFooter();
    await expect(mainPage.getFooterContainer()).toBeVisible();
    await mainPage.clickLogoFooter();
    await expect(mainPage.getAboutUs()).toBeVisible();
    await expect(mainPage.getCookieUsagePolicy()).toBeVisible();
    await expect(mainPage.getAccessTerms()).toBeVisible();
    await expect(mainPage.getAnnouncement()).toBeVisible();
    await expect(mainPage.getAdvertisement()).toBeVisible();
    await expect(mainPage.getTender()).toBeVisible();
    await expect(mainPage.getContactsTitle()).toBeVisible();
    await expect(mainPage.getContactUsEmail()).toBeVisible();
    await expect(mainPage.getLogoFooter()).toBeVisible();
    await expect(mainPage.getCopyright()).toBeVisible();
    await expect(mainPage.getPrivacyPolicy()).toBeVisible();
    await mainPage.clickPrivacyPolicyLink();
    await mainPage.page.waitForURL(
      `${process.env.BASE_URL}${Endpoints.PRIVACYPOLICY}`
    );
    await expect(mainPage.page).toHaveURL(/.*privacy-policy.*/);
    await expect(mainPage.getPrivacyPolicyTitle()).toBeVisible();
    await mainPage.scrollDownToFooter();
    await mainPage.clickCookieUsagePolicyLink();
    await mainPage.page.waitForURL(
      `${process.env.BASE_URL}${Endpoints.COOKIEPOLICY}`
    );
    await expect(mainPage.page).toHaveURL(/.*cookie-policy.*/);
    await expect(mainPage.getCookieUsagePolicyTitle()).toBeVisible();
    await mainPage.clickAccessTermsLink();
    await mainPage.page.waitForURL(
      `${process.env.BASE_URL}${Endpoints.TERMSCONDITION}`
    );
    await expect(mainPage.page).toHaveURL(/.*terms-conditions.*/);
    await expect(mainPage.getAccessTermsTitle()).toBeVisible();
    await mainPage.clickAdvertisementLink();
    await mainPage.page.waitForURL(
      `${process.env.BASE_URL}${Endpoints.PRODUCTS}`
    );
    await expect(mainPage.page).toHaveURL(/.*products.*/);
    await expect(mainPage.getAdvertisementSearch()).toBeVisible();
    await expect(mainPage.getAdvertisementSearch()).toHaveAttribute(
      "placeholder",
      general_msg.searchAdvertisementsOrServices
    );
    await mainPage.clickLogoOnHeaderLink();
    await expect(mainPage.getHeroSectionTitle()).toBeVisible();
    await mainPage.scrollDownToFooter();
    await mainPage.clickTenderiLink();
    await mainPage.page.waitForURL(
      `${process.env.BASE_URL}${Endpoints.TENDERSMAP}`
    );
    await expect(mainPage.page).toHaveURL(/.*tenders-map.*/);
    await expect(mainPage.getTenderSearchInput()).toBeVisible();
    await expect(mainPage.getTenderSearchInput()).toHaveAttribute(
      "placeholder",
      general_msg.searchTenderByKeywords
    );
    await mainPage.clickLogoOnHeaderLink();
    await expect(mainPage.page).toHaveURL(process.env.BASE_URL ?? "");
  });
});
