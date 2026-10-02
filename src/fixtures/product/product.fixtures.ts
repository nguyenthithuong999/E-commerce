import { test as base } from "@playwright/test";
import { ProductPage } from "@pom/product/product.page";

export const test = base.extend<{ productPage: ProductPage }>({
  productPage: async ({ page }, use) => {
    const productPage = new ProductPage(page);
    await use(productPage);
  },
});
