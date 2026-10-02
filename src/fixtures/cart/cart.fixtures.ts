import { test as base } from "@playwright/test";
import { CartPage } from "@pom/cart/cart.page";

export const test = base.extend<{ cartPage: CartPage }>({
  cartPage: async ({ page }, use) => {
    const cartPage = new CartPage(page);
    await use(cartPage);
  },
});
