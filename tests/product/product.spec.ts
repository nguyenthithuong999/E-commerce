import { expect } from "@playwright/test";
import { test } from "@fixtures/index";

test.describe("SauceDemo Product Feature", () => {
  test.beforeEach("Check product title", async ({ productPage }) => {
    await productPage.openPage("/inventory.html");
    await expect(productPage.locs.productTitle).toBeVisible();
  });

  test(
    "TC001: Add first product to cart, button changes to Remove and cart badge is 1",
    { tag: ["@PRODUCT_001", "@smoke", "@regression"] },
    async ({ productPage }) => {
      await expect(productPage.locs.addToCartButtons(0)).toBeVisible();
      await productPage.addToCart(0);

      await expect(productPage.locs.removeButtons(0)).toBeVisible();
      await expect(productPage.locs.cartBadge).toHaveText("1");
    },
  );

  test(
    "TC002: Remove product from cart, button toggles back to Add to cart and cart badge disappears",
    { tag: ["@PRODUCT_002", "@regression"] },
    async ({ productPage }) => {
      await productPage.addToCart(0);
      await expect(productPage.locs.cartBadge).toHaveText("1");

      await productPage.remove(0);
      await expect(productPage.locs.addToCartButtons(0)).toBeVisible();
      await expect(productPage.locs.cartBadge).not.toBeVisible();
    },
  );

  test(
    "TC003: Sort products by name alphabetically (A to Z)",
    { tag: ["@PRODUCT_003", "@regression"] },
    async ({ productPage }) => {
      await productPage.sortBy("az");
      const names = await productPage.getItemNames();

      const sortedNames = [...names].sort((a, b) => a.localeCompare(b));
      expect(names).toEqual(sortedNames);
    },
  );

  test(
    "TC004: Sort products by name reverse alphabetically (Z to A)",
    { tag: ["@PRODUCT_004", "@regression"] },
    async ({ productPage }) => {
      await productPage.sortBy("za");
      const names = await productPage.getItemNames();

      const sortedNames = [...names].sort((a, b) => b.localeCompare(a));
      expect(names).toEqual(sortedNames);
    },
  );

  test(
    "TC005: Sort products by price low to high",
    { tag: ["@PRODUCT_005", "@regression"] },
    async ({ productPage }) => {
      await productPage.sortBy("lohi");
      const prices = await productPage.getItemPrices();

      const sortedPrices = [...prices].sort((a, b) => a - b);
      expect(prices).toEqual(sortedPrices);
    },
  );

  test(
    "TC006: Sort products by price high to low",
    { tag: ["@PRODUCT_006", "@regression"] },
    async ({ productPage }) => {
      await productPage.sortBy("hilo");
      const prices = await productPage.getItemPrices();

      const sortedPrices = [...prices].sort((a, b) => b - a);
      expect(prices).toEqual(sortedPrices);
    },
  );

  test(
    "TC007: Add multiple products to cart, verify cart badge shows 3 and 3 Remove buttons",
    { tag: ["@PRODUCT_007", "@regression"] },
    async ({ productPage }) => {
      await productPage.addToCart(0);
      await productPage.addToCart(1);
      await productPage.addToCart(2);

      await expect(productPage.locs.removeButtons(0)).toBeVisible();
      await expect(productPage.locs.removeButtons(1)).toBeVisible();
      await expect(productPage.locs.removeButtons(2)).toBeVisible();

      await expect(productPage.locs.cartBadge).toHaveText("3");
    },
  );

  test(
    "TC008: View product details, verify name, description, price and Add to cart button",
    { tag: ["@PRODUCT_008", "@regression"] },
    async ({ productPage, conf }) => {
      const { label, description, price } = conf;
      await expect(productPage.locs.itemLabel(label)).toBeVisible();
      await productPage.locs.itemLabel(label).click();

      await expect(productPage.page).toHaveURL(/id=/);
      await expect(productPage.locs.itemName).toHaveText(label);
      await expect(productPage.locs.itemDesc).toHaveText(description);

      const prices = await productPage.getItemPrices();
      expect(prices[0]).toEqual(price);
      await expect(productPage.locs.addToCartButton).toBeVisible();
    },
  );

  test(
    "TC009: Verify product count, names and prices for all 6 default products",
    { tag: ["@PRODUCT_009", "@regression"] },
    async ({ productPage, conf }) => {
      const expectedProducts = conf;

      // 1. Verify item count on UI
      await expect(productPage.locs.itemName).toHaveCount(
        expectedProducts.length,
      );

      // 2. Fetch UI names and prices
      const actualNames = await productPage.getItemNames();
      const actualPrices = await productPage.locs.itemPrice.allTextContents();

      // 3. Verify names
      const expectedNames = expectedProducts.map((p: any) => p.name);
      expect(actualNames).toEqual(expectedNames);

      // 4. Verify prices
      const expectedPrices = expectedProducts.map((p: any) => `$${p.price}`);
      expect(actualPrices).toEqual(expectedPrices);
    },
  );
});
