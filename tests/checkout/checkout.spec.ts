import { expect } from "@playwright/test";
import { test } from "@fixtures/index";

const addProducts = async (productPage: any, cartPage: any, products: any) => {
  for (const p of products) {
    await productPage.addToCart(p);
  }
  await productPage.locs.cartShopping.click();

  await cartPage.locs.checkoutButton.click();
};

const registerCheckout = async (
  checkoutPage: any,
  firstName: string,
  lastName: string,
  postalCode: string,
) => {
  await checkoutPage.locs.firstName.fill(firstName);
  await checkoutPage.locs.lastName.fill(lastName);
  await checkoutPage.locs.postalCode.fill(postalCode);
  await checkoutPage.locs.continueButton.click();
};

test.describe("SauceDemo Checkout Feature", () => {
  test.beforeEach(async ({ cartPage }) => {
    await cartPage.openPage("/inventory.html");
  });

  test(
    "TC001",
    { tag: ["@CHECKOUT_001"] },
    async ({ productPage, cartPage, checkoutPage, conf }) => {
      const { firstName, lastName, postalCode } = conf;

      await addProducts(productPage, cartPage, [0]);
      await registerCheckout(checkoutPage, firstName, lastName, postalCode);
      await checkoutPage.locs.finishButton.click();

      await expect(checkoutPage.locs.completeHeader).toBeVisible();
      await checkoutPage.locs.backButton.click();
    },
  );

  test(
    "TC002",
    { tag: ["@CHECKOUT_002"] },
    async ({ productPage, cartPage, checkoutPage, conf }) => {
      const { firstName, lastName, postalCode, msg } = conf;

      await addProducts(productPage, cartPage, [0]);
      await registerCheckout(checkoutPage, firstName, lastName, postalCode);
      await expect(checkoutPage.locs.errorField).toHaveText(msg);
    },
  );

  test(
    "TC003",
    { tag: ["@CHECKOUT_003"] },
    async ({ productPage, cartPage, checkoutPage, conf }) => {
      const { firstName, lastName, postalCode, msg } = conf;

      await addProducts(productPage, cartPage, [0]);
      await registerCheckout(checkoutPage, firstName, lastName, postalCode);
      await expect(checkoutPage.locs.errorField).toHaveText(msg);
    },
  );

  test(
    "TC004",
    { tag: ["@CHECKOUT_004"] },
    async ({ productPage, cartPage, checkoutPage, conf }) => {
      const { firstName, lastName, postalCode, msg } = conf;

      await addProducts(productPage, cartPage, [0]);
      await registerCheckout(checkoutPage, firstName, lastName, postalCode);
      await expect(checkoutPage.locs.errorField).toHaveText(msg);
    },
  );

  test(
    "TC005",
    { tag: ["@CHECKOUT_005"] },
    async ({ productPage, cartPage, checkoutPage, conf }) => {
      const { firstName, lastName, postalCode, products } = conf;
      const actualId = products.map((p: any) => p.id);
      await addProducts(productPage, cartPage, actualId);
      await registerCheckout(checkoutPage, firstName, lastName, postalCode);

      await expect(checkoutPage.page).toHaveURL("checkout-step-two.html");

      const actualNames = await checkoutPage.locs.itemName.allTextContents();
      const expectedNames = products.map((p: any) => p.name);
      expect(actualNames).toEqual(expectedNames);

      const actualPrices = await checkoutPage.locs.itemPrice.allTextContents();
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
    "TC006",
    { tag: ["@CHECKOUT_006"] },
    async ({ productPage, cartPage, checkoutPage }) => {
      await addProducts(productPage, cartPage, [0]);

      await expect(checkoutPage.page).toHaveURL("checkout-step-one.html");
      await checkoutPage.locs.cancelButton.click();

      await expect(cartPage.page).toHaveURL("cart.html");
      await expect(cartPage.locs.cartTitle).toBeVisible();
    },
  );

  test(
    "TC007",
    { tag: ["@CHECKOUT_007"] },
    async ({ productPage, cartPage, checkoutPage, conf }) => {
      const { firstName, lastName, postalCode } = conf;
      await addProducts(productPage, cartPage, [0]);

      await registerCheckout(checkoutPage, firstName, lastName, postalCode);
      await expect(checkoutPage.page).toHaveURL("checkout-step-two.html");
      await checkoutPage.locs.cancelButton.click();

      await expect(productPage.page).toHaveURL("inventory.html");
      await expect(productPage.locs.productTitle).toBeVisible();
    },
  );
});
