import { test } from "@fixtures/index";
import { expect } from "@playwright/test";

test.describe("SauceDemo Cart Feature", () => {
  test.beforeEach(async ({ cartPage }) => {
    await cartPage.openPage("/inventory.html");
  });

  test(
    "TC001: View empty cart, verify title and item count is 0",
    { tag: ["@CART_001", "@smoke", "@regression"] },
    async ({ cartPage }) => {
      await cartPage.header.openCart();

      await expect(cartPage.locs.cartTitle).toBeVisible();
      await expect(cartPage.locs.cartItem).toHaveCount(0);
    },
  );

  test(
    "TC002: Add 2 products and remove 1 item in cart, verify 1 item remains",
    { tag: ["@CART_002", "@regression"] },
    async ({ productPage, cartPage }) => {
      await productPage.addToCart(0);
      await productPage.addToCart(1);
      await cartPage.header.openCart();

      await expect(cartPage.locs.cartTitle).toBeVisible();
      await expect(cartPage.locs.cartItem).toHaveCount(2);

      await cartPage.removeItem(1);

      await expect(cartPage.locs.cartItem).toHaveCount(1);
    },
  );

  test(
    "TC003: Remove the only product in cart, verify cart is empty and badge disappears",
    { tag: ["@CART_003", "@regression"] },
    async ({ productPage, cartPage }) => {
      await productPage.addToCart(0);
      await cartPage.header.openCart();

      await expect(cartPage.locs.cartTitle).toBeVisible();
      await expect(cartPage.locs.cartItem).toHaveCount(1);

      await cartPage.removeItem(0);

      await expect(cartPage.locs.cartItem).toHaveCount(0);
      await expect(cartPage.header.cartBadge).not.toBeVisible();
    },
  );

  test(
    "TC004: Click Continue Shopping to navigate back to Products page",
    { tag: ["@CART_004", "@regression"] },
    async ({ productPage, cartPage }) => {
      await cartPage.header.openCart();

      await expect(cartPage.locs.cartTitle).toBeVisible();

      await cartPage.clickContinueShopping();

      await expect(productPage.locs.productTitle).toBeVisible();
    },
  );

  test(
    "TC005: Verify product name and price details in cart",
    { tag: ["@CART_005", "@regression"] },
    async ({ productPage, cartPage, conf }) => {
      const expectedCart = conf;

      await productPage.addToCart(0);
      await productPage.addToCart(1);
      await cartPage.header.openCart();

      await expect(cartPage.locs.cartTitle).toBeVisible();
      const actualNames = await cartPage.getItemNames();
      const actualPrices = await cartPage.getItemPrices();

      const expectedNames = expectedCart.map((c: any) => c.name);
      expect(actualNames).toEqual(expectedNames);

      const expectedPrices = expectedCart.map((c: any) => `$${c.price}`);
      expect(actualPrices).toEqual(expectedPrices);
    },
  );

  test(
    "TC006: Click Checkout to navigate to Checkout Step One page",
    { tag: ["@CART_006", "@regression"] },
    async ({ productPage, cartPage, checkoutPage }) => {
      await productPage.addToCart(0);
      await productPage.addToCart(1);
      await cartPage.header.openCart();

      await expect(cartPage.locs.cartTitle).toBeVisible();
      await expect(cartPage.locs.cartItem).toHaveCount(2);

      await expect(cartPage.locs.checkoutButton).toBeVisible();
      await cartPage.clickCheckout();

      await expect(checkoutPage.locs.checkoutTitle).toBeVisible();
    },
  );
});
