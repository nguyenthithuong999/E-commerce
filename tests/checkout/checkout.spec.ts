import { expect } from "@playwright/test";
import { test } from "@fixtures/index";
import { ProductPage } from "@pom/product/product.page";
import { CartPage } from "@pom/cart/cart.page";

const addProductsAndProceedToCheckout = async (
  productPage: ProductPage,
  cartPage: CartPage,
  productIndices: number[],
): Promise<void> => {
  for (const index of productIndices) {
    await productPage.addToCart(index);
  }
  await productPage.header.openCart();
  await cartPage.clickCheckout();
};

test.describe("SauceDemo Checkout Feature", () => {
  test.beforeEach(async ({ cartPage }) => {
    await cartPage.openPage("/inventory.html");
  });

  test(
    "TC001: Complete checkout process successfully and return to Products page",
    { tag: ["@CHECKOUT_001", "@smoke", "@regression"] },
    async ({ productPage, cartPage, checkoutPage, conf }) => {
      const { firstName, lastName, postalCode } = conf;

      await addProductsAndProceedToCheckout(productPage, cartPage, [0]);
      await checkoutPage.fillInformation(firstName, lastName, postalCode);
      await checkoutPage.clickFinish();

      await expect(checkoutPage.locs.completeHeader).toBeVisible();
      await checkoutPage.clickBackHome();
    },
  );

  test(
    "TC002: Display error message when First Name is empty",
    { tag: ["@CHECKOUT_002", "@regression"] },
    async ({ productPage, cartPage, checkoutPage, conf }) => {
      const { firstName, lastName, postalCode, msg } = conf;

      await addProductsAndProceedToCheckout(productPage, cartPage, [0]);
      await checkoutPage.fillInformation(firstName, lastName, postalCode);
      await expect(checkoutPage.locs.errorField).toHaveText(msg!);
    },
  );

  test(
    "TC003: Display error message when Last Name is empty",
    { tag: ["@CHECKOUT_003", "@regression"] },
    async ({ productPage, cartPage, checkoutPage, conf }) => {
      const { firstName, lastName, postalCode, msg } = conf;

      await addProductsAndProceedToCheckout(productPage, cartPage, [0]);
      await checkoutPage.fillInformation(firstName, lastName, postalCode);
      await expect(checkoutPage.locs.errorField).toHaveText(msg!);
    },
  );

  test(
    "TC004: Display error message when Postal Code is empty",
    { tag: ["@CHECKOUT_004", "@regression"] },
    async ({ productPage, cartPage, checkoutPage, conf }) => {
      const { firstName, lastName, postalCode, msg } = conf;

      await addProductsAndProceedToCheckout(productPage, cartPage, [0]);
      await checkoutPage.fillInformation(firstName, lastName, postalCode);
      await expect(checkoutPage.locs.errorField).toHaveText(msg!);
    },
  );

  test(
    "TC005: Verify order summary items, unit prices and Item total at Step Two",
    { tag: ["@CHECKOUT_005", "@regression"] },
    async ({ productPage, cartPage, checkoutPage, conf }) => {
      const { firstName, lastName, postalCode, products } = conf;
      const actualId = products.map((p: any) => p.id);

      await addProductsAndProceedToCheckout(productPage, cartPage, actualId);
      await checkoutPage.fillInformation(firstName, lastName, postalCode);

      await expect(checkoutPage.page).toHaveURL(/checkout-step-two\.html/);

      const actualNames = await checkoutPage.getItemNames();
      const expectedNames = products.map((p: any) => p.name);
      expect(actualNames).toEqual(expectedNames);

      const actualPrices = await checkoutPage.getItemPrices();
      const expectedPrices = products.map((p: any) => `$${p.price}`);
      expect(actualPrices).toEqual(expectedPrices);

      const actualTotalItem =
        await checkoutPage.locs.totalItem.allTextContents();
      const expectedTotal = products.reduce(
        (sum: number, p: any) => sum + p.price,
        0,
      );
      expect(actualTotalItem[0]).toContain(expectedTotal.toString());
    },
  );

  test(
    "TC006: Click Cancel at Checkout Step One to return to Cart page",
    { tag: ["@CHECKOUT_006", "@regression"] },
    async ({ productPage, cartPage, checkoutPage }) => {
      await addProductsAndProceedToCheckout(productPage, cartPage, [0]);

      await expect(checkoutPage.page).toHaveURL(/checkout-step-one\.html/);
      await checkoutPage.clickCancel();

      await expect(cartPage.page).toHaveURL(/cart\.html/);
      await expect(cartPage.locs.cartTitle).toBeVisible();
    },
  );

  test(
    "TC007: Click Cancel at Checkout Step Two to return to Products page",
    { tag: ["@CHECKOUT_007", "@regression"] },
    async ({ productPage, cartPage, checkoutPage, conf }) => {
      const { firstName, lastName, postalCode } = conf;
      await addProductsAndProceedToCheckout(productPage, cartPage, [0]);

      await checkoutPage.fillInformation(firstName, lastName, postalCode);
      await expect(checkoutPage.page).toHaveURL(/checkout-step-two\.html/);
      await checkoutPage.clickCancel();

      await expect(productPage.page).toHaveURL(/inventory\.html/);
      await expect(productPage.locs.productTitle).toBeVisible();
    },
  );
});
