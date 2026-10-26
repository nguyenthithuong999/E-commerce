import { test } from "@fixtures/index";
import { expect } from "@playwright/test";

test.describe("SauceDemo Cart Feature", () => {
  test.beforeEach(async ({ cartPage }) => {
    await cartPage.openPage("/inventory.html");
  });

  test("TC001", { tag: ["@CARTC001"] }, async ({ productPage, cartPage }) => {
    await productPage.locs.cartShopping.click();

    await expect(cartPage.locs.cartTitle).toBeVisible();
    await expect(cartPage.locs.cartItem).toHaveCount(0);
  });

  test("TC002", { tag: ["@CART_002"] }, async ({ productPage, cartPage }) => {
    await productPage.addToCart(0);
    await productPage.addToCart(1);
    await productPage.locs.cartShopping.click();

    await expect(cartPage.locs.cartTitle).toBeVisible();
    await expect(cartPage.locs.cartItem).toHaveCount(2);

    await cartPage.locs.removeButton(1).click();

    await expect(cartPage.locs.cartItem).toHaveCount(1);
  });

  test("TC003", { tag: ["@CART_003"] }, async ({ productPage, cartPage }) => {
    await productPage.addToCart(0);
    await productPage.locs.cartShopping.click();

    await expect(cartPage.locs.cartTitle).toBeVisible();
    await expect(cartPage.locs.cartItem).toHaveCount(1);

    await cartPage.locs.removeButton(0).click();

    await expect(cartPage.locs.cartItem).toHaveCount(0);
    await expect(productPage.locs.cartBadge).not.toBeVisible();
  });

  test("TC004", { tag: ["@CARTC004"] }, async ({ productPage, cartPage }) => {
    await productPage.locs.cartShopping.click();

    await expect(cartPage.locs.cartTitle).toBeVisible();

    await cartPage.locs.backButton.click();

    await expect(productPage.locs.productTitle).toBeVisible();
  });

  test(
    "TC005",
    { tag: ["@CARTC005"] },
    async ({ productPage, cartPage, conf }) => {
      const expectedCart = conf;

      await productPage.addToCart(0);
      await productPage.addToCart(1);
      await productPage.locs.cartShopping.click();

      await expect(cartPage.locs.cartTitle).toBeVisible();
      const actualNames = await cartPage.locs.itemName.allTextContents();
      const actualPrices = await cartPage.locs.itemPrice.allTextContents();

      const expectedNames = expectedCart.map((c: any) => c.name);
      expect(actualNames).toEqual(expectedNames);

      const expectedPrices = expectedCart.map((c: any) => `$${c.price}`);
      expect(actualPrices).toEqual(expectedPrices);
    },
  );

  test(
    "TC006: Checkout success",
    { tag: ["@CART_006"] },
    async ({ productPage, cartPage, checkoutPage }) => {
      await productPage.addToCart(0);
      await productPage.addToCart(1);
      await productPage.locs.cartShopping.click();

      await expect(cartPage.locs.cartTitle).toBeVisible();
      await expect(cartPage.locs.cartItem).toHaveCount(2);

      await expect(cartPage.locs.checkoutButton).toBeVisible();
      await cartPage.locs.checkoutButton.click();

      await expect(checkoutPage.locs.checkoutTitle).toBeVisible();
    },
  );
});
