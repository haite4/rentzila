import { MainPage } from "../pages/main.page";
import { test as base, request as playwrightRequest } from "@playwright/test";
import { ProductsPage } from "../pages/products.page";
import { ProductsDetailsPage } from "../pages/products-details.page";
import Page from "../pages/page";
import { Helper } from "../helpers/api_helper";
import { RandomValue } from "../helpers/random_value";

type MyFixtures = {
  mainPage: MainPage;
  productsPage: ProductsPage;
  productsDetailsPage: ProductsDetailsPage;
  basePage: Page;
  apiHelper: Helper;
  randomValueHelper: RandomValue
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
    await use(new Helper(apiRequestContext));
  },
  randomValueHelper: async({}, use) => {
    await use(new RandomValue())
  }
});
