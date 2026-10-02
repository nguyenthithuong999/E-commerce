import { test } from "@fixtures/index";
import { expect } from "@playwright/test";

test.describe("SauceDemo Cart Feature", () => {
  test.beforeEach(async ({ cartPage }) => {
    await cartPage.openPage("/inventory.html");
  });

  test(
    "TC001: Checkout success",
    { tag: ["@CART_001"] },
    async ({ productPage, cartPage }) => {
      await productPage.addToCart(0);
      await productPage.addToCart(1);
      await productPage.locs.cartBadge.click();

      await expect(cartPage.locs.cartTitle).toBeVisible();
      await expect(cartPage.locs.cartItem).toHaveCount(2);

      await expect(cartPage.locs.checkoutButton).toBeVisible();
      await cartPage.locs.checkoutButton.click();
    },
  );
});
