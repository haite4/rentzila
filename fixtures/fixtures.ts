import { MainPage } from "../pages/main.page";
import { test as base, request as playwrightRequest } from "@playwright/test";
import { ProductsPage } from "../pages/products.page";
import { ProductsDetailsPage } from "../pages/products-details.page";
import Page from "../pages/page";
import { ApiHelper } from "../api/rentzila.api";
import { RandomValue } from "../helpers/random_value";

type MyFixtures = {
  mainPage: MainPage;
  productsPage: ProductsPage;
  productsDetailsPage: ProductsDetailsPage;
  basePage: Page;
  apiHelper: ApiHelper;
  randomValueHelper: RandomValue;
};

export const test = base.extend<MyFixtures>({
  mainPage: async ({ page }, use) => {
    await use(new MainPage(page));
  },
  productsPage: async ({ page }, use) => {
    await use(new ProductsPage(page));
  },
  productsDetailsPage: async ({ page }, use) => {
    await use(new ProductsDetailsPage(page));
  },
  basePage: async ({ page }, use) => {
    await use(new Page(page));
  },
  apiHelper: async ({}, use) => {
    const apiRequestContext = await playwrightRequest.newContext();
    await use(new ApiHelper(apiRequestContext));
  },
  randomValueHelper: async ({}, use) => {
    await use(new RandomValue());
  },
});
