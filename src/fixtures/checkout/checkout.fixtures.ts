import { test as base } from "@playwright/test";
import { CheckoutPage } from "@pom/checkout/checkout.page";

export const test = base.extend<{ checkoutPage: CheckoutPage }>({
  checkoutPage: async ({ page }, use) => {
    const checkoutPage = new CheckoutPage(page);
    await use(checkoutPage);
  },
});
